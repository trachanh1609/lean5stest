import React from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addCorporation, clearCorporations, clearFactories, clearTargets, addFactory, updateSelectedCorporation, updateSelectedFactory, updateSelectedTarget } from "../actions/index";
import {API_URL} from "../constants/urls";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';


const mapStateToProps = state => {
    return { 
        corporations: state.corporations,
        factories: state.factories,
        targets: state.targets,
        selectedCorporation: state.selectedCorporation,
        selectedFactory: state.selectedFactory,
        selectedTarget: state.selectedTarget
        
    };
  };

const mapDispatchToProps = dispatch => {
    return {
      addCorporation: corporations => dispatch(addCorporation(corporations)),
      addFactory: factories => dispatch(addFactory(factories)),
      clearCorporations: corporations => dispatch(clearCorporations(corporations)),
      clearFactories: factories => dispatch(clearFactories(factories)),
      clearTargets: targets => dispatch(clearTargets(targets)),
      updateSelectedCorporation: selectedCorporation => dispatch(updateSelectedCorporation(selectedCorporation)),
      updateSelectedFactory: selectedFactory => dispatch(updateSelectedFactory(selectedFactory)),
      updateSelectedTarget: selectedTarget => dispatch(updateSelectedTarget(selectedTarget))
    };
};

class SelectCorporations extends React.Component {
    constructor(props){
        super(props);
    }
    componentDidMount () {
        if (this.props.corporations.length<1) this.getCorporations();
    }
getCorporations = () => {
        this.props.clearCorporations();
        var self = this;
        let url = API_URL + "?type=Corporation";
        fetch(url)
        .then(function(response) {
          return response.json();
        })
        .then(function(json){
            json.map(corporation=>{
                
                self.props.addCorporation({
                    id:corporation.id,
                    corporation_name:corporation.corporation_name
                });
                
            });
        })
        .catch(function(err){
          console.error(err)
        });
    }

    getFactories = () => {
        var self = this;
        var filter = "";
        if (this.props.selectedCorporation.id != "") filter = "&corporation_id="+this.props.selectedCorporation.id;
        let url = API_URL + "?type=Office"+filter;
        fetch(url)
        .then(function(response) {
          return response.json();
        })
        .then(function(json){
            json.map(factory=>{
                
                    self.props.addFactory({
                        id:factory.id,
                        office_name:factory.office_name
                    });
            });
        })
        .catch(function(err){
          console.error(err)
        });
    }

   
    corporationSelected = event => {
        var value = "";
        var name = "";
        this.props.clearTargets();
        this.props.clearFactories();
        this.props.updateSelectedFactory({id:"",name:""});
        this.props.updateSelectedTarget({id:"",name:""});
        if (event.target.value != "all") {
            value = event.target.value;
            this.props.corporations.map(c=>{
                if (c.id == value) name = c.corporation_name;
            });
        }
        this.props.updateSelectedCorporation({id:value,name:name});
        if (value != "") setTimeout(function(){this.getFactories()}.bind(this),500);
        
        
    }
    render() {
                
        return (

            <FormControl>
            <InputLabel>Corporation</InputLabel>
            <Select className="select" ref="selCorp" onChange={this.corporationSelected} value={this.props.selectedCorporation.id}>
            <MenuItem value="">Corporation</MenuItem>
                        {this.props.corporations.map(corporation => (
                            <MenuItem value={corporation.id} key={corporation.id}>
                                {corporation.corporation_name}
                            </MenuItem>
                        ))}
            </Select>
            </FormControl>

        )
    }
/*
<select ref="selCorp" onChange={this.corporationSelected} defaultValue={this.props.selectedCorporation.id}>
                <option value="all">Yhtiö</option>
                
                    {this.props.corporations.map(corporation => (
                            <MenuItem value={corporation.id} key={corporation.id}>
                                {corporation.corporation_name}
                            </MenuItem>
                        ))}
            </select>
            
            
<NativeSelect ref="selCorp" onChange={this.corporationSelected} value={this.props.selectedCorporation.id}>
                <option value="all"><em>Yhtiö</em></option>
                
                    {this.props.corporations.map(corporation => (
                            <option value={corporation.id} key={corporation.id}>
                                {corporation.corporation_name}
                            </option>
                        ))}
            </NativeSelect>
            
            */

} 

SelectCorporations.propTypes = {
    corporations: PropTypes.array.isRequired,
    factories: PropTypes.array.isRequired,
    addCorporation: PropTypes.func.isRequired,
    addFactory: PropTypes.func.isRequired,
    
    clearFactories: PropTypes.func.isRequired,
    clearTargets: PropTypes.func.isRequired,
    clearCorporations: PropTypes.func.isRequired,
    
    updateSelectedCorporation: PropTypes.func.isRequired,
    updateSelectedFactory: PropTypes.func.isRequired,
    updateSelectedTarget: PropTypes.func.isRequired

};

export default connect(mapStateToProps,mapDispatchToProps)(SelectCorporations);

