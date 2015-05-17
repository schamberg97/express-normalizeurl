var app = require('../../../app'); // should point to file with app routes

var should = require('should'),
	supertest = require('supertest'); 

describe('expurl', function(){

	it('should redirect uppercase', function(done){
		supertest(app)
		.get('/expurl/tEsT/')
		.end(function(err, res){
			res.status.should.equal(302);
			done();
		});
	});

	it('should redirect urls without triling slash', function(done){
		supertest(app)
		.get('/expurl/test') 
		.end(function(err, res){
			res.status.should.equal(302);
			done();
		})
	});

	it('should redirect urls without triling slash with params', function(done){
		supertest(app)
		.get('/expurl/test?test') 
		.end(function(err, res){
			res.status.should.equal(302);
			done();
		})
	});

	it('should not redirect file urls', function(done){
		supertest(app)
		.get('/expurl/test.jpg')
		.end(function(err, res){
			res.status.should.not.equal(302);
			done();
		})
	});

	it('should redirect when has repeted slashes', function(done){
		supertest(app)
		.get('//expurl//test//')
		.end(function(err, res){
			res.status.should.equal(302);
			done();
		})
	});

});