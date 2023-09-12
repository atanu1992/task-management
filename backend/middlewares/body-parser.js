const bodyParser = require('body-parser');

/**
 * If you want json request then pass jsonParser as middleware to api
 * create application/json parser
 */
const jsonParser = bodyParser.json();

/**
 * If you want application/x-www-form-urlencoded  request then pass urlencodedParser as middleware to api
 * create application/x-www-form-urlencoded parser
 */
const urlencodedParser = bodyParser.urlencoded({ extended: false });

module.exports = { bodyParser, jsonParser, urlencodedParser };
