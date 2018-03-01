import { Model } from 'objection';
import { DbErrors } from 'objection-db-errors';

export default class Base extends DbErrors(Model) {
  $beforeInsert() {
    this.createdAt = new Date().toISOString();
  }

  $beforeUpdate() {
    this.updatedAt = new Date().toISOString();
  }
}
