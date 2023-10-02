import React from "react";
import PropTypes from "prop-types";
import RegisterSuccessView from "./RegisterSuccessView";

export default class RegisterSuccessController extends React.Component {
 constructor(){
 super();
 this.state={}
} 
static propTypes = {};
  static defaultProps = {};
 render() { 
   return <RegisterSuccessView {...this.props}/>
 } 
 };