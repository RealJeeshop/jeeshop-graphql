import {
    GraphQLObjectType,
    GraphQLSchema
} from 'graphql'

import {
    GraphQLRoot
} from './Model'

import {
    CreateCatalogMutation,
    ModifyCatalogMutation,
    DeleteCatalogMutation,
    CreateCatalogLocalizedContentMutation
} from './catalog/CatalogMutation'

let Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createCatalog: CreateCatalogMutation,
    modifyCatalog: ModifyCatalogMutation,
    deleteCatalog: DeleteCatalogMutation,
    createCatalogLocalizedContent: CreateCatalogLocalizedContentMutation
  }
});

export var Schema = new GraphQLSchema({
  query: GraphQLRoot,
  mutation: Mutation
});
