import React from 'react';
import PropTypes from 'prop-types';
import { Dimmer, Loader } from 'semantic-ui-react';

DimmedLoader.propTypes = {
  active: PropTypes.bool,
  inverted: PropTypes.bool
};

DimmedLoader.defaultProps = {
  active: true,
  inverted: true
};

export default function DimmedLoader(props) {
  const { active, inverted } = props;

  return (
    <Dimmer active={active} inverted={inverted}>
      <Loader inverted={inverted} content='Loading' />
    </Dimmer>
  );
}
