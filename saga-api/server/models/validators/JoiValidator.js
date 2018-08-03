import { Validator } from 'objection';
import { keyBy, mapValues } from 'lodash';

class JoiValidator extends Validator {
  constructor(options = {}) {
    super();
    this.errorParser = options.errorParser || this.defaultErrorParser;
  }

  defaultErrorParser(error) {
    // map errors from Joi result object by key and type
    const errors = error.details.map(err => ({
      key: err.context.key,
      message: err.message,
      type: err.type
    }));

    // key the object by the validation property and use i18n
    // to return the associated error message based on the key and
    // the joi type string, e.g. 'string.regex.base'
    return mapValues(keyBy(errors, 'key'), (o) => ({
      message: o.message
    }));
  }

  validate(args) {
    const { model, json, options } = args;
    const { schema } = model.constructor;

    // when patching, make presence optional since we don't need to validate
    // all the other fields (that are not included in `json`).
    const presence = options.patch ? 'optional' : 'required';

    if (!schema) {
      throw new Error('A `schema` must be included in the model.');
    }

    const result = schema.validate(json, { presence, abortEarly: false });

    if (result.error) {
      throw model.constructor.createValidationError({
        type: 'ModelValidation',
        statusCode: 400,
        data: this.errorParser(result.error)
      });
    }

    // Return the modified/validated data (possibly with default values added)
    return result.value;
  }

  // Override Validator.beforeValidate until
  // https://github.com/Vincit/objection.js/issues/804 is released
  beforeValidate({ model, json, opts }) {
    model.$beforeValidate(null, json, opts);
  }

  afterValidate(args) {
    // Takes the same arguments as `validate`. Usually there is no need
    // to override this.
    return super.afterValidate(args);
  }
}

module.exports = JoiValidator;
