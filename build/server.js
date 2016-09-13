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

	var graphQLHTTP = __webpack_require__(15);

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

	var _CatalogMutation = __webpack_require__(12);

	var _CategoriesMutation = __webpack_require__(14);

	var Mutation = new _graphql.GraphQLObjectType({
	    name: 'Mutation',
	    fields: {
	        createCatalog: _CatalogMutation.CreateCatalogMutation,
	        modifyCatalog: _CatalogMutation.ModifyCatalogMutation,
	        deleteCatalog: _CatalogMutation.DeleteCatalogMutation,
	        createCatalogLocalizedContent: _CatalogMutation.CreateCatalogLocalizedContentMutation,
	        modifyCatalogLocalizedContent: _CatalogMutation.ModifyCatalogLocalizedContent,

	        createCategoryLocalizedContent: _CategoriesMutation.CreateCategoryLocalizedContentMutation
	    }
	});

	var Schema = exports.Schema = new _graphql.GraphQLSchema({
	    query: _Model.GraphQLRoot,
	    mutation: Mutation
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
	exports.GraphQLRoot = exports.ViewerType = exports.CategoryEdge = exports.CategoryConnection = exports.CatalogEdge = exports.CatalogConnection = exports.UserEdge = exports.UserConnection = exports.UserType = exports.CatalogType = exports.CategoryType = exports.PresentationType = undefined;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _graphql = __webpack_require__(3);

	var _graphqlRelay = __webpack_require__(5);

	var _UserStore = __webpack_require__(6);

	var _CatalogService = __webpack_require__(7);

	var _CatalogService2 = _interopRequireDefault(_CatalogService);

	var _CategoriesService = __webpack_require__(9);

	var _CategoriesService2 = _interopRequireDefault(_CategoriesService);

	var _UsersService = __webpack_require__(10);

	var _UsersService2 = _interopRequireDefault(_UsersService);

	var _jsBase = __webpack_require__(11);

	var _axios = __webpack_require__(8);

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


	    if (type === 'CatalogType') {
	        return _CatalogService2.default.findCatalogById(id);
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
	var PresentationType = exports.PresentationType = new _graphql.GraphQLObjectType({
	    name: 'PresentationType',
	    description: 'It represents a localized presentation',
	    fields: {
	        id: (0, _graphqlRelay.globalIdField)('PresentationType'),
	        locale: { type: _graphql.GraphQLString, resolve: function resolve(obj) {
	                return obj.locale;
	            } },
	        displayName: { type: _graphql.GraphQLString, resolve: function resolve(obj) {
	                return obj.displayName;
	            } },
	        promotion: { type: _graphql.GraphQLString, resolve: function resolve(obj) {
	                return obj.promotion;
	            } },
	        shortDescription: { type: _graphql.GraphQLString, resolve: function resolve(obj) {
	                return obj.shortDescription;
	            } },
	        mediumDescription: { type: _graphql.GraphQLString, resolve: function resolve(obj) {
	                return obj.mediumDescription;
	            } },
	        longDescription: { type: _graphql.GraphQLString, resolve: function resolve(obj) {
	                return obj.longDescription;
	            } },
	        thumbnail: { type: _graphql.GraphQLString, resolve: function resolve(obj) {
	                return obj.thumbnail;
	            } },
	        smallImage: { type: _graphql.GraphQLString, resolve: function resolve(obj) {
	                return obj.smallImage;
	            } },
	        largeImage: { type: _graphql.GraphQLString, resolve: function resolve(obj) {
	                return obj.largeImage;
	            } },
	        video: { type: _graphql.GraphQLString, resolve: function resolve(obj) {
	                return obj.video;
	            } },
	        features: { type: _graphql.GraphQLString, resolve: function resolve(obj) {
	                return obj.features;
	            } }
	    }
	});

	var CategoryType = exports.CategoryType = new _graphql.GraphQLObjectType({
	    name: 'CategoryType',
	    description: 'It represents a category',
	    fields: {
	        id: (0, _graphqlRelay.globalIdField)('CategoryType'),
	        name: { type: _graphql.GraphQLString, resolve: function resolve(obj) {
	                return obj.name;
	            } },
	        description: { type: _graphql.GraphQLString, resolve: function resolve(obj) {
	                return obj.description;
	            } },
	        disabled: { type: _graphql.GraphQLString, resolve: function resolve(obj) {
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
	        localizedPresentation: {
	            type: PresentationType,
	            args: { locale: { type: _graphql.GraphQLString } },
	            resolve: function resolve(obj, args) {
	                var locale = args.locale ? args.locale : (0, _UserStore.getViewerLocale)("me");
	                return _CategoriesService2.default.getCategoryLocalizedContent(obj.id, locale);
	            } },
	        childCategoriesId: { type: _graphql.GraphQLString, resolve: function resolve(obj) {
	                return obj.childCategoriesId;
	            } },
	        childProductsIds: { type: _graphql.GraphQLString, resolve: function resolve(obj) {
	                return obj.childProductsIds;
	            } }
	    }
	});

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
	        localizedPresentation: {
	            type: PresentationType,
	            args: { locale: { type: _graphql.GraphQLString } },
	            resolve: function resolve(obj, args) {
	                var locale = args.locale ? args.locale : (0, _UserStore.getViewerLocale)("me");
	                return _CatalogService2.default.getCatalogLocalizedContent(obj.id, locale);
	            }
	        },
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

	var _connectionDefinition3 = (0, _graphqlRelay.connectionDefinitions)({
	    name: 'CategoryType',
	    nodeType: CategoryType
	});

	var CategoryConnection = _connectionDefinition3.connectionType;
	var CategoryEdge = _connectionDefinition3.edgeType;
	exports.CategoryConnection = CategoryConnection;
	exports.CategoryEdge = CategoryEdge;
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
	                    return (0, _graphqlRelay.connectionFromPromisedArray)(_UsersService2.default.findAllUsers(), args);
	                }
	            },
	            catalogs: {
	                type: CatalogConnection,
	                args: _extends({
	                    search: { type: _graphql.GraphQLString },
	                    start: { type: _graphql.GraphQLInt },
	                    size: { type: _graphql.GraphQLInt },
	                    orderBy: { type: _graphql.GraphQLString },
	                    isDesc: { type: _graphql.GraphQLBoolean },
	                    locale: { type: _graphql.GraphQLString }
	                }, _graphqlRelay.connectionArgs),
	                resolve: function resolve(obj, args) {
	                    return (0, _graphqlRelay.connectionFromPromisedArray)(_CatalogService2.default.findAllCatalog(args), args);
	                }
	            },
	            catalog: {
	                type: CatalogType,
	                args: {
	                    id: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) },
	                    locale: { type: _graphql.GraphQLString }
	                },
	                resolve: function resolve(obj, args) {
	                    return _CatalogService2.default.findCatalogById((0, _graphqlRelay.fromGlobalId)(args.id).id);
	                }
	            },
	            categories: {
	                type: CategoryConnection,
	                args: _extends({
	                    search: { type: _graphql.GraphQLString },
	                    start: { type: _graphql.GraphQLInt },
	                    size: { type: _graphql.GraphQLInt },
	                    orderBy: { type: _graphql.GraphQLString },
	                    isDesc: { type: _graphql.GraphQLBoolean }
	                }, _graphqlRelay.connectionArgs),
	                resolve: function resolve(obj, args) {
	                    return (0, _graphqlRelay.connectionFromPromisedArray)(_CategoriesService2.default.findAllCategories(args), args);
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
	exports.getViewerLocale = getViewerLocale;
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
	viewer.locale = 'fr_FR';

	var users = {};
	users[VIEWER_ID] = viewer;

	var usersById = _defineProperty({}, VIEWER_ID, viewer);

	function registerViewer(viewer) {

	    if (users[viewer.id] == undefined) {
	        users[viewer.id] = viewer;
	    }
	}

	function getViewerLocale(viewerId) {
	    return users[viewerId].locale;
	}

	function getViewer(viewerId) {
	    return users[viewerId];
	}

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _axios = __webpack_require__(8);

	var _axios2 = _interopRequireDefault(_axios);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var credentials = { 'Authorization': "Basic YWRtaW5AamVlc2hvcC5vcmc6amVlc2hvcA==", "Content-Type": "application/json" };
	var url = "https://localhost:8443";
	process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

	var CatalogService = {
	    findAllCatalog: function findAllCatalog(args) {

	        return _axios2.default.get(url + '/jeeshop-admin/rs/catalogs', { params: args, headers: credentials }).then(function (response) {
	            console.log("response.data of find all : " + JSON.stringify(response.data));
	            return response.data;
	        }).catch(function (response) {
	            if (response.status == "404") return [];
	        });
	    },
	    findCatalogById: function findCatalogById(id) {
	        return _axios2.default.get(url + '/jeeshop-admin/rs/catalogs/' + id, { headers: credentials }).then(function (response) {
	            return response.data;
	        }).catch(function (response) {
	            if (response.status == "404") return [];
	        });
	    },
	    createCatalog: function createCatalog(input) {
	        return _axios2.default.post(url + '/jeeshop-admin/rs/catalogs', input, { headers: credentials }).then(function (response) {
	            return response.data;
	        }).catch(function (response) {
	            console.log("response catch: " + JSON.stringify(response));
	            if (response.status == "404") return [];
	        });
	    },
	    modifyCatalog: function modifyCatalog(input) {
	        return _axios2.default.put(url + '/jeeshop-admin/rs/catalogs', input, { headers: credentials }).then(function (response) {
	            console.log("response : " + JSON.stringify(response.data));
	            return response.data;
	        }).catch(function (response) {
	            if (response.status == "404") return [];
	            return [];
	        });
	    },
	    deleteCatalog: function deleteCatalog(id) {
	        return _axios2.default.delete(url + '/jeeshop-admin/rs/catalogs/' + id, { headers: credentials }).then(function (response) {
	            console.log("response.data of delete : " + JSON.stringify(response));
	            return computeServiceResult(response);
	        }).catch(function (response) {
	            console.log("response.data of catch delete : " + JSON.stringify(response));
	            if (response.status == "404") return [];
	        });
	    },
	    getCatalogLocalizedContent: function getCatalogLocalizedContent(id, locale) {
	        return _axios2.default.get(url + '/jeeshop-admin/rs/catalogs/' + id + '/presentations/' + locale, { headers: credentials }).then(function (response) {
	            console.log("response from getCatalogLocalizedContent: " + JSON.stringify(response.data));
	            return response.data;
	        }).catch(function (response) {
	            console.log("error in getCatalogLocalizedContent : " + JSON.stringify(response));
	            if (response.status == "404") return [];
	            return [];
	        });
	    },
	    createCatalogLocalizedContent: function createCatalogLocalizedContent(id, input) {
	        return _axios2.default.post(url + '/jeeshop-admin/rs/catalogs/' + id + '/presentations/' + input.locale, input, { headers: credentials }).then(function (response) {
	            console.log("response from createCatalogLocalizedContent: " + JSON.stringify(response.data));
	            return response.data;
	        }).catch(function (response) {
	            console.log("error in createCatalogLocalizedContent : " + JSON.stringify(response));
	            if (response.status == "404") return [];
	            return [];
	        });
	    },
	    modifyCatalogLocalizedContent: function modifyCatalogLocalizedContent(catalogId, input) {
	        return _axios2.default.put(url + '/jeeshop-admin/rs/catalogs/' + catalogId + '/presentations/' + input.locale, input, { headers: credentials }).then(function (response) {
	            console.log("response from modifyCatalogLocalizedContent: " + JSON.stringify(response.data));
	            return response.data;
	        }).catch(function (response) {
	            console.log("error in modifyCatalogLocalizedContent : " + JSON.stringify(response));
	            if (response.status == "404") return [];
	            return [];
	        });
	    }
	};

	function computeServiceResult(response) {

	    var result = {};
	    switch (response.status) {

	        case 200:
	        case 201:
	        case 204:
	            result.message = "Success";
	            result.success = true;
	            break;

	        case 400:
	            result.message = response.data.message + ': ' + response.data.exception;
	            result.success = false;
	            break;

	        case 409:
	            result.message = response.data.message + ': ' + response.data.exception;
	            result.success = false;
	            break;

	        default:
	            result.message = '(' + response.status + ') ' + response.data.message + ': ' + response.data.exception;
	            result.success = false;
	            break;
	    }

	    return result;
	}

	exports.default = CatalogService;

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = require("axios");

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _axios = __webpack_require__(8);

	var _axios2 = _interopRequireDefault(_axios);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var credentials = { 'Authorization': "Basic YWRtaW5AamVlc2hvcC5vcmc6amVlc2hvcA==", "Content-Type": "application/json" };
	var url = "https://localhost:8443";
	process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

	var CategoriesService = {
	    findAllCategories: function findAllCategories(args) {

	        return _axios2.default.get(url + '/jeeshop-admin/rs/categories', { params: args, headers: credentials }).then(function (response) {
	            console.log("resonse.data : " + JSON.stringify(response.data));
	            return response.data;
	        }).catch(function (response) {
	            if (response.status == "404") return [];
	        });
	    },
	    createCategoryLocalizedContent: function createCategoryLocalizedContent(id, input) {
	        return _axios2.default.post(url + '/jeeshop-admin/rs/categories/' + id + '/presentations/' + input.locale, input, { headers: credentials }).then(function (response) {
	            return response.data;
	        }).catch(function (response) {
	            console.log("error in createCatalogLocalizedContent : " + JSON.stringify(response));
	            if (response.status == "404") return [];
	            return [];
	        });
	    },
	    getCategoryLocalizedContent: function getCategoryLocalizedContent(id, locale) {
	        return _axios2.default.get(url + '/jeeshop-admin/rs/categories/' + id + '/presentations/' + locale, { headers: credentials }).then(function (response) {
	            return response.data;
	        }).catch(function (response) {
	            console.log("error in getCatalogLocalizedContent : " + JSON.stringify(response));
	            if (response.status == "404") return [];
	            return [];
	        });
	    }
	};
	exports.default = CategoriesService;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _axios = __webpack_require__(8);

	var _axios2 = _interopRequireDefault(_axios);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var credentials = { 'Authorization': "Basic YWRtaW5AamVlc2hvcC5vcmc6amVlc2hvcA==", "Content-Type": "application/json" };
	var url = "https://localhost:8443";
	process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

	var UsersService = {
	    findAllUsers: function findAllUsers() {

	        return _axios2.default.get(url + '/jeeshop-admin/rs/users', { headers: credentials }).then(function (response) {
	            return response.data;
	        }).catch(function (response) {
	            if (response.status == "404") return [];
	            return [];
	        });
	    }
	};
	exports.default = UsersService;

/***/ },
/* 11 */
/***/ function(module, exports) {

	module.exports = require("js-base64");

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.ModifyCatalogLocalizedContent = exports.CreateCatalogLocalizedContentMutation = exports.DeleteCatalogMutation = exports.ModifyCatalogMutation = exports.CreateCatalogMutation = undefined;

	var _graphql = __webpack_require__(3);

	var _graphqlRelay = __webpack_require__(5);

	var _Model = __webpack_require__(4);

	var _UserStore = __webpack_require__(6);

	var _CatalogService = __webpack_require__(7);

	var _CatalogService2 = _interopRequireDefault(_CatalogService);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

	__webpack_require__(13);

	var CreateCatalogMutation = exports.CreateCatalogMutation = new _graphqlRelay.mutationWithClientMutationId({
	    name: 'CreateCatalog',
	    description: 'Function to create a catalog',
	    inputFields: {
	        name: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) },
	        description: { type: _graphql.GraphQLString },
	        disabled: { type: _graphql.GraphQLBoolean },
	        startDate: { type: _graphql.GraphQLString },
	        endDate: { type: _graphql.GraphQLString },
	        visible: { type: _graphql.GraphQLBoolean },
	        rootCategoriesIds: { type: new _graphql.GraphQLList(_graphql.GraphQLInt) }
	    },
	    outputFields: {
	        viewer: {
	            type: _Model.ViewerType,
	            resolve: function resolve() {
	                return (0, _UserStore.getViewer)("me");
	            }
	        },
	        catalogEdge: {
	            type: _Model.CatalogEdge,
	            resolve: function () {
	                var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(payload) {
	                    var catalogs, cursor;
	                    return regeneratorRuntime.wrap(function _callee$(_context) {
	                        while (1) {
	                            switch (_context.prev = _context.next) {
	                                case 0:
	                                    _context.next = 2;
	                                    return _CatalogService2.default.findAllCatalog();

	                                case 2:
	                                    catalogs = _context.sent;
	                                    cursor = (0, _graphqlRelay.cursorForObjectInConnection)(catalogs, payload);
	                                    return _context.abrupt('return', {
	                                        cursor: cursor,
	                                        node: payload
	                                    });

	                                case 5:
	                                case 'end':
	                                    return _context.stop();
	                            }
	                        }
	                    }, _callee, undefined);
	                }));

	                return function resolve(_x) {
	                    return _ref.apply(this, arguments);
	                };
	            }()
	        }
	    },
	    mutateAndGetPayload: function () {
	        var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(args) {
	            return regeneratorRuntime.wrap(function _callee2$(_context2) {
	                while (1) {
	                    switch (_context2.prev = _context2.next) {
	                        case 0:
	                            delete args.clientMutationId;
	                            _context2.next = 3;
	                            return _CatalogService2.default.createCatalog(args);

	                        case 3:
	                            return _context2.abrupt('return', _context2.sent);

	                        case 4:
	                        case 'end':
	                            return _context2.stop();
	                    }
	                }
	            }, _callee2, undefined);
	        }));

	        return function mutateAndGetPayload(_x2) {
	            return _ref2.apply(this, arguments);
	        };
	    }()
	});

	var ModifyCatalogMutation = exports.ModifyCatalogMutation = new _graphqlRelay.mutationWithClientMutationId({
	    name: 'ModifyCatalog',
	    description: 'Function to modify a catalog',
	    inputFields: {
	        id: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) },
	        name: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) },
	        description: { type: _graphql.GraphQLString },
	        disabled: { type: _graphql.GraphQLBoolean },
	        startDate: { type: _graphql.GraphQLString },
	        endDate: { type: _graphql.GraphQLString },
	        visible: { type: _graphql.GraphQLBoolean },
	        localizedPresentation: { type: _graphql.GraphQLString },
	        rootCategoriesIds: { type: new _graphql.GraphQLList(_graphql.GraphQLInt) }
	    },
	    outputFields: {
	        viewer: {
	            type: _Model.ViewerType,
	            resolve: function resolve() {
	                return (0, _UserStore.getViewer)("me");
	            }
	        },
	        catalogEdge: {
	            type: _Model.CatalogEdge,
	            resolve: function () {
	                var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(payload) {
	                    var catalogs, cursor;
	                    return regeneratorRuntime.wrap(function _callee3$(_context3) {
	                        while (1) {
	                            switch (_context3.prev = _context3.next) {
	                                case 0:
	                                    _context3.next = 2;
	                                    return _CatalogService2.default.findAllCatalog();

	                                case 2:
	                                    catalogs = _context3.sent;
	                                    cursor = (0, _graphqlRelay.cursorForObjectInConnection)(catalogs, payload);
	                                    return _context3.abrupt('return', {
	                                        cursor: cursor,
	                                        node: payload
	                                    });

	                                case 5:
	                                case 'end':
	                                    return _context3.stop();
	                            }
	                        }
	                    }, _callee3, undefined);
	                }));

	                return function resolve(_x3) {
	                    return _ref3.apply(this, arguments);
	                };
	            }()
	        }
	    },
	    mutateAndGetPayload: function () {
	        var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4(args) {
	            return regeneratorRuntime.wrap(function _callee4$(_context4) {
	                while (1) {
	                    switch (_context4.prev = _context4.next) {
	                        case 0:

	                            delete args.clientMutationId;
	                            args.id = (0, _graphqlRelay.fromGlobalId)(args.id).id;

	                            _context4.next = 4;
	                            return _CatalogService2.default.modifyCatalog(args);

	                        case 4:
	                            return _context4.abrupt('return', _context4.sent);

	                        case 5:
	                        case 'end':
	                            return _context4.stop();
	                    }
	                }
	            }, _callee4, undefined);
	        }));

	        return function mutateAndGetPayload(_x4) {
	            return _ref4.apply(this, arguments);
	        };
	    }()
	});

	var DeleteCatalogMutation = exports.DeleteCatalogMutation = new _graphqlRelay.mutationWithClientMutationId({
	    name: 'DeleteCatalog',
	    description: 'Function to delete a catalog',
	    inputFields: {
	        id: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) }
	    },
	    outputFields: {
	        viewer: {
	            type: _Model.ViewerType,
	            resolve: function resolve() {
	                return (0, _UserStore.getViewer)("me");
	            }
	        }
	    },
	    mutateAndGetPayload: function () {
	        var _ref5 = _asyncToGenerator(regeneratorRuntime.mark(function _callee5(args) {
	            return regeneratorRuntime.wrap(function _callee5$(_context5) {
	                while (1) {
	                    switch (_context5.prev = _context5.next) {
	                        case 0:
	                            console.log("delete catalog mutate");
	                            _context5.next = 3;
	                            return _CatalogService2.default.deleteCatalog((0, _graphqlRelay.fromGlobalId)(args.id).id);

	                        case 3:
	                            return _context5.abrupt('return', _context5.sent);

	                        case 4:
	                        case 'end':
	                            return _context5.stop();
	                    }
	                }
	            }, _callee5, undefined);
	        }));

	        return function mutateAndGetPayload(_x5) {
	            return _ref5.apply(this, arguments);
	        };
	    }()
	});

	var CreateCatalogLocalizedContentMutation = exports.CreateCatalogLocalizedContentMutation = new _graphqlRelay.mutationWithClientMutationId({
	    name: 'CreateCatalogLocalizedContent',
	    description: 'Creates a localized content for a catalog',
	    inputFields: {
	        id: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) },
	        locale: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) },
	        displayName: { type: _graphql.GraphQLString },
	        shortDescription: { type: _graphql.GraphQLString },
	        mediumDescription: { type: _graphql.GraphQLString },
	        longDescription: { type: _graphql.GraphQLString }
	    },
	    outputFields: {
	        viewer: {
	            type: _Model.ViewerType,
	            resolve: function resolve() {
	                return (0, _UserStore.getViewer)("me");
	            }
	        }
	    },
	    mutateAndGetPayload: function () {
	        var _ref6 = _asyncToGenerator(regeneratorRuntime.mark(function _callee6(args) {
	            var id;
	            return regeneratorRuntime.wrap(function _callee6$(_context6) {
	                while (1) {
	                    switch (_context6.prev = _context6.next) {
	                        case 0:
	                            id = (0, _graphqlRelay.fromGlobalId)(args.id).id;

	                            delete args.id;
	                            delete args.clientMutationId;
	                            console.log("args : " + JSON.stringify(args));
	                            _context6.next = 6;
	                            return _CatalogService2.default.createCatalogLocalizedContent(id, args);

	                        case 6:
	                            return _context6.abrupt('return', _context6.sent);

	                        case 7:
	                        case 'end':
	                            return _context6.stop();
	                    }
	                }
	            }, _callee6, undefined);
	        }));

	        return function mutateAndGetPayload(_x6) {
	            return _ref6.apply(this, arguments);
	        };
	    }()
	});

	var ModifyCatalogLocalizedContent = exports.ModifyCatalogLocalizedContent = new _graphqlRelay.mutationWithClientMutationId({
	    name: 'ModifyCatalogLocalizedContent',
	    description: 'Modify a localized content for a catalog',
	    inputFields: {
	        catalogId: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) },
	        id: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) },
	        locale: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) },
	        displayName: { type: _graphql.GraphQLString },
	        shortDescription: { type: _graphql.GraphQLString },
	        mediumDescription: { type: _graphql.GraphQLString },
	        longDescription: { type: _graphql.GraphQLString }
	    },
	    outputFields: {
	        viewer: {
	            type: _Model.ViewerType,
	            resolve: function resolve() {
	                return (0, _UserStore.getViewer)("me");
	            }
	        }
	    },
	    mutateAndGetPayload: function () {
	        var _ref7 = _asyncToGenerator(regeneratorRuntime.mark(function _callee7(args) {
	            var catalogId;
	            return regeneratorRuntime.wrap(function _callee7$(_context7) {
	                while (1) {
	                    switch (_context7.prev = _context7.next) {
	                        case 0:
	                            args.id = (0, _graphqlRelay.fromGlobalId)(args.id).id;
	                            catalogId = (0, _graphqlRelay.fromGlobalId)(args.catalogId).id;

	                            delete args.clientMutationId;
	                            delete args.catalogId;
	                            _context7.next = 6;
	                            return _CatalogService2.default.modifyCatalogLocalizedContent(catalogId, args);

	                        case 6:
	                            return _context7.abrupt('return', _context7.sent);

	                        case 7:
	                        case 'end':
	                            return _context7.stop();
	                    }
	                }
	            }, _callee7, undefined);
	        }));

	        return function mutateAndGetPayload(_x7) {
	            return _ref7.apply(this, arguments);
	        };
	    }()
	});

