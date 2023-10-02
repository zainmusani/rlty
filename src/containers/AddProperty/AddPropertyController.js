import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import ImagePicker from 'react-native-image-crop-picker';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import {Images} from '../../theme';
import util from '../../util';
import AddPropertyView from './AddPropertyView';
import {
  addPropertyRequest,
  editPropertyRequest,
  getPropertiesRequest,
} from '../../actions/propertyActions';
import {multiMediaUploadToServer} from '../../helpers/ImageUploaderHelper';
import {moreThanCharError, PROPERTY_TYPES} from '../../constants';

class AddPropertyController extends React.Component {
  constructor(props) {
    super(props);

    const {item} = props;
    const photos = item?.photos || [];

    let address = '';
    let title = '';
    let description = '';
    let price = '';
    let area = '';
    let square = '';
    let date = new Date();
    let propertyImages = [
      {id: 1, icon: Images.uploadIcon},
      ...photos?.map((path, i) => {
        return {id: i + 2, icon: path, url: true};
      }),
    ];
    let type = PROPERTY_TYPES;
    if (item) {
      address = item?.address;
      title = item?.title;
      description = item?.description;
      price = item?.price?.toString();
      area = item?.area?.toString();
      square = item?.squareFeet?.toString();
      date = new Date(item?.year);
      type = _.cloneDeep(PROPERTY_TYPES).map(obj => {
        if (obj.label === item.type) {
          obj.selected = true;
        } else {
          obj.selected = false;
        }
        return obj;
      });
    }

    this.state = {
      type,
      date,
      address,
      addressError: '',
      title,
      titleError: '',
      description,
      descriptionError: '',
      price,
      priceError: '',
      square,
      squareError: '',
      area,
      areaError: '',
      propertyImages,
      images: '',
      imageError: '',
      imageUris: [],
      loading: false,
    };
  }
  static propTypes = {item: PropTypes.object};
  static defaultProps = {};

  isReqRuntimeError = (value, errorPropertyName, error, checkLength) => {
    const emptyFieldRemove = ['squareError', 'descriptionError'];
    if (checkLength && util.checkLength(value, checkLength)) {
      this.setState({[errorPropertyName]: moreThanCharError(checkLength)});
      return true;
    } else if (
      _.isEmpty(value) &&
      !emptyFieldRemove.includes(errorPropertyName)
    )
      this.setState({[errorPropertyName]: `${error} is required`});
    else this.setState({[errorPropertyName]: ''});
  };

  isReqRuntimeErrorForName = (
    value,
    errorPropertyName,
    error,
    secondError,
    checkLength,
  ) => {
    if (checkLength && util.checkLength(value, checkLength)) {
      this.setState({[errorPropertyName]: moreThanCharError(checkLength)});
      return true;
    } else if (!util.isValidName(value))
      this.setState({[errorPropertyName]: secondError});
    else if (_.isEmpty(value))
      this.setState({[errorPropertyName]: `${error} is required`});
    else this.setState({[errorPropertyName]: ''});
  };

  isReqRuntimeErrorForNumber = (
    value,
    errorPropertyName,
    error,
    secondError,
    checkLength,
  ) => {
    if (checkLength && util.checkLength(value, checkLength)) {
      this.setState({[errorPropertyName]: moreThanCharError(checkLength)});
      return true;
    } else if (!util.isNumber(value))
      this.setState({[errorPropertyName]: secondError});
    else if (_.isEmpty(value))
      this.setState({[errorPropertyName]: `${error} is required`});
    else this.setState({[errorPropertyName]: ''});
  };

  onAddressChange = address => {
    if (this.isReqRuntimeError(address, 'addressError', 'Address', 255)) return;
    this.setState({address});
  };
  onDescriptionChange = description => {
    if (
      this.isReqRuntimeError(
        description,
        'descriptionError',
        'Description',
        255,
      )
    )
      return;
    this.setState({description});
  };
  onTitleChange = title => {
    if (
      this.isReqRuntimeErrorForName(
        title,
        'titleError',
        'Title',
        'Enter valid property Title containing alphabets only',
        72,
      )
    )
      return;
    this.setState({title});
  };
  onPriceChange = price => {
    if (
      this.isReqRuntimeErrorForNumber(
        price,
        'priceError',
        'Price',
        'Enter valid amount containing digits only',
        11,
      )
    )
      return;
    this.setState({price});
  };
  onSquareChange = square => {
    if (this.isReqRuntimeError(square, 'squareError', 'Square feet', 11))
      return;
    this.setState({square});
  };
  onAreaChange = area => {
    this.setState({area});
  };
  onDateChange = date => {
    this.setState({date});
  };
  setImageUri = imageUris => {
    this.setState({imageUris});
  };
  typeItemClick = id => {
    let tempTypes = _.cloneDeep(this.state.type);
    tempTypes.forEach(element => {
      if (element.id === id) {
        element.selected = true;
      } else {
        element.selected = false;
      }
    });
    this.setState({type: tempTypes});
  };

