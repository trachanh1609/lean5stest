import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
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
            <Link to="/administration_local" className="whiteText">Administration panel</Link>
          </li>
          <li>
            <Link to="/results" className="whiteText">Audit results</Link>
          </li>
          
                
          
          
        </ul>
      </nav>
        <p className="smallText">logged as {this.props.user.name}</p>
          </Toolbar>
         </AppBar>
      
    </header>
  )}
}

export default connect(mapStateToProps)(UserPanel);