import React from 'react';
import PropTypes from 'prop-types';
import ShowingsView from './ShowingsView';

export default class ShowingsController extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  static propTypes = {};
  static defaultProps = {};
  render() {
    return <ShowingsView {...this.props} />;
  }
}
