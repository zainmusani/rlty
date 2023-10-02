import React from 'react';
import PropTypes from 'prop-types';
import {UIManager, LayoutAnimation} from 'react-native';
import AccordionView from './AccordionView';

export default class AccordionController extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data,
      expanded: false,
    };
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }
  static propTypes = {
    title: PropTypes.string.isRequired,
    data: PropTypes.string.isRequired,
  };
  static defaultProps = {};

  toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({expanded: !this.state.expanded});
  };
  render() {
    const {expanded} = this.state;
    return (
      <AccordionView
        {...this.props}
        toggleExpand={this.toggleExpand}
        expanded={expanded}
      />
    );
  }
}
