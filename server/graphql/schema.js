import {
  makeExecutableSchema,
  // addMockFunctionsToSchema,
} from 'graphql-tools';

import resolvers from './resolvers';

const typeDefs = `
  type Product {
    id: Int!
    name: String!
    description: String
    slug: String!
    variants: [Variant]
  }

  type Variant {
    id: Int!
    productId: Int!
    isMaster: Boolean
    priceInCents: Int!
    sku: String
    barcode: String
  }

  type User {
    id: Int!
    role: String!
    firstName: String
    lastName: String
    username: String!
    email: String!
    password: String!
  }

  type Query {
    user(id: Int, email: String, username: String): User
    allProducts: [Product]
  }
`;

const schema = makeExecutableSchema({ typeDefs, resolvers });

// addMockFunctionsToSchema({ schema, mocks });

export default schema;
