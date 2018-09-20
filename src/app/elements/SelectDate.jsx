import React from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { updateSelectedDate } from "../actions/index";
import TextField from '@material-ui/core/TextField';

const mapStateToProps = state => {
    return { 
        
        selectedDate: state.selectedDate 
    };
  };

const mapDispatchToProps = dispatch => {
    return {
      updateSelectedDate: selectedDate => dispatch(updateSelectedDate(selectedDate))
    };
};

class SelectDate extends React.Component {
    constructor(props){
        super(props);
    }
    
    dateSelected = (event) => {
       
        this.props.updateSelectedDate(event.target.value);
        
    }
    render() {
        return (
            <TextField style={{width: "200px"}}type="date" onChange={this.dateSelected} value={this.props.selectedDate}/>
        )
    }


} 



export default connect(mapStateToProps,mapDispatchToProps)(SelectDate);