/***/ },
/* 13 */
/***/ function(module, exports) {

	module.exports = require("babel-polyfill");

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.CreateCategoryLocalizedContentMutation = undefined;

	var _graphql = __webpack_require__(3);

	var _graphqlRelay = __webpack_require__(5);

	var _Model = __webpack_require__(4);

	var _UserStore = __webpack_require__(6);

	var _CategoriesService = __webpack_require__(9);

	var _CategoriesService2 = _interopRequireDefault(_CategoriesService);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

	__webpack_require__(13);

	var CreateCategoryLocalizedContentMutation = exports.CreateCategoryLocalizedContentMutation = new _graphqlRelay.mutationWithClientMutationId({
	    name: 'CreateCategoryLocalizedContent',
	    description: 'Creates a localized content for a category',
	    inputFields: {
	        id: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) },
	        locale: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) },
	        displayName: { type: _graphql.GraphQLString },
	        shortDescription: { type: _graphql.GraphQLString },
	        mediumDescription: { type: _graphql.GraphQLString },
	        longDescription: { type: _graphql.GraphQLString }
	    },
	    outputFields: {
	        viewer: {
	            type: _Model.ViewerType,
	            resolve: function resolve() {
	                return (0, _UserStore.getViewer)("me");
	            }
	        }
	    },
	    mutateAndGetPayload: function () {
	        var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(args) {
	            var id;
	            return regeneratorRuntime.wrap(function _callee$(_context) {
	                while (1) {
	                    switch (_context.prev = _context.next) {
	                        case 0:
	                            id = (0, _graphqlRelay.fromGlobalId)(args.id).id;

	                            delete args.id;
	                            delete args.clientMutationId;
	                            console.log("args : " + JSON.stringify(args));
	                            _context.next = 6;
	                            return _CategoriesService2.default.createCategoryLocalizedContent(id, args);

	                        case 6:
	                            return _context.abrupt('return', _context.sent);

	                        case 7:
	                        case 'end':
	                            return _context.stop();
	                    }
	                }
	            }, _callee, undefined);
	        }));

	        return function mutateAndGetPayload(_x) {
	            return _ref.apply(this, arguments);
	        };
	    }()
	});

/***/ },
/* 15 */
/***/ function(module, exports) {

	module.exports = require("express-graphql");

/***/ }
/******/ ]);