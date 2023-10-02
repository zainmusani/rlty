import _ from 'lodash';
import moment from 'moment';
import {PROPERTY_TYPE_NAMES} from '../constants';
import util from '../util';

export const manipulatePropertyBuyerListData = data => {
  console.log({data});
  if (_.isEmpty(data)) return [];

  let list = data.map(res => {
    res = {
      entireAdditionalInfo: res?.additional_info_entire,
      address: res?.address,
      amountOfContract: res?.amount_of_contract,
      appraisalAdditionalInfo: res?.appraisal_additional_info,
      appraisalDate: util.convertUtcDateIntoLocale(res?.appraisal_date),
      name: res?.buyer_name,
      contractToLenderDate: util.convertUtcDateIntoLocale(
        res?.contract_to_lender_date,
      ),
      earnestMoneyReceivedDate: util.convertUtcDateIntoLocale(
        res?.earnest_money_received_date,
      ),
      homeInspectionDate: util.convertUtcDateTimeIntoLocale(
        res?.home_inspection_date,
      ),
      homeInspectionInfo: res?.home_inspection_info,
      homeWarrantyDate: util.convertUtcDateIntoLocale(res?.home_warranty_date),
      id: res?.id,
      isContractToLender: +res?.is_contract_to_lender,
      isEarnestMoneyReceived: +res?.is_earnest_money_received,
      isHomeWarranty: +res?.is_home_warranty,
      isNewSurvey: +res?.is_new_survey,
      isSurveyReceived: +res?.is_survey_received,
      isSwitchOverutilities: +res?.is_switch_over_utilities,
      surveyInfo: res?.new_survey_info,
      optionPeriodEndDate: util.convertUtcDateTimeIntoLocale(
        res?.option_period_end,
      ),
      propertyId: res?.property_id,
      termiteInspectionDate: util.convertUtcDateTimeIntoLocale(
        res?.termite_inspection_date,
      ),
      termiteInspectionInfo: res?.termite_inspection_info,
      titleCommitmentDate: util.convertUtcDateIntoLocale(res?.title_commitment),
      titleCompanyCloser: res?.title_company_closer,
      companyName: res?.title_company_closer,
      image: !util.isArrayEmpty(res.property_images)
        ? res?.property_images[0]?.path
        : '',
    };
    return res;
  });

  return list;
};

export const manipulatePropertySellerListData = data => {
  if (_.isEmpty(data)) return [];

  let list = data.map(res => {
    res = {
      entireAdditionalInfo: res?.additional_info_entire,
      address: res?.address,
      amountOfContract: res?.amount_of_contract,
      appraisalAdditionalInfo: res?.appraisal_additional_info,
      appraisalDate: util.convertUtcDateIntoLocale(res?.appraisal_date),
      name: res?.seller_name,
      contractToLenderDate: util.convertUtcDateIntoLocale(
        res?.contract_to_lender_date,
      ),
      earnestMoneyReceivedDate: util.convertUtcDateIntoLocale(
        res?.earnest_money_received_date,
      ),
      homeInspectionDate: util.convertUtcDateTimeIntoLocale(
        res?.home_inspection_date,
      ),
      homeInspectionInfo: res?.home_inspection_info,
      homeWarrantyDate: util.convertUtcDateIntoLocale(res?.home_warranty_date),
      id: res?.id,
      isContractToLender: +res?.is_contract_to_lender,
      isEarnestMoneyReceived: +res?.is_earnest_money_received,
      isHomeWarranty: +res?.is_home_warranty,
      isNewSurvey: +res?.is_new_survey,
      isSurveyReceived: +res?.is_survey_received,
      isSwitchOverutilities: +res?.is_switch_over_utilities,
      surveyInfo: res?.new_survey_info,
      optionPeriodEndDate: util.convertUtcDateTimeIntoLocale(
        res?.option_period_end_date,
      ),
      propertyId: res?.property_id,
      termiteInspectionDate: util.convertUtcDateTimeIntoLocale(
        res?.termite_inspection_date,
      ),
      termiteInspectionInfo: res?.termite_inspection_info,
      titleCommitmentDate: util.convertUtcDateIntoLocale(
        res?.title_commit_to_be_rec_date,
      ),
      companyName: res?.title_company_closer,
      image: res?.property_images?.[0]?.path ?? '',
    };
    return res;
  });

  return list;
};

