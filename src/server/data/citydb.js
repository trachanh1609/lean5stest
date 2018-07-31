var tedious = require('tedious');

var Connection = tedious.Connection;
var Request = tedious.Request;

var config = {
    userName: process.env.DB_USERNAME || 'no_username',
    password: process.env.DB_PASSWORD || 'no_password',
    server: process.env.DB_SERVER || 'no_server',
    options: {
        database: process.env.DB_NAME || 'no_dbname',
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
