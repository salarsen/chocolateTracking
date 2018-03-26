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

// app.all('*', function (req, res, next) {
//     console.log('test')
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//     res.header('Access-Control-Allow-Headers', 'Content-Type');
//     if ('OPTIONS' == req.method) {
//         res.sendStatus(200);
//     } else {
//         next();
//     }
// });

app.use(parser.json());
app.use(parser.urlencoded({ extended : true }));
app.use(cookieParser('testing'));
app.use(session(sessionConfig));
app.use(express.static(path.resolve(__dirname, 'dist')));

// app.use(function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content - Type, Accept");
//     next();
// });
require('./server/config/database');

app.use('/api', require('./server/config/routes'));
app.use(require('./server/config/routes/catchall-routes'));

app.listen(port, () => console.log(`Listening on port ${port}`));
