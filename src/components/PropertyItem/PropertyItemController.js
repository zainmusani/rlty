import React from 'react';
import PropTypes from 'prop-types';
import PropertyItemView from './PropertyItemView';
import {markPropertyFavouriteRequest} from '../../actions/propertyActions';
import {connect} from 'react-redux';

class PropertyItemController extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  static propTypes = {item: PropTypes.object.isRequired};
  static defaultProps = {};
  render() {
    return <PropertyItemView {...this.props} />;
  }
}
const mapStateToProps = ({}) => ({});

const actions = {markPropertyFavouriteRequest};

export default connect(mapStateToProps, actions)(PropertyItemController);
