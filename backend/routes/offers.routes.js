const express = require(`express`);

const router = express.Router();

const Offer = require(`../models/offers.model`);
const uniqid = require(`uniqid`);
require("dotenv").config(); //eslint-disable-line
const jwt = require(`express-jwt`);
const jwksRsa = require(`jwks-rsa`);

const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${process.env.REACT_APP_AUTH0_DOMAIN}/.well-known/jwks.json`,
  }),

  audience: process.env.REACT_APP_AUTH0_AUDIENCE,
  issuer: `https://${process.env.REACT_APP_AUTH0_DOMAIN}/`,
  algorithms: [`RS256`],
});

router.get(`/offers`, async (req, res) => {
  try {
    const result = await Offer.find().populate(`category`);
    if (!result) res.status(404).json({ offer: `Not found` });
    else res.json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post(`/offers`, checkJwt, async (req, res) => {
  const newCategory = new Offer({
    name: req.body.name,
    descriptions: req.body.description,
    category: req.body.category,
    price: req.body.price,
  });
  /* eslint-enable */

  await newCategory.save();
});

router.put(`/offers/:id`, checkJwt, async (req, res) => {
  try {
    const result = await Offer.findById(req.body._id);
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

router.delete(`/offers/:id`, checkJwt, async (req, res) => {
  try {
    const result = await Offer.findById(req.params.id);
    if (result) {
      await result.deleteOne();
      res.json(result);
    } else res.status(404).json({ message: `Not found...` });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete(`/offers/categories/:id`, checkJwt, async (req, res) => {
  try {
    const result = await Offer.findOne({ category: req.params.id });

    if (result) {
      await Offer.deleteMany({ category: req.params.id });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;


