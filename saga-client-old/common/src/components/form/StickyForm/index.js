import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Form, Grid, Sticky } from 'semantic-ui-react';

export default class StickyForm extends Component {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.any,
    renderActions: PropTypes.func,
    formProps: PropTypes.object
  };

  state = {};

  handleContextRef = contextRef => this.setState({ contextRef });

  render() {
    const { renderActions, children, className, formProps } = this.props;
    const { contextRef } = this.state;

    return (
      <Form {...formProps} className={classnames(className)}>
        <Grid columns={2}>
          <Grid.Column width={14}>
            <div ref={this.handleContextRef}>{children}</div>
          </Grid.Column>
          <Grid.Column width={2}>
            <Sticky context={contextRef}>{renderActions()}</Sticky>
          </Grid.Column>
        </Grid>
      </Form>
    );
  }
}
