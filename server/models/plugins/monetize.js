import numbro from 'numbro';
import { capitalize } from 'lodash';

module.exports = (fieldMap = {}) => {
  const keys = Object.keys(fieldMap) || [];

  return Model => {
    return class extends Model {
      $formatJson(json) {
        json = super.$formatJson(json);

        keys.forEach(key => {
          const cents = json[fieldMap[key]];
          const formattedKey = `formatted${capitalize(key)}`;

          json[formattedKey] = numbro(cents / 100).formatCurrency({
            thousandSeparated: true,
            mantissa: 2,
            spaceSeparated: false,
          });
        });

        return json;
      }

      $beforeValidate(jsonSchema, json) {
        // For each json property, convert to cents if the original was
        Object.keys(json).forEach(key => {
          if (keys.includes(key)) {
            if (!json.hasOwnProperty(fieldMap[key])) {
              json[fieldMap[key]] = json[key] * 100;
            }
            delete json[key];
          }
        });

        return jsonSchema;
      }
    };
  };
};
