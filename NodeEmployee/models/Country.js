var mongoose = require('mongoose');

var CountrySchema = new mongoose.Schema({
  name: String,
  port: String,
  telephone: String
 });


module.exports = mongoose.model('Country', CountrySchema,'countrys');
