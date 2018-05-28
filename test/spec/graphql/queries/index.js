export default [
  {
    id: 'product',
    query: `
      query {
        product(slug: "test-product") {
          id
          slug
        }
      }
    `,
    variables: {},
    context: {},
    expected: { data: { product: { id: 1, slug: 'foo' } } }
  },
  {
    id: 'findProducts',
    query: `
      query {
        findProducts(query: "test-product") {
          meta {
            total
            q
          }
          products {
            id
            slug
          }
        }
      }
    `,
    variables: {},
    context: {},
    expected: {
      data: {
        findProducts: {
          meta: {
            total: 1,
            q: 'foo'
          },
          products: [
            {
              id: 1,
              slug: 'foo'
            },
            {
              id: 1,
              slug: 'foo'
            }
          ]
        }
      }
    }
  }
];
