import Base from './Base';
import { Slugify } from 'objection-slugify';
import Joi from 'joi';

const SluggedModel = Slugify(Base, { sourceField: 'name', unique: true });

export default class Product extends SluggedModel {
  static tableName = 'products';
  static schema = Joi.object().keys({
    id: Joi.number().optional(),
    name: Joi.string(),
    slug: Joi.string().optional(),
    description: Joi.string().optional(),
    updatedAt: Joi.date().optional(),
    createdAt: Joi.date().optional()
  });
}
