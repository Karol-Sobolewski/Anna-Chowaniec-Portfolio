const express = require(`express`);

const router = express.Router();

const Description = require(`../models/descriptions.model`);

router.get(`/descriptions`, async (req, res) => {
  try {
    const result = await Description.find();
    // console.log(result);

    if (!result) res.status(404).json({ description: `Not found` });
    else res.json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
