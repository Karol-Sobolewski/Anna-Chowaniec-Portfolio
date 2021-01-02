const express = require(`express`);

const router = express.Router();

const Category = require(`../models/categories.model`);

router.get(`/categories`, async (req, res) => {
  try {
    const result = await Category.find();
    // console.log(result);

    if (!result) res.status(404).json({ category: `Not found` });
    else res.json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
