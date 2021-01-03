const express = require(`express`);
const cors = require(`cors`);
const path = require(`path`);
const mongoose = require(`mongoose`);

const menusRoutes = require(`./routes/menus.routes`);
const photosRoutes = require(`./routes/photos.routes`);
const categoriesRoutes = require(`./routes/categories.routes`);
const offersRoutes = require(`./routes/offers.routes`);

const app = express();

/* MIDDLEWARE */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// app.use(
//   `../build`,
//   expressStaticGzip(`../build`, {
//     enableBrotli: true,
//     orderPreference: [`br`, `gz`],
//     setHeaders(res, paths) {
//       res.setHeader(`Cache-Control`, `public, max-age=31536000`);
//     },
//   })
// );

app.use(express.static(path.join(__dirname, `../build`)));
/* API ENDPOINTS */
app.use(`/api`, menusRoutes);
app.use(`/api`, photosRoutes);
app.use(`/api`, categoriesRoutes);
app.use(`/api`, offersRoutes);

/* REACT WEBSITE */
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
    ? `mongodb+srv://${process.env.DB_LOGIN}:${process.env.DB_PASS}@cluster0.q4foz.mongodb.net/cookieGoDB?retryWrites=true&w=majority`
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
