import {
  LOAD_PRODUCT_REQUEST,
  LOAD_PRODUCT_SUCCESS,
  LOAD_PRODUCT_FAILURE,
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_FAILURE,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAILURE,
} from '@admin/constants';
import api from '@lib/api';

export const loadProduct = (slug) => {
  return {
    type: 'LOAD_PRODUCT',
    types: [
      LOAD_PRODUCT_REQUEST,
      LOAD_PRODUCT_SUCCESS,
      LOAD_PRODUCT_FAILURE,
    ],
    callAPI: () => api.get(`/api/products/${slug}`),
    transform: res => ({ product: res })
  };
};

export const createProduct = (data) => {
  return {
    type: 'CREATE_PRODUCT',
    types: [
      CREATE_PRODUCT_REQUEST,
      CREATE_PRODUCT_SUCCESS,
      CREATE_PRODUCT_FAILURE,
    ],
    callAPI: () => api.post('/api/products', { data }),
    transform: res => ({ product: res })
  };
};

export const updateProduct = (slug, data) => {
  return {
    type: 'UPDATE_PRODUCT',
    types: [
      UPDATE_PRODUCT_REQUEST,
      UPDATE_PRODUCT_SUCCESS,
      UPDATE_PRODUCT_FAILURE,
    ],
    callAPI: () => api.put(`/api/products/${slug}`, { data }),
    transform: res => ({ product: res })
  };
};
