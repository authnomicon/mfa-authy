/* global describe, it, expect */

var expect = require('chai').expect;
var sinon = require('sinon');
var factory = require('../../lib/otp/verify');


describe('otp/verify', function() {
  
  it('should export factory function', function() {
    expect(factory).to.be.a('function');
  });
  
  it('should be annotated', function() {
    expect(factory['@implements']).to.have.length(2);
    expect(factory['@implements'][0]).to.equal('http://schemas.authnomicon.org/js/login/mfa/otp/verify');
    expect(factory['@implements'][1]).to.equal('http://schemas.authnomicon.org/js/login/mfa/opt/authy/otp/verify');
    expect(factory['@singleton']).to.equal(true);
  });
  
  describe('verify', function() {
    var client = {
      verify: function(){}
    };
  
    
    describe('a valid token', function() {
      var ok;
      
      before(function() {
        var result = {
          message: 'Token is valid.',
          token: 'is valid',
          success: 'true'
        };
        
        sinon.stub(client, 'verify').yields(null, result);
      });
    
      after(function() {
        client.verify.restore();
      });
      
      before(function(done) {
        var verify = factory(client);
        var authenticator = {
          id: '0',
          type: [ 'otp', 'oob' ],
          _userID: 123456
        }
        
        verify(authenticator, '12345678', function(_err, _ok) {
          if (_err) { return done(_err); }
          ok = _ok;
          done();
        });
      });
    
      it('should verify token', function() {
        expect(client.verify).to.have.been.calledOnce;
        var call = client.verify.getCall(0);
        expect(call.args[0]).to.equal(123456);
        expect(call.args[1]).to.equal('12345678');
      });
      
      it('should yield ok', function() {
        expect(ok).to.be.true;
      });
      
    }); // a valid token
    
    describe('an invalid token', function() {
      var ok;
      
      before(function() {
        var result = {
          message: 'Token is invalid',
          token: 'is invalid',
          success: false,
          errors: {
            message: 'Token is invalid'
          },
          error_code: '60020'
        };
        
        sinon.stub(client, 'verify').yields(result);
      });
    
      after(function() {
        client.verify.restore();
      });
      
      before(function(done) {
        var verify = factory(client);
        var authenticator = {
          id: '0',
          type: [ 'otp', 'oob' ],
          _userID: 123456
        }
        
        verify(authenticator, '12345678', function(_err, _ok) {
          if (_err) { return done(_err); }
          ok = _ok;
          done();
        });
      });
    
      it('should verify token', function() {
        expect(client.verify).to.have.been.calledOnce;
        var call = client.verify.getCall(0);
        expect(call.args[0]).to.equal(123456);
        expect(call.args[1]).to.equal('12345678');
      });
      
      it('should yield ok', function() {
        expect(ok).to.be.false;
      });
      
    }); // an invalid token
  
  }); // verify
  
});
