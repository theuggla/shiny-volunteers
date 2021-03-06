/**
 * Server starting point.
 **/

// Requires
let express = require('express');
let bodyParser = require('body-parser');
let path = require('path');
let http = require('http');
let sslRedirect = require('heroku-ssl-redirect');
let helmet = require('helmet');
let passport = require('passport');
let favicon = require('serve-favicon');
let db = require('./lib/dbresource');
let auth = require('./lib/authresource');
let verify = require('./lib/verificationresource');
let login = require('./routes/login');
let volunteer = require('./routes/volunteer');
let organization = require('./routes/organization');

let app = express();
let server = http.createServer(app);

let port = process.env.PORT || 8000;
let cwd = __dirname ? __dirname : process.cwd();

// Configurations----------------------------------------------------------------------------------------------------

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
let staticPath = path.join(cwd, (process.env.NODE_ENV === 'production' ? '/../client/dist' : '/../client/debug'));
require('dotenv').config({silent: process.env.NODE_ENV === 'production'});

app.set('port', port);
db.connect();
verify.connect();

// Middlewares-------------------------------------------------------------------------------------------------------

// Serve favicon.
app.use(favicon(path.join(staticPath, '/assets/', 'favicon.ico')));

// Enable ssl redirect.
app.use(sslRedirect());

// Find static resources.
app.use(express.static(staticPath));

// JSON support
app.use(bodyParser.json());

// HTML form data support
app.use(bodyParser.urlencoded({extended: true}));

// Security
app.use(helmet());

// Initialize Passport
app.use(passport.initialize());

// Routes------------------------------------------------------------------------------------------------------------

app.use('/login', login);
app.use('/volunteer', volunteer);
app.use('/organization', organization);

// Custom Error Responses-------------------------------------------------------------------------------------------------

// 400 >
app.use((req, res) => {
    res.status(302).redirect('/');
});

// 500
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({message: err.message});
});

// Start the server----------------------------------------------------------------------------------------------------
server.listen(port, () => {
    console.log('server up on port ' + port);
});
