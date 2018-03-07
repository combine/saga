import { Model } from 'objection';
import JoiValidator from './validators/JoiValidator';
import { keyBy, mapValues } from 'lodash';

export default class Base extends Model {
  static createValidator() {
    return new JoiValidator({
      errorParser: (error) => {
        // this.name references the name of the current model
        const modelName = this.name;

        // map errors from Joi result object by key and type
        const errors = error.details.map(err => ({
          key: err.context.key,
          type: err.type
        }));

        // key the object by the validation property and use i18n
        // to return the associated error message based on the key and
        // the joi type string, e.g. 'string.regex.base'
        return mapValues(keyBy(errors, 'key'), (o) => {
          return {
            message: global.__(`models.${modelName}.${o.key}.${o.type}`)
          };
        });
      }
    });
  }

  $beforeInsert() {
    this.createdAt = new Date().toISOString();
  }

  $beforeUpdate() {
    this.updatedAt = new Date().toISOString();
  }
}
