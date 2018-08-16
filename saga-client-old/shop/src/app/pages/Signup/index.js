import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { SignupForm } from '@components/auth';
import { Helmet } from 'react-helmet';
import { Redirect, withRouter } from 'react-router-dom';
import { withUser, withSignup } from '@common/hocs/auth';
import css from './index.scss';

class SignupPage extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    currentUser: PropTypes.object,
    signup: PropTypes.func.isRequired
  };

  handleSubmit = values => {
    const { history, signup } = this.props;

    return signup(values).then(() => {
      history.push('/');
    });
  };

  render() {
    const { currentUser } = this.props;
    const title = 'Sign Up';

    if (currentUser) {
      return <Redirect to="/" />;
    }

    return (
      <div className={css.signupPage}>
        <Helmet>
          <title>{title}</title>
        </Helmet>
        <h1>{title}</h1>
        <SignupForm onSubmit={this.handleSubmit} />
      </div>
    );
  }
}

export default withUser(withSignup(withRouter(SignupPage)));
