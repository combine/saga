import React, { Component } from 'react';
import { Helmet } from 'react-helmet';

class AdminHomePage extends Component {
  render() {
    return (
      <div>
        <Helmet>
          <title>Admin</title>
        </Helmet>
        <h1>Admin Page</h1>
        <p>
          This is the admin home page. Work is still in progress.
        </p>
      </div>
    );
  }
}

export default AdminHomePage;
