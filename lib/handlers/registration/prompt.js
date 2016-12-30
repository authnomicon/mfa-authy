exports = module.exports = function() {
  
  
  function prompt(req, res, next) {
    res.render('mfa-authy-register');
  }


  return [
    prompt
  ];
  
};

exports['@require'] = [];
