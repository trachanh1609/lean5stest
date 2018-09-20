import React from 'react';
import axios from 'axios';
import {CSVLink} from 'react-csv';
import { connect } from "react-redux";
import Panel from './Panel';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import SelectCorporations from '../../elements/SelectCorporations';
import Button from '@material-ui/core/Button';
import SelectFactories from '../../elements/SelectFactories';
import SelectTargets from '../../elements/SelectTargets';


const API_URL = "http://localhost:4000/api2/audits";

var array = [];
var questionsArray = [];
var i = 0;

const mapStateToProps = state => {
    return { 
        selectedTarget: state.selectedTarget,
        selectedFactory: state.selectedFactory,
        selectedCorporation: state.selectedCorporation
    };
  };


class AuditLocal extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          audit_cases: [],
          targets: [],
          offices: [],
          corporations: [],
          results:[],
          questions: [],
          audit: [],
          results_visibility: "invisible",
          audit_cases_filtered: []
        };
    }

    componentDidMount() {
        this.getAuditCases();
        
        }

    getQuestionText = (id) => {
        var q_text="";
        this.state.questions.map(q=> {
            if(q.id == id) {
                q_text = q.question_text;
            }
        });
        return q_text;
    }

    // all ready audits to CSV
    prepareCSV = (json) => {
        array = [];
        questionsArray = [];
        json.map(audit=>{
            if (audit.stage == "ready") {
                array.push({"Date":audit.date,"Auditor":audit.auditor,"Target":audit.target_name,"Factory":audit.office_name, "Corporation":audit.corporation_name, "Average_grade":parseFloat(audit.average_grade), "Comments":audit.comments});
                audit.results.map(result=>{
                    questionsArray.push({"Date":audit.date,"Auditor":audit.auditor,"Target":audit.target_name,"Factory":audit.office_name, "Corporation":audit.corporation_name,"Question":result.question_text,"Grade":result.grade});
                });
            }       
        });
    }
   
    getAuditCases = () => {
        
        var self = this;
        let url = API_URL + "?type=Audit_case";
        
        fetch(url)
        .then(function(response) {
          return response.json();
        })
        .then(function(json){
            
            self.prepareCSV(json);
            self.setState({audit_cases: json});
            self.setState({audit_cases_filtered: json});
            
        })
        .catch(function(err){
          console.error(err)
        });
        
      }
    rowClicked = (audit_id) => {
        
        var results = [];
        var comments = "";
        var print = "";
        this.state.audit_cases.map(audit=> {
            if (audit.id == audit_id) {
                try {
                    results = audit.results;
                    comments = audit.comments;
                    console.log(results);
                    print += "<table>";
                    print += "<tr><th>Grade</th><th>Question</th></tr>";
                    results.map(r=>{
                        
                        print += "<tr><td>"+r.grade+"%</td><td style='text-align:left'>"+r.question_text+"</td></tr>";
                    });
                    print += "<tr><td><b>Comments: </b></td><td style='text-align:left'>"+comments+"</td></tr>";
                    print += "</table>";
                }
                catch(e) {
                    print += "This audit case is not ready yet";
                }
                
            }
        });
        
        
        var p = document.getElementById("results");
        p.innerHTML = print;
        this.setState({results_visibility: "bordered center flying"});
       
    }

    deleteItem = (id) => {
        
        axios.delete(API_URL+'/'+id);
        setTimeout(function() {this.getAuditCases()}.bind(this), 500);
       
    }

    closeResults = () => {
        this.setState({results_visibility: 'invisible'});
    }

    filtering = () => {
        var array = [];
        if(this.props.selectedTarget.id != "") {
            this.state.audit_cases.map(audit=>{
                if(audit.target_id == this.props.selectedTarget.id) array.push(audit);
            });
            this.setState({audit_cases_filtered: array});
        }
        else if(this.props.selectedFactory.id != "") {
            this.state.audit_cases.map(audit=>{
                if(audit.office_id == this.props.selectedFactory.id) array.push(audit);
            });
            this.setState({audit_cases_filtered: array});
        }
        else if(this.props.selectedCorporation.id != "") {
            this.state.audit_cases.map(audit=>{
                if(audit.corporation_id == this.props.selectedCorporation.id) array.push(audit);
            });
            this.setState({audit_cases_filtered: array});
        }
        else this.setState({audit_cases_filtered: this.state.audit_cases});
        if (array.length>0) this.prepareCSV(array);
    }
    
    render() {
        return (
            <div className="container home">
                <h1>Administration panel</h1>
                <Panel/>
              
                   
                
                    <h3>Audit documents in database</h3>
                    
                    <div className="center">
                    
                        <Table>
                            <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Date</TableCell>
                                <TableCell>Auditor</TableCell>
                                <TableCell>Average grade</TableCell>
                                <TableCell><SelectTargets/></TableCell>
                                <TableCell><SelectFactories/></TableCell>
                                <TableCell><SelectCorporations/></TableCell>
                                <TableCell><Button variant="contained" color="secondary" size="small" onClick={this.filtering}>Filter</Button></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                            {
                                this.state.audit_cases_filtered.map(audit=> {
                                        var color="red";
                                        if(audit.average_grade>=0) color="normal";
                                        return (<TableRow onClick={this.rowClicked.bind(this,audit.id)} className={color} >
                                        <TableCell> {audit.id}</TableCell>
                                        <TableCell>{audit.date}</TableCell>
                                        <TableCell>{audit.auditor}</TableCell>
                                        <TableCell>{audit.average_grade}%</TableCell>
                                        <TableCell>{audit.target_name}</TableCell>
                                        <TableCell>{audit.office_name}</TableCell>
                                        <TableCell>{audit.corporation_name}</TableCell>
                                        
                                        <TableCell>
                                        <button onClick={this.deleteItem.bind(this,audit.id)}>Delete</button>
                                             
                                        </TableCell></TableRow>)
                                })
                            }
                            </TableBody>
                        </Table>
                        <CSVLink data={array} separator={";"}><button>
                             Download report (only ready audit cases)</button>
                        </CSVLink>
                        <br/>
                        <CSVLink data={questionsArray} separator={";"}><button>
                             Download report with questions</button>
                        </CSVLink>
                        <div id="results" className={this.state.results_visibility} onClick={this.closeResults}>
                        </div>
                        
                        
                    </div>
                    
                    
            
            </div>    
        )
    }
    
  }

export default connect(mapStateToProps)(AuditLocal);