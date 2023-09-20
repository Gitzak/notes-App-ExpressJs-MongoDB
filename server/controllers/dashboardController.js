const Note = require("../models/Notes");
const mongoose = require("mongoose");

exports.dashboard = async (req, res, next) => {

    // try {
    //     await Note.insertMany([
    //         {
    //             user: "65099deda7df68fa4757d2b4",
    //             title: "Introduction to Node.js",
    //             body: "Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine. It allows you to run JavaScript code on the server-side, making it ideal for building scalable network applications.",
    //             createdAt: "1695142670"
    //         },
    //         {
    //             user: "65099deda7df68fa4757d2b4",
    //             title: "Getting Started with Express.js",
    //             body: "Express.js is a web application framework for Node.js. It simplifies the process of building robust and efficient web applications by providing a set of powerful features and middleware.",
    //             createdAt: "1695142670"
    //         },
    //         {
    //             user: "65099deda7df68fa4757d2b4",
    //             title: "MongoDB Basics",
    //             body: "MongoDB is a NoSQL database that stores data in flexible, JSON-like documents. It is a popular choice for Node.js developers due to its flexibility and scalability.",
    //             createdAt: "1695142670"
    //         },
    //         {
    //             user: "65099deda7df68fa4757d2b4",
    //             title: "Building RESTful APIs with Node.js and Express",
    //             body: "Node.js and Express make it easy to create RESTful APIs. You can define routes, handle HTTP requests, and interact with databases to build powerful API endpoints.",
    //             createdAt: "1695142670"
    //         },
    //         {
    //             user: "65099deda7df68fa4757d2b4",
    //             title: "Working with MongoDB in Node.js",
    //             body: "To interact with MongoDB from Node.js, you can use libraries like Mongoose.js. Mongoose provides an elegant way to model your data and perform database operations.",
    //             createdAt: "1695142670"
    //         },
    //         {
    //             user: "65099deda7df68fa4757d2b4",
    //             title: "Middleware in Express.js",
    //             body: "Express.js middleware functions allow you to execute code at different stages of the request-response cycle. This is useful for tasks like logging, authentication, and error handling.",
    //             createdAt: "1695142670"
    //         },
    //         {
    //             user: "65099deda7df68fa4757d2b4",
    //             title: "Error Handling in Node.js",
    //             body: "Proper error handling is crucial in Node.js applications. You can use try-catch blocks, custom error classes, and middleware to handle errors gracefully.",
    //             createdAt: "1695142670"
    //         },
    //         {
    //             user: "65099deda7df68fa4757d2b4",
    //             title: "Scaling Node.js Applications",
    //             body: "As your Node.js application grows, you may need to implement scaling strategies like load balancing and clustering to handle increased traffic and maintain performance.",
    //             createdAt: "1695142670"
    //         },
    //         {
    //             user: "65099deda7df68fa4757d2b4",
    //             title: "Data Validation and Sanitization",
    //             body: "Node.js and Express provide tools for validating and sanitizing user input to prevent security vulnerabilities like SQL injection and XSS attacks.",
    //             createdAt: "1695142670"
    //         },
    //         {
    //             user: "65099deda7df68fa4757d2b4",
    //             title: "Real-time Web Applications with Socket.io",
    //             body: "Socket.io is a library that enables real-time, bidirectional communication between clients and servers. It's often used to build chat applications and live updates in Node.js.",
    //             createdAt: "1695142670"
    //         },
    //         {
    //             user: "65099deda7df68fa4757d2b4",
    //             title: "Testing Node.js Applications",
    //             body: "Testing is a critical part of software development. Node.js has a variety of testing frameworks like Mocha and Jest that help you write and run tests for your code.",
    //             createdAt: "1695142670"
    //         }
    //     ])
    // } catch (error) {

    // }

    let perPage = 6;
    let page = req.query.page || 1;

    const locals = {
        title: "Dashboard - NodeJs Notes",
        descreption: "Today we are going to create a simple Notes taking Application using Nodejs, Express, MongoDB, and Passport. For templating, we will use EJS and Bootstrap.",
        loggedIn: res.locals
    };

    try {
        const notes = await Note.aggregate([
            { $sort: { updatedAt: -1 } },
            { $match: { user: new mongoose.Types.ObjectId(req.user.id), deletedAt: null } },
            {
                $project: {
                    title: { $concat: [{ $substr: ["$title", 0, 25] }, "..."] },
                    body: { $concat: [{ $substr: ["$body", 0, 100] }, "..."] }
                },
            }
        ])
            .skip(perPage * page - perPage)
            .limit(perPage)
            .exec();

        const count = await Note.count();

        res.render('dashboard/dashboard', {
            userName: req.user.firstName,
            locals,
            notes,
            layout: "layouts/app",
            current: page,
            pages: Math.ceil(count / perPage)
        });
    } catch (error) {
        console.log(error);
    }
}

