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
