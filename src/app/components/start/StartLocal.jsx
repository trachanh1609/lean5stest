import React from 'react';
import axios from 'axios';
import Panel from './Panel';

const API_URL = "http://localhost:4000/api2/audits";

var audit_id = "";
var q_visibility = "invisible";

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
            
        return (<td colspan="3" style={{backgroundColor: "lightgrey"}}><br/>{text}</td>);
        
        
    }
}

class StartLocal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            corporations: [],
            offices: [],
            targets: [],
            created_audit_case: [],
            audit_post_response: "",
            audit_cases: [],
            questions: [],
            questions_for_target: []
        }
    }
    componentDidMount() {
        this.getCorporations();
        /// for development only
        this.startPressed();
        
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
        let url;
        if (id == "all") url = API_URL + "?type=Target";
        else url = API_URL + "?type=Target&office_id="+id;
        fetch(url)
        .then(function(response) {return response.json();})
        .then(function(json){self.setState({targets: json});})
        .catch(function(err){console.error(err)});
    }

    // we need to find some other way to get just created id number of audit case
    // this function can be used only during development prosess
    getAuditCases = () => {
        var self = this;
        let url = API_URL + "?type=Audit_case";
        fetch(url)
        .then(function(response) {return response.json();})
        .then(function(json){self.setState({audit_cases: json});})
        .catch(function(err){console.error(err)});
        // audit_cases is ready
        console.log(this.state.audit_cases);
        

    }

    

    postAuditCase = (corporation_id,office_id,target_id,date,auditor) => {
        
        axios.post(API_URL, {
            type: 'Audit_case',
            corporation_id: corporation_id,
            office_id: office_id,
            target_id: target_id,
            date: date,
            auditor: auditor
            
        })
        .then(function (response) {
            console.log(response);
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
        /*
        var corporation_id = this.refs.selectedCorporationId.value;
        var office_id = this.refs.selectedOfficeId.value;
        var target_id = this.refs.selectedTargetId.value;
        var date = this.refs.selectedDate.value;
        var auditor = this.refs.selectedAuditor.value;
        */
       var corporation_id = "e85ab150-0436-2d6f-76f4-c5e68e5d1e44";
       var office_id = "b4a18c57-0b9a-357b-f859-17a82d937e3b";
       var target_id = "Hkj2_s4";
       var date = "2018-08-22";
       var auditor = "Super Auditor";

        if (corporation_id == "all" || office_id == "all" || target_id == "all") alert("Please fill all fields");
        else {
            this.postAuditCase(corporation_id,office_id,target_id,date,auditor);
            //setTimeout(function() {this.getAuditCases()}.bind(this),1000);
            //setTimeout(function() {this.getAuditId()}.bind(this),1500);
            //setTimeout(function() {this.showQuestions()}.bind(this), 2000);
            
            
            setTimeout(function() {this.showQuestions(target_id)}.bind(this), 1000); 
        }
    }
    render() {
       
        
        return (
            <div className="container home">
                <h1>Demonstration version</h1>
                <h5><a href="..\administration_local">Open administration panel</a></h5>
                <div className="bordered center details">
                <table>
                    <tbody>
                        <tr>
                            
                            <td>
                                <select ref="selectedCorporationId" onChange={this.getOffices}>
                                    <option value="all">Yhtiö</option>
                                    {this.state.corporations.map(corporation=> {
                                    return (<option value={corporation.id}>{corporation.corporation_name}</option>)
                                    })}
                                </select>
                            </td>
                        </tr>
                        <tr>
                            
                            <td>
                                <select ref="selectedOfficeId" onChange={this.getTargets}>
                                    <option value="all">Toimipiste</option>
                                    {this.state.offices.map(office=> {
                                    return (<option value={office.id}>{office.office_name}</option>)
                                    })}
                                </select>
                            </td>
                        </tr>
                        <tr>
                            
                            <td>
                                <select ref="selectedTargetId">
                                    <option value="all">Kohde</option>
                                    {this.state.targets.map(t=> {
                                    return (<option value={t.id}>{t.target_name}</option>)
                                    })}
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <input ref="selectedDate" type="date" required/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <input ref="selectedAuditor" value="User_name_from_account"disabled/>
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
                
                <input style={{margin: "20px"}} placeholder="audit case id" ref="audit_case_id"/>
                
                <div className={q_visibility}>
                    <h3>Audit questions</h3>
                    <table>
                    <tbody>
                        {this.state.questions_for_target.map(question => {
                            return (
                                <span>
                                <tr>
                                    
                                        <QuestionText q_id = {question.question_id} questions = {this.state.questions}/>
                                        
                                    
                                    
                                </tr>
                                <tr>
                                    <td style={{width: "200px"}}><input type="radio" name={question.question_id + "grade"} value={question.question_id}/>Good</td>
                                    <td style={{width: "200px"}}><input type="radio" name={question.question_id + "grade"} value={question.question_id}/>Ok</td>
                                    <td style={{width: "200px"}}><input type="radio" name={question.question_id + "grade"} value={question.question_id}/>Bad</td>
                                    
                                </tr>
                                <tr>
                                    <td colspan="3" style={{backgroundColor: "black"}}></td>
                                </tr>
                                   </span> 
                            )
                        })}
                        
                    </tbody>
                    </table>

                </div>
            </div>
        )
    }

}

export default StartLocal;