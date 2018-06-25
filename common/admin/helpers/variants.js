/**
 * Generate all possible variants from the given option types and values.
 */
export const variantSet = optionTypes => {
  function fn(arr) {
    if (arr.length == 1) {
      return arr[0];
    } else {
      let result = [];
      const rest = fn(arr.slice(1));

      for (let i = 0; i < rest.length; i++) {
        for (let j = 0; j < arr[0].length; j++) {
          result.push([
            ...Array.isArray(rest[i]) ? rest[i] : [rest[i]],
            arr[0][j]
          ]);
        }
      }
      return result;
    }
  }

  if (optionTypes.length === 1) {
    return optionTypes[0].values.map(v => [v]);
  }

  // Recur values
  return fn(optionTypes.map(ot => ot.values).reverse());
};
