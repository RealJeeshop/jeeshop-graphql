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
            resolve: async (payload) => {

                let catalogs = await CatalogService.findAllCatalog();
                let cursor = cursorForObjectInConnection(catalogs, payload);
                return {
                    cursor: cursor,
                    node: payload
                }
            }
        }
    },
    mutateAndGetPayload: async (args) => {
        delete args.clientMutationId;
        return await CatalogService.createCatalog(args)
    }
});

export const ModifyCatalogMutation = new mutationWithClientMutationId({
    name: 'ModifyCatalog',
    description: 'Function to modify a catalog',
    inputFields: {
        id: {type: new GraphQLNonNull(GraphQLString)},
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

                let catalogs = await CatalogService.findAllCatalog();
                let cursor = cursorForObjectInConnection(catalogs, payload);
                return {
                    cursor: cursor,
                    node: payload
                }
            }
        }
    },
    mutateAndGetPayload: async (args) => {

        delete args.clientMutationId;
        args.id = fromGlobalId(args.id).id;

        return await CatalogService.modifyCatalog(args);
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
        }
    },
    mutateAndGetPayload: async (args) => {
        console.log("delete catalog mutate");
        return await CatalogService.deleteCatalog(fromGlobalId(args.id).id)
    }
});


export const CreateCatalogLocalizedContentMutation = new mutationWithClientMutationId({
    name: 'CreateCatalogLocalizedContent',
    description: 'Creates a localized content for a catalog',
    inputFields: {
        catalogId: {type: new GraphQLNonNull(GraphQLString)},
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
        },
        catalog: {
            type: CatalogType,
            resolve: (payload) => CatalogService.findCatalogById(payload.catalogId)
        }
    },
    mutateAndGetPayload: async (args) => {
        let catalogId = fromGlobalId(args.catalogId).id;
        delete args.catalogId;
        delete args.clientMutationId;
        let localizedContent = await CatalogService.createCatalogLocalizedContent(catalogId, args);
        return {
            localizedContent: localizedContent,
            catalogId: catalogId
        }
    }
});

export const ModifyCatalogLocalizedContent = new mutationWithClientMutationId({
    name: 'ModifyCatalogLocalizedContent',
    description: 'Modify a localized content for a catalog',
    inputFields: {
        catalogId: {type: new GraphQLNonNull(GraphQLString)},
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
        },
        catalog: {
            type: CatalogType,
            resolve: (payload) => CatalogService.findCatalogById(payload.catalogId)
        }
    },
    mutateAndGetPayload: async (args) => {
        args.id = fromGlobalId(args.id).id;
        let catalogId = fromGlobalId(args.catalogId).id;
        delete args.clientMutationId;
        delete args.catalogId;
        let localizedContent = await CatalogService.modifyCatalogLocalizedContent(catalogId, args);
        return {
            localizedContent: localizedContent,
            catalogId: catalogId
        }
    }
});



export const DeleteCatalogLocalizedContent = new mutationWithClientMutationId({
    name: 'DeleteCatalogLocalizedContent',
    description: 'Delete a localized content for a catalog',
    inputFields: {
        catalogId: {type: new GraphQLNonNull(GraphQLString)},
        locale: {type: new GraphQLNonNull(GraphQLString)}
    },
    outputFields: {
        viewer: {
            type: ViewerType,
            resolve: () => getViewer("me")
        }
    },
    mutateAndGetPayload: async (args) => {
        let catalogId = fromGlobalId(args.catalogId).id;
        return await CatalogService.deleteCatalogLocalizedContent(catalogId, args.locale)
    }
});
