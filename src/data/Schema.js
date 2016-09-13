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
    CreateCatalogLocalizedContentMutation,
    ModifyCatalogLocalizedContent
} from './catalog/CatalogMutation'

import {
    CreateCategoryLocalizedContentMutation
} from './categories/CategoriesMutation'

let Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createCatalog: CreateCatalogMutation,
    modifyCatalog: ModifyCatalogMutation,
    deleteCatalog: DeleteCatalogMutation,
    createCatalogLocalizedContent: CreateCatalogLocalizedContentMutation,
    modifyCatalogLocalizedContent: ModifyCatalogLocalizedContent,

    createCategoryLocalizedContent: CreateCategoryLocalizedContentMutation
  }
});

export var Schema = new GraphQLSchema({
  query: GraphQLRoot,
  mutation: Mutation
});
