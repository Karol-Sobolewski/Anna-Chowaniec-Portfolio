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
  order: { type: Number },
  slider: { type: Boolean },
});

module.exports = mongoose.model(`Photo`, photoSchema);