exports.dashboardAddNote = async (req, res) => {
    const locals = {
        title: "Create new note - NodeJs Notes",
        descreption: "Today we are going to create a simple Notes taking Application using Nodejs, Express, MongoDB, and Passport. For templating, we will use EJS and Bootstrap.",
        loggedIn: res.locals
    };

    try {
        res.render("dashboard/add-note", {
            layout: "layouts/app",
            locals
        });
    } catch (error) {
        res.send("Something went wrong.");
    }
};

exports.dashboardCreateNote = async (req, res) => {
    try {
        req.body.user = req.user.id;
        const newNote = await Note.create(req.body);
        res.redirect("/dashboard/edit-note/" + newNote._id);
    } catch (error) {
        console.log(error);
    }
};

exports.dashboardViewNote = async (req, res) => {
    const locals = {
        title: "View note - NodeJs Notes",
        descreption: "Today we are going to create a simple Notes taking Application using Nodejs, Express, MongoDB, and Passport. For templating, we will use EJS and Bootstrap.",
        loggedIn: res.locals
    };

    try {
        const note = await Note.findById({ _id: req.params.id })
            .where({ user: req.user.id })
            .lean();

        if (note) {
            res.render("dashboard/show-note", {
                noteID: req.params.id,
                note,
                layout: "layouts/app",
                locals
            });
        }

    } catch (error) {
        res.send("Something went wrong.");
    }
};

exports.dashboardEditNote = async (req, res) => {
    const locals = {
        title: "Edit note - NodeJs Notes",
        descreption: "Today we are going to create a simple Notes taking Application using Nodejs, Express, MongoDB, and Passport. For templating, we will use EJS and Bootstrap.",
        loggedIn: res.locals
    };

    try {
        const note = await Note.findById({ _id: req.params.id })
            .where({ user: req.user.id })
            .lean();

        if (note) {
            res.render("dashboard/edit-note", {
                noteID: req.params.id,
                note,
                layout: "layouts/app",
                locals
            });
        }

    } catch (error) {
        res.send("Something went wrong.");
    }
};

exports.dashboardUpdateNote = async (req, res) => {
    try {
        await Note.findOneAndUpdate(
            { _id: req.params.id },
            { title: req.body.title, body: req.body.body, updatedAt: Date.now() }
        ).where({ user: req.user.id });
        res.redirect("/dashboard/edit-note/" + req.params.id);
    } catch (error) {
        console.log(error);
    }
};

exports.dashboardDeleteNote = async (req, res) => {
    try {
        const updateResult = await Note.updateOne(
            { _id: req.params.id, user: req.user.id },
            { $set: { deletedAt: Date.now() } }
        );

        if (updateResult.modifiedCount === 1) {
            return res.sendStatus(200)
        } else {
            return res.sendStatus(404)
        }
    } catch (error) {
        console.error(error);
        return res.sendStatus(500)
    }
};

