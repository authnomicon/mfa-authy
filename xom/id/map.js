exports = module.exports = function(container, authyID) {
  // FIXME: Would prefer to use this form, but a bug in electrolyte makes
  //        the identifiers inconsistent with `@require`.  Switch to preferred
  //        form once bug is fixed.
  //return container.create('./id/map/authyid');
  
  return authyID;
};

exports['@implements'] = 'http://schemas.authnomicon.org/js/login/mfa/opt/authy/id/map';
exports['@singleton'] = true;
exports['@require'] = [ '!container', './map/authyid' ];
