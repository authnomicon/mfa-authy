exports = module.exports = {
  'client': require('./client'),
  'challenge': require('./challenge'),
  'otp/verify': require('./otp/verify'),
  'ds/users/authenticators': require('./ds/users/authenticators')
};

exports.load = function(id) {
  try {
    return require('./' + id);
  } catch (ex) {
    if (ex.code == 'MODULE_NOT_FOUND') { return; }
    throw ex;
  }
};