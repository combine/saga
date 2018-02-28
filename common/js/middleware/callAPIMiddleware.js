const validateTypes = types => {
  return (
    !Array.isArray(types) ||
    types.length !== 3 ||
    !types.every(type => typeof type === 'string')
  );
};

export default function callAPI({ dispatch, getState }) {
  return next => action => {
    const {
      types,
      callAPI,
      shouldCallAPI = () => true,
      payload = {},
      transform = null
    } = action;

    if (!types) {
      return next(action);
    }

    if (!validateTypes) {
      throw new Error('Expected an array of three string types.');
    }

    if (typeof callAPI !== 'function') {
      throw new Error('Expected callAPI to be a function.');
    }

    if (!shouldCallAPI(getState())) {
      return;
    }

    const [requestType, successType, failureType] = types;

    dispatch({ ...payload, type: requestType });

    return callAPI().then(
      response => {
        let action = { ...payload, response, type: successType };

        if (transform && typeof transform === 'function') {
          action = { ...payload, ...transform(response), type: successType };
        }

        dispatch(action);
      },
      error => dispatch({ ...payload, error, type: failureType })
    );
  };
}
