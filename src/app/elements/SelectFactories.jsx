import React from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addTarget, clearTargets, updateSelectedFactory, updateSelectedTarget } from "../actions/index";
import {API_URL} from "../constants/urls";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';

const mapStateToProps = state => {
    return { 
        factories: state.factories,
        selectedFactory: state.selectedFactory,
        targets: state.targets
    };
  };

const mapDispatchToProps = dispatch => {
    return {
      addTarget: targets => dispatch(addTarget(targets)),
      clearTargets: targets => dispatch(clearTargets(targets)),
      updateSelectedFactory: selectedFactory => dispatch(updateSelectedFactory(selectedFactory)),
      updateSelectedTarget: selectedTarget => dispatch(updateSelectedTarget(selectedTarget))
    };
};

class SelectFactories extends React.Component {
    constructor(props){
        super(props);
        
        
    }
   
    getTargets = () => {
        var self = this;
        var filter = "";
        
        
        if (this.props.selectedFactory.id != "") filter = "&office_id="+this.props.selectedFactory.id;
        
        
        let url = API_URL + "?type=Target"+filter;
        fetch(url)
        .then(function(response) {
          return response.json();
        })
        .then(function(json){
            json.map(target=>{
                self.props.addTarget({
                    id:target.id,
                    target_name:target.target_name
                });
               
            });
        })
        .catch(function(err){
          console.error(err)
        });
    }

    factorySelected = event => {
        var value = "";
        var name = "";
        this.props.clearTargets();
        this.props.updateSelectedTarget({id:"",name:""});

        if (event.target.value != "all") {
            value = event.target.value;
            this.props.factories.map(f=> {
                if (f.id == value) name = f.office_name;
            });
        }

        this.props.updateSelectedFactory({id:value,name:name});
        if (value != "") setTimeout(function(){this.getTargets()}.bind(this),500);
        
    }
    render() {
        return (
            <FormControl>
            <InputLabel>Factory</InputLabel>
            <Select className="select" onChange={this.factorySelected} value={this.props.selectedFactory.id}>
               
            <MenuItem value="">Factory</MenuItem>
                    {this.props.factories.map(factory => (
                        <MenuItem value={factory.id} key={factory.id}>
                            {factory.office_name}
                        </MenuItem>
                        ))}
            </Select>
            </FormControl>
            
        )
    }


} 





SelectFactories.propTypes = {
    factories: PropTypes.array.isRequired,
    targets: PropTypes.array.isRequired,
    selectedFactory: PropTypes.object.isRequired,
    addTarget: PropTypes.func.isRequired,
    updateSelectedFactory: PropTypes.func.isRequired,
    updateSelectedTarget: PropTypes.func.isRequired
};

export default connect(mapStateToProps,mapDispatchToProps)(SelectFactories);

