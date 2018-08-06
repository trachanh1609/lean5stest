var tedious = require('tedious');

var Connection = tedious.Connection;
var Request = tedious.Request;

var isProduction = process.env.NODE_ENV === 'production';
var configuration = {};

if(!isProduction) {
    configuration = require('../../../config');
}
var config = {
    userName: process.env.DB_USERNAME || configuration.userName || 'empty',
    password: process.env.DB_PASSWORD || configuration.password || 'empty',
    server: process.env.DB_SERVER || configuration.server || 'empty',
    options: {
        database: process.env.DB_NAME || configuration.name || 'empty',
        encrypt: true,
        rowCollectionOnRequestCompletion: true
    }
} 

var queryCorporations = function(callback) {
    var connection = new Connection(config);
    connection.on('connect', function(err) {
        if(err) {
            callback(err);
        } else {
            var request = new Request(
                "SELECT Corporation_name FROM Corporation",
                function(err, rowCount, rows) {
                    callback(err, rowCount, rows);
                }
            );
            connection.execSql(request);
        }
    });
};


module.exports = {
    queryCorporations: queryCorporations
};
