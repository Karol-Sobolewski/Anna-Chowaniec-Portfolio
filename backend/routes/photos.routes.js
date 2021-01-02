const express = require(`express`);

const router = express.Router();

const Photo = require(`../models/photos.model`);

router.get(`/photos`, async (req, res) => {
  try {
    const result = await Photo.find().populate(`category`);
    // console.log(result);
    if (!result) res.status(404).json({ photo: `Not found` });
    else res.json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
