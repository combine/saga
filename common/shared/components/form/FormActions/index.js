import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react';
import css from './index.scss';

FormActions.propTypes = {
  form: PropTypes.object.isRequired,
  submitText: PropTypes.string,
  children: PropTypes.any
};

export default function FormActions(props) {
  const { form, submitText, children } = props;
  const { isSubmitting, isValid } = form;

  return (
    <div className={css.actions}>
      {children || (
        <Button
          primary
          type="submit"
          loading={isSubmitting}
          disabled={isSubmitting || !isValid}
        >
          {submitText || 'Submit'}
        </Button>
      )}
    </div>
  );
}
