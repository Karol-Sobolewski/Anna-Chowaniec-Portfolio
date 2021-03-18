const mongoose = require(`mongoose`);

const photoSchema = new mongoose.Schema({
  src: { type: String },
  title: { type: String, required: true },
  width: { type: Number },
  height: { type: Number },
  category: {
    type: String,
    required: true,
    ref: `Category`,
  },
  order: { type: Number, required: true },
  slider: { type: Boolean },
  // items: [
  //   {
  //     src: { type: String },
  //     title: { type: String },
  //     width: { type: Number },
  //     height: { type: Number },
  //   },
  // ],
});

module.exports = mongoose.model(`Photo`, photoSchema);