export const manipulateMyPropertyListData = data => {
  if (_.isEmpty(data)) return [];
  let list = data.map(res => {
    res = {
      type: PROPERTY_TYPE_NAMES[+res?.property_type_id - 1],
      price: res?.property_price,
      id: res?.id,
      propertyId: res?.property_id,
      year: util.convertUtcDateIntoLocale(res?.property_year_built),
      title: res?.property_title,
      address: res?.property_address,
      isFav: +res?.is_favourite ? true : false,
      squareFeet: res?.property_square_feet,
      description: res?.property_description,
      area: res?.property_area,
      saleType: +res?.is_sold ? 'sold' : 'For Sale',
      isBuyerAdded: !!res?.buyer?.length,
      isSellerAdded: !!res?.seller?.length,
      buyerDetail: !!res?.buyer?.length
        ? manipulatePropertyBuyerListData(res?.buyer)[0]
        : {},
      sellerDetail: !!res?.seller?.length
        ? manipulatePropertySellerListData(res?.seller)[0]
        : {},
      image:
        (res?.images && !!res?.images?.length && res?.images[0].path) ||
        'https://rlty-dev.s3.amazonaws.com/ea5e5aca6e6e429d89a08d2c42bfc402.jpg',
      isNoteAdd: true,
      isMyProperty: true,
      notes:
        res?.notes?.map(obj => ({
          note: obj?.description,
          id: obj?.id,
          date: moment
            .utc(obj?.created_at)
            .local()
            .format('MMM D, YYYY | hh:mm A'),
        })) || [],
      photos: !!res?.images?.length ? res?.images?.map(obj => obj.path) : [],
    };

    return res;
  });
  return list;
};

export const manipulateMlsPropertyListData = data => {
  if (_.isEmpty(data)) return [];
  let list = data.map(res => {
    res = {
      type: PROPERTY_TYPE_NAMES[+res?.property_type_id - 1],
      price: res?.property_price ? res?.property_price : '',
      id: res?.id,
      propertyId: res?.property_id,
      // year: "2022-08-16",
      year: util.convertUtcDateIntoLocale(res?.property_year_built),
      title: res?.property_title || 'mls property',
      address: res?.property_address,
      isFav: +res?.is_favourite ? true : false,
      squareFeet: res?.property_square_feet || 0,
      description: res?.property_description,
      area: res?.property_area,
      saleType: +res?.is_sold ? 'sold' : 'For Sale',
      image:
        (res?.images && !!res?.images.length && res?.images[0].img_url) ||
        'https://rlty-dev.s3.amazonaws.com/ea5e5aca6e6e429d89a08d2c42bfc402.jpg',
      photos:
        res?.images && !!res?.images.length
          ? res?.images.slice(0, 10).map(obj => obj.img_url)
          : [],
      isMlsProperty: true,
      latitude: res?.latitude,
      longitude: res?.longitude,
    };
    return res;
  });
  return list;
};

export const manipulateFavPropertyListData = data => {
  if (_.isEmpty(data)) return [];

  let list = data.map(res => {
    res = {
      id: res?.id,
      type: PROPERTY_TYPE_NAMES[+res?.property_type_id - 1],
      saleType: +res?.is_sold ? 'sold' : 'For Sale',
      title: res?.property_title,
      address: res?.property_address,
      area: res?.property_area,
      squareFeet: res?.property_square_feet,
      price: res?.property_price,
      isFav: +res?.is_favourite ? true : false,
      sold: +res?.is_sold ? 'sold' : 'For Sale',
      description: res?.property_description,
      propertyId: res?.property_id,
      year: res?.property_year_built,
      notes:
        res?.notes?.map(obj => ({
          note: obj?.description,
          id: obj?.id,
          date: moment
            .utc(obj?.created_at)
            .local()
            .format('MMM D, YYYY | hh:mm A'),
        })) || [],
      isFavProperty: true,
      isNoteAdd: true,
      image:
        (res?.images && !!res?.images?.length && res?.images[0].path) ||
        'https://rlty-dev.s3.amazonaws.com/ea5e5aca6e6e429d89a08d2c42bfc402.jpg',
      photos: !!res?.images?.length ? res?.images?.map(obj => obj.path) : [],
    };
    return res;
  });

  return list;
};
