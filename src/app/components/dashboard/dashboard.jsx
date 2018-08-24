import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { updateUser } from '../../actions/userActions';
import { apiRequest } from '../../actions/postsActions';

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

    this.onUpdateUser = this.onUpdateUser.bind(this);
  }

  componentDidMount() {

  }

  onFetchPosts = () => {
    this.props.onApiRequest();
  }

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  onUpdateUser() {
    this.props.onUpdateUser('Sammy');
  }

  render () {
    const {classes} = this.props ;
  
    console.log(this.props.posts);  
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
            <div onClick={this.onUpdateUser}>Update User</div>
            <div onClick={this.onFetchPosts}>Fetch Posts</div>
            <ProfileMenu className={classes.profileMenu} user={this.props.user} />
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
          <ul>
              {
                Array.isArray( this.props.posts.data) && this.props.posts.data.length ?
                  this.props.posts.data.map(post=>{
                    return <li key={post.id}>{post.id}- {post.title} - {post.author}</li>;
                  }) :
                  <li>{this.props.posts.error}</li>
                 
              }
          </ul>
          <MainContent />
        </main>
      </div>
    )
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state, props) => {
  return {
    posts : state.posts,
    user : state.user,
    aRandomProp : `Hello ${state.user}`,
  }
};

// Working
const mapActionsToProps = {
  onUpdateUser : updateUser,
  onApiRequest : apiRequest,
};

// Working
// import { bindActionCreators } from 'redux';
// const mapActionsToProps = (dispatch, props) => {
//   console.log(props)
//   return bindActionCreators({
//     onUpdateUser: updateUser
//   }, dispatch);
// }

// Not working
// const mapActionsToProps = dispatch => {
//   return {
//     onUpdateUser : dispatch(updateUser),
//   }
// };

// Working . This is actually mapDispatchToProps
// const mapActionsToProps = dispatch => {
//   return {
//     onUpdateUser : name => dispatch(updateUser(name)),    // working. props.onUpdateUser is a function
//     // onUpdateUser : dispatch(updateUser('Some Name')),  // OK, but dispatch is executed immediately.
//   }
// };

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Dashboard));