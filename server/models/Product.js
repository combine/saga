import Base from './Base';
import { Slugify } from 'objection-slugify';
import yup from 'yup';
import productSchema from '@schemas/product';

const SluggedModel = Slugify(Base, { sourceField: 'name', unique: true });

export default class Product extends SluggedModel {
  static tableName = 'products';
  static yupSchema = productSchema.concat(yup.object().shape({
    id: yup.number().integer(),
    slug: yup.string(),
    updatedAt: yup.date(),
    createdAt: yup.date()
  }));
}
