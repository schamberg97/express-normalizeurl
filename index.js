'use strict';

var Url = {

    /**
     * @param {string} url
     * @return {object} this
     */
    init: function init(url) {
        this.url = url;
        this.hasParams = /\?/.test(url);
        this.hasFileExtension = /(\.[0-9a-z]+$)|(\.[0-9a-z]+?\?)/i.test(url);
        this.hasTrailingSlash = /\/$/.test(url) || /\/\?/.test(url);
        return this;
    },

    /**
     * @param {object} options
     * @return {object} this
     */
    transform: function transform(options) {
        if (this.hasFileExtension) return this;

        if (options.lowercase) {
            const nodeUrl = require('url');
            var urlParsed = nodeUrl.parse(this.url);
            urlParsed.pathname = urlParsed.pathname.toLowerCase();
            if (options.lowercaseQueries) urlParsed.search = urlParsed.search.toLowerCase();
            this.url = nodeUrl.format(urlParsed);
        };
        if (options.repeatedSlash && (options.repetedSlash !== false)) this.url = this.url.replace(/\/\/+/g, '/');
        // (options.repetedSlash !== false) is needed to maintain compatibility with express-url (due to weird typo in that project)
        if (options.repeatedQuestionMark) this.url = this.url.replace(/\?{2,}/g, '?');
        if (options.repeatedAmpersand) this.url = this.url.replace(/\&{2,}/g, '&');
        if (options.trailingSlash && !this.hasTrailingSlash) {
            if (this.hasParams) {
                this.url = this.url.split('?')['0'] + '/' + this.url.slice(this.url.split('?')[0].length, this.url.length);
            } else {
                this.url += '/';
            }
        }
        return this;
    }

};


var optionsDefault = {
    requestType: 'GET',
    redirectStatusCode: 302,
    lowercase: true,
    trailingSlash: true,
    repeatedSlash: true,
    repeatedQuestionMark: true,
    repeatedAmpersand: true
};
Object.seal(optionsDefault);

/**
 * @param {object} options - Custom options to specify how to transform a URL
 * @param {string} testUrl - Optional, used when module is being called by automated test
 * @return {function} expressUrlMiddleware - Express middleware function
 */
module.exports = function expressUrlModule(options, testUrl) {
    if (void 0 === options) options = {};

    Object.setPrototypeOf(options, optionsDefault);

    if (testUrl) return Object.create(Url).init(testUrl).transform(options).url;

    return function expressUrlMiddleware(req, res, next) {
        if (req.method !== options.requestType) {
            next();
        } else {
            var newResUrl = Object.create(Url).init(req.url).transform(options);
            if (req.url === newResUrl.url) {
                next();
            } else {
                res.writeHead(options.redirectStatusCode, { Location: newResUrl.url });
                res.end();
            }
        }
    };

};

// Define `perm` and `temp` properties to make update process smoother,
// as they were used in previous versions of the module.
module.exports.perm = module.exports.temp = module.exports;
