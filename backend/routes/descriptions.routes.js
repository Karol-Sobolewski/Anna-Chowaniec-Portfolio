const express = require(`express`);
const router = express.Router();
const { auth, requiresAuth } = require(`express-openid-connect`);

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

router.put(`/descriptions/:id`, async (req, res) => {
  try {
    const result = await Description.findById(req.body._id);
    if (result) {
      /* eslint-disable */
      for (const prop in req.body) {
        result[prop] = req.body[prop];
      }
      await result.save();
      res.json(result);
    }
    else res.status(404).json({ message: `Not found...` });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
