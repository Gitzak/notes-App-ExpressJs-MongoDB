exports.isLoggedIn = function (req, res, next) {
    if (req.isAuthenticated()) {
        res.locals.loggedIn = true;
        next();
    } else {
        res.locals.loggedIn = false;
        res.redirect('/login');
    }
};

exports.checkLoggin = function (req, res, next) {
    if (req.isAuthenticated()) {
        res.locals.loggedIn = true;
        next();
    } else {
        res.locals.loggedIn = false;
        next();
    }
};
