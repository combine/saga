export const valid = ({ name, values = [] }) => {
  return name && name !== '' && values.length;
};
