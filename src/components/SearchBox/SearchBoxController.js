import React from 'react';
import PropTypes from 'prop-types';
import SearchBoxView from './SearchBoxView';

export default class SearchBoxController extends React.Component {
  constructor() {
    super();
    this.state = {
      open: false,
    };
  }

  static propTypes = {};
  static defaultProps = {};

  setOpen = open => {
    if (this.bsRef) {
      if (open) {
        this.bsRef.open();
      } else {
        this.bsRef.close();
      }
    }
  };


  render() {
    const {open} = this.state;
    const {setSelectedValue, onChangeSearchText} = this.props;
    return (
      <SearchBoxView
        {...this.props}
        setSelectedValue={selected => {
          setSelectedValue(selected);
          this.setOpen(false);
        }}
        onChangeSearchText={searchText => onChangeSearchText(searchText)}
        open={open}
        setOpen={this.setOpen}
        bsRef={ref => {
          this.bsRef = ref;
        }}
      />
    );
  }
}
