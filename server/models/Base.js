import { Model } from 'objection';
import JoiValidator from './validators/JoiValidator';

export default class Base extends Model {
  static createValidator() {
    return new JoiValidator();
  }

  $beforeInsert() {
    this.createdAt = new Date().toISOString();
  }

  $beforeUpdate() {
    this.updatedAt = new Date().toISOString();
  }
}
