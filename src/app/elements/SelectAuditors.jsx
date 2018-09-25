import React from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { updateAuditor } from "../actions/index";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';

const mapStateToProps = state => {
    return { 
        selectedAuditor: state.selectedAuditor,
        user: state.user 
    };
  };

const mapDispatchToProps = dispatch => {
    return {
      updateAuditor: selectedAuditor => dispatch(updateAuditor(selectedAuditor))
    };
};

class SelectAuditors extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            auditors: [],
            select_disabling: "disabled"
        }
    }
    
    componentDidMount () {
        // not working now
        if (this.props.user.name == "Antti Auditoija") this.setState({select_disabling: ""});
        else this.setState({select_disabling: "disabled"});
    }
    auditorSelected = event => {
        var value = "";
        if (event.target.value != "all") {
            value = event.target.value;
            this.props.updateAuditor({name: value});
        }
    }

    render() {
        return (
            <FormControl>
            <InputLabel>Auditor</InputLabel>
            <Select className="select" onChange={this.auditorSelected} value={this.props.selectedAuditor.name} >
                    <MenuItem value="All">All</MenuItem>
                    <MenuItem value="Antti Auditoija">Antti Auditoija</MenuItem>
                    <MenuItem value="Markku Tarkastaja">Markku Tarkastaja</MenuItem>
                    <MenuItem value="Juha Seikkailija">Juha Seikkailija</MenuItem>
                    
                    
            </Select>
            </FormControl>
        )
    }


} 




export default connect(mapStateToProps,mapDispatchToProps)(SelectAuditors);

