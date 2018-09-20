import React from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { updateSelectedTarget } from "../actions/index";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';

const mapStateToProps = state => {
    return { 
        targets: state.targets,
        selectedTarget: state.selectedTarget 
    };
  };

const mapDispatchToProps = dispatch => {
    return {
      updateSelectedTarget: selectedTarget => dispatch(updateSelectedTarget(selectedTarget))
    };
};

class SelectTargets extends React.Component {
    constructor(props){
        super(props);
    }
    
    targetSelected = event => {
        var value = "";
        var name = "";
        
        if (event.target.value != "all") {
            value = event.target.value;
            this.props.targets.map(t=>{
                if (t.id == value) name = t.target_name;
            });
        }

        this.props.updateSelectedTarget({id:value,name:name});
        
    }
    render() {
        return (
            <FormControl>
            <InputLabel>Target</InputLabel>
            <Select className="select" onChange={this.targetSelected} value={this.props.selectedTarget.id}>
                    <MenuItem value="">Target</MenuItem>
                    {this.props.targets.map(target => (
                    <MenuItem value={target.id} key={target.id}>
                            {target.target_name}
                    </MenuItem>
                    ))}
            </Select>
            </FormControl>
        )
    }


} 

SelectTargets.propTypes = {
    targets: PropTypes.array.isRequired,
    selectedTarget: PropTypes.object.isRequired,
    updateSelectedTarget: PropTypes.func.isRequired
};

export default connect(mapStateToProps,mapDispatchToProps)(SelectTargets);

