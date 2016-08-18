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
    ViewerType
} from '../Model'

import {
    getViewer,
} from '../stores/UserStore';

import CategoriesService from './CategoriesService'

export const CreateCategoryLocalizedContentMutation = new mutationWithClientMutationId({
    name: 'CreateCategoryLocalizedContent',
    description: 'Creates a localized content for a category',
    inputFields: {
        id: {type: new GraphQLNonNull(GraphQLString)},
        locale: {type: new GraphQLNonNull(GraphQLString)},
        displayName: {type: GraphQLString},
        shortDescription: {type: GraphQLString},
        mediumDescription: {type: GraphQLString},
        longDescription: {type: GraphQLString}
    },
    outputFields: {
        viewer: {
            type: ViewerType,
            resolve: () => getViewer("me")
        }
    },
    mutateAndGetPayload: async (args) => {
        let id = fromGlobalId(args.id).id;
        delete args.id;
        delete args.clientMutationId;
        console.log("args : " + JSON.stringify(args));
        return await CategoriesService.createCategoryLocalizedContent(id, args)
    }
});

