'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.GraphQLRoot = exports.ViewerType = exports.SKUEdge = exports.SKUConnection = exports.ProductEdge = exports.ProductConnection = exports.CatalogEdge = exports.CatalogConnection = exports.UserEdge = exports.UserConnection = exports.UserType = exports.CatalogType = exports.CategoryEdge = exports.CategoryConnection = exports.CategoryType = exports.ProductType = exports.SKUType = exports.DiscountType = exports.PresentationType = exports.ImageType = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _graphql = require('graphql');

var _graphqlRelay = require('graphql-relay');

var _UserStore = require('./stores/UserStore');

var _CatalogService = require('./catalog/CatalogService');

var _CatalogService2 = _interopRequireDefault(_CatalogService);

var _CategoriesService = require('./categories/CategoriesService');

var _CategoriesService2 = _interopRequireDefault(_CategoriesService);

var _UsersService = require('./users/UsersService');

var _UsersService2 = _interopRequireDefault(_UsersService);

var _ProductService = require('./product/ProductService');

var _ProductService2 = _interopRequireDefault(_ProductService);

var _SkuService = require('./product/SkuService');

var _SkuService2 = _interopRequireDefault(_SkuService);

var _DiscountService = require('./discount/DiscountService');

var _DiscountService2 = _interopRequireDefault(_DiscountService);

var _jsBase = require('js-base64');

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * The first argument defines the way to resolve an ID to its object.
 * The second argument defines the way to resolve a node object to its GraphQL type.
 */
var _nodeDefinitions = (0, _graphqlRelay.nodeDefinitions)(function (globalId) {
    var _fromGlobalId = (0, _graphqlRelay.fromGlobalId)(globalId);

    var id = _fromGlobalId.catalogId;
    var type = _fromGlobalId.type;


    if (type === 'CatalogType') {
        return _CatalogService2.default.findCatalogById(id);
    } else if (type === 'UserType') {
        return _axios2.default.get('https://apps-jeeshop.rhcloud.com/jeeshop-admin/rs/user/' + id, { headers: config }).then(function (r) {
            return r.data;
        });
    } else if (type === 'ViewerType') {
        return (0, _UserStore.getViewer)(id);
    } else if (type === 'ImageType') {
        return null;
    } else if (type === 'PresentationType') {
        return null;
    } else if (type === 'CategoryType') {
        return _CategoriesService2.default.findCategoryById(id, (0, _UserStore.getViewerLocale)("me"));
    } else if (type === 'ProductType') {
        return _ProductService2.default.findProductById(id, (0, _UserStore.getViewerLocale)("me"));
    } else if (type === 'SKUType') {
        return _SkuService2.default.findSKUById(id);
    }
    return null;
}, function (obj) {

    if (obj.login != undefined) {
        return UserType;
    } else if (obj.description != undefined) {
        return CatalogType;
    } else if (obj.email) {
        return UserType;
    } else if (obj.uri) {
        return ImageType;
    } else if (obj.promotion) {
        return ProductType;
    } else if (obj.price) {
        return SKUType;
    }
    return null;
});

