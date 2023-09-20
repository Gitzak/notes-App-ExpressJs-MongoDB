exports.renderLogin = async (req, res, next) => {
    const locals = {
        title: "Login - NodeJs Notes",
        descreption: "Today we are going to create a simple Notes taking Application using Nodejs, Express, MongoDB, and Passport. For templating, we will use EJS and Bootstrap.",
    };
    res.render('auth/login',
        locals,
    );
}