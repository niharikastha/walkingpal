/**
 * Service to generate JWT
 */
var jwt = require("jsonwebtoken");

module.exports = {
  sign: function (payload, expiresInSecs) {
    return jwt.sign(
      {
        data: payload,
      },
      sails.config.JWT_SECRET,
      {
        expiresIn: expiresInSecs,
      }
    );
  },

  verify: function (token, callback) {
    jwt.verify(token, sails.config.JWT_SECRET, callback);
  },

  getAuthToken: async function (req) {
    if (!req) return;
    const token = req.header("Authorization").replace("Bearer ", "");
    return token;
  },

};
