const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const mongoose = require('mongoose');
const morgan = require('morgan');
const flash = require('connect-flash');
const passport = require('./passport.js');
const routes = require('./routes/index.js');
const port = process.env.PORT || 5000;

const MongoStore = require('connect-mongo')(session);
mongoose.connect('mongodb://localhost/blog');
let db = mongoose.connection;

let app = express();
app.use(flash());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(session({
  secret: 'keyboard king',
  resave: true,
  saveUninitialized: false,
  store: new MongoStore({ mongooseConnection: db }),
}));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated();
  next();
});
app.use(express.static(__dirname + '/../public'));
app.use(routes);

app.listen(port,() => console.log('Server on:', port));
