exports.isLoggedIn = function (req, res, next) {
    if (req.isAuthenticated()) {
        res.loggedIn = true;
        next();
    } else {
        res.loggedIn = false;
        res.redirect('/login');
    }
};

exports.checkLoggin = function (req, res, next) {
    if (req.isAuthenticated()) {
        res.loggedIn = true;
        next();
    } else {
        res.loggedIn = false;
        next();
    }
};
