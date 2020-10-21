//* Import Statements *//
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const api = require("./routes/api");
const bodyParser = require("body-parser");
const colors = require("colors");
const configs = require("./configs");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const User = require("./models/User");
const csrf = require('csurf');

dotenv.config();

//* Session And Stuffs *//
const store = MongoDBStore({
  uri: process.env.DBURI,
  collection: "session",
});

const csrfProtection = csrf()

//* Initializing The App Variable *//
const app = express();
app.use(express.static(__dirname + '/public'))
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs')

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);
app.use(csrfProtection)
app.use((req, res, next) => {
  if (req.session.isLoggedin) {
    User.userModel
      .findById(req.session.user._id)
      .then((user) => {
        req.session.user = user;
      })
      .catch((err) => {
        console.log(err);
      });
    next();
  } else {
    req.session.user = null;
    next();
  }
});

app.use((req, res, next) => {
  app.locals.user = req.session.user
  app.locals.isLoggedin = req.session.isLoggedin
  app.locals.csrfToken = req.csrfToken()
  next()
})

//* The Api Middleware *//
app.use("/api/v1", api);

//* 404: MiddleWare *//
app.use((req, res, next) => {
  res.status(404);
  res.json({
    error: [404, "Page Not Found."],
  });
});

//* Listening To Correct Port
//* Database Connectivity *//
mongoose
  .connect(process.env.DBURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    let port = process.env.PORT || 3000;
    console.log(`[DATABASE] Connection Established`.blue.underline.bold);
    app.listen(port, () => {
      console.log(`[SERVER] Up And Running`.green.bold);
    });
  })
  .catch((err) => {
    console.log(`[DATABASE] Connectivtity Failed`.red.bold);
  });
