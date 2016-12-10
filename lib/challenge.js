exports = module.exports = function(client, idmap) {
  
  return function challenge(user, credID, options, cb) {
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
    
    idmap(user, function(err, authyID) {
      if (err) { return cb(err); }
    
      client.request_sms(authyID, function(err, res) {
        if (err) { return cb(err); }
        cb();
      });
    });
  };
};
