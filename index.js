var expurl = function(req, res, next, resStatus) {

    var hasUppecase = /[A-Z]/.test(req.url),
        hasParams = /\?/.test(req.url),
        hasTrailingSlash = /\/$/.test(req.url) || /\/\?/.test(req.url),
        hasRepetedSlash = /\/\/+/.test(req.url),
        hasRepeatedQuestionMark = /\?{2,}/g.test(req.url),
        hasRepeatedAmpersand = /\&{2,}/g.test(req.url),
        hasRepeatedQuery = /\?.*?(\?)/g.test(req.url),
        isFile = /\.[0-9a-z]+$/i.test(req.url),
        isGET = (req.method === "GET");

    if (isGET && !isFile) {
        originalUrl = req.url;

        if (hasUppecase) {
            req.url = req.url.toLowerCase();
        }

        if (hasRepetedSlash) {
            req.url = req.url.replace(/\/\/+/, '/');
        }

        if (!hasTrailingSlash) {
            if (hasParams) {
                req.url = req.url.split("?")[0] + '/?' + req.url.split("?")[1];
            } else {
                req.url += '/';
            }
        }

        if (hasRepeatedQuestionMark) {
            req.url = req.url.replace(/\?{2,}/, '?');
        }

        if (hasRepeatedAmpersand) {
            req.url = req.url.replace(/\&{2,}/, '&');
        }

        if (hasRepeatedQuery) {
            req.url = req.url.split("/?")[0] + '/?' + req.url.split("/?")[1].replace(/\?{1,}/, '&');
        }

        if (originalUrl !== req.url) {
            res.redirect(resStatus, req.url);
        } else {
            next();
        }

    } else {
        next();
    }

}

module.exports = {
    perm: function(req, res, next) {
        expurl(req, res, next, 301);
    },
    temp: function(req, res, next) {
        expurl(req, res, next, 302);
    }
}
