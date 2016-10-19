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
    DiscountType
} from '../Model'

import {
    getViewer,
} from '../stores/UserStore';

import DiscountService from './DiscountService'

export const CreateDiscountMutation = new mutationWithClientMutationId({
    name: 'CreateDiscountMutation',
    description: 'Function to create a discount',
    inputFields: {
        name: {type: new GraphQLNonNull(GraphQLString)},
        description: {type: GraphQLString},
        disabled: {type: GraphQLBoolean},
        startDate: {type: GraphQLString},
        endDate: {type: GraphQLString},
        visible: {type: GraphQLBoolean},
        voucherCode: {type: GraphQLString},
        usesPerCustomer: {type: GraphQLInt},
        type: {type: GraphQLString},
        triggerRule: {type: GraphQLString},
        applicableTo: {type: new GraphQLNonNull(GraphQLString)},
        triggerValue: {type: GraphQLFloat},
        discountValue: {type: GraphQLFloat},
        rateType: {type: GraphQLBoolean},
        uniqueUse: {type: GraphQLBoolean},
    },
    outputFields: {
        viewer: {
            type: ViewerType,
            resolve: () => getViewer("me")
        },
        discount: {
            type: DiscountType,
            resolve: (payload) => payload
        }
    },
    mutateAndGetPayload: async (args) => {
        delete args.clientMutationId;
        return await DiscountService.createDiscount(args)
    }
});

export const ModifyDiscountMutation = new mutationWithClientMutationId({
    name: 'ModifyDiscountMutation',
    description: 'Function to modify a discount',
    inputFields: {
        id: {type: new GraphQLNonNull(GraphQLString)},
        name: {type: new GraphQLNonNull(GraphQLString)},
        description: {type: GraphQLString},
        disabled: {type: GraphQLBoolean},
        startDate: {type: GraphQLString},
        endDate: {type: GraphQLString},
        visible: {type: GraphQLBoolean},
        voucherCode: {type: GraphQLString},
        usesPerCustomer: {type: GraphQLInt},
        type: {type: GraphQLString},
        triggerRule: {type: GraphQLString},
        applicableTo: {type: GraphQLString},
        triggerValue: {type: GraphQLFloat},
        discountValue: {type: GraphQLFloat},
        rateType: {type: GraphQLBoolean},
        uniqueUse: {type: GraphQLBoolean},
    },
    outputFields: {
        viewer: {
            type: ViewerType,
            resolve: () => getViewer("me")
        },
        discount: {
            type: DiscountType,
            resolve: (payload) => payload
        }
    },
    mutateAndGetPayload: async (args) => {
        args.id = fromGlobalId(args.id).id;
        delete args.clientMutationId;
        return await DiscountService.modifyDiscount(args)
    }
});

export const DeleteDiscountMutation = new mutationWithClientMutationId({
    name: 'DeleteDiscountMutation',
    description: 'Function to delete a discount',
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
        return await DiscountService.deleteDiscount(id)
    }
});

export const DeleteDiscountLocalizedContent = new mutationWithClientMutationId({
    name: 'DeleteDiscountLocalizedContent',
    description: 'Delete a localized content for a discount',
    inputFields: {
        discountId: {type: new GraphQLNonNull(GraphQLString)},
        locale: {type: new GraphQLNonNull(GraphQLString)}
    },
    outputFields: {
        viewer: {
            type: ViewerType,
            resolve: () => getViewer("me")
        }
    },
    mutateAndGetPayload: async (args) => {
        let discountId = fromGlobalId(args.discountId).id;
        return await DiscountService.deleteDiscountLocalizedContent(discountId, args.locale)
    }
});

export const CreateDiscountLocalizedContent = new mutationWithClientMutationId({
    name: 'CreateDiscountLocalizedContent',
    description: 'create a localized content for a discount',
    inputFields: {
        discountId: {type: new GraphQLNonNull(GraphQLString)},
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
        discount: {
            type: DiscountType,
            resolve: (payload) => DiscountService.findDiscountById(payload.discountId)
        }
    },
    mutateAndGetPayload: async (args) => {
        let discountId = fromGlobalId(args.discountId).id;
        delete args.clientMutationId;
        delete args.discountId;
        let localizedContent = await DiscountService.createDiscountLocalizedContent(discountId, args.locale, args);
        return {
            localizedContent: localizedContent,
            discountId: discountId
        }
    }
});

export const ModifyDiscountLocalizedContent = new mutationWithClientMutationId({
    name: 'ModifyDiscountLocalizedContent',
    description: 'modify a localized content for a discount',
    inputFields: {
        id: {type: new GraphQLNonNull(GraphQLString)},
        discountId: {type: new GraphQLNonNull(GraphQLString)},
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
        discount: {
            type: DiscountType,
            resolve: (payload) => DiscountService.findDiscountById(payload.discountId)
        }
    },
    mutateAndGetPayload: async (args) => {
        args.id = fromGlobalId(args.id).id;
        let discountId = fromGlobalId(args.discountId).id;
        delete args.clientMutationId;
        delete args.discountId;
        let localizedContent = await DiscountService.modifyDiscountLocalizedContent(discountId, args.locale, args);
        return {
            localizedContent: localizedContent,
            discountId: discountId
        }
    }
});