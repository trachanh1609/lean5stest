import React from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { updateSelectedYear } from "../actions/index";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';

var currentTime = new Date();
var year = currentTime.getFullYear();

const mapStateToProps = state => {
    return { 
        
        selectedYear: state.selectedYear
        
    };
  };

const mapDispatchToProps = dispatch => {
    return {
      updateSelectedYear: selectedYear => dispatch(updateSelectedYear(selectedYear))
    };
};

class SelectYear extends React.Component {
    constructor(props){
        super(props);
        this.state={
            year:""
        }
    }
    componentDidMount () {
        
        year = currentTime.getFullYear();
        this.setState({year:year});
        this.props.updateSelectedYear(year);
    }
    
    yearSelected = (event) => {
       
        var selectedYear = event.target.value;
        this.props.updateSelectedYear(selectedYear);
        
    }
    render() {
        return (
            <FormControl>
            <InputLabel>Year</InputLabel>
            <Select className="select" onChange={this.yearSelected} value={this.props.selectedYear}>
                <MenuItem value="">Year</MenuItem>
                <MenuItem value={this.state.year}>{this.state.year}</MenuItem>
                <MenuItem value={this.state.year-1}>{this.state.year-1}</MenuItem>
                <MenuItem value={this.state.year-2}>{this.state.year-2}</MenuItem>
                <MenuItem value={this.state.year-3}>{this.state.year-3}</MenuItem>
                <MenuItem value={this.state.year-4}>{this.state.year-4}</MenuItem>
                
            </Select>
            </FormControl>
            
        )
    }


} 



export default connect(mapStateToProps,mapDispatchToProps)(SelectYear);

