'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Schema = undefined;

var _graphql = require('graphql');

var _Model = require('./Model');

var Schema = exports.Schema = new _graphql.GraphQLSchema({
    query: _Model.GraphQLRoot
});