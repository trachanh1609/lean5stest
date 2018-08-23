import React from 'react';
import axios from 'axios';

import Panel from './Panel';


const API_URL = "http://localhost:4000/api2/audits";

var buttonCorp = "Show";

var selectedCorporation = '';
var selectedOffice = '';

class AuditLocal extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          audit_cases: [],
          targets: []
         
        };
    }

    componentDidMount() {
        this.getAuditCases();
        
    }

    getAuditCases = () => {
        var self = this;
        let url = API_URL + "?type=Audit_case";
        
        fetch(url)
        .then(function(response) {
          return response.json();
        })
        .then(function(json){
            
            self.setState({audit_cases: json});
            
        })
        .catch(function(err){
          console.error(err)
        });
      
      }


    deleteItem = (id) => {
        
        axios.delete(API_URL+'/'+id);
        setTimeout(function() {this.getAuditCases()}.bind(this), 500);
       
    }

 
    render() {
        return (
            <div className="container home">
                <h1>Administration panel</h1>
                <Panel/>
              
                   
                
                    <h3>Audit documents in database</h3>
                    
                    <div className="center">
                        <table className="table">
                        <tbody>
                            <tr>
                                <th>ID</th>
                                <th>Date</th>
                                <th>Auditor</th>
                                <th>Target</th>
                                <th>Factory</th>
                                <th>Corporation</th>
                            </tr>
                            {
                                this.state.audit_cases.map(audit=> {
                                        
                                        return (<tr><td> {audit.id}</td>
                                        <td>{audit.date}</td>
                                        <td>{audit.auditor}</td>
                                        <td>{audit.target_id}</td>
                                        <td>{audit.office_id}</td>
                                        <td>{audit.corporation_id}</td>
                                        <td>
                                        <button onClick={this.deleteItem.bind(this,audit.id)}>Delete</button>
                                        </td></tr>)
                                })
                            }
                            </tbody>
                        </table>
                    </div>
                    
                
            
            </div>    
        )
    }
    
  }

export default AuditLocal;