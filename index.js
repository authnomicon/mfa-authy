exports = module.exports = {
  'client': require('./xom/client'),
  'challenge': require('./xom/challenge'),
  'otp/verify': require('./xom/otp/verify'),
  'ds/users/authenticators': require('./xom/ds/users/authenticators')
};

exports.load = function(id) {
  try {
    return require('./xom/' + id);
  } catch (ex) {
    if (ex.code == 'MODULE_NOT_FOUND') { return; }
    throw ex;
  }
};
