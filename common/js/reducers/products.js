import {
  LOAD_PRODUCTS_REQUEST,
  LOAD_PRODUCTS_SUCCESS,
  LOAD_PRODUCTS_FAILURE
} from '@constants';

const defaultState = {
  products: [],
  isLoading: false,
  isLoaded: false,
  error: null
};

const products = (state = defaultState, action) => {
  switch (action.type) {
    case LOAD_PRODUCTS_REQUEST:
      return { ...state, isLoading: true, isLoaded: false };

    case LOAD_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: action.products,
        isLoading: false,
        isLoaded: true
      };

    case LOAD_PRODUCTS_FAILURE:
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
