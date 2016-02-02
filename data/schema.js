import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLSchema
} from 'graphql'

import {
  connectionArgs,
  connectionDefinitions,
  connectionFromPromisedArray,
  connectionFromArray,
  fromGlobalId,
  globalIdField,
  nodeDefinitions
} from 'graphql-relay'

// import database from './db'
import axios from 'axios'

export class Viewer extends Object {}
const VIEWER_ID = 'me';
var viewer = new Viewer();
viewer.id = VIEWER_ID;


/**
 * The first argument defines the way to resolve an ID to its object.
 * The second argument defines the way to resolve a node object to its GraphQL type.
 */
var { nodeInterface, nodeField } = nodeDefinitions(
  (globalId) => {
    let { id, type } = fromGlobalId(globalId);
    if (type === 'SimType') {
      return {}//axios.get("http://greec-muskacirca.rhcloud.com/greec/rs/wrecks/" + id)
    } else if (type === "Viewer") {
      return viewer;
    }
    return null;
  },
  (obj) => {
    if (obj instanceof SimType) {
      return GraphQLSimType;
    } else if (obj instanceof Viewer) {
      return GraphQLViewer
    }
  }
);

var GraphQLSimType = new GraphQLObjectType({
  name: 'SimType',
  fields: {
    id: globalIdField('SimType'),
    name: {
      type: GraphQLString,
      resolve: (obj) => obj.name
    },
    shortDescription: {
      type: GraphQLString,
      resolve: (obj) => obj.shortDescription
    },
    description: {
      type: GraphQLString,
      resolve: (obj) => obj.description
    }
  },
  interfaces: [nodeInterface]
});

var {
  connectionType: SimTypesConnection
  // ,edgeType: GraphQLSimTypesEdge,
} = connectionDefinitions({
  name: 'SimType',
  nodeType: GraphQLSimType
});

var GraphQLViewer = new GraphQLObjectType({
  name: 'Viewer',
  fields: () => ({
    id: globalIdField('Viewer'),
    simTypes: {
      type: SimTypesConnection,
      args: {...connectionArgs},
      resolve: (obj, args) => connectionFromPromisedArray(axios.get("http://greec-muskacirca.rhcloud.com/greec/rs/wrecks/lightweight")
                                                                    .then((response) => {
                                                                        return response.data
                                                                    }), args)
    }
  }),
  interfaces: [nodeInterface]
});

var GraphQLRoot = new GraphQLObjectType({
  name: 'Root',
  fields: {
    viewer: {
      type: GraphQLViewer,
      resolve: () => viewer
    },
    node: nodeField
  }
});

export var Schema = new GraphQLSchema({
  query: GraphQLRoot
});
