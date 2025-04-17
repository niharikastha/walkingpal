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
            const otpExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000);  // 1 day 

            const existingUser = await User.findOne({ phoneNumber });
            let user ;
            if (existingUser) {
              if (existingUser.status === 'blocked') {
                return res.status(403).json({
                  status: false,
                  message: "This account has been blocked. Please contact support."
                });
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
                  name : user.name
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
              error: error
            });
          }
    },

    verifyOtp: async (req, res) => {
        try {
            const { phoneNumber, otp, name } = req.body;
            const formattedPhoneNumber = `+91${phoneNumber}`;

            const user = await User.findOne({ phoneNumber: formattedPhoneNumber });

            console.log("🚀 ~ verifyOtp: ~ user:", user)
            if (!user || user.otp !== otp) {
                return res.status(400).json({
                    status: false,
                    message: "Invalid OTP."
                });
            }

            if (name) await User.update({id: user.id}).set({name : name});

            return res.status(200).json({
                status: true,
                message: "OTP verified successfully.",
            });

        } catch (error) {
            return res.status(500).json({
                status: false,
                message: "An error occurred.",
                error: error.message
            });
        }
    }

}