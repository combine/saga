import Base from './Base';
import slugify from 'objection-slugify';
import yup from 'yup';
import productSchema from '@schemas/product';

const slugged = slugify({
  sourceField: 'name',
  unique: true
});

export default class Product extends slugged(Base) {
  static tableName = 'products';
  static yupSchema = productSchema.concat(yup.object().shape({
    id: yup.number().integer(),
    slug: yup.string(),
    updatedAt: yup.date(),
    createdAt: yup.date()
  }));
}
