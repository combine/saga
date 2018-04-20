import {
  LOAD_PRODUCT_REQUEST,
  LOAD_PRODUCT_SUCCESS,
  LOAD_PRODUCT_FAILURE,
} from '@admin/constants';
import api from '@lib/api';

export const loadProduct = (productId) => {
  return {
    type: 'LOAD_PRODUCT',
    types: [
      LOAD_PRODUCT_REQUEST,
      LOAD_PRODUCT_SUCCESS,
      LOAD_PRODUCT_FAILURE,
    ],
    callAPI: () => api.get(`/api/products/${productId}`),
    transform: res => ({ product: res })
  };
};
