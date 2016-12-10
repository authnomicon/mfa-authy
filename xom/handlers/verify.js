/// TODO: Rename directory to "registration"

// TODO: Clean this up
exports = module.exports = function() {
  
  var authy = require('authy')(process.env['AUTHY_APIKEY']);
  
  
  function verify(req, res, next) {
    console.log('AUTHY VERIFY:')
    console.log(req.body);
    
    authy.verify('111111', req.body.token, function (err, res) {
    
      console.log(err);
      console.log(res);
      
    });
  }


  return [
    require('body-parser').urlencoded({ extended: false }),
    verify
  ];
  
};

exports['@require'] = [];
