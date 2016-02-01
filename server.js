//require("babel-polyfill"); // Use for openshift and Promise

var express = require('express');
var Schema = require('./data/schema');
var graphQLHTTP = require('express-graphql');

const app = express();
app.use('/graphql', graphQLHTTP({ schema: Schema, pretty: true, graphiql: true}));

var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'

console.log("used ip: " + server_ip_address)
console.log("used port: " + server_port)

app.listen(server_port, server_ip_address, function(err) {
    if (err)
    return console.error(err);
console.log('GraphQL Server is now running on ' + server_ip_address + ':' + server_port + '/graphql');
});
