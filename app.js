var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;

passport.use(
  new LocalStrategy(function (username, password, done) {
    Account.findOne({ username: username })
      .then(function (user) {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false, { message: "Incorrect username." });
        }
        if (!user.validPassword(password)) {
          return done(null, false, { message: "Incorrect password." });
        }
        return done(null, user);
      })
      .catch(function (err) {
        return done(err);
      });
  })
);

//Database set
require("dotenv").config();
const connectionString = process.env.MONGO_CON;
mongoose = require("mongoose");
mongoose.connect(connectionString);

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", function () {
  console.log("Connection to DB succeeded");
});

// create globals
var Pigeon = require("./models/pigeon");

//seed database
async function recreateDB() {
  // Delete everything
  await Pigeon.deleteMany();

  let pigeon1 = new Pigeon({
    price: 1499,
    breed: "Barb pigeon",
    gender: "male",
  });
  pigeon1
    .save()
    .then((doc) => {
      console.log("First pigeon saved");
    })
    .catch((err) => {
      console.error(err);
    });

  let pigeon2 = new Pigeon({
    price: 999,
    breed: "Fantail pigeon",
    gender: "male",
  });
  pigeon2
    .save()
    .then((doc) => {
      console.log("Second pigeon saved");
    })
    .catch((err) => {
      console.error(err);
    });

  let pigeon3 = new Pigeon({
    price: 299,
    breed: "Ice pigeon",
    gender: "female",
  });
  pigeon3
    .save()
    .then((doc) => {
      console.log("Third pigeon saved");
    })
    .catch((err) => {
      console.error(err);
    });
}
// set the false to stop reseeding on restart
let reseed = false;
if (reseed) {
  recreateDB();
}

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var resourceRouter = require("./routes/resource");
var pigeonsRouter = require("./routes/pigeons");
var gridRouter = require("./routes/grid");
var pickRouter = require("./routes/pick");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  require("express-session")({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/resource", resourceRouter);
app.use("/pigeons", pigeonsRouter);
app.use("/grid", gridRouter);
app.use("/pick", pickRouter);

// passport config
// Use the existing connection
// The Account model
var Account = require("./models/account");
passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
