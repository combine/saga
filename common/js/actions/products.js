import api from '@lib/api';
import {
  LOAD_PRODUCTS_REQUEST,
  LOAD_PRODUCTS_SUCCESS,
  LOAD_PRODUCTS_FAILURE
} from '@constants';

export const loadProducts = (query = {}) => {
  return {
    types: [
      LOAD_PRODUCTS_REQUEST,
      LOAD_PRODUCTS_SUCCESS,
      LOAD_PRODUCTS_FAILURE
    ],
    callAPI: () => api.get('/api/products', { query }),
    transform: (response) => ({ products: response })
  };
};
