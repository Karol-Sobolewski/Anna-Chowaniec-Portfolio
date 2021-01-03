const express = require(`express`);

const router = express.Router();

const Offer = require(`../models/offers.model`);

router.get(`/offers`, async (req, res) => {
  try {
    const result = await Offer.find().populate(`category`);
    // console.log(result);
    if (!result) res.status(404).json({ offer: `Not found` });
    else res.json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
