var express = require('express');
var Schema = require('./data/schema');
var graphQLHTTP = require('express-graphql');

const app = express();
app.use('/', graphQLHTTP({ schema: Schema, pretty: true, graphiql: true}));
var graphQLIP = process.env.OPENSHIFT_NODEJS_PORT || 8080
console.log("used ip: " + graphQLIP)
app.listen(graphQLIP, function(err) {
    if (err)
    return console.error(err);
console.log('GraphQL Server is now running on localhost:8080');
});
