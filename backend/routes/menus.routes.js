const express = require(`express`);

const router = express.Router();

const Menu = require(`../models/menu.model`);
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

router.get(`/menus`, async (req, res) => {
  try {
    const result = await Menu.find().sort({ order: 1 });
    if (!result) res.status(404).json({ menu: `Not found` });
    else res.json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post(`/menus`, checkJwt, async (req, res) => {
  console.log(`req body`, req.body);
  try {
    const newMenu = new Menu({
      name: req.body.description,
      shortName: req.body.shortName,
      component: req.body.component,
      order: req.body.order,
    });
    await newMenu.save();
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
