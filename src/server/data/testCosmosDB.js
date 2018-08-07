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
    collectionID: 'Office'
};

const client = new docdb.DocumentClient(config.host, config.auth);
var officeLink = docdb.UriFactory.createDocumentCollectionUri(config.dbID, config.collectionID);
// this is equivalent to :
// var officeLink = 'dbs/ToDoList/colls/Office'

var queryCorporations = function(callback) {
    
    var querySpec = {
        query: "SELECT corporations.corp_name FROM c JOIN corporations IN c.corporations WHERE c.id = 'Corporations'",
        parameters: []
    };

    client.queryDocuments(officeLink, querySpec).toArray((err, results) => {
        callback(err, results);
    });
};

var queryAll = function(callback) {
    
    var querySpec = {
        query: "SELECT * FROM c",
        parameters: []
    };

    client.queryDocuments(officeLink, querySpec).toArray((err, results) => {
        callback(err, results);
    });
};

var queryOffices = function(reportID, callback) {
    var id = parseInt(reportID);
    var querySpec = {
        query: "SELECT offices.office_name, offices.id, offices.corporation_id FROM c JOIN offices IN c.offices WHERE c.id = 'Offices' AND offices.corporation_id = @ID",
        parameters: [{
            name: '@ID',
            value: id
        }]
    };

    client.queryDocuments(officeLink, querySpec).toArray((err, results) => {
        callback(err, results);
    });
};

var createAudit = function (item, callback) {

    client.createDocument(officeLink, item, function (err, doc) {
        if (err) {
            callback(err);

        } else {
            callback(null, doc);
        }
    });
}
/*
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
*/
module.exports = {
    queryCorporations: queryCorporations,
    queryAll: queryAll,
    queryOffices: queryOffices,
    createAudit: createAudit
};

