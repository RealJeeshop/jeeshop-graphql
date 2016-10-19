'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ModifyDiscountLocalizedContent = exports.CreateDiscountLocalizedContent = exports.DeleteDiscountLocalizedContent = exports.DeleteDiscountMutation = exports.ModifyDiscountMutation = exports.CreateDiscountMutation = undefined;

var _graphql = require('graphql');

var _graphqlRelay = require('graphql-relay');

var _Model = require('../Model');

var _UserStore = require('../stores/UserStore');

var _DiscountService = require('./DiscountService');

var _DiscountService2 = _interopRequireDefault(_DiscountService);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

require("babel-polyfill");

var CreateDiscountMutation = exports.CreateDiscountMutation = new _graphqlRelay.mutationWithClientMutationId({
    name: 'CreateDiscountMutation',
    description: 'Function to create a discount',
    inputFields: {
        name: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) },
        description: { type: _graphql.GraphQLString },
        disabled: { type: _graphql.GraphQLBoolean },
        startDate: { type: _graphql.GraphQLString },
        endDate: { type: _graphql.GraphQLString },
        visible: { type: _graphql.GraphQLBoolean },
        voucherCode: { type: _graphql.GraphQLString },
        usesPerCustomer: { type: _graphql.GraphQLInt },
        type: { type: _graphql.GraphQLString },
        triggerRule: { type: _graphql.GraphQLString },
        applicableTo: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) },
        triggerValue: { type: _graphql.GraphQLFloat },
        discountValue: { type: _graphql.GraphQLFloat },
        rateType: { type: _graphql.GraphQLBoolean },
        uniqueUse: { type: _graphql.GraphQLBoolean }
    },
    outputFields: {
        viewer: {
            type: _Model.ViewerType,
            resolve: function resolve() {
                return (0, _UserStore.getViewer)("me");
            }
        },
        discount: {
            type: _Model.DiscountType,
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
                            return _DiscountService2.default.createDiscount(args);

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

var ModifyDiscountMutation = exports.ModifyDiscountMutation = new _graphqlRelay.mutationWithClientMutationId({
    name: 'ModifyDiscountMutation',
    description: 'Function to modify a discount',
    inputFields: {
        id: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) },
        name: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) },
        description: { type: _graphql.GraphQLString },
        disabled: { type: _graphql.GraphQLBoolean },
        startDate: { type: _graphql.GraphQLString },
        endDate: { type: _graphql.GraphQLString },
        visible: { type: _graphql.GraphQLBoolean },
        voucherCode: { type: _graphql.GraphQLString },
        usesPerCustomer: { type: _graphql.GraphQLInt },
        type: { type: _graphql.GraphQLString },
        triggerRule: { type: _graphql.GraphQLString },
        applicableTo: { type: _graphql.GraphQLString },
        triggerValue: { type: _graphql.GraphQLFloat },
        discountValue: { type: _graphql.GraphQLFloat },
        rateType: { type: _graphql.GraphQLBoolean },
        uniqueUse: { type: _graphql.GraphQLBoolean }
    },
    outputFields: {
        viewer: {
            type: _Model.ViewerType,
            resolve: function resolve() {
                return (0, _UserStore.getViewer)("me");
            }
        },
        discount: {
            type: _Model.DiscountType,
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
                            return _DiscountService2.default.modifyDiscount(args);

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

var DeleteDiscountMutation = exports.DeleteDiscountMutation = new _graphqlRelay.mutationWithClientMutationId({
    name: 'DeleteDiscountMutation',
    description: 'Function to delete a discount',
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
                            return _DiscountService2.default.deleteDiscount(id);

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

var DeleteDiscountLocalizedContent = exports.DeleteDiscountLocalizedContent = new _graphqlRelay.mutationWithClientMutationId({
    name: 'DeleteDiscountLocalizedContent',
    description: 'Delete a localized content for a discount',
    inputFields: {
        discountId: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) },
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
            var discountId;
            return regeneratorRuntime.wrap(function _callee4$(_context4) {
                while (1) {
                    switch (_context4.prev = _context4.next) {
                        case 0:
                            discountId = (0, _graphqlRelay.fromGlobalId)(args.discountId).id;
                            _context4.next = 3;
                            return _DiscountService2.default.deleteDiscountLocalizedContent(discountId, args.locale);

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

var CreateDiscountLocalizedContent = exports.CreateDiscountLocalizedContent = new _graphqlRelay.mutationWithClientMutationId({
    name: 'CreateDiscountLocalizedContent',
    description: 'create a localized content for a discount',
    inputFields: {
        discountId: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) },
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
        discount: {
            type: _Model.DiscountType,
            resolve: function resolve(discountId) {
                return _DiscountService2.default.findDiscountById(discountId);
            }
        }
    },
    mutateAndGetPayload: function () {
        var _ref5 = _asyncToGenerator(regeneratorRuntime.mark(function _callee5(args) {
            var discountId;
            return regeneratorRuntime.wrap(function _callee5$(_context5) {
                while (1) {
                    switch (_context5.prev = _context5.next) {
                        case 0:
                            discountId = (0, _graphqlRelay.fromGlobalId)(args.discountId).id;

                            delete args.clientMutationId;
                            delete args.discountId;
                            _context5.next = 5;
                            return _DiscountService2.default.createDiscountLocalizedContent(discountId, args.locale, args);

                        case 5:
                            return _context5.abrupt('return', discountId);

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

var ModifyDiscountLocalizedContent = exports.ModifyDiscountLocalizedContent = new _graphqlRelay.mutationWithClientMutationId({
    name: 'ModifyDiscountLocalizedContent',
    description: 'modify a localized content for a discount',
    inputFields: {
        id: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) },
        discountId: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) },
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
        discount: {
            type: _Model.DiscountType,
            resolve: function resolve(payload) {
                return _DiscountService2.default.findDiscountById(payload.discountId);
            }
        }
    },
    mutateAndGetPayload: function () {
        var _ref6 = _asyncToGenerator(regeneratorRuntime.mark(function _callee6(args) {
            var discountId, localizedContent;
            return regeneratorRuntime.wrap(function _callee6$(_context6) {
                while (1) {
                    switch (_context6.prev = _context6.next) {
                        case 0:
                            args.id = (0, _graphqlRelay.fromGlobalId)(args.id).id;
                            discountId = (0, _graphqlRelay.fromGlobalId)(args.discountId).id;

                            delete args.clientMutationId;
                            delete args.discountId;
                            _context6.next = 6;
                            return _DiscountService2.default.modifyDiscountLocalizedContent(discountId, args.locale, args);

                        case 6:
                            localizedContent = _context6.sent;
                            return _context6.abrupt('return', {
                                localizedContent: localizedContent,
                                discountId: discountId
                            });

                        case 8:
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