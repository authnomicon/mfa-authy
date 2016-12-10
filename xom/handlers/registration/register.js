/// TODO: Rename directory to "registration"

exports = module.exports = function() {
  
  var authy = require('authy')(process.env['AUTHY_APIKEY']);
  
  
  function register(req, res, next) {
    console.log('AUTHY REGISTER:')
    console.log(req.body);
    
    /*
{ message: 'User created successfully.',
  user: { id: 248923 },
  success: true }
    */
    
    authy.register_user('johndoe@example.com', req.body.cellphone, function (err, res) {
        // res = {user: {id: 1337}} where 1337 = ID given to use, store this someplace
      
      console.log(err);
      console.log(res);
      
    });
  }


  return [
    require('body-parser').urlencoded({ extended: false }),
    register
  ];
  
};

exports['@require'] = [];
