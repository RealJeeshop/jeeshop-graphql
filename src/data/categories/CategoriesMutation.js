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
    CategoryEdge
} from '../Model'

import {
    getViewer,
} from '../stores/UserStore';

import CategoriesService from './CategoriesService'

export const CreateCategoryMutation = new mutationWithClientMutationId({
    name: 'CreateCategory',
    description: 'Function to create a category',
    inputFields: {
        name: {type: new GraphQLNonNull(GraphQLString)},
        description: {type: GraphQLString},
        disabled: {type: GraphQLBoolean},
        startDate: {type: GraphQLString},
        endDate: {type: GraphQLString},
        visible: {type: GraphQLBoolean}
    },
    outputFields: {
        viewer: {
            type: ViewerType,
            resolve: () => getViewer("me")
        },
        categoryEdge: {
            type: CategoryEdge,
            resolve: async (payload) => {

                let categories = await CategoriesService.findAllCategories();
                let cursor = cursorForObjectInConnection(categories, payload);
                return {
                    cursor: cursor,
                    node: payload
                }
            }
        }
    },
    mutateAndGetPayload: async (args) => {
        delete args.clientMutationId;
        return await CategoriesService.createCategory(args)
    }
});

export const ModifyCategoryMutation = new mutationWithClientMutationId({
    name: 'ModifyCategory',
    description: 'Function to modify a category',
    inputFields: {
        id: {type: new GraphQLNonNull(GraphQLString)},
        name: {type: new GraphQLNonNull(GraphQLString)},
        description: {type: GraphQLString},
        disabled: {type: GraphQLBoolean},
        startDate: {type: GraphQLString},
        endDate: {type: GraphQLString},
        visible: {type: GraphQLBoolean}
    },
    outputFields: {
        viewer: {
            type: ViewerType,
            resolve: () => getViewer("me")
        },
        categoryEdge: {
            type: CategoryEdge,
            resolve: async (payload) => {

                let categories = await CategoriesService.findAllCategories();
                let cursor = cursorForObjectInConnection(categories, payload);
                return {
                    cursor: cursor,
                    node: payload
                }
            }
        }
    },
    mutateAndGetPayload: async (args) => {
        delete args.clientMutationId;
        return await CategoriesService.modifyCategory(args)
    }
});

export const DeleteCategoryMutation = new mutationWithClientMutationId({
    name: 'DeleteCategory',
    description: 'Function to delete a Category',
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
        return await CategoriesService.deleteCategory(fromGlobalId(args.id).id)
    }
});

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

export const ModifyCategoryLocalizedContent = new mutationWithClientMutationId({
    name: 'ModifyCategoryLocalizedContent',
    description: 'Modify a localized content for a category',
    inputFields: {
        categoryId: {type: new GraphQLNonNull(GraphQLString)},
        id: {type: new GraphQLNonNull(GraphQLString)},
        locale: {type: new GraphQLNonNull(GraphQLString)},
        displayName: {type: GraphQLString},
        shortDescription: {type: GraphQLString},
        mediumDescription: {type: GraphQLString},
        longDescription: {type: GraphQLString},
        smallImage: {type: GraphQLString},
        largeImage: {type: GraphQLString},
        video: {type: GraphQLString},
        features: {type: GraphQLString}
    },
    outputFields: {
        viewer: {
            type: ViewerType,
            resolve: () => getViewer("me")
        }
    },
    mutateAndGetPayload: async (args) => {
        args.id = fromGlobalId(args.id).id;
        let categoryId = fromGlobalId(args.categoryId).id;
        delete args.clientMutationId;
        delete args.categoryId;
        return await CategoriesService.modifyCategoryLocalizedContent(categoryId, args)
    }
});


// Seems to work but there's an error
export const DeleteCategoryLocalizedContent = new mutationWithClientMutationId({
    name: 'DeleteCategoryLocalizedContent',
    description: 'Delete a localized content for a category',
    inputFields: {
        categoryId: {type: new GraphQLNonNull(GraphQLString)},
        locale: {type: new GraphQLNonNull(GraphQLString)}
    },
    outputFields: {
        viewer: {
            type: ViewerType,
            resolve: () => getViewer("me")
        }
    },
    mutateAndGetPayload: async (args) => {
        let categoryId = fromGlobalId(args.categoryId).id;
        return await CategoriesService.deleteCategoryLocalizedContent(categoryId, args.locale)
    }
});

