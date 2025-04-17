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

      otp : {
        type: "string",
      },

      otpExpiry: { 
        type: "ref",
        columnType: "datetime",
      },
    },
  }
  