import { mapValues } from 'lodash';

export default (err) => {
  return mapValues(err.errors, (fields) => {
    return fields.map(field => field.message).join('\n');
  });
};
