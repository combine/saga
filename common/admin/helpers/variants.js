import { valid } from './optionTypes';

/**
 * Generate all possible variants from the given option types and values.
 */
const optionSet = function(arr) {
  if (arr.length === 1) {
    return arr[0];
  } else {
    const rest = optionSet(arr.slice(1));
    let result = [];

    for (let i = 0; i < rest.length; i++) {
      for (let j = 0; j < arr[0].length; j++) {
        result.push([
          ...(Array.isArray(rest[i]) ? rest[i] : [rest[i]]),
          arr[0][j]
        ]);
      }
    }

    return result;
  }
};

export const getVariantOptions = optionTypes => {
  const types = optionTypes.filter(valid);

  if (!types.length) return [];
  if (types.length === 1) {
    return types[0].values.map(v => [v]);
  }

  // Recur values
  return optionSet(types.map(t => t.values).reverse());
};
