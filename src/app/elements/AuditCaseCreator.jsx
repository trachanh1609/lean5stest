import React from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {API_URL} from "../constants/urls";
import axios from 'axios';
import { createAudit, clearAudit } from "../actions/index";
import RowsAuditQuestions from './RowsAuditQuestions';
import SelectDate from './SelectDate';

const mapStateToProps = state => {
    return { 
        startedAudit: state.startedAudit,
        selectedCorporation: state.selectedCorporation,
        selectedFactory: state.selectedFactory,
        selectedTarget: state.selectedTarget,
        selectedDate: state.selectedDate,
        user: state.user
    };
  };
  const mapDispatchToProps = dispatch => {
    return {
      createAudit: startedAudit => dispatch(createAudit(startedAudit)),
      clearAudit: startedAudit => dispatch(clearAudit(startedAudit))
    };
};

class AuditCaseCreator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            startedAuditId: ""
            
        }
    }
    componentDidMount() {
       this.checkStartedAudit();
       //setTimeout(function(){this.checkStartedAudit()}.bind(this),500);
    }

    componentWillUnmount() {
        this.props.clearAudit();
    }

    checkStartedAudit = () => {
        // new audit case, target is selected
        if ((this.props.startedAudit.id == "") && (this.props.selectedTarget.id != "")) {
            //console.log("there is no started audit, but target is selected");
            this.createAuditCase(); 
            setTimeout(function(){this.changeStoreAuditCaseId()}.bind(this),500);
        // target is not selected (redirect)
        } else if (this.props.selectedTarget.id == "") {
            //console.log("target is not selected");
            //alert("Please, select target");
            var link = "/audit";
            location.href = link;

        } 
    }

    changeStoreAuditCaseId = () => {
        this.props.createAudit({
            id:this.state.startedAuditId,
            target_id:this.props.selectedTarget.id,
            target_name:this.props.selectedTarget.name,
            office_id: this.props.selectedFactory.id,
            office_name: this.props.selectedFactory.name,
            corporation_id: this.props.selectedCorporation.id,
            corporation_name: this.props.selectedCorporation.name,
            date: this.props.selectedDate,
            auditor: this.props.user.name,
            stage: "started"
            
        });
    }

    createAuditCase() {
        var self = this;
        var temp = [];
        axios.post(API_URL, {
            type: 'Audit_case',
            corporation_id: this.props.selectedCorporation.id,
            corporation_name: this.props.selectedCorporation.name,
            office_id: this.props.selectedFactory.id,
            office_name: this.props.selectedFactory.name,
            target_id: this.props.selectedTarget.id,
            target_name: this.props.selectedTarget.name,
            date: this.props.selectedDate,
            auditor: this.props.user.name,
            results: temp,
            stage: "started"
        })
        .then(function (response) {
            
            //self.state.startedAuditId = response.data.id;
            self.setState({startedAuditId:response.data.id});
        })
        .catch(function (error) {console.log(error);});  
    }

    render() {
        return (
            <div>
            Date: <SelectDate/>
            <br/>
            <p>Audit id number: {this.props.startedAudit.id}</p>
            Corporation: {this.props.startedAudit.corporation_name}
            <br/>
            Factory: {this.props.startedAudit.office_name}
            <br/>
            Target: {this.props.startedAudit.target_name}
            <br/>
            Auditor: {this.props.startedAudit.auditor}
            <br/>
            Stage: {this.props.startedAudit.stage}
            <br/>
            <RowsAuditQuestions/>
            
            </div>
        )
    }
}

AuditCaseCreator.propTypes = {
    selectedCorporation: PropTypes.object.isRequired,
    selectedFactory: PropTypes.object.isRequired,
    selectedTarget: PropTypes.object.isRequired,
    createAudit: PropTypes.func.isRequired
};

export default connect(mapStateToProps,mapDispatchToProps)(AuditCaseCreator);