'use strict';

/**
 * Rewrite options to change URL
 * @type {Object}
 */
var options = {
    requestType: 'GET',
    redirectStatusCode: 302,
    lowercase: true,
    trailingSlash: true,
    repetedSlash: true,
    repeatedQuestionMark: true,
    repeatedAmpersand: true
};

/**
 * URL object factory
 * @param {string} url - Original request url
 */
var Url = function(url) {
    this.originUrl = url;

    this.outputUrl = url;
    this.information = {};

    this.getInformation();
    this.getOutputUrl();
};

/**
 * URL behaviour - get information about current URL
 */
Url.prototype.getInformation = function() {
    this.information.hasUppecase = /[A-Z]/.test(this.outputUrl);
    this.information.hasTrailingSlash = /\/$/.test(this.outputUrl) || /\/\?/.test(this.outputUrl);
    this.information.hasParams = /\?/.test(this.outputUrl);
    this.information.hasRepetedSlash = /\/\/+/.test(this.outputUrl);
    this.information.hasRepeatedQuestionMark = /\?{2,}/.test(this.outputUrl);
    this.information.hasRepeatedAmpersand = /\&{2,}/.test(this.outputUrl);
    this.information.hasRepeatedQuery = /\?.*?(\?)/.test(this.outputUrl);
};

/**
 * URL behaviour - change URL depending on options
 */
Url.prototype.getOutputUrl = function() {
    // Lowercase
    if (options.lowercase && this.information.hasUppecase) {
        this.outputUrl = this.outputUrl.toLowerCase();
    }

    // Suppress repeeted question marks
    if (options.repetedSlash && this.information.hasRepetedSlash) {
        this.outputUrl = this.outputUrl.replace(/\/\/+/g, '/');
    }

    // Suppress repeeted question marks
    if (options.repeatedQuestionMark && this.information.hasRepeatedQuestionMark) {
        this.outputUrl = this.outputUrl.replace(/\?{2,}/g, '?');
    }

    // Suppress repeeted ampersands
    if (options.repeatedAmpersand && this.information.hasRepeatedAmpersand) {
        this.outputUrl = this.outputUrl.replace(/\&{2,}/g, '&');
    }

    // Add trailing slash
    if (options.trailingSlash && !this.information.hasTrailingSlash) {
        if (this.information.hasParams) {
            var tmp = '';
            for (var i = 1; i < this.outputUrl.split("?").length; i++) {
                tmp += '?' + this.outputUrl.split("?")[i];
            }
            this.outputUrl = this.outputUrl.split("?")[0] + '/' + tmp;
        } else {
            this.outputUrl += '/';
        }
    }
};

/**
 * Redirect old URL to new if they are different
 * @param  {string}   originUrl - Redirect from this link
 * @param  {string}   outputUrl - Redirect to this link
 * @param  {object}   response  - Web-server res object
 * @param  {Function} next      - Web-server next function
 */
var redirect = function(originUrl, outputUrl, response, next) {
    if (outputUrl !== originUrl) {
        response.writeHead(options.redirectStatusCode, {
            Location: outputUrl
        });
        response.end();
    } else {
        next();
    }
};

/**
 * Check if requests a file
 * @param  {sting}  url - Original request url
 * @return {Boolean}    - Returns true if requests a file
 */
var isFile = function(url) {
    return /(\.[0-9a-z]+$)|(\.[0-9a-z]+?\?)/i.test(url);
};

/**
 * Merge custom options with default
 * @param  {object} defaultOptions - Default (module) options to change URL
 * @param  {object} customOptions  - Custom (user) options to change URL
 */
var mergeOptions = function(defaultOptions, customOptions) {
    for (var attrName in customOptions) {
        if (customOptions.hasOwnProperty(attrName)) {
            defaultOptions[attrName] = customOptions[attrName];
        }
    }
};

/**
 * Object that's returned as the result of a require
 * @param  {object} customOptions - Custom (user) options to change URL
 * @param  {string} test          - Sting with example URL to perform external testing
 * @return {Function}             - Middleware return function
 */
module.exports = function(customOptions, test) {

    mergeOptions(options, customOptions);

    if (test) {
        return new Url(test).outputUrl;
    } else {
        return function(req, res, next) {
            if (req.method === options.requestType && !isFile(req.url)) {
                var url = new Url(req.url);
                redirect(url.originUrl, url.outputUrl, res, next);
            } else {
                next();
            }
        };
    }

};

/**
 * Helper to support old versions of module
 * @return {Function} - Middleware return function
 */
var legacy = function() {
    return module.exports();
};

module.exports.temp = legacy();
module.exports.perm = legacy();
