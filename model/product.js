const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const prodSchema = new Schema({
  title: {
    type: String,
    required: "Please enter Title",
    trim: true,
  },

  categories: [
    {
      type: Schema.Types.ObjectId,
      ref: "Cate",
    },
  ],
});

module.exports = mongoose.model("Prod", prodSchema);
