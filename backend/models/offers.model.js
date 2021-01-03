const mongoose = require(`mongoose`);

const offerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: {
    type: String,
    required: true,
    ref: `Category`,
  },
  descriptions: { type: Array },
  price: { type: Number },
});

module.exports = mongoose.model(`Offer`, offerSchema);
