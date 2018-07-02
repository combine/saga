import { Model } from 'objection';
import { YupValidator } from '$models/validators';

export default class Base extends Model {
  static modelPaths = [__dirname];

  static createValidator() {
    return new YupValidator();
  }

  $beforeInsert() {
    this.createdAt = new Date().toISOString();
  }

  $beforeUpdate() {
    this.updatedAt = new Date().toISOString();
  }
}
