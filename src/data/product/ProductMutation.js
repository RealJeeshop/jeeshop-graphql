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
    ProductType,
    ProductEdge
} from '../Model'

import {
    getViewer,
} from '../stores/UserStore';

import ProductService from './ProductService'

export const CreateProductMutation = new mutationWithClientMutationId({
    name: 'CreateProductMutation',
    description: 'Function to create a product',
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
        productEdge: {
            type: ProductEdge,
            resolve: async (payload) => {

                let products = await ProductService.findAllProducts();
                let cursor = cursorForObjectInConnection(products, payload);
                return {
                    cursor: cursor,
                    node: payload
                }
            }
        }
    },
    mutateAndGetPayload: async (args) => {
        delete args.clientMutationId;
        console.log("args : " + JSON.stringify(args));
        return await ProductService.createProduct(args)
    }
});

export const ModifyProductMutation = new mutationWithClientMutationId({
    name: 'ModifyProductMutation',
    description: 'Function to modify a product',
    inputFields: {
        id: {type: new GraphQLNonNull(GraphQLString)},
        name: {type: GraphQLString},
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
        productEdge: {
            type: ProductEdge,
            resolve: async (payload) => {

                let products = await ProductService.findAllProducts();
                let cursor = cursorForObjectInConnection(products, payload);
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
        return await ProductService.modifyProduct(args)
    }
});

export const DeleteProductMutation = new mutationWithClientMutationId({
    name: 'DeleteProductMutation',
    description: 'Function to delete a product',
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
        return await ProductService.deleteProduct(fromGlobalId(args.id).id)
    }
});

export const DeleteProductLocalizedContent = new mutationWithClientMutationId({
    name: 'DeleteProductLocalizedContent',
    description: 'Delete a localized content for a product',
    inputFields: {
        productId: {type: new GraphQLNonNull(GraphQLString)},
        locale: {type: new GraphQLNonNull(GraphQLString)}
    },
    outputFields: {
        viewer: {
            type: ViewerType,
            resolve: () => getViewer("me")
        }
    },
    mutateAndGetPayload: async (args) => {
        let productId = fromGlobalId(args.productId).id;
        return await ProductService.deleteProductLocalizedContent(productId, args.locale)
    }
});

export const CreateProductLocalizedContent = new mutationWithClientMutationId({
    name: 'CreateProductLocalizedContent',
    description: 'create a localized content for a product',
    inputFields: {
        productId: {type: new GraphQLNonNull(GraphQLString)},
        locale: {type: new GraphQLNonNull(GraphQLString)},
        displayName: {type: GraphQLString},
        promotion: {type: GraphQLString},
        shortDescription: {type: GraphQLString},
        mediumDescription: {type: GraphQLString},
        longDescription: {type: GraphQLString}
    },
    outputFields: {
        viewer: {
            type: ViewerType,
            resolve: () => getViewer("me")
        },
        product: {
            type: ProductType,
            resolve: (payload) => ProductService.findProductById(payload.productId)
        }
    },
    mutateAndGetPayload: async (args) => {
        let productId = fromGlobalId(args.productId).id;
        delete args.clientMutationId;
        delete args.productId;
        let localizedContent  = await ProductService.createProductLocalizedContent(productId, args.locale, args)
        return {
            localizedContent: localizedContent,
            productId: productId
        }
    }
});

export const ModifyProductLocalizedContent = new mutationWithClientMutationId({
    name: 'ModifyProductLocalizedContent',
    description: 'modify a localized content for a product',
    inputFields: {
        id: {type: new GraphQLNonNull(GraphQLString)},
        productId: {type: new GraphQLNonNull(GraphQLString)},
        locale: {type: new GraphQLNonNull(GraphQLString)},
        displayName: {type: GraphQLString},
        promotion: {type: GraphQLString},
        shortDescription: {type: GraphQLString},
        mediumDescription: {type: GraphQLString},
        longDescription: {type: GraphQLString}
    },
    outputFields: {
        viewer: {
            type: ViewerType,
            resolve: () => getViewer("me")
        },
        productEdge: {
            type: ProductEdge,
            resolve: async (payload) => {

                let products = await ProductService.findAllProducts();
                let product = await ProductService.findProductById(payload.productId);
                let cursor = cursorForObjectInConnection(products, product);
                return {
                    cursor: cursor,
                    node: product
                }
            }
        }
    },
    mutateAndGetPayload: async (args) => {
        let productId = fromGlobalId(args.productId).id;
        args.id = fromGlobalId(args.id).id;
        delete args.clientMutationId;
        delete args.productId;
        let localizedContent = await ProductService.modifyProductLocalizedContent(productId, args.locale, args)
        return {
            localizedContent: localizedContent,
            productId: productId
        }
    }
});


