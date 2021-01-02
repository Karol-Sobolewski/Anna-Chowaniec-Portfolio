const mongoose = require(`mongoose`);

const menuSchema = new mongoose.Schema({
  name: { type: String, required: true },
  src: { type: String, required: true },
  component: { type: String, required: true },
});

module.exports = mongoose.model(`Menu`, menuSchema);
