exports = module.exports = function() {
  // Load modules.
  var authy = require('authy');
  
  // TODO: Wrap the authy module, allowing for user, domain related options to be passed.
  
  var client = authy(process.env['AUTHY_APIKEY']);
  return client;
};

exports['@implements'] = 'http://schemas.authnomicon.org/js/login/mfa/opt/authy/Client';
exports['@singleton'] = true;
exports['@require'] = [];
