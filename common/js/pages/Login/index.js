import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { Redirect } from 'react-router-dom';
import { LoginForm } from '@components/auth';
import css from './index.scss';

class LoginPage extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired
  };

  render() {
    const { auth } = this.props;
    const title = 'Log In';

    if (auth.isLoggedIn) {
      return <Redirect to="/" />;
    }

    return (
      <div className={css.loginPage}>
        <Helmet>
          <title>{title}</title>
        </Helmet>
        <h1>{title}</h1>
        <LoginForm {...this.props} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps)(LoginPage);
