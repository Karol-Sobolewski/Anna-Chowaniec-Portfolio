const mongoose = require(`mongoose`);

const photoSchema = new mongoose.Schema({
  src: { type: String, required: true },
  title: { type: String, required: true },
  width: { type: Number, required: true },
  height: { type: Number, required: true },
  category: {
    type: String,
    required: true,
    ref: `Category`,
  },
});

module.exports = mongoose.model(`Photo`, photoSchema);
