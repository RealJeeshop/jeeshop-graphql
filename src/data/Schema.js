import {
    GraphQLObjectType,
    GraphQLSchema
} from 'graphql'

import {
    GraphQLRoot
} from './Model'

export var Schema = new GraphQLSchema({
  query: GraphQLRoot
});
