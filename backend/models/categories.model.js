const mongoose = require(`mongoose`);

const categorySchema = new mongoose.Schema({
  _id: { type: mongoose.Types.ObjectId, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: Object },
});

module.exports = mongoose.model(`Category`, categorySchema);
