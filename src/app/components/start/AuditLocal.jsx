import React from 'react';
import axios from 'axios';

import Panel from './Panel';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const API_URL = "http://localhost:4000/api2/audits";


class TargetName extends React.Component {
    constructor(props){
        super(props);
        
    }
    render() {
        var target_name;
        this.props.targets.map(t=> {
            if (t.id == this.props.target_id) target_name=t.target_name;
        })
        return (<TableCell>{target_name}</TableCell>)
    }
}

class OfficeName extends React.Component {
    constructor(props){
        super(props);
        
    }
    render() {
        var office_name;
        this.props.offices.map(o=> {
            if (o.id == this.props.office_id) office_name=o.office_name;
        })
        return (<TableCell>{office_name}</TableCell>)
    }
}

class CorporationName extends React.Component {
    constructor(props){
        super(props);
        
    }
    render() {
        var name;
        this.props.corporations.map(c=> {
            if (c.id == this.props.corporation_id) name=c.corporation_name;
        })
        return (<TableCell>{name}</TableCell>)
    }
}

class QuestionText extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        
            var text = "";
            var id = this.props.q_id;
            
            this.props.questions.map(q => {
                if (q.id == id) text = q.question_text;
            });
            
        return ({text});
        
        
    }
}

class AuditLocal extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          audit_cases: [],
          targets: [],
          offices: [],
          corporations: [],
          results:[],
          questions: []
         
        };
    }

    componentDidMount() {
        this.getAuditCases();
        this.getTargets();
        this.getOffices();
        this.getCorporations();
        this.getResults();
        this.getQuestions();
        
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
    getQuestions = () => {
        var self = this;
        let url;
        url = API_URL + "?type=Question";
        
        fetch(url)
        .then(function(response) {
          return response.json();
        })
        .then(function(json){
            self.setState({questions: json});
        })
        .catch(function(err){
          console.error(err)
        });
    }
    getResults = () => {
        var self = this;
        let url;
        url = API_URL + "?type=Results";
        
        fetch(url)
        .then(function(response) {
          return response.json();
        })
        .then(function(json){
            self.setState({results: json});
        })
        .catch(function(err){
          console.error(err)
        });       
    }

    getCorporations = () => {
        var self = this;
        let url;
        url = API_URL + "?type=Corporation";
        
        fetch(url)
        .then(function(response) {
          return response.json();
        })
        .then(function(json){
            self.setState({corporations: json});
        })
        .catch(function(err){
          console.error(err)
        });       
    }
    getTargets = () => {
        var self = this;
        let url;
        url = API_URL + "?type=Target";
        
        fetch(url)
        .then(function(response) {
          return response.json();
        })
        .then(function(json){
            self.setState({targets: json});
        })
        .catch(function(err){
          console.error(err)
        });
       
    }
    getOffices = () => {
        var self = this;
        let url;
        url = API_URL + "?type=Office";
       
        fetch(url)
        .then(function(response) {
          return response.json();
        })
        .then(function(json){
            self.setState({offices: json});
        })
        .catch(function(err){
          console.error(err)
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
            
            self.setState({audit_cases: json});
            
        })
        .catch(function(err){
          console.error(err)
        });
      
      }
    rowClicked = (audit_id) => {
        var report="";
        this.state.results.map(r=>{
            if (r.audit_id == audit_id) {
                var q_text = this.getQuestionText(r.question_id);
                report = report + "Question: " + q_text;
                report += "\nGrage: "+r.grade+"\n----------------\n";
            }
        })
        alert(report);
        
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
                            <TableBody>
                            {
                                this.state.audit_cases.map(audit=> {
                                        
                                        return (<TableRow onClick={this.rowClicked.bind(this,audit.id)}><TableCell> {audit.id}</TableCell>
                                        <TableCell>{audit.date}</TableCell>
                                        <TableCell>{audit.auditor}</TableCell>
                                        <TargetName target_id={audit.target_id} targets={this.state.targets}/>
                                        <OfficeName office_id={audit.office_id} offices={this.state.offices}/>
                                        <CorporationName corporation_id={audit.corporation_id} corporations={this.state.corporations}/>
                                        
                                        <TableCell>
                                        <button onClick={this.deleteItem.bind(this,audit.id)}>Delete</button>
                                        </TableCell></TableRow>)
                                })
                            }
                            </TableBody>
                        </Table>
                    </div>
                    
                
            
            </div>    
        )
    }
    
  }

export default AuditLocal;