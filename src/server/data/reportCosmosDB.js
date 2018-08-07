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
    },
    dbID : 'ToDoList',
    collectionID: 'Items'
};

const client = new docdb.DocumentClient(config.host, config.auth);
var itemsLink = docdb.UriFactory.createDocumentCollectionUri(config.dbID, config.collectionID);
// this is equivalent to :
// var itemsLink = 'dbs/ToDoList/colls/Items'

var queryItems = function(callback) {
    
    var querySpec = {
        query: "SELECT c.id, c.name, c.category, c.date, c.completed FROM c order by c.date",
        parameters: []
    };

    client.queryDocuments(itemsLink, querySpec).toArray((err, results) => {
        callback(err, results);
    });
};

var queryItem = function(reportID, callback) {
    
    var querySpec = {
        query: "SELECT c.id, c.name, c.category, c.date, c.completed FROM c WHERE c.id = @ID",
        parameters: [{
            name: '@ID',
            value: reportID
        }]
    };

    client.queryDocuments(itemsLink, querySpec).toArray((err, results) => {
        callback(err, results);
    });
};

var createItem = function (item, callback) {

    client.createDocument(itemsLink, item, function (err, doc) {
        if (err) {
            callback(err);

        } else {
            callback(null, doc);
        }
    });
}

var updateItem = function (item, callback) {

    let itemLink = 'dbs/' + config.dbID + '/colls/' + config.collectionID + '/docs/' + item.id;
    client.replaceDocument(itemLink, item, function (err, doc) {
        if (err) {
            callback(err);

        } else {
            callback(null, doc);
        }
    });
}

var deleteItem = function (reportID, callback) {

    let itemLink = 'dbs/' + config.dbID + '/colls/' + config.collectionID + '/docs/' + reportID;
    
    client.deleteDocument(itemLink, function (err) {
        if (err) {
            callback(err);

        } else {
            let response = {'Message': 'Item is deleted'}
            callback(err, response);
        }
    });
}

module.exports = {
    queryItems: queryItems,
    queryItem: queryItem,
    createItem: createItem,
    updateItem: updateItem,
    deleteItem: deleteItem,
};

