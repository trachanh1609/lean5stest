import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import classNames from 'classnames';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

import {drawerMenu} from './drawerMenu';
import ProfileMenu from './profileMenu';
import MainContent from './mainContent';

const drawerWidth = 240;
const drawerWidthClose = 72;
const appBarHeight = 64;
const transistionSpeed = 'width 0.5s';

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: '100vh',
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
  },
  appBar: {
    zIndex: 1201, // zIndex of drawer is 1200
    transition: transistionSpeed
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: transistionSpeed,
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawerPaper: {
    // position: 'relative',  // affecting border-right of drawer
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: transistionSpeed,
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: transistionSpeed,
    width: drawerWidthClose,
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '8px 8px'
  },
  content: {
    flexGrow: 1,
    marginTop: appBarHeight,
    transition: transistionSpeed,
    paddingLeft: drawerWidth,
  },
  contentClose: {
    flexGrow: 1,
    marginTop: appBarHeight,
    transition: transistionSpeed,
    paddingLeft: drawerWidthClose,
  },
  profileMenu: {
  },
  filler:{
    flexGrow: 1
  }
});

class Dashboard extends React.Component{

  constructor(props){
    super(props);
    
    this.state= {
      open: false,
      reports: [],
    };
  }

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  render () {
    const {classes} = this.props ;

    return (
      <div className={classes.root}>
        <AppBar
          position="absolute"
          className={classNames(classes.appBar, this.state.open && classes.appBarShift)}
        >
          <Toolbar disableGutters={!this.state.open}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
              className={classNames(classes.menuButton, this.state.open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="title" color="inherit" noWrap>
              Lean 5S
            </Typography>
            <div className={classes.filler}></div>
            <ProfileMenu className={classes.profileMenu}/>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          classes={{
            paper: classNames(classes.drawerPaper, !this.state.open && classes.drawerPaperClose),
          }}
          open={this.state.open}
        >
          <div className={classes.toolbar}>
            <Typography variant="title" color="inherit">
                Metsä Group
            </Typography>
            <IconButton onClick={this.handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <List>{drawerMenu}</List>
          
        </Drawer>
        <main className={classNames(classes.content, !this.state.open && classes.contentClose )}>
          {/* <div className={classes.toolbar} /> */}
          <MainContent />
        </main>
      </div>
    )
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Dashboard);