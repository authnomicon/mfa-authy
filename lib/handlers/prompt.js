exports = module.exports = function() {
  
  
  // TODO: Make some ORM that maps to a "credential" object, which
  // would have a relation to a "device" or "securityToken"
  
  function prompt(req, res, next) {
    //res.locals.state = req.query.state;
    
    res.render('mfa-authy-prompt');
  }


  return [
    prompt
  ];
  
};

exports['@require'] = [];