var nodeInterface = _nodeDefinitions.nodeInterface;
var nodeField = _nodeDefinitions.nodeField;
var ImageType = exports.ImageType = new _graphql.GraphQLObjectType({
    name: "ImageType",
    description: "It represents an image",
    fields: {
        id: (0, _graphqlRelay.globalIdField)('ImageType'),
        uri: { type: _graphql.GraphQLString, resolve: function resolve(obj) {
                return obj.uri;
            } }
    }
});

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
        smallImage: { type: ImageType, resolve: function resolve(obj) {
                return obj.smallImage;
            } },
        largeImage: { type: ImageType, resolve: function resolve(obj) {
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

var DiscountType = exports.DiscountType = new _graphql.GraphQLObjectType({
    name: 'DiscountType',
    description: 'It represents a discount',
    fields: {
        id: (0, _graphqlRelay.globalIdField)('DiscountType'),
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
        usePerCustomer: { type: _graphql.GraphQLInt, resolve: function resolve(obj) {
                return obj.usePerCustomer;
            } },
        type: { type: _graphql.GraphQLString, resolve: function resolve(obj) {
                return obj.type;
            } },
        triggerRule: { type: _graphql.GraphQLString, resolve: function resolve(obj) {
                return obj.triggerRule;
            } },
        triggerValue: { type: _graphql.GraphQLFloat, resolve: function resolve(obj) {
                return obj.triggerValue;
            } },
        discountValue: { type: _graphql.GraphQLFloat, resolve: function resolve(obj) {
                return obj.discountValue;
            } },
        rateType: { type: _graphql.GraphQLBoolean, resolve: function resolve(obj) {
                return obj.rateType;
            } },
        uniqueUse: { type: _graphql.GraphQLBoolean, resolve: function resolve(obj) {
                return obj.uniqueUse;
            } }
    }
});

var SKUType = exports.SKUType = new _graphql.GraphQLObjectType({
    name: 'SKUType',
    description: 'It represents a SKU',
    fields: {
        id: (0, _graphqlRelay.globalIdField)('SKUType'),
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
        price: { type: _graphql.GraphQLFloat, resolve: function resolve(obj) {
                return obj.price;
            } },
        currency: { type: _graphql.GraphQLString, resolve: function resolve(obj) {
                return obj.currency;
            } },
        reference: { type: _graphql.GraphQLString, resolve: function resolve(obj) {
                return obj.reference;
            } },
        threshold: { type: _graphql.GraphQLInt, resolve: function resolve(obj) {
                return obj.threshold;
            } },
        quantity: { type: _graphql.GraphQLInt, resolve: function resolve(obj) {
                return obj.quantity;
            } },
        available: { type: _graphql.GraphQLBoolean, resolve: function resolve(obj) {
                return obj.available;
            } },
        localizedPresentation: {
            type: PresentationType,
            args: { locale: { type: _graphql.GraphQLString } },
            resolve: function resolve(obj, args) {
                var locale = args.locale ? args.locale : (0, _UserStore.getViewerLocale)("me");
                return _SkuService2.default.findSKULocalizedContent(obj.catalogId, locale);
            }
        },
        discounts: {
            type: new _graphql.GraphQLList(DiscountType),
            resolve: function resolve(obj) {
                return _DiscountService2.default.findDiscountsWithMultipleIds(obj.discountsIds);
            }
        }
    }
});

var ProductType = exports.ProductType = new _graphql.GraphQLObjectType({
    name: "ProductType",
    description: "It represents a product",
    fields: {
        id: (0, _graphqlRelay.globalIdField)('ProductType'),
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
                console.log("locale : " + JSON.stringify(locale));
                return _ProductService2.default.findProductLocalizedContent(obj.catalogId, locale);
            }
        },
        skus: {
            type: new _graphql.GraphQLList(SKUType),
            resolve: function resolve(obj, args) {
                return _ProductService2.default.findProductRelatedSKUs(obj.catalogId);
            }
        }
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
                return _CategoriesService2.default.getCategoryLocalizedContent(obj.catalogId, locale);
            } },
        childCategoriesId: { type: _graphql.GraphQLString, resolve: function resolve(obj) {
                return obj.childCategoriesId;
            } },
        childProductsIds: { type: _graphql.GraphQLString, resolve: function resolve(obj) {
                return obj.childProductsIds;
            } }
    }
});

var _connectionDefinition = (0, _graphqlRelay.connectionDefinitions)({
    name: 'CategoryType',
    nodeType: CategoryType
});

