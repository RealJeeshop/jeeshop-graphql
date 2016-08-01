import {
    GraphQLObjectType,
    GraphQLSchema
} from 'graphql'

import {
    GraphQLRoot
} from './Model'

import {
    CreateCatalogMutation
} from './catalog/CatalogMutation'

let Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createCatalog: CreateCatalogMutation
  }
});

export var Schema = new GraphQLSchema({
  query: GraphQLRoot,
  mutation: Mutation
});
