// Requiring our models and passport as we've configured it
const db = require("../models");
const passport = require("../config/passport");
const Sequelize = require("sequelize");
// var text = require('../models/text.js')

module.exports = function(app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    // Sending back a password, even a hashed password, isn't a good idea
    res.json({
      email: req.user.email,
      id: req.user.id
    });
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", function(req, res) {
    db.User.create({
      email: req.body.email,
      password: req.body.password
    })
      .then(function() {
        res.redirect(307, "/api/login");
      })
      .catch(function(err) {
        res.status(401).json(err);
      });
  });

  // Route for logging user out
  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", function(req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  });

  app.get("/api/all", function(req, res) {
    db.text.findAll({}).then(function(results) {
      // results are available to us inside the .then
      res.json(results);
    });
  });

  app.post("/api/post/:id/like", async function(req, res) {
    const { id } = req.params;
    console.log(req.params + "test id: " + id);
    await db.text.update(
      { post_rating: Sequelize.literal("post_rating + 1") },
      { where: { id: id } }
    );

    res.json({ success: true });
  });

  app.get("/api/likes", async function(req, res) {
    // `ORDER BY rating_id desc`
    await db.text.findAll({order: Sequelize.literal("post_rating ASC")}).then(function(results) {
      // order: sequelize.literal('column_name order')
      // results are available to us inside the .then
      res.json(results);
    });
  });

  app.post("/api/new", function(req, res) {
    console.log("Text Data:");
    console.log(req.body);

    db.text
      .create({
        text: req.body.text,
        user_id: req.body.user_id,
        post_rating: req.body.post_rating
      })      
      .then(function(results) {
        // console.log('reults = ' + results)
        // `results` here would be the newly created post
        return res.end();
      });
  });
};
