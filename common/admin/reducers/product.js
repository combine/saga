import {
  LOAD_PRODUCT_REQUEST,
  LOAD_PRODUCT_SUCCESS,
  LOAD_PRODUCT_FAILURE
} from '@admin/constants';

const defaultState = {
  isLoading: false,
  isLoaded: false,
  error: null
};

const product = (state = defaultState, action) => {
  switch (action.type) {
    case LOAD_PRODUCT_REQUEST:
      return { ...state, isLoading: true, isLoaded: false };

    case LOAD_PRODUCT_SUCCESS: {
      return {
        ...state,
        ...action.product,
        isLoading: false,
        isLoaded: true
      };
    }

    case LOAD_PRODUCT_FAILURE:
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

export default product;
