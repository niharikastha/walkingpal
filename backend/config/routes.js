/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': { view: 'pages/homepage' },


  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/

  'POST /signup': {
    controller: 'UserController',
    action: 'signup'
  },

  'POST /login': { 
    controller: 'UserController', 
    action: 'login' 
  },

  'POST /verify-otp': { 
    controller: 'UserController', 
    action: 'verifyOtp' 
  },

  'PUT /update-name': { 
    controller: 'UserController', 
    action: 'updateName' 
  },

  'PUT /update-dob': { 
    controller: 'UserController', 
    action: 'updateDob' 
  },

  'PUT /update-gender': { 
    controller: 'UserController', 
    action: 'updateGender' 
  },

  'PUT /update-profile-picture': { 
    controller: 'UserController', 
    action: 'updateProfilePicture' 
  },

  'PUT /update-more-info': { 
    controller: 'UserController', 
    action: 'updateMoreInfo' 
  },

  'PUT /update-relationship-status': { 
    controller: 'UserController', 
    action: 'updateRelationshipStatus' 
  },

  'PUT /update-living-status': { 
    controller: 'UserController', 
    action: 'updateLivingStatus' 
  },

  'POST /verify-aadhar': { 
    controller: 'UserController', 
    action: 'verifyAadhar' 
  }
  
};
