import React from 'react';
import PropTypes from 'prop-types';
import PropertyDetailView from './PropertyDetailView';
import {
  markPropertyFavouriteRequest,
  deletePropertyRequest,
  soldPropertyRequest,
} from '../../actions/propertyActions';
import {connect} from 'react-redux';
import _, {property} from 'lodash';
import util from '../../util';
import {Actions} from 'react-native-router-flux';
import {strings} from '../../constants';

class PropertyDetailController extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      galleryVisible: false,
      open: false,
      copyModalVisible: false,
      noteModalVisible: false,
      deleteModalVisible: false,
      notes: '',
      markAsSold: props?.property?.saleType === 'sold' ? true : false,
      loading: false,
      markSoldModal: false,
    };
  }
  static propTypes = {
    propertyId: PropTypes.string.isRequired,
    property: PropTypes.object.isRequired,
  };
  static defaultProps = {
    property: {},
  };
  toggleGallery = galleryVisible => {
    this.setState({galleryVisible});
  };
  setMarkAsSold = markAsSold => {
    this.setState(prevState => ({
      markAsSold: !prevState?.markAsSold,
    }));
  };

  setOpen = open => {
    if (this.bsRef) {
      if (open) {
        this.bsRef.open();
      } else {
        this.bsRef.close();
      }
    }
  };
  toggleCopyModal = copyModalVisible => {
    this.setState({copyModalVisible});
  };
  toggleDeleteModal = deleteModalVisible => {
    this.setState({deleteModalVisible});
  };
  toggleMarlSoldModal = markSoldModal => {
    this.setState({markSoldModal});
  };
  toggleNoteModal = noteModalVisible => {
    const {
      props: {
        property: {id, isFavProperty},
      },
    } = this;
    this.setState({noteModalVisible});
    if (!noteModalVisible) Actions.notes({id, isFavProperty});
  };
  setLoading = boolean => {
    this.setState({loading: boolean});
  };
  deleteProperty = () => {
    const {
      props: {
        deletePropertyRequest,
        property: {propertyId},
      },
      state: {},
      setLoading,
    } = this;
    setLoading(true);
    deletePropertyRequest({property_id: propertyId}, res => {
      setLoading(false);
      if (!res) return;
      this.toggleDeleteModal(false);
      Actions.pop();
    });
  };

  markAsSoldHelper = () => {
    const {
      props: {
        soldPropertyRequest,
        property: {propertyId},
      },
      setMarkAsSold,
      setLoading,
    } = this;

    setLoading(true);
    soldPropertyRequest({property_id: propertyId}, res => {
      setLoading(false);
      if (!res) return;
      util.topAlert('Property sold successfully', 'success');
      setMarkAsSold();
    });
  };
  checkPropertyBuyOrSellBeforeMark = () => {
    this.setState({markSoldModal: true});
  };

  modalTxtForMarkAsSold = () => {
    const {property} = this.props || {};
    const {isBuyerAdded, isSellerAdded} = property || {};
    if (isBuyerAdded && isSellerAdded) return strings.PROPERTY_SOLD;
    else if (!isBuyerAdded && isSellerAdded)
      return strings.PROPERTY_BUYER_NOT_ADDED_SOLD;
    else if (isBuyerAdded && !isSellerAdded)
      return strings.PROPERTY_SALLER_NOT_ADDED_SOLD;
    else return strings.PROPERTY_SELL_AND_BUYER_NOT_ADDED_SOLD;
  };

  render() {
    console.log('props', this.props);
    return (
      <PropertyDetailView
        {...this.props}
        galleryVisible={this.state.galleryVisible}
        toggleGallery={this.toggleGallery}
        bsRef={ref => {
          this.bsRef = ref;
        }}
        open={this.state.open}
        setOpen={this.setOpen}
        copyModalVisible={this.state.copyModalVisible}
        toggleCopyModal={this.toggleCopyModal}
        deleteModalVisible={this.state.deleteModalVisible}
        toggleDeleteModal={this.toggleDeleteModal}
        noteModalVisible={this.state.noteModalVisible}
        toggleNoteModal={this.toggleNoteModal}
        notes={this.state.notes}
        onChangeNotes={notes => this.setState({notes})}
        loading={this.state.loading}
        markAsSold={this.state.markAsSold}
        setMarkAsSold={this.setMarkAsSold}
        deleteProperty={this.deleteProperty}
        markAsSoldHelper={this.markAsSoldHelper}
        checkPropertyBuyOrSellBeforeMark={this.checkPropertyBuyOrSellBeforeMark}
        markSoldModal={this.state.markSoldModal}
        toggleMarlSoldModal={this.toggleMarlSoldModal}
        modalTxtForMarkAsSold={this.modalTxtForMarkAsSold}
      />
    );
  }
}
const mapStateToProps = (
  {properties: {properties, mlsProperties, favProperties}},
  {propertyId, isFavouriteView, MslPropertiesView, propertyItem},
) => {
  let property = _.find(
    isFavouriteView
      ? favProperties
      : MslPropertiesView
      ? mlsProperties
      : properties,
    {id: propertyId},
  );
  if (!property) property = propertyItem;
  return {
    property,
  };
};

const actions = {
  markPropertyFavouriteRequest,
  deletePropertyRequest,
  soldPropertyRequest,
};

export default connect(mapStateToProps, actions)(PropertyDetailController);
