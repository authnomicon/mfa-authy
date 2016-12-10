function Directory(client, idmap) {
  this._client = client;
  this._idmap = idmap;
}

Directory.prototype.list = function(user, options, cb) {
  if (typeof options == 'function') {
    cb = options;
    options = undefined;
  }
  options = options || {};
  
  var self = this;
  this._idmap(user, function(err, authyID) {
    if (err) { return cb(err); }
    
    self._client.user_status(authyID, function(err, res) {
      if (err) { return cb(err); }
    
      var credential = {};
      credential.id = '0';
      credential.methods = [ 'otp' ];
    
      return cb(null, [ credential ]);
    });
  });
};


module.exports = Directory;
