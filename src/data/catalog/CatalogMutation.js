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

import axios from 'axios'

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
            resolve: (obj, {id}) => {

                console.log("obj : " + JSON.stringify(obj));

                return obj

                // return Database.models.model.findAll()
                //     .then(dataModels => {
                //
                //         let itemToPass
                //         for (const model of dataModels) {
                //             if (model.id === obj.id) {
                //                 itemToPass = model;
                //             }
                //         }
                //         var cursor = cursorForObjectInConnection(dataModels, itemToPass);
                //         return {
                //             cursor: cursor,
                //             node: itemToPass
                //         }
                //     })
            }
        }
    },
    mutateAndGetPayload: (args) => {

        console.log("args in catalog mutation: " + JSON.stringify(args));

        delete args.clientMutationId;

        let config = {'Authorization': "Basic YWRtaW5AamVlc2hvcC5vcmc6amVlc2hvcA=="};
        return axios.post(`https://apps-jeeshop.rhcloud.com/jeeshop-admin/rs/catalogs`, args, {headers: config})
            .then((response) => {
                console.log("response : " + JSON.stringify(response));
                return response.data
            }).catch((response) => {
                console.log("response : " + JSON.stringify(response));
                if(response.status == "404") return []
            })
    }
})
