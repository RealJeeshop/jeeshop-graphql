'use strict';

var express = require('express');

var _require = require('./data/Schema');

var Schema = _require.Schema;

var graphQLHTTP = require('express-graphql');

var app = express();
app.use('/', graphQLHTTP({ schema: Schema, pretty: true, graphiql: true }));

var server_port = process.env.PORT || 3000;

app.listen(server_port, function (err) {
    if (err) return console.error(err);
    console.log('GraphQL Server is now running on ' + server_port);
});