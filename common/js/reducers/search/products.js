import {
  SEARCH_PRODUCTS_REQUEST,
  SEARCH_PRODUCTS_SUCCESS,
  SEARCH_PRODUCTS_FAILURE
} from '@constants';

const defaultState = {
  products: [],
  meta: {},
  query: '',
  isLoading: false,
  isLoaded: false,
  error: null
};

const products = (state = defaultState, action) => {
  switch (action.type) {
    case SEARCH_PRODUCTS_REQUEST:
      return { ...state, isLoading: true, isLoaded: false };

    case SEARCH_PRODUCTS_SUCCESS: {
      const { hits: products, ...meta } = action.response.content;

      return {
        ...state,
        products,
        meta,
        isLoading: false,
        isLoaded: true
      };
    }

    case SEARCH_PRODUCTS_FAILURE:
      return {
        ...state,
        isLoading: false,
        isLoaded: false,
        error: action.error
      };

    default:
      return state;
  }
};

export default products;
