import {
  SEARCH_PRODUCTS_REQUEST,
  SEARCH_PRODUCTS_SUCCESS,
  SEARCH_PRODUCTS_FAILURE,
} from '@app/constants';
import { getEnv } from '@lib/env';
import AlgoliaSearch from '@lib/AlgoliaSearch';

const env = getEnv();
const offline = ['test'].includes(env);
const search = new AlgoliaSearch({ offline }).search;

export const searchProducts = (params) => {
  return {
    type: 'SEARCH_PRODUCTS',
    types: [
      SEARCH_PRODUCTS_REQUEST,
      SEARCH_PRODUCTS_SUCCESS,
      SEARCH_PRODUCTS_FAILURE
    ],
    callAPI: () => search('products', params)
  };
};
