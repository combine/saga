// Allows schema to be optional when patch is specified in Yup's `context`
// option when using `validate()`.
export const patchOptional = (patch, schema) => {
  return patch ? schema.notRequired() : schema;
};
