import {
  SEARCH_PRODUCTS_REQUEST,
  SEARCH_PRODUCTS_SUCCESS,
  SEARCH_PRODUCTS_FAILURE,
} from '@admin/constants';
import api from '@lib/api';

export const searchProducts = (params) => {
  return {
    type: 'SEARCH_PRODUCTS',
    types: [
      SEARCH_PRODUCTS_REQUEST,
      SEARCH_PRODUCTS_SUCCESS,
      SEARCH_PRODUCTS_FAILURE
    ],
    callAPI: () => api.get('/api/products', { params }),
    transform: (res) => {
      return {
        products: res.products,
        meta: res.meta
      };
    }
  };
};
