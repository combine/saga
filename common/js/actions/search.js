import {
  SEARCH_PRODUCTS_REQUEST,
  SEARCH_PRODUCTS_SUCCESS,
  SEARCH_PRODUCTS_FAILURE,
} from '@constants';
import { performSearch } from '@lib/algolia';

export const searchProducts = (params) => {
  return {
    type: 'SEARCH_PRODUCTS',
    types: [
      SEARCH_PRODUCTS_REQUEST,
      SEARCH_PRODUCTS_SUCCESS,
      SEARCH_PRODUCTS_FAILURE
    ],
    callAPI: () => performSearch('products', params)
  };
};