var CategoryConnection = _connectionDefinition.connectionType;
var CategoryEdge = _connectionDefinition.edgeType;
exports.CategoryConnection = CategoryConnection;
exports.CategoryEdge = CategoryEdge;
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
                return _CatalogService2.default.getCatalogLocalizedContent(obj.catalogId, locale);
            }
        },
        rootCategoriesId: { type: _graphql.GraphQLString, resolve: function resolve(obj) {
                return null;
            } },
        categories: {
            type: CategoryConnection,
            args: _extends({
                locale: { type: _graphql.GraphQLString }
            }, _graphqlRelay.connectionArgs),
            resolve: function resolve(obj, args) {
                return (0, _graphqlRelay.connectionFromPromisedArray)(_CategoriesService2.default.findCatalogCategories(obj.catalogId, args.locale), args);
            }
        }
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

var _connectionDefinition2 = (0, _graphqlRelay.connectionDefinitions)({
    name: 'UserType',
    nodeType: UserType
});

var UserConnection = _connectionDefinition2.connectionType;
var UserEdge = _connectionDefinition2.edgeType;
exports.UserConnection = UserConnection;
exports.UserEdge = UserEdge;

var _connectionDefinition3 = (0, _graphqlRelay.connectionDefinitions)({
    name: 'CatalogType',
    nodeType: CatalogType
});

var CatalogConnection = _connectionDefinition3.connectionType;
var CatalogEdge = _connectionDefinition3.edgeType;
exports.CatalogConnection = CatalogConnection;
exports.CatalogEdge = CatalogEdge;

var _connectionDefinition4 = (0, _graphqlRelay.connectionDefinitions)({
    name: 'ProductType',
    nodeType: ProductType
});

var ProductConnection = _connectionDefinition4.connectionType;
var ProductEdge = _connectionDefinition4.edgeType;
exports.ProductConnection = ProductConnection;
exports.ProductEdge = ProductEdge;

var _connectionDefinition5 = (0, _graphqlRelay.connectionDefinitions)({
    name: 'SKUType',
    nodeType: SKUType
});

var SKUConnection = _connectionDefinition5.connectionType;
var SKUEdge = _connectionDefinition5.edgeType;
exports.SKUConnection = SKUConnection;
exports.SKUEdge = SKUEdge;
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
                    return _CatalogService2.default.findCatalogById((0, _graphqlRelay.fromGlobalId)(args.catalogId).catalogId);
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
            },
            category: {
                type: CategoryType,
                args: {
                    id: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) },
                    locale: { type: _graphql.GraphQLString }
                },
                resolve: function resolve(obj, args) {
                    return _CategoriesService2.default.findCategoryById((0, _graphqlRelay.fromGlobalId)(args.catalogId).catalogId, args.locale);
                }
            },
            products: {
                type: ProductConnection,
                args: _extends({
                    search: { type: _graphql.GraphQLString },
                    start: { type: _graphql.GraphQLInt },
                    size: { type: _graphql.GraphQLInt },
                    orderBy: { type: _graphql.GraphQLString },
                    isDesc: { type: _graphql.GraphQLBoolean }
                }, _graphqlRelay.connectionArgs),
                resolve: function resolve(obj, args) {
                    return (0, _graphqlRelay.connectionFromPromisedArray)(_ProductService2.default.findAllProducts(args), args);
                }
            },
            product: {
                type: ProductType,
                args: {
                    id: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) },
                    locale: { type: _graphql.GraphQLString }
                },
                resolve: function resolve(obj, args) {
                    return _ProductService2.default.findProductById(args.catalogId, args.locale);
                }
            },
            skus: {
                type: SKUConnection,
                args: _extends({
                    search: { type: _graphql.GraphQLString },
                    start: { type: _graphql.GraphQLInt },
                    size: { type: _graphql.GraphQLInt },
                    orderBy: { type: _graphql.GraphQLString },
                    isDesc: { type: _graphql.GraphQLBoolean }
                }, _graphqlRelay.connectionArgs),
                resolve: function resolve(obj, args) {
                    return (0, _graphqlRelay.connectionFromPromisedArray)(_SkuService2.default.findAllSKUs(args), args);
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