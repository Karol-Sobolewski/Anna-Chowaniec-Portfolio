const express = require(`express`);
const router = express.Router();
const Photo = require(`../models/photos.model`);
const uniqid = require(`uniqid`);

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

router.post(`/photos`, async (req, res) => {
  res.send(req.oidc.isAuthenticated());
  console.log(`re2`, req.oidc);
  if (req.body.login) {
    if (!req.files) {
      return res.status(400).json({ message: `no files uploaded` });
    }
    const { file } = req.files;
    const fileExtension = file.name.split(`.`).pop();

    let category = ``;
    // console.log(`user post`, user);

    // TODO Add category ID from DB

    if (req.body.category === `wedding`) {
      category = `5fedfefa3633d477d4f73a6c`;
    } else if (req.body.category === `children`) {
      category = `5fedff183633d477d4f73a6d`;
    }

    const filePath = `images/photos/${req.body.category}/${
      req.body.title
    }_${uniqid()}.${fileExtension}`;

    // file.mv(`./public/${filePath}`, (err) => {
    //   if (err) {
    //     console.err(err);
    //     return res.status(500).send(err);
    //   }
    //   res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
    // });

    const newPhoto = new Photo({
      title: req.body.title,
      category,
      src: filePath,
      width: 1,
      height: 1,
    });
    // await newPhoto.save();
    // res.json(newPhoto);
  }
});

module.exports = router;
