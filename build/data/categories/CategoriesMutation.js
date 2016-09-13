'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.CreateCategoryLocalizedContentMutation = undefined;

var _graphql = require('graphql');

var _graphqlRelay = require('graphql-relay');

var _Model = require('../Model');

var _UserStore = require('../stores/UserStore');

var _CategoriesService = require('./CategoriesService');

var _CategoriesService2 = _interopRequireDefault(_CategoriesService);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

require("babel-polyfill");

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