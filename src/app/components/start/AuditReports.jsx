import React, { Component } from "react";
import { connect } from "react-redux";
import {CSVLink} from 'react-csv';
import PropTypes from "prop-types";
import uuidv1 from "uuid";
import { addAuditReport } from "../../actions/index";

import Panel from './Panel';
import AuditReportRow from './AuditReportRow';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';


const API_URL = "http://localhost:4000/api2/audits";

var array = [];

const mapDispatchToProps = dispatch => {
    return {
      addAuditReport: audits => dispatch(addAuditReport(audits))
    };
};


class ConnectedAuditReports extends React.Component {
    constructor(){
        super();
        this.state = {
            audits: []
        };
        
    }

    

    getAuditCases = () => {
        var self = this;
        let url = API_URL + "?type=Audit_case";
        
        fetch(url)
        .then(function(response) {
          return response.json();
        })
        .then(function(json){
            
            //self.setState({audits: json});
            json.map(audit=>{
                self.props.addAuditReport({id:audit.id,auditor:audit.auditor,date:audit.date, target_id:audit.target_id, office_id:audit.office_id, corporation_id:audit.corporation_id});
            });
            
        })
        .catch(function(err){
          console.error(err)
        });
      
    }
    
    loadAudits = () => {
        this.getAuditCases();
    }
    
    
    render() {
        return (
            <div className="container home">
                <h1>Administration panel</h1>
                <Panel/>
              
                   
                
                    <h3>Audit documents in database</h3>
                    <button onClick={this.loadAudits}>Load all reports</button>
                    <div className="center">
                        <Table>
                            <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Date</TableCell>
                                <TableCell>Auditor</TableCell>
                                <TableCell>Target</TableCell>
                                <TableCell>Factory</TableCell>
                                <TableCell>Corporation</TableCell>
                                <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            
                            <AuditReportRow/>
                            
                            
                        </Table>
                        <CSVLink data={array} separator={";"}>
                             Download
                        </CSVLink>
 
                        
                        }
                    </div>
                    
                    
            
            </div>    
        )
    }
    
  }

const AuditReports = connect(null, mapDispatchToProps)(ConnectedAuditReports);
ConnectedAuditReports.propTypes = {
    addAuditReport: PropTypes.func.isRequired
};  

export default AuditReports;