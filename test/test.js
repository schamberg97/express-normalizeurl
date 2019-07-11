var should = require('should'),
    path = require('path'),
    expurl = require(path.join(__dirname, '../index'));

var testUrl = '//sLug??pAram=vAl&&parAm2=vAl2';

describe('expurl', function() {

    it('should redirect to lowercase URL, with unaffected queries', function() {
        should.equal(expurl({
            lowercase: true,
            lowercaseQueries: false,
            trailingSlash: false,
            repeatedSlash: false,
            repeatedQuestionMark: false,
            repeatedAmpersand: false
        }, testUrl), '//slug??pAram=vAl&&parAm2=vAl2');
    });
    
    it('should redirect to lowercase URL, with lowercased queries', function() {
        should.equal(expurl({
            lowercase: true,
            lowercaseQueries: true,
            trailingSlash: false,
            repeatedSlash: false,
            repeatedQuestionMark: false,
            repeatedAmpersand: false
        }, testUrl), '//slug??param=val&&param2=val2');
    });

    it('should redirect to URL with trailing slash', function() {
        should.equal(expurl({
            lowercase: false,
            lowercaseQueries: false,
            trailingSlash: true,
            repeatedSlash: false,
            repeatedQuestionMark: false,
            repeatedAmpersand: false
        }, testUrl), '//sLug/??pAram=vAl&&parAm2=vAl2');
    });

    it('should redirect to URL without repeated slash', function() {
        should.equal(expurl({
            lowercase: false,
            lowercaseQueries: false,
            trailingSlash: false,
            repeatedSlash: true,
            repeatedQuestionMark: false,
            repeatedAmpersand: false
        }, testUrl), '/sLug??pAram=vAl&&parAm2=vAl2');
    });

    it('should redirect to URL without repeated question mark', function() {
        should.equal(expurl({
            lowercase: false,
            lowercaseQueries: false,
            trailingSlash: false,
            repeatedSlash: false,
            repeatedQuestionMark: true,
            repeatedAmpersand: false
        }, testUrl), '//sLug?pAram=vAl&&parAm2=vAl2');
    });

    it('should redirect to URL without repeated ampersand', function() {
        should.equal(expurl({
            lowercase: false,
            lowercaseQueries: false,
            trailingSlash: false,
            repeatedSlash: false,
            repeatedQuestionMark: false,
            repeatedAmpersand: true
        }, testUrl), '//sLug??pAram=vAl&parAm2=vAl2');
    });

    it('should redirect to beautiful URL, with unaffected case of the queries', function() {
        should.equal(expurl({
            lowercase: true,
            lowercaseQueries: false,
            trailingSlash: true,
            repeatedSlash: true,
            repeatedQuestionMark: true,
            repeatedAmpersand: true
        }, testUrl), '/slug/?pAram=vAl&parAm2=vAl2');
    });
    
    it('should redirect to beautiful URL, with lowercased queries', function() {
        should.equal(expurl({
            lowercase: true,
            lowercaseQueries: true,
            trailingSlash: true,
            repeatedSlash: true,
            repeatedQuestionMark: true,
            repeatedAmpersand: true
        }, testUrl), '/slug/?param=val&param2=val2');
    });

});
