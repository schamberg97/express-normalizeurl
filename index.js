var expurl = function(req, res, next, resStatus) {

    var hasUppecase = /[A-Z]/.test(req.url),
        hasParams = /\?/.test(req.url),
        hasTrailingSlash = /\/$/.test(req.url) || /\/\?/.test(req.url),
        hasRepetedSlash = /\/\/+/.test(req.url),
        isFile = /\.[0-9a-z]+$/i.test(req.url),
        isGET = (req.method === "GET");

    if (isGET && !isFile) {
        url = req.url;
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
        if (url !== req.url) {
            res.redirect(resStatus, req.url);
        } else {
            next();
        }
    } else {
        next();
    }

}

module.exports = {
    perm :
        function(req, res, next) {
            expurl1(req, res, next, 301);
        },
    temp :
        function(req, res, next) {
            expurl(req, res, next, 302);
        }
}