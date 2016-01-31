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

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	__webpack_require__(2);
	var express = __webpack_require__(3);
	var Schema = __webpack_require__(4);
	var graphQLHTTP = __webpack_require__(8);

	var app = express();
	app.use('/graphql', graphQLHTTP({ schema: Schema, pretty: true, graphiql: true }));

	console.log("openshift ip: " + process.env.OPENSHIFT_NODEJS_IP);
	console.log("openshift port: " + process.env.OPENSHIFT_NODEJS_PORT);

	var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080;
	var server_ip_address = '127.2.199.1'; // process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'

	console.log("used ip: " + server_ip_address);
	console.log("used port: " + server_port);

	app.listen(server_port, server_ip_address, function (err) {
	    if (err) return console.error(err);
	    console.log('GraphQL Server is now running on localhost:' + server_ip_address);
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },
/* 1 */
/***/ function(module, exports) {

	// shim for using process in browser

	var process = module.exports = {};
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = setTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    clearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        setTimeout(drainQueue, 0);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = require("babel-polyfill");

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = require("express");

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Viewer = undefined;

	var _graphql = __webpack_require__(5);

	var _graphqlRelay = __webpack_require__(6);

	var _axios = __webpack_require__(7);

	var _axios2 = _interopRequireDefault(_axios);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	// import database from './db'

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

	/**
	 * The first argument defines the way to resolve an ID to its object.
	 * The second argument defines the way to resolve a node object to its GraphQL type.
	 */

	var _nodeDefinitions = (0, _graphqlRelay.nodeDefinitions)(function (globalId) {
	  var _fromGlobalId = (0, _graphqlRelay.fromGlobalId)(globalId);

	  var id = _fromGlobalId.id;
	  var type = _fromGlobalId.type;

	  if (type === 'SimType') {
	    return {}; //axios.get("http://greec-muskacirca.rhcloud.com/greec/rs/wrecks/" + id)
	  } else if (type === "Viewer") {
	      return viewer;
	    }
	  return null;
	}, function (obj) {
	  if (obj instanceof SimType) {
	    return GraphQLSimType;
	  } else if (obj instanceof Viewer) {
	    return GraphQLViewer;
	  }
	});

	var nodeInterface = _nodeDefinitions.nodeInterface;
	var nodeField = _nodeDefinitions.nodeField;

	var GraphQLSimType = new _graphql.GraphQLObjectType({
	  name: 'SimType',
	  fields: {
	    id: (0, _graphqlRelay.globalIdField)('SimType'),
	    name: {
	      type: _graphql.GraphQLString,
	      resolve: function resolve(obj) {
	        return obj.name;
	      }
	    },
	    shortDescription: {
	      type: _graphql.GraphQLString,
	      resolve: function resolve(obj) {
	        return obj.shortDescription;
	      }
	    },
	    description: {
	      type: _graphql.GraphQLString,
	      resolve: function resolve(obj) {
	        return obj.description;
	      }
	    }
	  },
	  interfaces: [nodeInterface]
	});

	var _connectionDefinition =
	// ,edgeType: GraphQLSimTypesEdge,
	(0, _graphqlRelay.connectionDefinitions)({
	  name: 'SimType',
	  nodeType: GraphQLSimType
	});

	var SimTypesConnection = _connectionDefinition.connectionType;

	var GraphQLViewer = new _graphql.GraphQLObjectType({
	  name: 'Viewer',
	  fields: function fields() {
	    return {
	      id: (0, _graphqlRelay.globalIdField)('Viewer'),
	      simTypes: {
	        type: SimTypesConnection,
	        //args: {args},
	        resolve: function resolve(obj, args) {
	          return (0, _graphqlRelay.connectionFromPromisedArray)(_axios2.default.get("http://greec-muskacirca.rhcloud.com/greec/rs/wrecks/lightweight").then(function (response) {
	            return response.data;
	          }), args);
	        }
	      }
	    };
	  },
	  interfaces: [nodeInterface]
	});

	var GraphQLRoot = new _graphql.GraphQLObjectType({
	  name: 'Root',
	  fields: {
	    viewer: {
	      type: GraphQLViewer,
	      resolve: function resolve() {
	        return viewer;
	      }
	    },
	    node: nodeField
	  }
	});

	exports.default = new _graphql.GraphQLSchema({
	  query: GraphQLRoot
	});

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = require("graphql");

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = require("graphql-relay");

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = require("axios");

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = require("express-graphql");

/***/ }
/******/ ]);