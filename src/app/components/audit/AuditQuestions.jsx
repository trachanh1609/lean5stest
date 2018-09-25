import React from 'react';
import { connect } from "react-redux";
import RowsAuditQuestions from '../../elements/RowsAuditQuestions';
import { Link } from 'react-router';
import AuditCaseCreator from '../../elements/AuditCaseCreator';
import { addResponse, clearResponse } from "../../actions/index";
import UserPanel from '../../elements/UserPanel';
const mapDispatchToProps = dispatch => {
    return {
      addResponse: responses => dispatch(addResponse(responses))
    };
};


class AuditQuestions extends React.Component {
    constructor(props) {
        super(props);
    }

    
    render() {
        return (
            <div className="container home">
            <UserPanel/>
                <br/>
                <br/>
                <h3>Audit questions</h3>
                <div className="bordered">
                <AuditCaseCreator />
                
                
                
                </div>
            </div>
        )
    }
}

export default connect(null, mapDispatchToProps)(AuditQuestions);