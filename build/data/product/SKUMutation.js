'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.DeleteSKUMutation = exports.ModifySKUMutation = exports.CreateSKUMutation = undefined;

var _graphql = require('graphql');

var _graphqlRelay = require('graphql-relay');

var _Model = require('../Model');

var _UserStore = require('../stores/UserStore');

var _SkuService = require('./SkuService');

var _SkuService2 = _interopRequireDefault(_SkuService);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

require("babel-polyfill");

var CreateSKUMutation = exports.CreateSKUMutation = new _graphqlRelay.mutationWithClientMutationId({
    name: 'CreateSKUMutation',
    description: 'Function to create a sku',
    inputFields: {
        name: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) },
        description: { type: _graphql.GraphQLString },
        disabled: { type: _graphql.GraphQLBoolean },
        startDate: { type: _graphql.GraphQLString },
        endDate: { type: _graphql.GraphQLString },
        visible: { type: _graphql.GraphQLBoolean },
        price: { type: _graphql.GraphQLFloat },
        currency: { type: _graphql.GraphQLString },
        reference: { type: _graphql.GraphQLString },
        threshold: { type: _graphql.GraphQLInt },
        quantity: { type: _graphql.GraphQLInt },
        available: { type: _graphql.GraphQLBoolean }
    },
    outputFields: {
        viewer: {
            type: _Model.ViewerType,
            resolve: function resolve() {
                return (0, _UserStore.getViewer)("me");
            }
        },
        sku: {
            type: _Model.SKUType,
            resolve: function resolve(payload) {
                return payload;
            }
        }
    },
    mutateAndGetPayload: function () {
        var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(args) {
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            delete args.clientMutationId;
                            _context.next = 3;
                            return _SkuService2.default.createSKU(args);

                        case 3:
                            return _context.abrupt('return', _context.sent);

                        case 4:
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

var ModifySKUMutation = exports.ModifySKUMutation = new _graphqlRelay.mutationWithClientMutationId({
    name: 'ModifySKUMutation',
    description: 'Function to modify a sku',
    inputFields: {
        id: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) },
        name: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) },
        description: { type: _graphql.GraphQLString },
        disabled: { type: _graphql.GraphQLBoolean },
        startDate: { type: _graphql.GraphQLString },
        endDate: { type: _graphql.GraphQLString },
        visible: { type: _graphql.GraphQLBoolean },
        price: { type: _graphql.GraphQLFloat },
        currency: { type: _graphql.GraphQLString },
        reference: { type: _graphql.GraphQLString },
        threshold: { type: _graphql.GraphQLInt },
        quantity: { type: _graphql.GraphQLInt },
        available: { type: _graphql.GraphQLBoolean }
    },
    outputFields: {
        viewer: {
            type: _Model.ViewerType,
            resolve: function resolve() {
                return (0, _UserStore.getViewer)("me");
            }
        },
        sku: {
            type: _Model.SKUType,
            resolve: function resolve(payload) {
                return payload;
            }
        }
    },
    mutateAndGetPayload: function () {
        var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(args) {
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            args.id = (0, _graphqlRelay.fromGlobalId)(args.id).id;
                            delete args.clientMutationId;
                            _context2.next = 4;
                            return _SkuService2.default.modifySKU(args);

                        case 4:
                            return _context2.abrupt('return', _context2.sent);

                        case 5:
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

var DeleteSKUMutation = exports.DeleteSKUMutation = new _graphqlRelay.mutationWithClientMutationId({
    name: 'DeleteSKUMutation',
    description: 'Function to delete a sku',
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
        var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(args) {
            var id;
            return regeneratorRuntime.wrap(function _callee3$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                        case 0:
                            id = (0, _graphqlRelay.fromGlobalId)(args.id).id;
                            _context3.next = 3;
                            return _SkuService2.default.deleteSKU(id);

                        case 3:
                            return _context3.abrupt('return', _context3.sent);

                        case 4:
                        case 'end':
                            return _context3.stop();
                    }
                }
            }, _callee3, undefined);
        }));

        return function mutateAndGetPayload(_x3) {
            return _ref3.apply(this, arguments);
        };
    }()
});