var tedious = require('tedious');
var config = require('../../../config');

var Connection = tedious.Connection;
var Request = tedious.Request;

var config = {
    userName: process.env.DB_USERNAME || config.userName,
    password: process.env.DB_PASSWORD || config.password,
    server: process.env.DB_SERVER || config.server,
    options: {
        database: process.env.DB_NAME || config.name,
        encrypt: true,
        rowCollectionOnRequestCompletion: true
    }
}

// var createUsers = function(callback) {
//    var connection = new Connection(config);
//    connection.on('connect', function(err) {
//         if(err) {
//             callback(err);
//         }
//         else {
//             var request = new Request(
//                 `
//                 INSERT INTO users (name, email) VALUES ('Scott', 'scott@odetocode.com') 
//                 INSERT INTO users (name, email) VALUES ('Allen', 'allen@odetocode.com')
//                 `,
//                 function(err, rowCount) {
//                     callback(err, rowCount);
//                 }
//             );
//             connection.execSql(request);
//         }
//    });

// };

var queryCities = function(callback) {
    var connection = new Connection(config);
    connection.on('connect', function(err) {
        if(err) {
            callback(err);
        } else {
            var request = new Request(
                "SELECT City_name FROM Office WHERE Corporation_ID = 3",
                function(err, rowCount, rows) {
                    callback(err, rowCount, rows);
                }
            );
            connection.execSql(request);
        }
    });
};

module.exports = {
    // createCities: createCities,
    queryCities: queryCities
};
