exports.homepage = async (req, res, next) => {
    const locals = {
        title: "Home - NodeJs Notes",
        descreption: "Today we are going to create a simple Notes taking Application using Nodejs, Express, MongoDB, and Passport. For templating, we will use EJS and Bootstrap.",
        loggedIn: res.locals
    };
    res.render('index', { locals });
}

exports.aboutpage = async (req, res, next) => {
    const locals = {
        title: "About - NodeJs Notes",
        descreption: "Today we are going to create a simple Notes taking Application using Nodejs, Express, MongoDB, and Passport. For templating, we will use EJS and Bootstrap.",
        loggedIn: res.locals
    };
    res.render('about', { locals });
}

