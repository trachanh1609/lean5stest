import React from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {API_URL} from "../constants/urls";

import { addAuditReport } from "../actions/index";
const mapStateToProps = state => {
    return { 
        selectedTarget: state.selectedTarget,
        audits: state.audits
    };
  };

const mapDispatchToProps = dispatch => {
    return {
      addAuditReport: audits => dispatch(addAuditReport(audits))
    };
};

class TableAudits extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            audits: []
        }
    }

    componentDidMount() {
        
    }

    getAudits = () => {
        //var filter="&stage=ready";
        var filter = "";
        filter += this.props.selectedTarget.id;
        
        var self = this;
        let url = API_URL + "?type=Audit_case"+filter;
        fetch(url)
        .then(function(response) {
          return response.json();
        })
        .then(function(json){
            json.map(audit=>{
                
                self.props.addAuditReport({
                    id:audit.id,
                    target_id:audit.target_id,
                    target_name:audit.target_name,
                    average_grade:audit.average_grade

                });
            });
        })
        .catch(function(err){
          console.error(err)
        });
    }

    render() {
        return (
        <table>
            <tbody>
                {this.props.audits.map(audit=>(
                    <tr>
                        <td>{audit.id}</td>
                        <td>{audit.average_grade}</td>
                    </tr>
                ))}
                
            </tbody>
        </table>
    )

    }
}


TableAudits.propTypes = {
    addAuditReport: PropTypes.func.isRequired,
    selectedTarget: PropTypes.object.isRequired
};

export default connect(mapStateToProps,mapDispatchToProps)(TableAudits);