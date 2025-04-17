module.exports = function (req, res, proceed) {

    //Authorization header is not present
    if (!req.headers || !req.headers.authorization) {
      return res.status(401).json({
        success: false,
        message: "Missing Authorization header.",
      });
    }
  
    //Malformed Authorization header
    var parts = req.headers.authorization.split(" ");
    if (parts.length != 2) {
      return res.status(401).json({
        message: "Format is Authorization: Bearer [token]",
      });
    }
  
    //Verify Authorization header
    if (!/^Bearer$/i.test(parts[0] /*scheme*/)) {
      return res.status(401).json({
        message: "Invalid scheme in Authorization header: " +
          parts[0] +
          ", Format: Bearer [token]",
      });
    }
  
    //Verify Authorization token
    jwToken.verify(parts[1] /*token*/, async function (err, decoded) {
      //Invalid Authorization token
      if (err) {
        if (err.name === 'TokenExpiredError') {
          return res.status(401).json({
            success: false,
            message: "Authorization token has expired. Please login again.",
          });
        }
  
        return res.status(401).json({
          success: false,
          message: "Invalid Authorization token.",
        });
      }
      req.user = decoded;
      return proceed();
    });
  
  }