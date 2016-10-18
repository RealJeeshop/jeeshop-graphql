'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ModifySKULocalizedContent = exports.CreateSKULocalizedContent = exports.DeleteSKULocalizedContent = exports.DeleteSKUMutation = exports.ModifySKUMutation = exports.CreateSKUMutation = undefined;

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
                            args.catalogId = (0, _graphqlRelay.fromGlobalId)(args.catalogId).catalogId;
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
                            id = (0, _graphqlRelay.fromGlobalId)(args.catalogId).catalogId;
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

var DeleteSKULocalizedContent = exports.DeleteSKULocalizedContent = new _graphqlRelay.mutationWithClientMutationId({
    name: 'DeleteSKULocalizedContent',
    description: 'Delete a localized content for a sku',
    inputFields: {
        skuId: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) },
        locale: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) }
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
        var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4(args) {
            var skuId;
            return regeneratorRuntime.wrap(function _callee4$(_context4) {
                while (1) {
                    switch (_context4.prev = _context4.next) {
                        case 0:
                            skuId = (0, _graphqlRelay.fromGlobalId)(args.discountId).catalogId;
                            _context4.next = 3;
                            return _SkuService2.default.deleteSKULocalizedContent(skuId, args.locale);

                        case 3:
                            return _context4.abrupt('return', _context4.sent);

                        case 4:
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

var CreateSKULocalizedContent = exports.CreateSKULocalizedContent = new _graphqlRelay.mutationWithClientMutationId({
    name: 'CreateSKULocalizedContent',
    description: 'create a localized content for a sku',
    inputFields: {
        skuId: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) },
        locale: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) },
        displayName: { type: _graphql.GraphQLString },
        promotion: { type: _graphql.GraphQLString },
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
        var _ref5 = _asyncToGenerator(regeneratorRuntime.mark(function _callee5(args) {
            var skuId;
            return regeneratorRuntime.wrap(function _callee5$(_context5) {
                while (1) {
                    switch (_context5.prev = _context5.next) {
                        case 0:
                            skuId = (0, _graphqlRelay.fromGlobalId)(args.discountId).catalogId;

                            delete args.clientMutationId;
                            delete args.discountId;
                            _context5.next = 5;
                            return _SkuService2.default.createSKULocalizedContent(skuId, args.locale, args);

                        case 5:
                            return _context5.abrupt('return', _context5.sent);

                        case 6:
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

var ModifySKULocalizedContent = exports.ModifySKULocalizedContent = new _graphqlRelay.mutationWithClientMutationId({
    name: 'ModifySKULocalizedContent',
    description: 'modify a localized content for a sku',
    inputFields: {
        skuId: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) },
        locale: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) },
        displayName: { type: _graphql.GraphQLString },
        promotion: { type: _graphql.GraphQLString },
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
        },
        skuEdge: {
            type: _Model.SKUEdge,
            resolve: function () {
                var _ref6 = _asyncToGenerator(regeneratorRuntime.mark(function _callee6(payload) {
                    var skus, cursor;
                    return regeneratorRuntime.wrap(function _callee6$(_context6) {
                        while (1) {
                            switch (_context6.prev = _context6.next) {
                                case 0:
                                    _context6.next = 2;
                                    return _SkuService2.default.findAllSKUs();

                                case 2:
                                    skus = _context6.sent;
                                    cursor = (0, _graphqlRelay.cursorForObjectInConnection)(skus, payload);
                                    return _context6.abrupt('return', {
                                        cursor: cursor,
                                        node: payload
                                    });

                                case 5:
                                case 'end':
                                    return _context6.stop();
                            }
                        }
                    }, _callee6, undefined);
                }));

                return function resolve(_x6) {
                    return _ref6.apply(this, arguments);
                };
            }()
        }
    },
    mutateAndGetPayload: function () {
        var _ref7 = _asyncToGenerator(regeneratorRuntime.mark(function _callee7(args) {
            var skuId;
            return regeneratorRuntime.wrap(function _callee7$(_context7) {
                while (1) {
                    switch (_context7.prev = _context7.next) {
                        case 0:
                            skuId = (0, _graphqlRelay.fromGlobalId)(args.discountId).catalogId;

                            delete args.clientMutationId;
                            delete args.discountId;
                            _context7.next = 5;
                            return _SkuService2.default.modifySKULocalizedContent(skuId, args.locale, args);

                        case 5:
                            return _context7.abrupt('return', _context7.sent);

                        case 6:
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