const express = require(`express`);
const cors = require(`cors`);
const path = require(`path`);
const mongoose = require(`mongoose`);
const fileUpload = require(`express-fileupload`);

const menusRoutes = require(`./routes/menus.routes`);
const photosRoutes = require(`./routes/photos.routes`);
const categoriesRoutes = require(`./routes/categories.routes`);
const offersRoutes = require(`./routes/offers.routes`);
const descriptionsRoutes = require(`./routes/descriptions.routes`);
require("dotenv").config(); //eslint-disable-line
const { auth } = require(`express-openid-connect`);

const app = express();

app.use(
  auth({
    authRequired: false,
    auth0Logout: true,
    issuerBaseURL: process.env.ISSUER_BASE_URL,
    baseURL: process.env.BASE_URL,
    clientID: process.env.CLIENT_ID,
    secret: process.env.SECRET,
    idpLogout: true,
  })
);

/* MIDDLEWARE */
app.use(cors());
app.use(
  fileUpload({
    createParentPath: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, `../build`)));

/* API ENDPOINTS */
app.use(`/api`, menusRoutes);
app.use(`/api`, photosRoutes);
app.use(`/api`, categoriesRoutes);
app.use(`/api`, offersRoutes);
app.use(`/api`, descriptionsRoutes);

/* REACT WEBSITE */
app.use(`*`, (req, res) => {
  res.sendFile(path.join(__dirname, `../build/index.html`));
  // res.send(req.oidc.isAuthenticated());
  // console.log(`req.oidc`, req.oidc);
});

/* API ERROR PAGES */
app.use(`/api`, (req, res) => {
  res.status(404).send({ data: `Not found...` });
});

/* MONGOOSE */

const dbURI =
  process.env.NODE_ENV === `production`
    ? `mongodb+srv://${process.env.DB_LOGIN}:${process.env.DB_PASS}@cluster0.59fuh.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
    : `mongodb://localhost:27017/chowaniecDB`;

mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.once(`open`, () => {
  console.log(`Successfully connected to the database`);
});
db.on(`error`, (err) => console.log(`Error: ${err}`));

/* START SERVER */
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
