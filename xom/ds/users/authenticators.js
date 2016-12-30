function UserAuthenticatorsDirectory(client, idmap) {
  this._client = client;
  this._idmap = idmap;
}

UserAuthenticatorsDirectory.prototype.list = function(user, options, cb) {
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




exports = module.exports = function(idmap, client) {
  var directory = new UserAuthenticatorsDirectory(client, idmap);
  return directory;
};

exports['@implements'] = [
  'http://schemas.authnomicon.org/js/login/mfa/UserAuthenticatorsDirectory',
  'http://schemas.authnomicon.org/js/login/mfa/opt/authy/UserAuthenticatorsDirectory'
];
exports['@singleton'] = true;
exports['@require'] = [
  '../../id/map',
  'http://schemas.authnomicon.org/js/login/mfa/opt/authy/Client'
];
