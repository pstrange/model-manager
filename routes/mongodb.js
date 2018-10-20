var mongoose = require('mongoose');
var configs = require('./configs');
var assetModel = require('./assetModel');

mongoose.Promise = global.Promise;
mongoose.connect(`${configs.db.url}:${configs.db.port}/${configs.db.name}`,
    { useNewUrlParser: true });

console.log(`connected to: ${configs.db.name}`);

//mongod --dbpath c:\workspace\mongodb_data\pawalert_data


var Asset = mongoose.model('assets', assetModel.getSchema(mongoose));

module.exports = {mongoose, Asset};