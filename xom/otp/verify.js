exports = module.exports = function(idmap, client) {
  // Load modules.
  var verify = require('../../lib/verify');
  
  return verify(client, idmap);
};

exports['@implements'] = [
  'http://schemas.authnomicon.org/js/login/mfa/otp/verify',
  'http://schemas.authnomicon.org/js/login/mfa/opt/authy/otp/verify'
];
exports['@singleton'] = true;
exports['@require'] = [
  '../id/map',
  'http://schemas.authnomicon.org/js/login/mfa/opt/authy/Client'
];
