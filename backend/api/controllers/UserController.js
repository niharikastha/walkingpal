const TeleSignSDK = require('telesignsdk');
const jwToken = require('../services/jwToken');
const customerId = sails.config.TELESIGN_CUSTOMER_ID;
const apiKey = sails.config.TELESIGN_API_KEY;
const teleSignClient = new TeleSignSDK(customerId, apiKey);
const expiresInSecs = 86400;


const sendSMS = async (phoneNumber, message, messageType) => {
  return new Promise((resolve, reject) => {
    teleSignClient.sms.message((error, responseBody) => {
      if (error) {
        reject(error);
      } else {
        resolve(responseBody);
      }
    }, phoneNumber, message, messageType);
  });
};


module.exports = {

  signup: async (req, res) => {
    try {
      let phoneNumber = req.body.phoneNumber;
      if (!phoneNumber) {
        return res.status(400).json({
          status: false,
          message: "Phone number is required"
        });
      }

      const phone = await User.findOne({ phoneNumber: phoneNumber });
      if (phone) {
        return res.status(400).json({
          status: false,
          message: "Phone number already exists."
        });
      }
      const phoneRegex = /^\+91\d{10}$/;

      phoneNumber = `+91${phoneNumber.replace(/\D/g, '')}`;

      if (!phoneRegex.test(phoneNumber)) {
        return res.status(400).json({
          status: false,
          message: "Invalid phone number format. Please enter 10 digits."
        });
      } 
      
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      const otpExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000);  // 1 day 

      const user = await User.create({
        phoneNumber,
        otp,
        otpExpiry
      }).fetch();

      try {
        const message = `Your OTP is: ${otp}. Valid for 10 minutes.`;
        const messageType = "ARN";

        await sendSMS(phoneNumber, message, messageType);

        return res.status(200).json({
          status: true,
          message: "User created and OTP sent successfully",
          data: {
            userId: user.id,
            phoneNumber: user.phoneNumber,
            name: user.name
          },
          token: jwToken.sign(user.id, expiresInSecs)
        });
      } catch (smsError) {
        console.error("SMS sending failed:", smsError);

        return res.status(500).json({
          status: false,
          message: "Failed to send OTP. Please try again later."
        });
      }
    } catch (error) {
      console.error("Signup error:", error);
      return res.status(500).json({
        status: false,
        message: "An error occurred while processing your request.",
        error: error.message
      });
    }
  },

  login: async (req, res) => {
    try {
      const { phoneNumber: rawPhoneNumber } = req.body;

      if (!rawPhoneNumber) {
        return res.status(400).json({
          status: false,
          message: "Phone number is required"
        });
      }

      const phoneNumber = `+91${rawPhoneNumber.replace(/\D/g, '')}`;

      const phoneRegex = /^\+91\d{10}$/;
      if (!phoneRegex.test(phoneNumber)) {
        return res.status(400).json({
          status: false,
          message: "Invalid phone number format. Please enter 10 digits."
        });
      }

      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);  // 10 minutes

      const existingUser = await User.findOne({ phoneNumber });
      let user;
      let nextStep = "profile"; // Default next step

      if (existingUser) {
        if (existingUser.status === 'blocked') {
          return res.status(403).json({
            status: false,
            message: "This account has been blocked. Please contact support."
          });
        }

        // Determine the next step based on profile completion
        if (existingUser.profession) {
          nextStep = "main"; // User has completed profile up to profession
        } else if (existingUser.dob) {
          nextStep = "gender"; // User has entered DOB but needs to complete gender
        } else if (existingUser.name) {
          nextStep = "dob"; // User has name but needs to complete DOB
        }

        user = await User.updateOne({ id: existingUser.id })
          .set({
            otp,
            otpExpiry
          });
      } else {
        user = await User.create({
          phoneNumber,
          otp,
          otpExpiry
        }).fetch();
        nextStep = "name"; // New user needs to start with name
      }

      try {
        const message = `Your OTP is: ${otp}. Valid for 10 minutes.`;
        const messageType = "ARN";

        await sendSMS(phoneNumber, message, messageType);

        return res.status(200).json({
          status: true,
          message: existingUser ? "OTP sent successfully" : "User created and OTP sent successfully",
          data: {
            userId: user.id,
            phoneNumber: user.phoneNumber,
            name: user.name,
            nextStep: nextStep // Tell frontend which step to show next
          },
          token: jwToken.sign(user.id, expiresInSecs)
        });
      } catch (smsError) {
        console.error("SMS sending failed:", smsError);

        return res.status(500).json({
          status: false,
          message: "Failed to send OTP. Please try again later."
        });
      }

    } catch (error) {
      console.error("Login error:", error);
      return res.status(500).json({
        status: false,
        message: "An error occurred while processing your request.",
        error: error.message
      });
    }
  },

  verifyOtp: async (req, res) => {
    try {
      const { phoneNumber, otp } = req.body;
      const formattedPhoneNumber = `+91${phoneNumber.replace(/\D/g, '')}`;

      const user = await User.findOne({ phoneNumber: formattedPhoneNumber });

      if (!user) {
        return res.status(400).json({
          status: false,
          message: "User not found."
        });
      }

      if (user.otp !== otp) {
        return res.status(400).json({
          status: false,
          message: "Invalid OTP."
        });
      }

      // Check if OTP has expired
      if (new Date() > new Date(user.otpExpiry)) {
        return res.status(400).json({
          status: false,
          message: "OTP has expired. Please request a new one."
        });
      }

      let nextStep = "profile"; // Default
      if (user.profession) {
        nextStep = "main"; // User has completed profile up to profession
      } else if (user.dob) {
        nextStep = "gender"; // User has entered DOB but needs to complete gender
      } else if (user.name) {
        nextStep = "dob"; // User has name but needs to complete DOB
      } else {
        nextStep = "name"; // User needs to start with name
      }

      return res.status(200).json({
        status: true,
        message: "OTP verified successfully",
        data: {
          userId: user.id,
          phoneNumber: user.phoneNumber,
          name: user.name,
          nextStep: nextStep
        },
        token: jwToken.sign(user.id, expiresInSecs)
      });

    } catch (error) {
      console.error("OTP verification error:", error);
      return res.status(500).json({
        status: false,
        message: "An error occurred during OTP verification.",
        error: error.message
      });
    }
  },

  updateName: async (req, res) => {
    try {
      const { userId, name } = req.body;
      if (!userId || !name) {
        return res.status(400).json({ status: false, message: "User ID and name are required." });
      }

      await User.updateOne({ id: userId }).set({ name });
      return res.status(200).json({ status: true, message: "Name updated successfully." });

    } catch (error) {
      return res.serverError(error);
    }
  },

  updateDob: async (req, res) => {
    try {
      const { userId, dob } = req.body;
      if (!userId || !dob) {
        return res.status(400).json({ status: false, message: "User ID and date of birth are required." });
      }

      await User.updateOne({ id: userId }).set({ dob });
      return res.status(200).json({ status: true, message: "Date of birth updated successfully." });

    } catch (error) {
      return res.serverError(error);
    }
  },

  updateGender: async (req, res) => {
    try {
      const { userId, gender } = req.body;
      if (!userId || !gender) {
        return res.status(400).json({ status: false, message: "User ID and gender are required." });
      }

      await User.updateOne({ id: userId }).set({ gender });
      return res.status(200).json({ status: true, message: "Gender updated successfully." });

    } catch (error) {
      return res.serverError(error);
    }
  },

  updateProfilePicture: async (req, res) => {
    try {
      const { userId, profilePicture } = req.body;
      if (!userId || !profilePicture) {
        return res.status(400).json({ status: false, message: "User ID and profile picture URL are required." });
      }

      await User.updateOne({ id: userId }).set({ profilePicture });
      return res.status(200).json({ status: true, message: "Profile picture updated successfully." });

    } catch (error) {
      return res.serverError(error);
    }
  },

  updateMoreInfo: async (req, res) => {
    try {
      const { userId, bio, hobbies, profession } = req.body;
      if (!userId) {
        return res.status(400).json({ status: false, message: "User ID is required." });
      }

      await User.updateOne({ id: userId }).set({ bio, hobbies, profession });
      return res.status(200).json({ status: true, message: "More info updated successfully." });

    } catch (error) {
      return res.serverError(error);
    }
  },

  updateRelationshipStatus: async (req, res) => {
    try {
      const { userId, relationshipStatus } = req.body;
      if (!userId || !relationshipStatus) {
        return res.status(400).json({ status: false, message: "User ID and relationship status are required." });
      }

      await User.updateOne({ id: userId }).set({ relationshipStatus });
      return res.status(200).json({ status: true, message: "Relationship status updated successfully." });

    } catch (error) {
      return res.serverError(error);
    }
  },

  updateLivingStatus: async (req, res) => {
    try {
      const { userId, livingStatus } = req.body;
      if (!userId || !livingStatus) {
        return res.status(400).json({ status: false, message: "User ID and living status are required." });
      }

      await User.updateOne({ id: userId }).set({ livingStatus });
      return res.status(200).json({ status: true, message: "Living status updated successfully." });

    } catch (error) {
      return res.serverError(error);
    }
  },

  verifyAadhar: async (req, res) => {
    try {
      const { userId, aadharNumber } = req.body;
      if (!userId || !aadharNumber) {
        return res.status(400).json({ status: false, message: "User ID and Aadhaar number are required." });
      }

      await User.updateOne({ id: userId }).set({
        aadharNumber
      });

      return res.status(200).json({ status: true, message: "Aadhaar details submitted for verification." });

    } catch (error) {
      return res.serverError(error);
    }
  }
};