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
    registerViewer,
    getViewer,
} from './stores/UserStore';

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
            return axios.get(`https://apps-jeeshop.rhcloud.com/jeeshop-admin/rs/catalogs`, {headers: config, id: id}).then(r => r.data)
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
        localizedPresentation: {type: GraphQLString, resolve: (obj) => null},
        rootCategoriesId: {type: GraphQLString, resolve: (obj) => null}
    },
    interfaces: [nodeInterface]
})

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
            resolve: (obj, args) => {

                let config = {'Authorization': "Basic YWRtaW5AamVlc2hvcC5vcmc6amVlc2hvcA=="};

                return connectionFromPromisedArray(axios.get(`https://apps-jeeshop.rhcloud.com/jeeshop-admin/rs/users`, {headers: config})
                    .then((response) => response.data), args)
            }
        },
        catalogs: {
            type: CatalogConnection,
            args: {
                search: {type: GraphQLString},
                start: {type: GraphQLInt},
                size: {type: GraphQLInt},
                orderBy: {type: GraphQLString},
                isDesc: {type: GraphQLBoolean},
                ...connectionArgs
            },
            resolve: (obj, args) => {

                let config = {'Authorization': "Basic YWRtaW5AamVlc2hvcC5vcmc6amVlc2hvcA=="};
                return connectionFromPromisedArray(axios.get(`https://apps-jeeshop.rhcloud.com/jeeshop-admin/rs/catalogs`, {params: args, headers: config})
                    .then((response) => {
                        return response.data
                    }).catch((response) => {
                        if(response.status == "404") return []
                    }), args)
            }
        },
        catalog: {
            type: CatalogType,
            args: {
                id: {type: new GraphQLNonNull(GraphQLString)},
                locale: {type: GraphQLString}
            },
            resolve: (obj, args) => {

                let config = {'Authorization': "Basic YWRtaW5AamVlc2hvcC5vcmc6amVlc2hvcA=="};
                let {id, type} = fromGlobalId(args.id);
                return axios.get(`https://apps-jeeshop.rhcloud.com/jeeshop-admin/rs/catalogs/${id}`, {params: args, headers: config})
                    .then((response) => {
                        return response.data
                    }).catch((response) => {
                        if(response.status == "404") return []
                    })
            }
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

