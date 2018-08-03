const docdb = require('documentdb');

const isProduction = process.env.NODE_ENV === 'production';
let configuration = {};

if(!isProduction) {
    configuration = require('../../../config');
}

const config = {
    host: process.env.COSMOS_HOST || configuration.COSMOS_HOST,
    auth: {
        masterKey: process.env.COSMOS_MASTERKEY || configuration.COSMOS_MASTERKEY
    }
};

var client = new docdb.DocumentClient(config.host, config.auth);
var itemsLink = docdb.UriFactory.createDocumentCollectionUri('ToDoList', 'Items');
// itemsLink = 'dbs/ToDoList/colls/Items'

// var createCourses = function(callback) {    
//     var documents = [];
//     async.forEachOf(sampleData, (course, key, next) => {
//         client.createDocument(coursesLink, course, (err, document) => {
//             if(err) return next(err);
//             documents.push(document);
//             next();
//         });
//     }, err => callback(err, documents));
// };

var queryItems = function(callback) {
    
    var querySpec = {
        query: "SELECT c.name, c.category, c.date, c.completed FROM c order by c.date",
        parameters: []
    };

    client.queryDocuments(itemsLink, querySpec).toArray((err, results) => {
        callback(err, results);
    });
};

module.exports = {
    // createCourses: createCourses,
    queryItems: queryItems
};

