const express = require("express");
const app = express();
const mongoose = require("mongoose");
const MONGO_URL = "mongodb://127.0.0.1:27017/blog";
const path = require("path");
const Post = require("./models/post.js");
const wrapAsync = require("./utils/wrapAsync.js");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");

app.set("view engine", "ejs");
app.set(path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);

main()
  .then(() => console.log("connected to DB"))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(MONGO_URL);
}
app.get("/", (req, res) => {
  res.send("root working");
});
//Index Route
app.get(
  "/posts",
  wrapAsync(async (req, res) => {
    let allPosts = await Post.find({});
    res.render("index.ejs", { allPosts });
  })
);
//New Route
app.get("/posts/new", (req, res) => {
  res.render("new.ejs");
});

//Show Route
app.get(
  "/posts/:id",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    let post = await Post.findById(id);
    res.render("show.ejs", { post });
  })
);

//Create Route
app.post(
  "/posts",
  wrapAsync(async (req, res) => {
    let { post } = req.body;
    let savePost = new Post(post);
    let result = await savePost.save();
    res.redirect("/posts");
  })
);

//Edit Route
app.get(
  "/posts/:id/edit",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    let post = await Post.findById(id);
    res.render("edit.ejs", { post });
  })
);
//Update Route
app.put(
  "/posts/:id",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    let { post } = req.body;
    let updatedPost = await Post.findByIdAndUpdate(id, post);
    res.redirect("/posts");
  })
);

//Destroy Route
app.delete(
  "/posts/:id",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    await Post.findByIdAndDelete(id);
    res.redirect("/posts");
  })
);

app.listen(8080, () => {
  console.log("listening to 8080");
});
