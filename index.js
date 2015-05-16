module.exports = function(req, res, next) {

    var hasUppecase = /[A-Z]/.test(req.url),
        hasParams = /\?/.test(req.url),
        hasSlash = /\/$/.test(req.url) || /\/\?/.test(req.url),
        isFile = /\.[0-9a-z]+$/i.test(req.url),
        isGET = (req.method === "GET");

    if (isGET && !isFile) {
        url = req.url;
        if (hasUppecase) {
            req.url = req.url.toLowerCase();
        }
        if (!hasSlash) {
            if (hasParams) {
                req.url = req.url.split("?")[0] + '/?' + req.url.split("?")[1];
            } else {
                req.url += '/';
            }
        }
        if (url !== req.url) {
            res.redirect(302, req.url); // do not change 302 to 301 before testing
        } else {
            next();
        }
    } else {
        next();
    }

}
