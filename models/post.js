const mongoose = require("mongoose");
const { Schema } = mongoose;

const postSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default:
      "https://miro.medium.com/v2/resize:fit:512/1*6nLgVjORTZKjAq-vAV7Tig.jpeg",
  },
  content: String,
});

module.exports = mongoose.model("Post", postSchema);
