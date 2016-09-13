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
            return axios.get(`https://apps-jeeshop.rhcloud.com/jeeshop-admin/rs/user/` + id, {headers: config}).then(r => r.data)
        } else if (type === 'ViewerType') {
            return getViewer(id)
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
        }
        return null
    }
);

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
        smallImage: {type: GraphQLString, resolve: (obj) => obj.smallImage},
        largeImage: {type: GraphQLString, resolve: (obj) => obj.largeImage},
        video: {type: GraphQLString, resolve: (obj) => obj.video},
        features: {type: GraphQLString, resolve: (obj) => obj.features},
    }
});

export const CategoryType = new GraphQLObjectType({
    name: 'CategoryType',
    description: 'It represents a category',
    fields: {
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
        childProductsIds: {type: GraphQLString, resolve: (obj) => obj.childProductsIds}
    }
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
        rootCategoriesId: {type: GraphQLString, resolve: (obj) => null}
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
    connectionType: CategoryConnection
    , edgeType: CategoryEdge,
} = connectionDefinitions({
    name: 'CategoryType',
    nodeType: CategoryType
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

