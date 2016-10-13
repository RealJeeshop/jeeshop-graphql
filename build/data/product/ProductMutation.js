'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ModifyProductLocalizedContent = exports.CreateProductLocalizedContent = exports.DeleteProductLocalizedContent = exports.DeleteProductMutation = exports.ModifyProductMutation = exports.CreateProductMutation = undefined;

var _graphql = require('graphql');

var _graphqlRelay = require('graphql-relay');

var _Model = require('../Model');

var _UserStore = require('../stores/UserStore');

var _ProductService = require('./ProductService');

var _ProductService2 = _interopRequireDefault(_ProductService);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

require("babel-polyfill");

var CreateProductMutation = exports.CreateProductMutation = new _graphqlRelay.mutationWithClientMutationId({
    name: 'CreateProductMutation',
    description: 'Function to create a product',
    inputFields: {
        name: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) },
        description: { type: _graphql.GraphQLString },
        disabled: { type: _graphql.GraphQLBoolean },
        startDate: { type: _graphql.GraphQLString },
        endDate: { type: _graphql.GraphQLString },
        visible: { type: _graphql.GraphQLBoolean }
    },
    outputFields: {
        viewer: {
            type: _Model.ViewerType,
            resolve: function resolve() {
                return (0, _UserStore.getViewer)("me");
            }
        },
        productEdge: {
            type: _Model.ProductEdge,
            resolve: function () {
                var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(payload) {
                    var products, cursor;
                    return regeneratorRuntime.wrap(function _callee$(_context) {
                        while (1) {
                            switch (_context.prev = _context.next) {
                                case 0:
                                    _context.next = 2;
                                    return _ProductService2.default.findAllProducts();

                                case 2:
                                    products = _context.sent;
                                    cursor = (0, _graphqlRelay.cursorForObjectInConnection)(products, payload);
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
                            return _ProductService2.default.createProduct(args);

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

var ModifyProductMutation = exports.ModifyProductMutation = new _graphqlRelay.mutationWithClientMutationId({
    name: 'ModifyProductMutation',
    description: 'Function to modify a product',
    inputFields: {
        name: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) },
        description: { type: _graphql.GraphQLString },
        disabled: { type: _graphql.GraphQLBoolean },
        startDate: { type: _graphql.GraphQLString },
        endDate: { type: _graphql.GraphQLString },
        visible: { type: _graphql.GraphQLBoolean }
    },
    outputFields: {
        viewer: {
            type: _Model.ViewerType,
            resolve: function resolve() {
                return (0, _UserStore.getViewer)("me");
            }
        },
        productEdge: {
            type: _Model.ProductEdge,
            resolve: function () {
                var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(payload) {
                    var products, cursor;
                    return regeneratorRuntime.wrap(function _callee3$(_context3) {
                        while (1) {
                            switch (_context3.prev = _context3.next) {
                                case 0:
                                    _context3.next = 2;
                                    return _ProductService2.default.findAllProducts();

                                case 2:
                                    products = _context3.sent;
                                    cursor = (0, _graphqlRelay.cursorForObjectInConnection)(products, payload);
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
                            _context4.next = 3;
                            return _ProductService2.default.modifyProduct(args);

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

var DeleteProductMutation = exports.DeleteProductMutation = new _graphqlRelay.mutationWithClientMutationId({
    name: 'DeleteProductMutation',
    description: 'Function to delete a product',
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
                            _context5.next = 2;
                            return _ProductService2.default.deleteProduct((0, _graphqlRelay.fromGlobalId)(args.id).id);

                        case 2:
                            return _context5.abrupt('return', _context5.sent);

                        case 3:
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

var DeleteProductLocalizedContent = exports.DeleteProductLocalizedContent = new _graphqlRelay.mutationWithClientMutationId({
    name: 'DeleteProductLocalizedContent',
    description: 'Delete a localized content for a product',
    inputFields: {
        productId: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) },
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
        var _ref6 = _asyncToGenerator(regeneratorRuntime.mark(function _callee6(args) {
            var productId;
            return regeneratorRuntime.wrap(function _callee6$(_context6) {
                while (1) {
                    switch (_context6.prev = _context6.next) {
                        case 0:
                            productId = (0, _graphqlRelay.fromGlobalId)(args.productId).id;
                            _context6.next = 3;
                            return _ProductService2.default.deleteProductLocalizedContent(productId, args.locale);

                        case 3:
                            return _context6.abrupt('return', _context6.sent);

                        case 4:
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

var CreateProductLocalizedContent = exports.CreateProductLocalizedContent = new _graphqlRelay.mutationWithClientMutationId({
    name: 'CreateProductLocalizedContent',
    description: 'create a localized content for a product',
    inputFields: {
        productId: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) },
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
        var _ref7 = _asyncToGenerator(regeneratorRuntime.mark(function _callee7(args) {
            var productId;
            return regeneratorRuntime.wrap(function _callee7$(_context7) {
                while (1) {
                    switch (_context7.prev = _context7.next) {
                        case 0:
                            productId = (0, _graphqlRelay.fromGlobalId)(args.productId).id;

                            delete args.clientMutationId;
                            delete args.productId;
                            _context7.next = 5;
                            return _ProductService2.default.createProductLocalizedContent(productId, args.locale, args);

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

var ModifyProductLocalizedContent = exports.ModifyProductLocalizedContent = new _graphqlRelay.mutationWithClientMutationId({
    name: 'ModifyProductLocalizedContent',
    description: 'modify a localized content for a product',
    inputFields: {
        productId: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) },
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
        productEdge: {
            type: _Model.ProductEdge,
            resolve: function () {
                var _ref8 = _asyncToGenerator(regeneratorRuntime.mark(function _callee8(payload) {
                    var products, cursor;
                    return regeneratorRuntime.wrap(function _callee8$(_context8) {
                        while (1) {
                            switch (_context8.prev = _context8.next) {
                                case 0:
                                    _context8.next = 2;
                                    return _ProductService2.default.findAllProducts();

                                case 2:
                                    products = _context8.sent;
                                    cursor = (0, _graphqlRelay.cursorForObjectInConnection)(products, payload);
                                    return _context8.abrupt('return', {
                                        cursor: cursor,
                                        node: payload
                                    });

                                case 5:
                                case 'end':
                                    return _context8.stop();
                            }
                        }
                    }, _callee8, undefined);
                }));

                return function resolve(_x8) {
                    return _ref8.apply(this, arguments);
                };
            }()
        }
    },
    mutateAndGetPayload: function () {
        var _ref9 = _asyncToGenerator(regeneratorRuntime.mark(function _callee9(args) {
            var productId;
            return regeneratorRuntime.wrap(function _callee9$(_context9) {
                while (1) {
                    switch (_context9.prev = _context9.next) {
                        case 0:
                            productId = (0, _graphqlRelay.fromGlobalId)(args.productId).id;

                            delete args.clientMutationId;
                            delete args.productId;
                            _context9.next = 5;
                            return _ProductService2.default.modifyProductLocalizedContent(productId, args.locale, args);

                        case 5:
                            return _context9.abrupt('return', _context9.sent);

                        case 6:
                        case 'end':
                            return _context9.stop();
                    }
                }
            }, _callee9, undefined);
        }));

        return function mutateAndGetPayload(_x9) {
            return _ref9.apply(this, arguments);
        };
    }()
});