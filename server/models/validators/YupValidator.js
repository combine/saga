import { Validator } from 'objection';

class YupValidator extends Validator {
  constructor(options = {}) {
    super();
    this.errorParser = options.errorParser || this.defaultErrorParser;
  }

  defaultErrorParser(error) {
    let errors = {};

    error.inner.forEach(err => {
      if (!errors.hasOwnProperty(err.path)) {
        errors[err.path] = [{ message: err.message }];
      } else {
        errors[err.path].push({ message: err.message });
      }
    });

    return errors;
  }

  validate(args) {
    const { model, json, options } = args;
    const { yupSchema } = model.constructor;
    let result;

    if (!yupSchema) {
      throw new Error('A `yupSchema` must be included in the model.');
    }

    try {
      // use synchronous validation since objection.js doesn't support
      // async validation (unless we implement it on our own).
      result = yupSchema.validateSync(json, {
        abortEarly: false,
        context: {
          // if this is an update, we make fields optional since updates
          // do not have all the fields in the json to validate.
          patch: !!options.patch
        }
      });
    } catch (err) {
      // Catch the error throw by `yup`, and create our own validation error.
      throw model.constructor.createValidationError({
        type: 'ModelValidation',
        data: this.errorParser(err)
      });
    }

    // Return the modified/validated data (possibly with default values added)
    return result;
  }
}

module.exports = YupValidator;
