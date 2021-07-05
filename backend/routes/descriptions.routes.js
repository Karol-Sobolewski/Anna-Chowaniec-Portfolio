const express = require(`express`);
const router = express.Router();
const Description = require(`../models/descriptions.model`);
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

router.get(`/descriptions`, async (req, res) => {
  try {
    const result = await Description.find();
    if (!result) res.status(404).json({ description: `Not found` });
    else res.json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put(`/descriptions/:id`, checkJwt, async (req, res) => {
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

router.delete(`/descriptions/image/:id`, checkJwt, async (req, res) => {
  try {
    const result = await Description.findById(req.params.id)
    if(result && result.images.length > 0) {
      for(let image of result.images) {
        if(fs.existsSync(`./public/${image.src}`)) fs.unlink(`./public/${image.src}`, (err) => {
          if (err) throw err;
        });
      }
    } else res.status(404).json({ message: `Not found...` });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post(`/descriptions/image`, checkJwt, async (req, res) => {
  try {
    const { file } = req.files;
    if(!file) {
      return res.status(400).json({ message: `no files uploaded` });
    }

    const filePath = `images/photos/about/${file.name}`;
    file.mv(`./public/${filePath}`, (err) => {
      if (err) {
        console.err(err);
        return res.status(500).send(err);
      }
      res.json({ fileName: file.name, filePath: `/uploads/${file.name}` })
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
