const mongoose = require(`mongoose`);

const offerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: {
    type: String,
    required: true,
    ref: `Category`,
  },
  descriptions: [
    {
      _id: String,
      text: String,
    },
  ],
  price: { type: Number },
});

module.exports = mongoose.model(`Offer`, offerSchema);
