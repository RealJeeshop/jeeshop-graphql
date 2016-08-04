require("babel-polyfill");

import {
    GraphQLNonNull,
    GraphQLBoolean,
    GraphQLList,
    GraphQLInt,
    GraphQLString
} from 'graphql'

import {
    connectionArgs,
    mutationWithClientMutationId,
    cursorForObjectInConnection,
    connectionFromPromisedArray,
    fromGlobalId
} from 'graphql-relay'


import {
    ViewerType,
    CatalogConnection,
    CatalogEdge,
    CatalogType
} from '../Model'

import {
    getViewer,
} from '../stores/UserStore';

import CatalogService from './CatalogService'

export const CreateCatalogMutation = new mutationWithClientMutationId({
    name: 'CreateCatalog',
    description: 'Function to create a catalog',
    inputFields: {
        name: {type: new GraphQLNonNull(GraphQLString)},
        description: {type: GraphQLString},
        disabled: {type: GraphQLBoolean},
        startDate: {type: GraphQLString},
        endDate: {type: GraphQLString},
        visible: {type: GraphQLBoolean},
        rootCategoriesIds: {type: new GraphQLList(GraphQLInt)}
    },
    outputFields: {
        viewer: {
            type: ViewerType,
            resolve: () => getViewer("me")
        },
        catalogEdge: {
            type: CatalogEdge,
            resolve: async ({id}) => {
                let catalog = await CatalogService.findCatalogById(id);
                let catalogs = await CatalogService.findAllCatalog();
                let cursor = cursorForObjectInConnection(catalogs, catalog);
                return {
                    cursor: cursor,
                    node: catalog
                }
            }
        }
    },
    mutateAndGetPayload: async (args) => {

        console.log("args in catalog mutation: " + JSON.stringify(args));

        delete args.clientMutationId;
        let catalog = await CatalogService.createCatalog(args)
        console.log("catalog : " + JSON.stringify(catalog));
        return catalog
    }
});

export const ModifyCatalogMutation = new mutationWithClientMutationId({
    name: 'ModifyCatalog',
    description: 'Function to modify a catalog',
    inputFields: {
        id: {type: GraphQLString},
        name: {type: new GraphQLNonNull(GraphQLString)},
        description: {type: GraphQLString},
        disabled: {type: GraphQLBoolean},
        startDate: {type: GraphQLString},
        endDate: {type: GraphQLString},
        visible: {type: GraphQLBoolean},
        localizedPresentation: {type: GraphQLString},
        rootCategoriesIds: {type: new GraphQLList(GraphQLInt)}
    },
    outputFields: {
        viewer: {
            type: ViewerType,
            resolve: () => getViewer("me")
        },
        catalogEdge: {
            type: CatalogEdge,
            resolve: async (payload) => {
                console.log("payload : " + JSON.stringify(payload));
                let catalog = await CatalogService.findCatalogById(payload);
                let catalogs = await CatalogService.findAllCatalog();
                let cursor = cursorForObjectInConnection(catalogs, catalog);
                return {
                    cursor: cursor,
                    node: catalog
                }
            }
        }
    },
    mutateAndGetPayload: async (args) => {

        console.log("args in modify catalog mutation: " + JSON.stringify(args));

        delete args.clientMutationId;
        let catalog = await CatalogService.modifyCatalog(args);
        console.log("response of modify catalog : " + JSON.stringify(catalog));
        return catalog
    }
});

export const DeleteCatalogMutation = new mutationWithClientMutationId({
    name: 'DeleteCatalog',
    description: 'Function to delete a catalog',
    inputFields: {
        id: {type: new GraphQLNonNull(GraphQLString)}
    },
    outputFields: {
        viewer: {
            type: ViewerType,
            resolve: () => getViewer("me")
        },
        catalogs: {
            type: CatalogConnection,
            resolve: async () => {
                let catalogs = await CatalogService.findAllCatalog();
                return catalogs
            }
        }
    },
    mutateAndGetPayload: async (args) => {
        let catalog = await CatalogService.deleteCatalog(fromGlobalId(args.id).id);
        return catalog
    }
});

