require("babel-polyfill");

import {
    GraphQLNonNull,
    GraphQLBoolean,
    GraphQLFloat,
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
    SKUType
} from '../Model'

import {
    getViewer,
} from '../stores/UserStore';

import SKUService from './SkuService'

export const CreateSKUMutation = new mutationWithClientMutationId({
    name: 'CreateSKUMutation',
    description: 'Function to create a sku',
    inputFields: {
        name: {type: new GraphQLNonNull(GraphQLString)},
        description: {type: GraphQLString},
        disabled: {type: GraphQLBoolean},
        startDate: {type: GraphQLString},
        endDate: {type: GraphQLString},
        visible: {type: GraphQLBoolean},
        price: {type: GraphQLFloat},
        currency: {type: GraphQLString},
        reference: {type: GraphQLString},
        threshold: {type: GraphQLInt},
        quantity: {type: GraphQLInt},
        available: {type: GraphQLBoolean}
    },
    outputFields: {
        viewer: {
            type: ViewerType,
            resolve: () => getViewer("me")
        },
        sku: {
            type: SKUType,
            resolve: (payload) => payload
        }
    },
    mutateAndGetPayload: async (args) => {
        delete args.clientMutationId;
        return await SKUService.createSKU(args)
    }
});

export const ModifySKUMutation = new mutationWithClientMutationId({
    name: 'ModifySKUMutation',
    description: 'Function to modify a sku',
    inputFields: {
        id: {type: new GraphQLNonNull(GraphQLString)},
        name: {type: new GraphQLNonNull(GraphQLString)},
        description: {type: GraphQLString},
        disabled: {type: GraphQLBoolean},
        startDate: {type: GraphQLString},
        endDate: {type: GraphQLString},
        visible: {type: GraphQLBoolean},
        price: {type: GraphQLFloat},
        currency: {type: GraphQLString},
        reference: {type: GraphQLString},
        threshold: {type: GraphQLInt},
        quantity: {type: GraphQLInt},
        available: {type: GraphQLBoolean}
    },
    outputFields: {
        viewer: {
            type: ViewerType,
            resolve: () => getViewer("me")
        },
        sku: {
            type: SKUType,
            resolve: (payload) => payload
        }
    },
    mutateAndGetPayload: async (args) => {
        args.id = fromGlobalId(args.id).id;
        delete args.clientMutationId;
        return await SKUService.modifySKU(args)
    }
});

export const DeleteSKUMutation = new mutationWithClientMutationId({
    name: 'DeleteSKUMutation',
    description: 'Function to delete a sku',
    inputFields: {
        id: {type: new GraphQLNonNull(GraphQLString)}
    },
    outputFields: {
        viewer: {
            type: ViewerType,
            resolve: () => getViewer("me")
        }
    },
    mutateAndGetPayload: async (args) => {
        let id = fromGlobalId(args.id).id;
        return await SKUService.deleteSKU(id)
    }
});