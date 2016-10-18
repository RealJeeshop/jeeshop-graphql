import {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLFloat,
    GraphQLString,
    GraphQLBoolean,
    GraphQLList,
    GraphQLNonNull,
    GraphQLSchema
} from 'graphql'

import {
    connectionArgs,
    connectionDefinitions,
    connectionFromPromisedArray,
    connectionFromArray,
    fromGlobalId,
    globalIdField,
    nodeDefinitions,
    mutationWithClientMutationId,
    cursorForObjectInConnection,
    offsetToCursor
} from 'graphql-relay'

import {
    Viewer,
    getViewerLocale,
    getViewer,
} from './stores/UserStore';

import CatalogService from './catalog/CatalogService'
import CategoriesService from './categories/CategoriesService'
import UsersService from './users/UsersService'
import ProductService from './product/ProductService'
import SKUService from './product/SkuService'
import DiscountService from './discount/DiscountService'

import {
    Base64
} from 'js-base64'

import axios from 'axios'


/**
 * The first argument defines the way to resolve an ID to its object.
 * The second argument defines the way to resolve a node object to its GraphQL type.
 */
var {nodeInterface, nodeField} = nodeDefinitions(
    (globalId) => {
        let {id, type} = fromGlobalId(globalId);

        if (type === 'CatalogType') {
            return CatalogService.findCatalogById(id)
        } else if (type === 'UserType') {
            return UsersService.findUserById(id)
        } else if (type === 'ViewerType') {
            return getViewer("me")
        } else if(type === 'ImageType') {
            return null
        } else if(type === 'PresentationType' ) {
            return null
        } else if(type === 'CategoryType') {
            return CategoriesService.findCategoryById(id, getViewerLocale("me"))
        } else if(type === 'ProductType') {
            return ProductService.findProductById(id, getViewerLocale("me"))
        } else if(type === 'SKUType') {
            return SKUService.findSKUById(id, getViewerLocale("me"))
        } else if(type === 'DiscountType') {
            return DiscountService.findDiscountById(id, getViewerLocale("me"))
        }
        return null;
    },
    (obj) => {

        if (obj.login != undefined) {
            return UserType
        } else if (obj.description != undefined) {
            return CatalogType
        } else if (obj.email) {
            return UserType
        } else if (obj.uri) {
            return ImageType
        } else if(obj.promotion) {
            return ProductType
        } else if(obj.price) {
            return SKUType
        } else if(obj.uniqueUse) {
            return DiscountType
        }
        return null
    }
);

export const ImageType = new GraphQLObjectType({
    name: "ImageType",
    description: "It represents an image",
    fields: {
        id: globalIdField('ImageType'),
        uri: {type: GraphQLString, resolve: (obj) => obj.uri}
    }
});

export const PresentationType = new GraphQLObjectType({
    name: 'PresentationType',
    description: 'It represents a localized presentation',
    fields: {
        id: globalIdField('PresentationType'),
        locale: {type: GraphQLString, resolve: (obj) => obj.locale},
        displayName: {type: GraphQLString, resolve: (obj) => obj.displayName},
        promotion: {type: GraphQLString, resolve: (obj) => obj.promotion},
        shortDescription: {type: GraphQLString, resolve: (obj) => obj.shortDescription},
        mediumDescription: {type: GraphQLString, resolve: (obj) => obj.mediumDescription},
        longDescription: {type: GraphQLString, resolve: (obj) => obj.longDescription},
        thumbnail: {type: GraphQLString, resolve: (obj) => obj.thumbnail},
        smallImage: {type: ImageType, resolve: (obj) => obj.smallImage},
        largeImage: {type: ImageType, resolve: (obj) => obj.largeImage},
        video: {type: GraphQLString, resolve: (obj) => obj.video},
        features: {type: GraphQLString, resolve: (obj) => obj.features},
    }
});


