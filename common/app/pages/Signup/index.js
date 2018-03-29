import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { SignupForm } from '@app/components/auth';
import { Helmet } from 'react-helmet';
import { Redirect } from 'react-router-dom';
import css from './index.scss';

class SignupPage extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired
  };

  render() {
    const { auth } = this.props;
    const title = 'Sign Up';

    return (
      <div className={css.signupPage}>
        <Helmet>
          <title>{title}</title>
        </Helmet>
        <h1>{title}</h1>
        <SignupForm {...this.props} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps)(SignupPage);
