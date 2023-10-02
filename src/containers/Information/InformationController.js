import React from 'react';
import PropTypes from 'prop-types';
import InformationView from './InformationView';

export default class InformationController extends React.Component {
  constructor() {
    super();
    this.state = {
      tabItems: [
        {
          id: 1,
          label: 'Terms & Conditions',
        },
        {
          id: 2,
          label: 'Privacy Policy',
        },

        {
          id: 3,
          label: 'FAQs',
        },
      ],
      selectedTabId: 1,
    };
  }
  static propTypes = {};
  static defaultProps = {};
  setSelectedTabId = selectedTabId => {
    this.setState({selectedTabId});
  };
  render() {
    const {tabItems, selectedTabId} = this.state;
    return (
      <InformationView
        {...this.props}
        tabItems={tabItems}
        selectedTabId={selectedTabId}
        setSelectedTabId={this.setSelectedTabId}
      />
    );
  }
}
