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
        query: "SELECT c.corporation_name, c.id FROM c WHERE c.type = 'Corporation'",
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

var queryAllOffices = function(callback) {
    
    var querySpec = {
        query: "SELECT c.office_name, c.id, c.corporation_id FROM c WHERE c.type = 'Office'",
        parameters: []
    };

    client.queryDocuments(officeLink, querySpec).toArray((err, results) => {
        callback(err, results);
    });
};

var queryOffices = function(reportID, callback) {
    
    var querySpec = {
        query: "SELECT c.office_name, c.id, c.corporation_id FROM c WHERE c.type = 'Office' AND c.corporation_id = @ID",
        parameters: [{
            name: '@ID',
            value: reportID
        }]
    };

    client.queryDocuments(officeLink, querySpec).toArray((err, results) => {
        callback(err, results);
    });
};

var queryTargets = function(reportID, callback) {
    
    var querySpec = {
        query: "SELECT c.target_name, c.id, c.office_id FROM c WHERE c.type = 'Target' AND c.office_id = @ID",
        parameters: [{
            name: '@ID',
            value: reportID
        }]
    };

    client.queryDocuments(officeLink, querySpec).toArray((err, results) => {
        callback(err, results);
    });
};

var queryQuestions = function(reportID, callback) {
    
    var querySpec = {
        query: "SELECT c.question_id FROM c WHERE c.type = 'Question-Target-Link' AND c.target_id = @ID",
        parameters: [{
            name: '@ID',
            value: reportID
        }]
    };

    client.queryDocuments(officeLink, querySpec).toArray((err, results) => {
        callback(err, results);
    });
};

var queryQuestionText = function(reportID, callback) {
    
    var querySpec = {
        query: "SELECT c.question_text FROM c WHERE c.id = @ID",
        parameters: [{
            name: '@ID',
            value: reportID
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

var createItem = function (item, callback) {

    client.createDocument(officeLink, item, function (err, doc) {
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
    queryCorporations: queryCorporations,
    queryAll: queryAll,
    queryOffices: queryOffices,
    queryAllOffices: queryAllOffices,
    queryTargets: queryTargets,
    queryQuestions: queryQuestions,
    queryQuestionText:queryQuestionText,
    createAudit: createAudit,
    createItem: createItem,
    updateItem: updateItem,
    deleteItem:deleteItem
};

