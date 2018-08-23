import React from 'react';
import axios from 'axios';
import Panel from './Panel';
const API_URL = "http://localhost:4000/api2/audits";





class TargetName extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        var target_name;
        this.props.targets.map(t => {
            if (t.id == this.props.t_id) target_name = t.target_name;
        })
        return (<td>{target_name}</td>)
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
        return (<td style={{textAlign:"left"}}>{text}</td>);
    }
}
class ResultsLocal extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            results: [],
            audits: [],
            targets: [],
            questions: []
        }
    }
    componentDidMount() {
        this.getTargets();
        this.getQuestions();
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
    getTargets = () => {
        var self = this;
        let url = API_URL + "?type=Target";
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
        
        console.log('getOffices running');
       
    }
    getResults = (auditor) => {
        var self = this;
        let url = API_URL + "?type=Results";
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

    getAudits = (auditor) => {
        var self = this;
        let url = API_URL + "?type=Audit_case&auditor="+auditor;
        fetch(url)
        .then(function(response) {
          return response.json();
        })
        .then(function(json){
            self.setState({audits: json});
        })
        .catch(function(err){
          console.error(err)
        });
        
    }

    showResults = () => {
        this.getAudits(this.refs.selectedAuditor.value);
        this.getResults(this.refs.selectedAuditor.value);
        

    }
    render() {
        
            
            
        return (
            <div>
        <h1>Audit results</h1>
        <select ref="selectedAuditor" onChange={this.showResults}>
            <option value="Antti Auditoija">Antti Auditoija</option>
            <option value="Markku Tarkastaja">Markku Tarkastaja</option>
            <option value="Juha Seikkailija">Juha Seikkailija</option>
            <option value="User_name_from_account">Test user</option>
            <option value="Super Auditor">Super Auditor</option>
        </select>
        {
            this.state.audits.map(audit => {
                return(
                    <div className="bordered">
                <table>
                    <tbody>
                        <tr>
                            <th style={{width:"150px"}}>Audit Id</th>
                            <th style={{width:"150px"}}>Date</th>
                            <th style={{width:"150px"}}>Target Id</th>
                            <th style={{width:"150px"}}>Target Name</th>
                        </tr>
                        <tr>
                            <td>{audit.id}</td>
                            <td>{audit.date}</td>
                            <td>{audit.target_id}</td>
                            <TargetName targets={this.state.targets} t_id = {audit.target_id} />
                        </tr>
                    </tbody>
                </table>
                <table>
                    <tbody>
                        {
                            this.state.results.map(r=>{
                                if (r.audit_id == audit.id) {
                                    return (
                                        <tr>
                                            <td>{r.grade}</td>
                                            <QuestionText questions={this.state.questions} q_id={r.question_id}/>
                                        </tr>
                                    //<Result results={this.state.results} result_id={r.id} audit_id = {audit.id} questions={this.state.questions}/>
                                );
                                }
                            })
                            
                        }
                        
                        
                        
                        

                    </tbody>
                </table>
                </div>)
            })
        }
        
        </div>

        );
        
        
    }
}
export default ResultsLocal;