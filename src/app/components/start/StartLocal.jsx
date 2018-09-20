import React from 'react';
import axios from 'axios';
import { Link } from 'react-router';
import SelectFactories from '../../elements/SelectFactories';
import UserPanel from '../../elements/UserPanel';

const API_URL = "http://localhost:4000/api2/audits";


var q_visibility = "invisible";
var c_visibility = "bordered center details";

class QuestionText extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        return (<td colSpan="3" style={{backgroundColor: "lightgrey"}}><br/>{this.props.text}</td>);
    }
}

class StartLocal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            corporations: [],
            offices: [],
            targets: [],
            questions: [],
            questions_for_target: [],
            audit_id: "",
            corporation_id: "",
            corporation_name: "",
            office_id: "",
            office_name: "",
            target_id: "",
            target_name: "",
            auditor: "",
            date: "",
            results: []
            
        }
    }
    componentDidMount() {
        this.getCorporations();
     }

    getCorporations = () => {
        var self = this;
        let url = API_URL + "?type=Corporation";
        fetch(url)
        .then(function(response) {return response.json();})
        .then(function(json){self.setState({corporations: json});})
        .catch(function(err){console.error(err)});
    }

    getOffices = () => {
        var self = this;
        let url;
        var id = this.refs.selectedCorporationId.value;
        if (id == "all") url = API_URL + "?type=Office";
        else url = API_URL + "?type=Office&corporation_id="+id;
        fetch(url)
        .then(function(response) {return response.json();})
        .then(function(json){self.setState({offices: json});})
        .catch(function(err){console.error(err)});
    }  

    getTargets = () => {
        var id = this.refs.selectedOfficeId.value;
        var self = this;
        let url = API_URL + "?type=Target&office_id="+id;
        fetch(url)
        .then(function(response) {return response.json();})
        .then(function(json){self.setState({targets: json});})
        .catch(function(err){console.error(err)});
    }

    
    handleResponse = (response) => {
        this.setState({audit_id: response.data.id});
        this.refs.audit_case_id.value = this.state.audit_id;
    }

    postAuditCase = (corporation_id,office_id,target_id,date,auditor,fun) => {
        axios.post(API_URL, {
            type: 'Audit_case',
            corporation_id: corporation_id,
            office_id: office_id,
            target_id: target_id,
            date: date,
            auditor: auditor,
            stage: "started"
        })
        .then(function (response) {
            console.log(response);
            fun(response);
        })
        .catch(function (error) {console.log(error);});  
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

    getQuestionsForTarget = (target_id) => {
        var self = this;
        let url = API_URL + "?type=Question-Target-Link&target_id="+target_id;
        fetch(url)
        .then(function(response) {return response.json();})
        .then(function(json){self.setState({questions_for_target: json});})
        .catch(function(err){console.error(err)});
    }

    showQuestions = (target_id) => {
        
        this.getQuestionsForTarget(target_id);
        this.getQuestions();
        q_visibility = "bordered center";
        
    }
    startPressed = () => {
        
        var corporation_id = this.refs.selectedCorporationId.value;
        var office_id = this.refs.selectedOfficeId.value;
        var target_id = this.refs.selectedTargetId.value;
        var date = this.refs.selectedDate.value;
        var auditor = this.refs.selectedAuditor.value;
        
 /*      
       var corporation_id = "xxxx";
       var office_id = "xxxx";
       var target_id = "mPDlzoy";
       var date = "xxx";
       var auditor = "Antti Auditoija";

  */   this.setState({target_id: target_id});
       this.setState({corporation_id: corporation_id});
       this.setState({office_id: office_id});
       this.setState({date: date});
       this.setState({auditor: auditor});

        if (corporation_id == "all" || office_id == "all" || target_id == "all") alert("Please fill all fields");
        else {
            this.postAuditCase(corporation_id,office_id,target_id,date,auditor, this.handleResponse);
            
            this.refs.target_id.value = target_id;
            c_visibility = "invisible";
            setTimeout(function() {this.showQuestions(target_id)}.bind(this), 1000); 
        }
    }

    updateResults = (id, results, comments) => {
        
        var sum = 0;
        var i = 0;
        results.map(r=>{
            i++;
            sum += parseInt(r.grade);
        });
        var average = parseFloat(sum)/i;
        axios.put(API_URL+'/'+id, {
            type: 'Audit_case',
            corporation_id: this.state.corporation_id,
            corporation_name: this.state.corporation_name,
            office_id: this.state.office_id,
            office_name: this.state.office_name,
            target_id: this.state.target_id,
            target_name: this.state.target_name,
            date: this.state.date,
            auditor: this.state.auditor,
            results: results,
            comments: comments,
            stage: "ready",
            average_grade: average
        })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });  
    }
    getQuestionText = (id) => {
        let question_text = "";
        this.state.questions.map(q => {
            if (q.id == id) question_text = q.question_text;
        });
        return question_text;
    }

    readyClicked = () => {
        var audit_case_id = this.state.audit_id;
        var comments = this.refs.comments.value;
        var results = [];
        //alert("audit case id = "+audit_case_id+"\ntarget id = "+target_id);
        this.state.questions_for_target.map(q=>{
            if (document.getElementById(q.question_id+"-01").checked) {
                var grade = document.getElementById(q.question_id+"-01").value;
            } else if (document.getElementById(q.question_id+"-02").checked){
                var grade = document.getElementById(q.question_id+"-02").value;
            } else if (document.getElementById(q.question_id+"-03").checked){
                var grade = document.getElementById(q.question_id+"-03").value;
            }
            results.push({"question_id":q.question_id,"question_text":this.getQuestionText(q.question_id),"grade":grade});
            
        });
        this.updateResults(audit_case_id, results, comments);
      
        alert("Ready!");
        
        var link = "..\\results";
        
        this.sleep(1500);
        location.href = link;
    }

    sleep = (milliseconds) => {
        var start = new Date().getTime();
        for (var i = 0; i < 1e7; i++) {
          if ((new Date().getTime() - start) > milliseconds){
            break;
          }
        }
      }

    corporationSelected = () => {
        this.getOffices();
        
        this.state.corporations.map(c=>{
            if (c.id == this.refs.selectedCorporationId.value) this.setState({corporation_name: c.corporation_name});
        });
        
        
        //this.getTargets();
    }

    officeSelected = () => {
        this.getTargets();
        this.state.offices.map(o=>{
            if (o.id == this.refs.selectedOfficeId.value) this.setState({office_name : o.office_name});
        });
    }

    targetSelected = () => {
        
        this.state.targets.map(t=>{
            if (t.id == this.refs.selectedTargetId.value) this.setState({target_name : t.target_name});
        });
    }

    render() {
       
        
        return (
            <div className="container home">
                <h1>Demonstration version</h1>
                <UserPanel/>
                <Link to="/audit"><h5>Start new audit (Redux version)</h5></Link>
                
                <div className={c_visibility}>
                <table>
                    <tbody>
                        <tr>
                            
                            <td>
                                <select ref="selectedCorporationId" onChange={this.corporationSelected}>
                                    <option value="all">Yhtiö</option>
                                    {this.state.corporations.map(corporation=> {
                                    return (<option value={corporation.id}>{corporation.corporation_name}</option>)
                                    })}
                                </select>
                            </td>
                        </tr>
                        <tr>
                            
                            <td>
                                <select ref="selectedOfficeId" onChange={this.officeSelected}>
                                    <option value="all">Toimipiste</option>
                                    {this.state.offices.map(office=> {
                                    return (<option value={office.id}>{office.office_name}</option>)
                                    })}
                                </select>
                            </td>
                        </tr>
                        <tr>
                            
                            <td>
                                <select ref="selectedTargetId" onChange={this.targetSelected}>
                                    <option value="all">Kohde</option>
                                    {this.state.targets.map(t=> {
                                    return (<option value={t.id}>{t.target_name}</option>)
                                    })}
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <input ref="selectedDate" type="date"/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <select ref="selectedAuditor">
                                    <option value="Antti Auditoija">Antti Auditoija</option>
                                    <option value="Markku Tarkastaja">Markku Tarkastaja</option>
                                    <option value="Juha Seikkailija">Juha Seikkailija</option>
                                </select>
                                
                            </td>
                        </tr>
                        
                        <tr>
                            <td>
                                <button onClick={this.startPressed}>Start audit</button>
                            </td>
                        </tr>
                    </tbody>
                </table>

                </div>
                
                
                <div className={q_visibility}>
                Audit id:<input style={{margin: "20px"}} placeholder="audit case id" ref="audit_case_id" disabled/>
                Target id:<input style={{margin: "20px"}} placeholder="target id" ref="target_id" disabled/>
                    <h3>Audit questions</h3>
                    <div className="center">
                    <table>
                    
                        {this.state.questions_for_target.map(question => {
                            return (
                                <tbody>
                                <tr>
                                    <QuestionText text={this.getQuestionText(question.question_id)}/>
                                </tr>
                                <tr>
                                    <td style={{width: "200px"}}><input type="radio" id={question.question_id+"-01"} name={question.question_id} value="100"/>Good</td>
                                    <td style={{width: "200px"}}><input type="radio" id={question.question_id+"-02"} name={question.question_id} value="50"/>Ok</td>
                                    <td style={{width: "200px"}}><input type="radio" id={question.question_id+"-03"} name={question.question_id} value="0"/>Bad</td>
                                    
                                </tr>
                                <tr>
                                    <td colSpan="3" style={{backgroundColor: "black"}}></td>
                                </tr>
                                
                                   </tbody> 
                            )
                        })}
                        
                    
                    </table>
                    </div>
                    Comments:<br/> <textarea ref="comments" style={{height: '50px', width: '100%'}}/><br/>
                    <button onClick={this.readyClicked}>Ready</button>

                </div>
            </div>
        )
    }

}

export default StartLocal;