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


let app = express();
let server = http.createServer(app);
let port = process.env.PORT || 8000;

//Configurations----------------------------------------------------------------------------------------------------

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
app.set('port', port);

//Middlewares-------------------------------------------------------------------------------------------------------

//Find static resources.
app.use(express.static(path.join(__dirname, '../client/dist')));

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
    disableAndroid: true,
    browserSniff: false
}));

//Routes------------------------------------------------------------------------------------------------------------
app.use('/', (req, res, next) => {
    res.send({message: 'made it'});
});

//Custom Error Pages-------------------------------------------------------------------------------------------------

//404
app.use((req, res) => {
    res.status(404).send({message: 'really couldn\'t find this page!'});
});

//500
app.use((err, req, res, next) => {
res.status(500).send({message: 'my fault. sorry. maybe try again later?'});
});

//Start the server----------------------------------------------------------------------------------------------------
server.listen(port, () => {
    console.log('server up');
});
