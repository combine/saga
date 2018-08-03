import { Model } from 'objection';
import { YupValidator } from '@models/validators';
import dayjs from 'dayjs';

export default class Base extends Model {
  static modelPaths = [__dirname];

  static createValidator() {
    return new YupValidator();
  }

  $beforeInsert() {
    this.createdAt = dayjs().toISOString();
    this.updatedAt = dayjs().toISOString();
  }

  $beforeUpdate() {
    this.updatedAt = dayjs().toISOString();
  }
}
