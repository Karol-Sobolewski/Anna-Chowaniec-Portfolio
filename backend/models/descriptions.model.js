const mongoose = require(`mongoose`);

const descriptionSchema = new mongoose.Schema({
  page: { type: String, required: true },
  heading: { type: String },
  description: { type: Array },
  images: { type: Array },
});

module.exports = mongoose.model(`Description`, descriptionSchema);
