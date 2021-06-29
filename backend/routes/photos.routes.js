const express = require(`express`);
const router = express.Router();
const Photo = require(`../models/photos.model`);
const Category = require(`../models/categories.model`);
require("dotenv").config(); //eslint-disable-line
const fs = require(`fs`);
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

router.get(`/photos`, async (req, res) => {
  try {
    const result = await Photo.find().populate(`category`).sort({ order: 1 });
    if (!result) res.status(404).json({ photo: `Not found` });
    else res.json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get(`/photos/:id`, async (req, res) => {
  try {
    const result = await Photo.findById(req.params.id).populate(`category`);
    if (!result) res.status(404).json({ photo: `Not found` });
    else res.json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post(`/photos`, checkJwt, async (req, res) => {
  const { file } = req.files;
  if (!file) {
    return res.status(400).json({ message: `no files uploaded` });
  }

  file.mv(`./public/${req.body.src}`, (err) => {
    if (err) {
      console.err(err);
      return res.status(500).send(err);
    }
  });
  const newPhoto = new Photo({
    title: req.body.title,
    category: req.body.category,
    src: req.body.src,
    order: req.body.order,
    width:
    /* eslint-disable */
      req.body.format === `horizontal`
        ? 4
        : req.body.format === `vertical`
        ? 3
        : 1,
    height: req.body.format === `horizontal`
    ? 3
    : req.body.format === `vertical`
    ? 4
    : 1,
  });
  /* eslint-enable */
  await newPhoto.save();
  res.json(newPhoto);
});

router.put(`/photos/:id`, checkJwt, async (req, res) => {
  try {
    const result = await Photo.findById(req.body._id);
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

router.delete(`/photos/:id`, checkJwt, async (req, res) => {
  try {
    const result = await Photo.findById(req.params.id);

    if (result) {
      await result.deleteOne();
      fs.unlink(`./public/${result.src}`, (err) => {
        if (err) throw err;
      });
      res.json(result);
    } else res.status(404).json({ message: `Not found...` });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete(`/photos/categories/:id`, checkJwt, async (req, res) => {
  try {
    const result = await Photo.findOne({ category: req.params.id });
    const categoryName = await Category.findOne({ _id: result.category });
    if (result) {
      await Photo.deleteMany({ category: req.params.id });
      fs.rmdirSync(
        `./public/images/photos/${categoryName.name}`,
        { recursive: true },
        (err) => {
          if (err) throw err;
        }
      );
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
