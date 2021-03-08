const mongoose = require(`mongoose`);

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  englishName: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: Object },
});

module.exports = mongoose.model(`Category`, categorySchema);
