/**
 * Server starting point.
 **/

//Requires
let express = require('express');
let bodyParser = require('body-parser');
let path = require('path');
let http = require('http');
let helmet = require('helmet');
let csp = require('helmet-csp');
let passport = require('passport');
let facebookauth = require('./lib/facebookauthresource');
let localauth = require('./lib/localauthresource');
let db = require('./lib/dbresource');
let login = require('./routes/login');
let api = require('./routes/api');


let app = express();
let server = http.createServer(app);

let port = process.env.PORT || 8000;
let cwd = __dirname ? __dirname : process.cwd();

//Configurations----------------------------------------------------------------------------------------------------

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
let staticPath = path.join(cwd, (process.env.NODE_ENV === 'production' ? '/../client/dist' : '/../client/debug'));
app.set('port', port);

db.connect();
facebookauth.connect();
localauth.connect();

//Middlewares-------------------------------------------------------------------------------------------------------

//Find static resources.
app.use(express.static(staticPath));

//JSON support
app.use(bodyParser.json());

//HTML form data support
app.use(bodyParser.urlencoded({extended: true}));

//Security
app.use(helmet());

//Security-CSP
app.use(csp({
    directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'"],
        objectSrc: ["'none'"],
    },
    loose: false,
    reportOnly: false,
    setAllHeaders: true,
    browserSniff: false
}));

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());

//Routes------------------------------------------------------------------------------------------------------------

app.use('/login', login);
app.use('/api', api);

//Custom Error Pages-------------------------------------------------------------------------------------------------

//404
app.use((req, res) => {
    res.status(404).send({message: 'really couldn\'t find this page!'});
});

//500
app.use((err, req, res, next) => {
    console.log('down in 500');
    console.log(err);
    res.send({message: 'my fault. sorry. maybe try again later?'});
});

//Start the server----------------------------------------------------------------------------------------------------
server.listen(port, () => {
    console.log('server up, I hope');
});