export const DiscountType = new GraphQLObjectType({
    name: 'DiscountType',
    description: 'It represents a discount',
    fields: {
        id: globalIdField('DiscountType'),
        name: {type: GraphQLString, resolve: (obj) => obj.name},
        description: {type: GraphQLString, resolve: (obj) => obj.description},
        disabled: {type: GraphQLBoolean, resolve: (obj) => obj.disabled},
        startDate: {type: GraphQLString, resolve: (obj) => obj.startDate},
        endDate: {type: GraphQLString, resolve: (obj) => obj.endDate},
        visible: {type: GraphQLBoolean, resolve: (obj) => obj.visible},
        usePerCustomer: {type: GraphQLInt, resolve: (obj) => obj.usePerCustomer},
        type: {type: GraphQLString, resolve: (obj) => obj.type},
        triggerRule: {type: GraphQLString, resolve: (obj) => obj.triggerRule},
        triggerValue: {type: GraphQLFloat, resolve: (obj) => obj.triggerValue},
        discountValue: {type: GraphQLFloat, resolve: (obj) => obj.discountValue},
        rateType: {type: GraphQLBoolean, resolve: (obj) => obj.rateType},
        uniqueUse: {type: GraphQLBoolean, resolve: (obj) => obj.uniqueUse},
    }
});


export const SKUType = new GraphQLObjectType({
    name: 'SKUType',
    description: 'It represents a SKU',
    fields: {
        id: globalIdField('SKUType'),
        name: {type: GraphQLString, resolve: (obj) => obj.name},
        description: {type: GraphQLString, resolve: (obj) => obj.description},
        disabled: {type: GraphQLBoolean, resolve: (obj) => obj.disabled},
        startDate: {type: GraphQLString, resolve: (obj) => obj.startDate},
        endDate: {type: GraphQLString, resolve: (obj) => obj.endDate},
        price: {type: GraphQLFloat, resolve: (obj) => obj.price},
        currency: {type: GraphQLString, resolve: (obj) => obj.currency},
        reference: {type: GraphQLString, resolve: (obj) => obj.reference},
        threshold: {type: GraphQLInt, resolve: (obj) => obj.threshold},
        quantity: {type: GraphQLInt, resolve: (obj) => obj.quantity},
        available: {type: GraphQLBoolean, resolve: (obj) => obj.available},
        localizedPresentation: {
            type: PresentationType,
            args: {locale: {type: GraphQLString}},
            resolve: (obj, args) => {
                let locale = args.locale ? args.locale : getViewerLocale("me");
                return SKUService.findSKULocalizedContent(obj.id, locale)
            }
        },
        discounts: {
            type: new GraphQLList(DiscountType),
            resolve: (obj) => DiscountService.findDiscountsWithMultipleIds(obj.discountsIds)
        }
    }
});

export const ProductType = new GraphQLObjectType({
    name: "ProductType",
    description: "It represents a product",
    fields: {
        id: globalIdField('ProductType'),
        name: {type: GraphQLString, resolve: (obj) => obj.name},
        description: {type: GraphQLString, resolve: (obj) => obj.description},
        disabled: {type: GraphQLString, resolve: (obj) => obj.disabled},
        startDate: {type: GraphQLString, resolve: (obj) => obj.startDate},
        endDate: {type: GraphQLString, resolve: (obj) => obj.endDate},
        visible: {type: GraphQLBoolean, resolve: (obj) => obj.visible},
        localizedPresentation: {
            type: PresentationType,
            args: {locale: {type: GraphQLString}},
            resolve: (obj, args) => {
                let locale = args.locale ? args.locale : getViewerLocale("me");
                console.log("locale : " + JSON.stringify(locale));
                return ProductService.findProductLocalizedContent(obj.id, locale)
            }
        },
        skus: {
            type: new GraphQLList(SKUType),
            resolve: (obj, args) => {
                return ProductService.findProductRelatedSKUs(obj.id)
            }
        }
    }
});

