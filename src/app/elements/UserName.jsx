import React from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Input from '@material-ui/core/Input';


const mapStateToProps = state => {
    return { 
        
        user: state.user 
    };
  };



class UserName extends React.Component {
    constructor(props){
        super(props);
    }
    
    
    render() {
        return (
            <Input className="select" type="text" disabled value={this.props.user.name}/>
        )
    }


} 



export default connect(mapStateToProps)(UserName);

