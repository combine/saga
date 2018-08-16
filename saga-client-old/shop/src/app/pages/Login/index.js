import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { LoginForm } from '@components/auth';
import { withUser, withLogin } from '@common/hocs/auth';
import { Redirect, withRouter } from 'react-router-dom';
import css from './index.scss';

class LoginPage extends Component {
  static propTypes = {
    login: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    currentUser: PropTypes.object
  };

  handleSubmit = values => {
    const { history, login } = this.props;

    return login(values).then(() => {
      history.push('/');
    });
  };

  render() {
    const { currentUser } = this.props;
    const title = 'Log In';

    if (currentUser) {
      return <Redirect to="/" />;
    }

    return (
      <div className={css.loginPage}>
        <Helmet>
          <title>{title}</title>
        </Helmet>
        <h1>{title}</h1>
        <LoginForm onSubmit={this.handleSubmit} />
      </div>
    );
  }
}

export default withLogin(withUser(withRouter(LoginPage)));