export const CategoryType = new GraphQLObjectType({
    name: 'CategoryType',
    description: 'It represents a category',
    fields: () => ({
        id: globalIdField('CategoryType'),
        name: {type: GraphQLString, resolve: (obj) => obj.name},
        description: {type: GraphQLString, resolve: (obj) => obj.description},
        disabled: {type: GraphQLString, resolve: (obj) => obj.disabled},
        startDate: {type: GraphQLString, resolve: (obj) => obj.startDate},
        endDate: {type: GraphQLString, resolve: (obj) => obj.endDate},
        visible: {type: GraphQLBoolean, resolve: (obj) => obj.visible},
        localizedPresentation: {
            type: PresentationType,
            args: {locale: {type: GraphQLString}},
            resolve: (obj, args) => {
                let locale = args.locale ? args.locale : getViewerLocale("me");
                return CategoriesService.getCategoryLocalizedContent(obj.id, locale)
            }},
        childCategoriesId: {type: GraphQLString, resolve: (obj) => obj.childCategoriesId},
        childProductsIds: {type: GraphQLString, resolve: (obj) => obj.childProductsIds},
        relatedCategories: {
            type: CategoryConnection,
            args: {
                locale: {type: GraphQLString},
                ...connectionArgs
            },
            resolve: (obj, args) => {
                return connectionFromPromisedArray(CategoriesService.findCategoryRelatedCategories(obj.id, args.locale), args)
            }
        }
    })
});


export var {
    connectionType: CategoryConnection
    , edgeType: CategoryEdge,
} = connectionDefinitions({
    name: 'CategoryType',
    nodeType: CategoryType
});


export var CatalogType = new GraphQLObjectType({

    name: 'CatalogType',
    description: 'It represents a catalog',
    fields: {
        id: globalIdField('CatalogType'),
        name: {type: GraphQLString, resolve: (obj) => obj.name},
        description: {type: GraphQLString, resolve: (obj) => obj.description},
        disabled: {type: GraphQLBoolean, resolve: (obj) => obj.disabled},
        startDate: {type: GraphQLString, resolve: (obj) => obj.startDate},
        endDate: {type: GraphQLString, resolve: (obj) => obj.endDate},
        visible: {type: GraphQLBoolean, resolve: (obj) => obj.visible},
        localizedPresentation: {
            type: PresentationType,
            args: {locale: {type: GraphQLString}},
            resolve: (obj, args) => {
                let locale = args.locale ? args.locale : getViewerLocale("me");
                return CatalogService.getCatalogLocalizedContent(obj.id, locale)
            }
        },
        rootCategoriesId: {type: GraphQLString, resolve: (obj) => null},
        categories: {
            type: CategoryConnection,
            args: {
                locale: {type: GraphQLString},
                ...connectionArgs
            },
            resolve: (obj, args) => {
                return connectionFromPromisedArray(CategoriesService.findCatalogCategories(obj.id, args.locale), args)
            }
        }
    },
    interfaces: [nodeInterface]
});

export var UserType = new GraphQLObjectType({
    name: 'UserType',
    description: 'It display the information related to an user',
    fields: {
        id: globalIdField('UserType'),
        login: {
            type: GraphQLString,
            resolve: (obj) => obj.login //email
        },
        password: {
            type: GraphQLString,
            resolve: (obj) => obj.password
        }
    },
    interfaces: [nodeInterface]
});

export var {
    connectionType: UserConnection
    , edgeType: UserEdge,
} = connectionDefinitions({
    name: 'UserType',
    nodeType: UserType
});

export var {
    connectionType: CatalogConnection
    , edgeType: CatalogEdge,
} = connectionDefinitions({
    name: 'CatalogType',
    nodeType: CatalogType
});

export var {
    connectionType: ProductConnection
    , edgeType: ProductEdge,
} = connectionDefinitions({
    name: 'ProductType',
    nodeType: ProductType
});

export var {
    connectionType: SKUConnection
    , edgeType: SKUEdge,
} = connectionDefinitions({
    name: 'SKUType',
    nodeType: SKUType
});


