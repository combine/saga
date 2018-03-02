import { Validator, ValidationError } from 'objection';
// import { isEmpty } from 'lodash';
// import Joi from 'joi';

class JoiValidator extends Validator {
  validate(args) {
    const { model, json, options } = args;
    let { schema } = model.constructor;
    let presence = 'required';

    if (!schema) {
      throw new Error('A `schema` must be included in the model.');
    }

    // when patching, make presence optional since we don't need to validate
    // all the other fields (that are not included in `json`).
    if (options.patch) {
      presence = 'optional';
    }

    const result = schema.validate(json, { presence });

    if (result.error) {
      throw new ValidationError({
        type: 'ModelValidation',
        statusCode: 400,
        data: result.error
      });
    }

    // You need to return the (possibly modified) json.
    return json;
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