  onFieldSubmit = ref => {
    if (ref) {
      ref.focus();
    }
  };

  onGalleryPress = () => {
    ImagePicker.openPicker({
      multiple: true,
      maxFiles: 10,
      compressImageQuality: 0.8,
      mediaType: 'photo',
    })
      .then(imagesArr => {
        const images = imagesArr.slice(0, 10);
        this.setState({imageError: ''});
        this.setState({images});
        let tempPropImages = _.cloneDeep(this.state.propertyImages);
        images.forEach((element, index) => {
          if (tempPropImages[index + this.state.propertyImages.length]) {
            tempPropImages[index + this.state.propertyImages.length].icon =
              element.path;
          } else {
            let image = {id: tempPropImages.length + 1};
            image.icon = element.path;
            tempPropImages.push(image);
          }
        });
        this.setState({propertyImages: tempPropImages});
      })
      .catch(e => {
        if (e.code && e.code === 'E_PERMISSION_MISSING') {
          writeLog(e, 'from ProfileController from line 119');

          Alert.alert(
            'Permission Required',
            'Cannot access images. Please allow access if you want to be able to select images.',
            [
              {
                text: 'Open Settings',
                onPress: () => {
                  OpenSettings.openSettings();
                },
              },
              {
                text: 'Cancle',
                onPress: () => {},
                style: 'cancel',
              },
            ],
            {cancelable: false},
          );
        }
        console.log({e});
      });
  };

  removeImage = id => {
    let tempPropImages = _.cloneDeep(this.state.propertyImages);
    let imageInd = _.findIndex(tempPropImages, {id: id});
    if (imageInd > 0) tempPropImages.splice(imageInd, 1);
    if (tempPropImages?.length === 1)
      this.setState({imageError: 'images is required'});
    this.setState({propertyImages: tempPropImages});
  };

  setLoading = loading => {
    this.setState({loading});
  };

  apiRequest = () => {
    const {
      state: {
        type,
        images,
        address,
        title,
        description,
        price,
        area,
        square,
        date,
        imageUris,
        propertyImages,
      },
      props: {
        addPropertyRequest,
        editPropertyRequest,
        item,
        getPropertiesRequest,
      },
      setImageUri,
      setLoading,
    } = this;

    const propsImages = item?.photos?.map(path => {
      if (propertyImages.some(obj => obj?.icon === path)) return path;
    });

    const editedImages =
      propsImages &&
      [...propsImages, ...imageUris?.map(obj => obj?.path)].filter(a => a);

    let payload = {
      propertyType: type?.find(obj => obj.selected).id,
      propertyAddress: address,
      propertyTitle: title,
      propertyDescription: description,
      propertyPrice: price,
      propertyArea: area,
      propertySquarefeet: square,
      propertyYear: util.convertDateIntoUtc(date),
      property_images: item?.photos
        ? editedImages
        : _.isEqual(imageUris[0], 0)
        ? []
        : imageUris?.map(obj => obj?.path),
      latitude: 1232442,
      longitude: 4355455,
    };

    // setLoading(true);
    const propertyRequest = item ? editPropertyRequest : addPropertyRequest;
    const redirect = item
      ? Actions.pop
      : () => Actions.myPropertiesSecondStack({gotoDashboard: true});
    const topAlertMessage = item
      ? 'Property updated successfully'
      : 'Property added successfully';
    if (item) payload = {...payload, propertyId: item.propertyId};
    propertyRequest(payload, res => {
      if (!res) return setLoading(false);
      setLoading(false);
      setImageUri([]);
      util.topAlert(topAlertMessage, 'success');
      redirect();
    });
  };

