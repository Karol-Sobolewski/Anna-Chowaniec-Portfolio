const express = require(`express`);

const router = express.Router();

const Category = require(`../models/categories.model`);
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

router.get(`/categories`, async (req, res) => {
  try {
    const result = await Category.find();
    if (!result) res.status(404).json({ category: `Not found` });
    else res.json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post(`/categories`, checkJwt, async (req, res) => {
  const image = JSON.parse(req.body.image);
  const newCategory = new Category({
    _id: req.body._id,
    name: req.body.name,
    description: req.body.description,
    image: {
      src: image.src,
      alt: image.alt,
    },
  });
  /* eslint-enable */
  await newCategory.save();
});

router.put(`/categories/:id`, checkJwt, async (req, res) => {
  try {
    const result = await Category.findById(req.body._id);
    /* eslint-disable */
    if (result) {
      for (const prop in req.body) {
        result[prop] = req.body[prop];
      }
      await result.save();
      res.json(result);
    }
    /* eslint-enable */
    else res.status(404).json({ message: `Not found...` });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete(`/categories/:id`, checkJwt, async (req, res) => {
  try {
    const result = await Category.findById(req.params.id);
    if (result) {
      await result.deleteOne();
      res.json(result);
    } else res.status(404).json({ message: `Not found...` });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