export var {
    connectionType: DiscountConnection
    , edgeType: DiscountEdge,
} = connectionDefinitions({
    name: 'DiscountType',
    nodeType: DiscountType
});


export var ViewerType = new GraphQLObjectType({
    name: 'Viewer',
    fields: () => ({
        id: globalIdField('Viewer'),
        user: {
            type: UserType,
            resolve: (obj) => obj
        },
        users: {

            type: UserConnection,
            args: {...connectionArgs},
            resolve: (obj, args) => connectionFromPromisedArray(UsersService.findAllUsers(), args)
        },
        catalogs: {
            type: CatalogConnection,
            args: {
                search: {type: GraphQLString},
                start: {type: GraphQLInt},
                size: {type: GraphQLInt},
                orderBy: {type: GraphQLString},
                isDesc: {type: GraphQLBoolean},
                locale: {type: GraphQLString},
                ...connectionArgs
            },
            resolve: (obj, args) => connectionFromPromisedArray(CatalogService.findAllCatalog(args), args)
        },
        catalog: {
            type: CatalogType,
            args: {
                id: {type: new GraphQLNonNull(GraphQLString)},
                locale: {type: GraphQLString}
            },
            resolve: (obj, args) => CatalogService.findCatalogById(fromGlobalId(args.id).id)
        },
        categories: {
            type: CategoryConnection,
            args: {
                search: {type: GraphQLString},
                start: {type: GraphQLInt},
                size: {type: GraphQLInt},
                orderBy: {type: GraphQLString},
                isDesc: {type: GraphQLBoolean},
                ...connectionArgs
            },
            resolve: (obj, args) => connectionFromPromisedArray(CategoriesService.findAllCategories(args), args)
        },
        category: {
            type: CategoryType,
            args: {
                id: {type: new GraphQLNonNull(GraphQLString)},
                locale: {type: GraphQLString}
            },
            resolve: (obj, args) => CategoriesService.findCategoryById(fromGlobalId(args.id).id, args.locale)
        },
        products: {
            type: ProductConnection,
            args: {
                search: {type: GraphQLString},
                start: {type: GraphQLInt},
                size: {type: GraphQLInt},
                orderBy: {type: GraphQLString},
                isDesc: {type: GraphQLBoolean},
                ...connectionArgs
            },
            resolve: (obj, args) => connectionFromPromisedArray(ProductService.findAllProducts(args), args)
        },
        product: {
            type: ProductType,
            args: {
                id: {type: new GraphQLNonNull(GraphQLString)},
                locale: {type: GraphQLString}
            },
            resolve: (obj, args) => ProductService.findProductById(args.id, args.locale)
        },
        skus: {
            type: SKUConnection,
            args: {
                search: {type: GraphQLString},
                start: {type: GraphQLInt},
                size: {type: GraphQLInt},
                orderBy: {type: GraphQLString},
                isDesc: {type: GraphQLBoolean},
                ...connectionArgs
            },
            resolve: (obj, args) => connectionFromPromisedArray(SKUService.findAllSKUs(args), args)
        },
        discounts: {
            type: DiscountConnection,
            args: {
                search: {type: GraphQLString},
                start: {type: GraphQLInt},
                size: {type: GraphQLInt},
                orderBy: {type: GraphQLString},
                isDesc: {type: GraphQLBoolean},
                ...connectionArgs
            },
            resolve: (obj, args) => connectionFromPromisedArray(DiscountService.findAllDiscounts(args), args)
        }
    }),
    interfaces: [nodeInterface]
});

export var GraphQLRoot = new GraphQLObjectType({
    name: 'Root',
    fields: {
        viewer: {
            type: ViewerType,
            args: {
                viewerId: {
                    name: 'viewerId',
                    type: GraphQLInt
                }
            },
            resolve: (root, {viewerId}) => {
                return getViewer("me")
            }
        },
        node: nodeField
    }
});