  propertyOnPressHandler = () => {
    const {
      state: {images},
      validate,
      setImageUri,
      setLoading,
    } = this;

    if (!validate()) return;

    if (!images?.length) {
      setLoading(true);
      setImageUri([0]);
      return;
    }

    multiMediaUploadToServer(images, setImageUri, setLoading).then(res => {});
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.imageUris !== prevState.imageUris) {
      if (!this.state.imageUris.length) return;
      this.apiRequest();
    }
  }

  validate = () => {
    const {
      address,
      title,
      description,
      price,
      square,
      area,
      images,
      propertyImages,
    } = this.state;
    const newErrorState = {
      titleError: '',
      priceError: '',
      addressError: '',
      descriptionError: '',
      squareError: '',
      areaError: '',
      imageError: '',
    };
    let hasError = false;

    if (_.isEmpty(address)) {
      newErrorState.addressError = 'Address is required';
      if (!hasError) this.addressRef.focus();
      hasError = true;
    }
    if (_.isEmpty(title)) {
      newErrorState.titleError = 'Title is required';
      if (!hasError) this.titleRef.focus();
      hasError = true;
    } else if (!util.isValidName(title)) {
      newErrorState.titleError =
        'Enter valid property Title containing alphabets only';
      if (!hasError) this.titleRef.focus();
      hasError = true;
    }
    // if (_.isEmpty(description)) {
    //   newErrorState.descriptionError = 'Description is required';
    //   if (!hasError) this.descriptionRef.focus();
    //   hasError = true;
    // }
    if (_.isEmpty(price)) {
      newErrorState.priceError = 'Price is required';
      if (!hasError) this.priceRef.focus();
      hasError = true;
    } else if (!util.isNumber(price)) {
      newErrorState.priceError = 'Enter valid amount containing digits only';
      if (!hasError) this.priceRef.focus();
      hasError = true;
    }

    // if (_.isEmpty(square)) {
    //   newErrorState.squareError = 'Square feet is required';
    //   if (!hasError) this.squareRef.focus();
    //   hasError = true;
    // }

    this.setState(newErrorState);
    return !hasError;
  };

  render() {
    const {
      type,
      address,
      addressError,
      description,
      descriptionError,
      title,
      titleError,
      price,
      priceError,
      area,
      areaError,
      square,
      squareError,
      propertyImages,
      date,
      loading,
      imageError,
    } = this.state;
    return (
      <AddPropertyView
        {...this.props}
        addressRef={ref => {
          this.addressRef = ref;
        }}
        address={address}
        addressError={addressError}
        onAddressChange={this.onAddressChange}
        onAddressSubmit={() => this.onFieldSubmit(this.titleRef)}
        type={type}
        typeItemClick={this.typeItemClick}
        titleRef={ref => {
          this.titleRef = ref;
        }}
        title={title}
        titleError={titleError}
        onTitleChange={this.onTitleChange}
        onTitleSubmit={() => this.onFieldSubmit(this.descriptionRef)}
        descriptionRef={ref => {
          this.descriptionRef = ref;
        }}
        description={description}
        descriptionError={descriptionError}
        onDescriptionChange={this.onDescriptionChange}
        imageError={imageError}
        onDescriptionSubmit={() => {
          this.onFieldSubmit(this.priceRef);
        }}
        priceRef={ref => {
          this.priceRef = ref;
        }}
        price={price}
        priceError={priceError}
        onPriceChange={this.onPriceChange}
        onPriceSubmit={() => this.onFieldSubmit(this.areaRef)}
        areaRef={ref => {
          this.areaRef = ref;
        }}
        area={area}
        areaError={areaError}
        onAreaChange={this.onAreaChange}
        onAreaSubmit={() => this.onFieldSubmit(this.squareRef)}
        squareRef={ref => {
          this.squareRef = ref;
        }}
        square={square}
        squareError={squareError}
        onSquareChange={this.onSquareChange}
        onSquareSubmit={() => this.squareRef.blur()}
        propertyImages={propertyImages}
        onGalleryPress={this.onGalleryPress}
        removeImage={this.removeImage}
        propertyOnPressHandler={this.propertyOnPressHandler}
        date={date}
        onDateChange={this.onDateChange}
        loading={loading}
        setLoading={this.setLoading}
      />
    );
  }
}

const mapStateToProps = ({}) => ({});

const actions = {
  addPropertyRequest,
  editPropertyRequest,
  getPropertiesRequest,
};

export default connect(mapStateToProps, actions)(AddPropertyController);
