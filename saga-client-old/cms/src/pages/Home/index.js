import React, { Component } from 'react';
import { Helmet } from 'react-helmet';

class AdminHomePage extends Component {
  render() {
    return (
      <div>
        <Helmet>
          <title>Dashboard</title>
        </Helmet>
        <h1>Dashboard</h1>
        <p>
          This is the admin dashboard. Take a look around!
        </p>
      </div>
    );
  }
}

export default AdminHomePage;
