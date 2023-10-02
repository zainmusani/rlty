import React from 'react';
import PropTypes from 'prop-types';
import AboutView from './AboutView';

export default class AboutController extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  static propTypes = {};
  static defaultProps = {};
  render() {
    return <AboutView {...this.props} />;
  }
}
