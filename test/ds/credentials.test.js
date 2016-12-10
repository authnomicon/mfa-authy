/* global describe, it, expect */

var expect = require('chai').expect;
var sinon = require('sinon');
var factory = require('../../xom/ds/credentials');


describe('authy/ds/credentials', function() {
  
  it('should export factory function', function() {
    expect(factory).to.be.a('function');
  });
  
  it('should be annotated', function() {
    expect(factory['@implements']).to.have.length(2);
    expect(factory['@implements'][0]).to.equal('http://schemas.authnomicon.org/js/login/mfa/CredentialDirectory');
    expect(factory['@implements'][1]).to.equal('http://schemas.authnomicon.org/js/login/mfa/opt/authy/CredentialDirectory');
    expect(factory['@singleton']).to.equal(true);
  });
  
  describe('Directory', function() {
    var directory;
    
    var client = {
      user_status: function(){}
    };
    var idmap;
    
    
    describe('#list', function() {
    
      describe('user with app installed on two iPhones', function() {
        var credentials;
        
        before(function() {
          var record = {
            status: {
              authy_id: 123456,
              confirmed: true,
              registered: true,
              country_code: 1,
              phone_number: 'XXX-XXX-1234',
              devices: ['iphone', 'iphone'],
              has_hard_token: false,
              account_disabled: false,
              detailed_devices: [{
                device_type: 'authy',
                os_type: 'ios',
                creation_date: 1384316396
              }, {
                device_type: 'authy',
                os_type: 'ios',
                creation_date: 1481073378
              }]
            },
            message: 'User status.',
            success: true
          };
          
          sinon.stub(client, 'user_status').yields(null, record);
          idmap = sinon.stub().yields(null, '123456');
        });
      
        after(function() {
          client.user_status.restore();
        });
        
        before(function(done) {
          var directory = factory(idmap, client);
          directory.list({ id: '1', username: 'johndoe' }, function(_err, _credentials) {
            if (_err) { return done(_err); }
            credentials = _credentials;
            done();
          });
        });
      
        it('should call id.map', function() {
          expect(idmap).to.have.been.calledOnce;
          var call = idmap.getCall(0);
          expect(call.args[0]).to.deep.equal({
            id: '1',
            username: 'johndoe'
          });
        });
        
        it('should call client#user_status', function() {
          expect(client.user_status).to.have.been.calledOnce;
          var call = client.user_status.getCall(0);
          expect(call.args[0]).to.equal('123456');
        });
        
        it('should yield credentials', function() {
          expect(credentials).to.be.an('array');
          expect(credentials).to.have.length(1);
          expect(credentials[0]).to.deep.equal({
            id: '0',
            methods: [ 'otp' ]
          });
        });
        
      }); // user with app installed on two iPhones
      
    }); // #list
    
  }); // Directory
  
});
