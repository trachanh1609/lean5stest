import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import ProfileMenu from './ProfileMenu';
import classNames from 'classnames';
const mapStateToProps = (state) => {
  return {
      
      user: state.user
  }
};

class UserPanel extends React.Component {
  constructor(props){
    super(props);
  }
  render () {
    const {classes} = this.props ;
  return (
    <header>
      <AppBar position="absolute">
                <Toolbar>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
             
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="title" color="inherit" noWrap>
              Lean 5S
            </Typography>
            
            <nav>
        <ul>
          <li>
          <Link to="/start_local" className="whiteText">Demo (React)</Link>
          </li>
          <li>
          <Link to="/audit" className="whiteText">Demo (Redux)</Link>
          </li>
          <li>
            <Link to="/administration_local/audit_cases" className="whiteText">Administration panel</Link>
          </li>
          <li>
            <Link to="/results" className="whiteText">Audit results</Link>
          </li>
          
                
          
          
        </ul>
      </nav>
        
        <ProfileMenu user={this.props.user} />
          </Toolbar>
         </AppBar>
      
    </header>
  )}
}

export default connect(mapStateToProps)(UserPanel);