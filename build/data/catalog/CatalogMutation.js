'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.CreateCatalogMutation = undefined;

var _graphql = require('graphql');

var _graphqlRelay = require('graphql-relay');

var _Model = require('../Model');

var _UserStore = require('../stores/UserStore');

var _CatalogService = require('./CatalogService');

var _CatalogService2 = _interopRequireDefault(_CatalogService);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

require("babel-polyfill");

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
                var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(_ref2) {
                    var id = _ref2.id;
                    var catalog, catalogs, cursor;
                    return regeneratorRuntime.wrap(function _callee$(_context) {
                        while (1) {
                            switch (_context.prev = _context.next) {
                                case 0:

                                    console.log("id : " + JSON.stringify(id));

                                    _context.next = 3;
                                    return _CatalogService2.default.findCatalogById(id);

                                case 3:
                                    catalog = _context.sent;
                                    _context.next = 6;
                                    return _CatalogService2.default.findAllCatalog();

                                case 6:
                                    catalogs = _context.sent;
                                    cursor = (0, _graphqlRelay.cursorForObjectInConnection)(catalogs, catalog);
                                    return _context.abrupt('return', {
                                        cursor: cursor,
                                        node: catalog
                                    });

                                case 9:
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
        var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(args) {
            var catalog;
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:

                            console.log("args in catalog mutation: " + JSON.stringify(args));

                            delete args.clientMutationId;
                            _context2.next = 4;
                            return _CatalogService2.default.createCatalog(args);

                        case 4:
                            catalog = _context2.sent;

                            console.log("catalog : " + JSON.stringify(catalog));
                            return _context2.abrupt('return', catalog);

                        case 7:
                        case 'end':
                            return _context2.stop();
                    }
                }
            }, _callee2, undefined);
        }));

        return function mutateAndGetPayload(_x2) {
            return _ref3.apply(this, arguments);
        };
    }()
});