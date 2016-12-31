exports = module.exports = function(client) {
  
  return function verify(authenticator, otp, options, cb) {
    if (typeof options == 'function') {
      cb = options;
      options = undefined;
    }
    options = options || {};
    
    
    client.verify(authenticator._userID, otp, function(err, res) {
      if (err) {
        if (err.success == false && err.token == 'is invalid') {
          return cb(null, false);
        }
        return cb(err);
      }

      if (res.success == 'true' && res.token == 'is valid') {
        return cb(null, true);
      }
    });
  };
};

exports['@implements'] = [
  'http://schemas.authnomicon.org/js/login/mfa/otp/verify',
  'http://schemas.authnomicon.org/js/login/mfa/opt/authy/otp/verify'
];
exports['@singleton'] = true;
exports['@require'] = [
  'http://schemas.authnomicon.org/js/login/mfa/opt/authy/Client'
];
