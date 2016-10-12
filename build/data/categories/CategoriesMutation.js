'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.DeleteCategoryLocalizedContent = exports.ModifyCategoryLocalizedContent = exports.CreateCategoryLocalizedContentMutation = exports.DeleteCategoryMutation = exports.ModifyCategoryMutation = exports.CreateCategoryMutation = undefined;

var _graphql = require('graphql');

var _graphqlRelay = require('graphql-relay');

var _Model = require('../Model');

var _UserStore = require('../stores/UserStore');

var _CategoriesService = require('./CategoriesService');

var _CategoriesService2 = _interopRequireDefault(_CategoriesService);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

require("babel-polyfill");

var CreateCategoryMutation = exports.CreateCategoryMutation = new _graphqlRelay.mutationWithClientMutationId({
    name: 'CreateCategory',
    description: 'Function to create a category',
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
        categoryEdge: {
            type: _Model.CategoryEdge,
            resolve: function () {
                var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(payload) {
                    var categories, cursor;
                    return regeneratorRuntime.wrap(function _callee$(_context) {
                        while (1) {
                            switch (_context.prev = _context.next) {
                                case 0:
                                    _context.next = 2;
                                    return _CategoriesService2.default.findAllCategories();

                                case 2:
                                    categories = _context.sent;
                                    cursor = (0, _graphqlRelay.cursorForObjectInConnection)(categories, payload);
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
                            return _CategoriesService2.default.createCategory(args);

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

var ModifyCategoryMutation = exports.ModifyCategoryMutation = new _graphqlRelay.mutationWithClientMutationId({
    name: 'ModifyCategory',
    description: 'Function to modify a category',
    inputFields: {
        id: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) },
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
        categoryEdge: {
            type: _Model.CategoryEdge,
            resolve: function () {
                var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(payload) {
                    var categories, cursor;
                    return regeneratorRuntime.wrap(function _callee3$(_context3) {
                        while (1) {
                            switch (_context3.prev = _context3.next) {
                                case 0:
                                    _context3.next = 2;
                                    return _CategoriesService2.default.findAllCategories();

                                case 2:
                                    categories = _context3.sent;
                                    cursor = (0, _graphqlRelay.cursorForObjectInConnection)(categories, payload);
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
                            return _CategoriesService2.default.modifyCategory(args);

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

var DeleteCategoryMutation = exports.DeleteCategoryMutation = new _graphqlRelay.mutationWithClientMutationId({
    name: 'DeleteCategory',
    description: 'Function to delete a Category',
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
                            return _CategoriesService2.default.deleteCategory((0, _graphqlRelay.fromGlobalId)(args.id).id);

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
                            return _CategoriesService2.default.createCategoryLocalizedContent(id, args);

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

var ModifyCategoryLocalizedContent = exports.ModifyCategoryLocalizedContent = new _graphqlRelay.mutationWithClientMutationId({
    name: 'ModifyCategoryLocalizedContent',
    description: 'Modify a localized content for a category',
    inputFields: {
        categoryId: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) },
        id: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) },
        locale: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) },
        displayName: { type: _graphql.GraphQLString },
        shortDescription: { type: _graphql.GraphQLString },
        mediumDescription: { type: _graphql.GraphQLString },
        longDescription: { type: _graphql.GraphQLString },
        smallImage: { type: _graphql.GraphQLString },
        largeImage: { type: _graphql.GraphQLString },
        video: { type: _graphql.GraphQLString },
        features: { type: _graphql.GraphQLString }
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
            var categoryId;
            return regeneratorRuntime.wrap(function _callee7$(_context7) {
                while (1) {
                    switch (_context7.prev = _context7.next) {
                        case 0:
                            args.id = (0, _graphqlRelay.fromGlobalId)(args.id).id;
                            categoryId = (0, _graphqlRelay.fromGlobalId)(args.categoryId).id;

                            delete args.clientMutationId;
                            delete args.categoryId;
                            _context7.next = 6;
                            return _CategoriesService2.default.modifyCategoryLocalizedContent(categoryId, args);

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

// Seems to work but there's an error
var DeleteCategoryLocalizedContent = exports.DeleteCategoryLocalizedContent = new _graphqlRelay.mutationWithClientMutationId({
    name: 'DeleteCategoryLocalizedContent',
    description: 'Delete a localized content for a category',
    inputFields: {
        categoryId: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) },
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
        var _ref8 = _asyncToGenerator(regeneratorRuntime.mark(function _callee8(args) {
            var categoryId;
            return regeneratorRuntime.wrap(function _callee8$(_context8) {
                while (1) {
                    switch (_context8.prev = _context8.next) {
                        case 0:
                            categoryId = (0, _graphqlRelay.fromGlobalId)(args.categoryId).id;
                            _context8.next = 3;
                            return _CategoriesService2.default.deleteCategoryLocalizedContent(categoryId, args.locale);

                        case 3:
                            return _context8.abrupt('return', _context8.sent);

                        case 4:
                        case 'end':
                            return _context8.stop();
                    }
                }
            }, _callee8, undefined);
        }));

        return function mutateAndGetPayload(_x8) {
            return _ref8.apply(this, arguments);
        };
    }()
});