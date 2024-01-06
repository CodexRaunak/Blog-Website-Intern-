const samplePosts = require("./data.js");
const mongoose = require("mongoose");
const MONGO_URL = "mongodb://127.0.0.1:27017/blog";
const Post = require("../models/post.js");

main()
  .then(() => console.log("connected to DB"))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(MONGO_URL);
}

const init = async function () {
  await Post.insertMany(samplePosts);
  console.log("Database initialized");
};

init();
