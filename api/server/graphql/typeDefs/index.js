import { gql } from 'apollo-server';

export default gql`
  type Product {
    id: Int!
    name: String!
    description: String
    slug: String!
    variants: [Variant]
    createdAt: String
    updatedAt: String
  }

  type Variant {
    id: Int!
    productId: Int!
    isMaster: Boolean
    priceInCents: Int!
    sku: String
    barcode: String
    options: OptionsList
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

  type MetaList {
    total: Int
    count: Int
    after: Int
    query: String
  }

  type ProductList {
    meta: MetaList
    products: [Product]
  }

  type AuthPayload {
    token: String
    currentUser: User
  }

  type Query {
    currentUser: User
    findUser(id: Int, email: String, username: String): User
    user(id: Int, email: String, username: String): User
    product(id: Int, slug: String): Product
    findProduct(id: Int, slug: String): Product
    findProducts(query: String, after: Int, count: Int): ProductList
    allProducts: [Product]
  }

  input VariantInput {
    id: Int
    isMaster: Boolean
    priceInCents: Int
    sku: String
    barcode: String
    options: OptionsList
  }

  scalar OptionsList

  type Mutation {
    login(usernameOrEmail: String!, password: String!): AuthPayload
    signup(username: String!, email: String!, password: String!): AuthPayload
    logout: Boolean
    updateProduct(
      id: Int!,
      name: String,
      description: String,
      variants: [VariantInput]
    ): Product
    createProduct(
      name: String,
      description: String,
      variants: [VariantInput]
    ): Product
  }
`;
