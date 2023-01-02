//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const app = express();

let posts = [];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


app.get("/", function(req, res) {
  res.render("home");
});

app.get("/writings", function (req, res) {
  res.render("writings", {posts: posts})
});

app.get("/contact", function (req, res) {
  res.render("contact")
});

app.get("/compose", function(req, res) {
  res.render("compose");
});

app.post("/compose", function(req, res) {

  const post = {
    title: req.body.titleInput,
    content: req.body.postInput
  };

  posts.push(post);
  res.redirect("/");
});

app.get("/post/:postId", function(req, res) {

  const requestedId = _.lowerCase(req.params.postId);

  posts.forEach(function(post){
    const storedId = _.lowerCase(post.title);

    if (storedId === requestedId) {

      res.render("post", {
        title: post.title,
        content: post.content
      });
    }
  });
});


app.listen(3000, function() {
  console.log("Server started on port 3000");
});
