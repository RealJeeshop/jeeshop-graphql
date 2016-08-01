module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var express = __webpack_require__(1);

	var _require = __webpack_require__(2);

	var Schema = _require.Schema;

	var graphQLHTTP = __webpack_require__(9);

	var app = express();
	app.use('/', graphQLHTTP({ schema: Schema, pretty: true, graphiql: true }));

	var server_port = process.env.PORT || 3000;

	app.listen(server_port, function (err) {
	    if (err) return console.error(err);
	    console.log('GraphQL Server is now running on ' + server_port);
	});

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = require("express");

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Schema = undefined;

	var _graphql = __webpack_require__(3);

	var _Model = __webpack_require__(4);

	var Schema = exports.Schema = new _graphql.GraphQLSchema({
	    query: _Model.GraphQLRoot
	});

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = require("graphql");

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.GraphQLRoot = exports.ViewerType = exports.CatalogEdge = exports.CatalogConnection = exports.UserEdge = exports.UserConnection = exports.UserType = exports.CatalogType = undefined;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _graphql = __webpack_require__(3);

	var _graphqlRelay = __webpack_require__(5);

	var _UserStore = __webpack_require__(6);

	var _jsBase = __webpack_require__(7);

	var _axios = __webpack_require__(8);

	var _axios2 = _interopRequireDefault(_axios);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * The first argument defines the way to resolve an ID to its object.
	 * The second argument defines the way to resolve a node object to its GraphQL type.
	 */
	var _nodeDefinitions = (0, _graphqlRelay.nodeDefinitions)(function (globalId) {
	    var _fromGlobalId2 = (0, _graphqlRelay.fromGlobalId)(globalId);

	    var id = _fromGlobalId2.id;
	    var type = _fromGlobalId2.type;


	    if (type === 'CatalogType') {
	        return _axios2.default.get('https://apps-jeeshop.rhcloud.com/jeeshop-admin/rs/catalogs', { headers: config, id: id }).then(function (r) {
	            return r.data;
	        });
	    } else if (type === 'UserType') {
	        return _axios2.default.get('https://apps-jeeshop.rhcloud.com/jeeshop-admin/rs/user/' + id, { headers: config }).then(function (r) {
	            return r.data;
	        });
	    } else if (type === 'ViewerType') {
	        return (0, _UserStore.getViewer)(id);
	    }
	    return null;
	}, function (obj) {

	    if (obj.login != undefined) {
	        return UserType;
	    } else if (obj.description != undefined) {
	        return CatalogType;
	    } else if (obj.email) {
	        return UserType;
	    }
	    return null;
	});

	var nodeInterface = _nodeDefinitions.nodeInterface;
	var nodeField = _nodeDefinitions.nodeField;
	var CatalogType = exports.CatalogType = new _graphql.GraphQLObjectType({

	    name: 'CatalogType',
	    description: 'It represents a catalog',
	    fields: {
	        id: (0, _graphqlRelay.globalIdField)('CatalogType'),
	        name: { type: _graphql.GraphQLString, resolve: function resolve(obj) {
	                return obj.name;
	            } },
	        description: { type: _graphql.GraphQLString, resolve: function resolve(obj) {
	                return obj.description;
	            } },
	        disabled: { type: _graphql.GraphQLBoolean, resolve: function resolve(obj) {
	                return obj.disabled;
	            } },
	        startDate: { type: _graphql.GraphQLString, resolve: function resolve(obj) {
	                return obj.startDate;
	            } },
	        endDate: { type: _graphql.GraphQLString, resolve: function resolve(obj) {
	                return obj.endDate;
	            } },
	        visible: { type: _graphql.GraphQLBoolean, resolve: function resolve(obj) {
	                return obj.visible;
	            } },
	        localizedPresentation: { type: _graphql.GraphQLString, resolve: function resolve(obj) {
	                return null;
	            } },
	        rootCategoriesId: { type: _graphql.GraphQLString, resolve: function resolve(obj) {
	                return null;
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
	            } //email
	        },
	        password: {
	            type: _graphql.GraphQLString,
	            resolve: function resolve(obj) {
	                return obj.password;
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

	var _connectionDefinition2 = (0, _graphqlRelay.connectionDefinitions)({
	    name: 'CatalogType',
	    nodeType: CatalogType
	});

	var CatalogConnection = _connectionDefinition2.connectionType;
	var CatalogEdge = _connectionDefinition2.edgeType;
	exports.CatalogConnection = CatalogConnection;
	exports.CatalogEdge = CatalogEdge;
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

	                    var config = { 'Authorization': "Basic YWRtaW5AamVlc2hvcC5vcmc6amVlc2hvcA==" };

	                    return (0, _graphqlRelay.connectionFromPromisedArray)(_axios2.default.get('https://apps-jeeshop.rhcloud.com/jeeshop-admin/rs/users', { headers: config }).then(function (response) {
	                        return response.data;
	                    }), args);
	                }
	            },
	            catalogs: {
	                type: CatalogConnection,
	                args: _extends({
	                    search: { type: _graphql.GraphQLString },
	                    start: { type: _graphql.GraphQLInt },
	                    size: { type: _graphql.GraphQLInt },
	                    orderBy: { type: _graphql.GraphQLString },
	                    isDesc: { type: _graphql.GraphQLBoolean }
	                }, _graphqlRelay.connectionArgs),
	                resolve: function resolve(obj, args) {

	                    var config = { 'Authorization': "Basic YWRtaW5AamVlc2hvcC5vcmc6amVlc2hvcA==" };
	                    return (0, _graphqlRelay.connectionFromPromisedArray)(_axios2.default.get('https://apps-jeeshop.rhcloud.com/jeeshop-admin/rs/catalogs', { params: args, headers: config }).then(function (response) {
	                        return response.data;
	                    }).catch(function (response) {
	                        if (response.status == "404") return [];
	                    }), args);
	                }
	            },
	            catalog: {
	                type: CatalogType,
	                args: {
	                    id: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) },
	                    locale: { type: _graphql.GraphQLString }
	                },
	                resolve: function resolve(obj, args) {

	                    var config = { 'Authorization': "Basic YWRtaW5AamVlc2hvcC5vcmc6amVlc2hvcA==" };

	                    var _fromGlobalId = (0, _graphqlRelay.fromGlobalId)(args.id);

	                    var id = _fromGlobalId.id;
	                    var type = _fromGlobalId.type;

	                    return _axios2.default.get('https://apps-jeeshop.rhcloud.com/jeeshop-admin/rs/catalogs/' + id, { params: args, headers: config }).then(function (response) {
	                        return response.data;
	                    }).catch(function (response) {
	                        if (response.status == "404") return [];
	                    });
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

	                return (0, _UserStore.getViewer)("me");
	            }
	        },
	        node: nodeField
	    }
	});

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = require("graphql-relay");

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.registerViewer = registerViewer;
	exports.getViewer = getViewer;

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Viewer = exports.Viewer = function (_Object) {
	    _inherits(Viewer, _Object);

	    function Viewer() {
	        _classCallCheck(this, Viewer);

	        return _possibleConstructorReturn(this, Object.getPrototypeOf(Viewer).apply(this, arguments));
	    }

	    return Viewer;
	}(Object);

	var VIEWER_ID = 'me';

	var viewer = new Viewer();
	viewer.id = VIEWER_ID;

	var users = {};
	users[VIEWER_ID] = viewer;

	var usersById = _defineProperty({}, VIEWER_ID, viewer);

	function registerViewer(viewer) {

	    if (users[viewer.id] == undefined) {
	        users[viewer.id] = viewer;
	    }
	}

	function getViewer(viewerId) {
	    return users[viewerId];
	}

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = require("js-base64");

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = require("axios");

/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = require("express-graphql");

/***/ }
/******/ ]);