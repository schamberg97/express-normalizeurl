var app = require('../../../app'); // should point to file with app routes

var should = require('should'),
	supertest = require('supertest'); 

describe('express-url', function(){

	it('should redirect uppercase', function(done){
		supertest(app)
		.get('/express-url-test/tEsT/')
		.end(function(err, res){
			res.status.should.equal(302);
			done();
		});
	});

	it('should redirect urls without triling slash', function(done){
		supertest(app)
		.get('/express-url-test/test') 
		.end(function(err, res){
			res.status.should.equal(302);
			done();
		})
	})

	it('should redirect urls without triling slash with params', function(done){
		supertest(app)
		.get('/express-url-test/test?test') 
		.end(function(err, res){
			res.status.should.equal(302);
			done();
		})
	})

	it('should not redirect file urls', function(done){
		supertest(app)
		.get('/express-url-test/test.jpg')
		.end(function(err, res){
			res.status.should.not.equal(302);
			done();
		})
	})

});