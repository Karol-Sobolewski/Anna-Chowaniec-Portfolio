const express = require(`express`);

const router = express.Router();

const Category = require(`../models/categories.model`);
const uniqid = require(`uniqid`);
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

router.post(`/categories`, checkJwt, async (req, res) => {
  console.log(`req body`, req.body);
  // console.log(`req`, req);
  console.log(`req files`, req.files);

  const { file } = req.files;
  if (!file) {
    return res.status(400).json({ message: `no files uploaded` });
  }
  const fileExtension = file.name.split(`.`).pop();

  const filePath = `images/photos/work/${
    req.body.name
  }_${uniqid()}.${fileExtension}`;
  file.mv(`./public/${filePath}`, (err) => {
    if (err) {
      console.err(err);
      return res.status(500).send(err);
    }
    res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
  });

  const newCategory = new Category({
    name: req.body.name,
    description: req.body.description,
    image: {
      src: filePath,
      alt: req.body.description,
    },
  });
  /* eslint-enable */
  await newCategory.save();
  // res.json(newPhoto);
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
module.exports = router;
