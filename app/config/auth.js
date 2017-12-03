'use strict';

module.exports = {
    'facebookAuth' : {
        'clientID'        : '313119605831364', // your App ID
        'clientSecret'    : '6e7e3438a2ce2f3a88ffdba6699b643d', // your App Secret
        'callbackURL'     : 'https://findme-pandabox.herokuapp.com/auth/facebook/callback',
        'passReqToCallback' : true,
        'profileFields'   : ['email', 'gender', 'locale', 'displayName']
    }
}