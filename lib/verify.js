exports = module.exports = function(client, idmap) {
  
  return function verify(user, credID, otp, options, cb) {
    if (typeof options == 'function') {
      cb = options;
      options = undefined;
    }
    options = options || {};
    
    
    idmap(user, function(err, authyID) {
      if (err) { return cb(err); }
      
      client.verify(authyID, otp, function(err, res) {
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
    });
  };
};
