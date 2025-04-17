module.exports = {
  attributes: {

    email: {
      type: "string",
      allowNull: true,
    },

    name: {
      type: "string",
    },

    phoneNumber: {
      type: "string",
      required: true,
      unique: true,
    },

    userType: {
      type: "string",
      isIn: ['admin', 'member'],
      defaultsTo: "member",
    },

    status: {
      type: "string",
      isIn: ['active', 'inactive'],
      defaultsTo: "active",
    },

    otp: {
      type: "string",
    },

    otpExpiry: {
      type: "ref",
      columnType: "datetime",
    },

    dob: {
      type: "string",
    },

    gender: {
      type: "string",
      isIn: ['woman', 'man', 'nonbinary'],
      defaultsTo: 'nonbinary',
    },

    profilePicture: {
      type: "string", // can store image URL or file path
      allowNull: true,
    },

    relationshipStatus: {
      type: "string",
      isIn: ['married', 'single', 'in a relationship', 'prefer not to say'],
      defaultsTo: 'prefer not to say',
    },

    moreInfo: {
      type: "string",
      allowNull: true,
    },

    profession: {
      type: "string",
      allowNull: true,
    },

    aadharCardNumber: {
      type: "string",
      allowNull: true,
    }

  },
};
