const express = require('express');
const parser = require('body-parser');
const path = require('path');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const port = process.env.PORT || 8000;

const app = express();

const sessionConfig = {
   saveUninitialized : true,
   secret : 'testing',
   resave : false,
   name : 'session',
   rolling : true,
   cookie : {
      secure : false,
      httpOnly : false,
      maxAge : 360000,
   },
};

app.use(parser.json());
app.use(parser.urlencoded({ extended : true }));
app.use(cookieParser('testing'));
app.use(session(sessionConfig));
app.use(express.static(path.resolve(__dirname, 'dist')));

require('./server/config/database');

app.use('/api', require('./server/config/routes'));
app.use(require('/server/config/routes/catchall-routes'));

app.listen(port, () => console.log(`Listening on port ${port}`));
