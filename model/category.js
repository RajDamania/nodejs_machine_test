const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const cateSchema = new Schema({
  category: {
    type: String,
    required: "Please enter Title",
    trim: true,
  },

  products: [
    {
      type: Schema.Types.ObjectId,
      ref: "Prod",
    },
  ],
});

module.exports = mongoose.model("Cate", cateSchema);
