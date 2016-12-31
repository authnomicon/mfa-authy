exports = module.exports = function(client) {
  
  return function challenge(authenticator, options, cb) {
    if (typeof options == 'function') {
      cb = options;
      options = undefined;
    }
    options = options || {};
    
    // TODO: Other OTP transport mechanisms
    /*
    //authy.request_sms(authyID, true, function (err, res) {
    //authy.request_call(authyID, function (err, res) {
    //authy.request_call(authyID, true, function (err, res) {
    */
    
    client.request_sms(authenticator._userID, function(err, res) {
      if (err) { return cb(err); }
      cb();
    });
  };
};

exports['@implements'] = [
  'http://schemas.authnomicon.org/js/login/mfa/challenge',
  'http://schemas.authnomicon.org/js/login/mfa/opt/authy/challenge'
];
exports['@singleton'] = true;
exports['@require'] = [
  'http://schemas.authnomicon.org/js/login/mfa/opt/authy/Client'
];
