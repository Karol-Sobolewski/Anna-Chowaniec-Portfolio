const mongoose = require(`mongoose`);

const menuSchema = new mongoose.Schema({
  name: { type: String, required: true },
  shortName: { type: String, required: true },
  component: { type: String, required: true },
  order: { type: Number },
});

module.exports = mongoose.model(`Menu`, menuSchema);
