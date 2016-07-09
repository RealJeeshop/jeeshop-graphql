'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.GraphQLRoot = exports.ViewerType = exports.UserEdge = exports.UserConnection = exports.UserType = exports.ShopType = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _graphql = require('graphql');

var _graphqlRelay = require('graphql-relay');

var _UserStore = require('./stores/UserStore');

var _jsBase = require('js-base64');

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * The first argument defines the way to resolve an ID to its object.
 * The second argument defines the way to resolve a node object to its GraphQL type.
 */

var _nodeDefinitions = (0, _graphqlRelay.nodeDefinitions)(function (globalId) {
    var _fromGlobalId = (0, _graphqlRelay.fromGlobalId)(globalId);

    var id = _fromGlobalId.id;
    var type = _fromGlobalId.type;


    if (type === 'ShopType') {
        return Database.models.shop.findOne({ where: { id: id } });
    } else if (type === 'UserType') {
        return Database.models.user.findOne({ where: { id: id } });
    } else if (type === 'ViewerType') {
        return (0, _UserStore.getViewer)(id);
    }
    return null;
}, function (obj) {

    if (obj.password != undefined) {
        return ViewerType;
    } else if (obj.name != undefined) {
        return ShopType;
    } else if (obj.email) {
        return UserType;
    }
    return null;
});

var nodeInterface = _nodeDefinitions.nodeInterface;
var nodeField = _nodeDefinitions.nodeField;
var ShopType = exports.ShopType = new _graphql.GraphQLObjectType({

    name: 'ShopType',
    description: 'It represents a shop',
    fields: {
        id: (0, _graphqlRelay.globalIdField)('ShopType'),
        name: { type: _graphql.GraphQLString, resolve: function resolve(obj) {
                return obj.name;
            } },
        description: { type: _graphql.GraphQLString, resolve: function resolve(obj) {
                return obj.description;
            } }
    },
    interfaces: [nodeInterface]
});

var UserType = exports.UserType = new _graphql.GraphQLObjectType({
    name: 'UserType',
    description: 'It display the information related to an user',
    fields: {
        id: (0, _graphqlRelay.globalIdField)('UserType'),
        login: {
            type: _graphql.GraphQLString,
            resolve: function resolve(obj) {
                return obj.login;
            }
        },
        password: {
            type: _graphql.GraphQLString,
            resolve: function resolve(obj) {
                return obj.password;
            }
        },
        email: {
            type: _graphql.GraphQLString,
            resolve: function resolve(obj) {
                return obj.email;
            }
        }
    },
    interfaces: [nodeInterface]
});

var _connectionDefinition = (0, _graphqlRelay.connectionDefinitions)({
    name: 'UserType',
    nodeType: UserType
});

var UserConnection = _connectionDefinition.connectionType;
var UserEdge = _connectionDefinition.edgeType;
exports.UserConnection = UserConnection;
exports.UserEdge = UserEdge;
var ViewerType = exports.ViewerType = new _graphql.GraphQLObjectType({
    name: 'Viewer',
    fields: function fields() {
        return {
            id: (0, _graphqlRelay.globalIdField)('Viewer'),
            user: {
                type: UserType,
                resolve: function resolve(obj) {
                    return obj;
                }
            },
            users: {
                type: UserConnection,
                args: _extends({}, _graphqlRelay.connectionArgs),
                resolve: function resolve(obj, args) {

                    console.log("what the fuck 2");

                    var config = { 'Authorization': "Basic YWRtaW5AamVlc2hvcC5vcmc6amVlc2hvcA==" };

                    return (0, _graphqlRelay.connectionFromPromisedArray)(_axios2.default.get('https://apps-jeeshop.rhcloud.com/jeeshop-admin/rs/users', { headers: config }).then(function (response) {
                        console.log("response : " + JSON.stringify(response));
                        return response.data;
                    }), args);
                }
            }
        };
    },
    interfaces: [nodeInterface]
});

var GraphQLRoot = exports.GraphQLRoot = new _graphql.GraphQLObjectType({
    name: 'Root',
    fields: {
        viewer: {
            type: ViewerType,
            args: {
                viewerId: {
                    name: 'viewerId',
                    type: _graphql.GraphQLInt
                }
            },
            resolve: function resolve(root, _ref) {
                var viewerId = _ref.viewerId;


                console.log("what the fuck : " + (0, _UserStore.getViewer)("me"));
                return (0, _UserStore.getViewer)("me");
            }
        },
        node: nodeField
    }
});