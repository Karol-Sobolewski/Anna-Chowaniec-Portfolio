const express = require(`express`);
const cors = require(`cors`);
const path = require(`path`);
const mongoose = require(`mongoose`);
const fileUpload = require(`express-fileupload`);
const morgan = require(`morgan`);
const helmet = require(`helmet`);
require(`dotenv`).config();
const enforce = require(`express-sslify`);

const bodyParser = require(`body-parser`);

const menusRoutes = require(`./backend/routes/menus.routes`);
const photosRoutes = require(`./backend/routes/photos.routes`);
const categoriesRoutes = require(`./backend/routes/categories.routes`);
const offersRoutes = require(`./backend/routes/offers.routes`);
const descriptionsRoutes = require(`./backend/routes/descriptions.routes`);

const app = express();

app.use(bodyParser.json());

if (
  !process.env.REACT_APP_AUTH0_DOMAIN ||
  !process.env.REACT_APP_AUTH0_AUDIENCE
) {
  console.log(
    `Exiting: Please make sure that auth_config.json is in place and populated with valid domain and audience values`
  );

  process.exit();
}

const appPort = process.env.PORT || 3000;

const appOrigin = process.env.APP_ORIGIN || `http://localhost:${appPort}`;

/* MIDDLEWARE */
app.use(morgan(`dev`));
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);
app.use(cors({ origin: appOrigin }));
app.use(
  fileUpload({
    createParentPath: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(enforce.HTTPS());
app.use(express.static(path.join(__dirname, `../build`)));

/* API ENDPOINTS */
app.use(`/api`, menusRoutes);
app.use(`/api`, photosRoutes);
app.use(`/api`, categoriesRoutes);
app.use(`/api`, offersRoutes);
app.use(`/api`, descriptionsRoutes);

app.use(`*`, (req, res) => {
  res.sendFile(path.join(__dirname, `../build/index.html`));
});

/* API ERROR PAGES */
app.use(`/api`, (req, res) => {
  res.status(404).send({ data: `Not found...` });
});

/* MONGOOSE */

const dbURI =
  process.env.NODE_ENV === `production`
    ? `mongodb+srv://${process.env.DB_LOGIN}:${process.env.DB_PASS}@cluster0.59fuh.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
    : `mongodb://localhost:27017/ChowaniecDB`;

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
