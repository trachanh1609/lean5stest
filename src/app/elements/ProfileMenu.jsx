import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
const API_URL = "http://localhost:4000/api2/audits";
import { connect } from "react-redux";
import {updateUser} from "../actions/userActions";
import { updateAuditor } from "../actions/index";

const mapDispatchToProps = dispatch => {
    return {
        updateUser: user => dispatch(updateUser(user)),
        updateAuditor: selectedAuditor => dispatch(updateAuditor(selectedAuditor))
    };
  }

class ProfileMenu extends React.Component {
  state = {
    anchorEl: null,
    auditors: []
  };

  componentDidMount() {
      // get all auditors
      this.getAuditors();

  }
  getAuditors = () => {
    var self = this;
    let url = API_URL + "?type=Audit_case";

    fetch(url)
    .then(function(response) {
      return response.json();
    })
    .then(function(json){
        json.map(audit=> {
            var found = false;
            self.state.auditors.map(auditor => {
                if (auditor == audit.auditor)
                    found = true;
            });
            if (!found) {
                var state = self.state.auditors;
                state.push(audit.auditor);
                self.setState({auditors: state});
            }
        });
        console.log(self.state.auditors);
    })
    .catch(function(err){
      console.error(err)
    });
  }

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };
  handleClose = () => {
    this.setState({ anchorEl: null });

  };

  handleChange = (auditor) => {
    this.setState({ anchorEl: null });
    console.log(auditor.auditor);
    this.props.updateUser({name:auditor.auditor});
    this.props.updateAuditor({name:auditor.auditor});

  };

  render() {
    const { anchorEl } = this.state;

    return (
      <div>Logged as 
        <Button
          aria-owns={anchorEl ? 'simple-menu' : null}
          aria-haspopup="true"
          onClick={this.handleClick}
          variant="text"
          color="inherit"
        >
          {this.props.user.name}
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
        {this.state.auditors.map(auditor=>(
            <MenuItem onClick={this.handleChange.bind(this,{auditor})}>{auditor}</MenuItem>
        ))}
          
        </Menu>
      </div>
    );
  }
}

export default connect(null, mapDispatchToProps)(ProfileMenu);