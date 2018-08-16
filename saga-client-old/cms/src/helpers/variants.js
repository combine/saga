/**
 * Simple filtering function to remove options with empty names or values.
 * @param  {String} name   Name of the option
 * @param  {Array}  values Values for the option
 * @return {Array}         The filtered options
 */
export const validOptions = ({ name, values = [] }) => {
  return !!name && values.length;
};

/**
 * Takes an array of option types and values and returns all possible
 * combinations.
 * @param  {Array} options An array of options
 * @return {[type]}         [description]
 */
export const getVariantOptions = options => {
  // Filter out options that have a blank name or no values
  const types = options.filter(validOptions);

  if (!types.length) {
    return [];
  }

  if (types.length === 1) {
    const [type] = types;
    return type.values.map(value => ({ [type.name]: value }));
  }

  const names = types.map(t => t.name).reverse();
  const values = types.map(t => t.values);

  return optionSet(names, values);
};

/**
 * Recursive cartesian product algorithm to fetch all combinations of the given
 * names and values.
 * @param  {Array} names  An array of option names
 * @param  {Array} values An array of arrays of option values
 * @return {Array}        An array of key-value options, e.g.
 *                        [{ Size: 'M', Color: 'Greenl '}]
 */
function optionSet(names, values) {
  let i, j, l, m, a, o = [], iteration = values.length - 1;
  if (!values || values.length == 0) return values;

  a = values.splice(0, 1)[0]; // the first array of a
  values = optionSet(names, values);

  for (i = 0, l = a.length; i < l; i++) {
    if (values && values.length) {
      for (j = 0, m = values.length; j < m; j++) {
        o.push({ [names[iteration]]: a[i], ...values[j] });
      }
    } else {
      o.push({ [names[iteration]]: a[i] });
    }
  }
  return o;
}
