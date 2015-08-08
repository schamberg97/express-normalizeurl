var should = require('should'),
    path = require('path'),
    expurl = require(path.join(__dirname, '../index'));

var testUrl = '//sLug??pAram=vAl&&parAm2=vAl2';

describe('expurl', function() {

    it('should redirect to lowercase URL', function() {
        should.equal(expurl({
            lowercase: true,
            trailingSlash: false,
            repetedSlash: false,
            repeatedQuestionMark: false,
            repeatedAmpersand: false
        }, testUrl), '//slug??param=val&&param2=val2');
    });

    it('should redirect to URL with trailing slash', function() {
        should.equal(expurl({
            lowercase: false,
            trailingSlash: true,
            repetedSlash: false,
            repeatedQuestionMark: false,
            repeatedAmpersand: false
        }, testUrl), '//sLug/??pAram=vAl&&parAm2=vAl2');
    });

    it('should redirect to URL without repeated slash', function() {
        should.equal(expurl({
            lowercase: false,
            trailingSlash: false,
            repetedSlash: true,
            repeatedQuestionMark: false,
            repeatedAmpersand: false
        }, testUrl), '/sLug??pAram=vAl&&parAm2=vAl2');
    });

    it('should redirect to URL without repeated question mark', function() {
        should.equal(expurl({
            lowercase: false,
            trailingSlash: false,
            repetedSlash: false,
            repeatedQuestionMark: true,
            repeatedAmpersand: false
        }, testUrl), '//sLug?pAram=vAl&&parAm2=vAl2');
    });

    it('should redirect to URL without repeated question mark', function() {
        should.equal(expurl({
            lowercase: false,
            trailingSlash: false,
            repetedSlash: false,
            repeatedQuestionMark: false,
            repeatedAmpersand: true
        }, testUrl), '//sLug??pAram=vAl&parAm2=vAl2');
    });

    it('should redirect to beautiful URL', function() {
        should.equal(expurl({
            lowercase: true,
            trailingSlash: true,
            repetedSlash: true,
            repeatedQuestionMark: true,
            repeatedAmpersand: true
        }, testUrl), '/slug/?param=val&param2=val2');
    });

});
