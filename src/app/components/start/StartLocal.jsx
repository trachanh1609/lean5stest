import React from 'react';
import axios from 'axios';


const API_URL = "http://localhost:4000/api2/audits";


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
            
        return (<td colSpan="3" style={{backgroundColor: "lightgrey"}}><br/>{text}</td>);
        
        
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

    handleResponse = (response) => {
        
        
        //alert(response.data.id);
        this.refs.audit_case_id.value = response.data.id;
            
        
    }
    

    postAuditCase = (corporation_id,office_id,target_id,date,auditor,fun) => {
        
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
       var target_id = "xxxx";
       var date = "xxx";
       var auditor = "xxx";
*/
        if (corporation_id == "all" || office_id == "all" || target_id == "all") alert("Please fill all fields");
        else {
            this.postAuditCase(corporation_id,office_id,target_id,date,auditor, this.handleResponse);
            this.refs.target_id.value = target_id;
            setTimeout(function() {this.showQuestions(target_id)}.bind(this), 1000); 
        }
    }

    postResult = (audit_case_id, target_id, question_id, grade, comment) => {
        axios.post("http://localhost:4000/api2/audits", {
            type: 'Results',
            audit_id: audit_case_id,
            target_id: target_id,
            question_id: question_id,
            grade: grade,
            comment: comment
            
        })
        .then(function (response) {
            console.log(response);
            
            
        })
        .catch(function (error) {
            console.log(error);
            
        });  
        //alert("Audit_case_id = "+audit_case_id+"\nTarget id = "+ target_id + "\nQuestion id = "+question_id+"\nGrade = "+grade);
    }
    readyClicked = () => {
        var audit_case_id = this.refs.audit_case_id.value;
        var target_id = this.refs.target_id.value;
        //alert("audit case id = "+audit_case_id+"\ntarget id = "+target_id);
        this.state.questions_for_target.map(q=>{
            if (document.getElementById(q.question_id+"-01").checked) {
                var grade = document.getElementById(q.question_id+"-01").value;
                this.postResult(audit_case_id, target_id, q.question_id, grade);

                //this.sleep(2000);
            } else if (document.getElementById(q.question_id+"-02").checked){
                var grade = document.getElementById(q.question_id+"-02").value;
                this.postResult(audit_case_id, target_id, q.question_id, grade);
                //this.sleep(2000);
            } else if (document.getElementById(q.question_id+"-03").checked){
                var grade = document.getElementById(q.question_id+"-03").value;
                this.postResult(audit_case_id, target_id, q.question_id, grade);
                //this.sleep(2000);
            }
            
        });
        alert("Ready!");
        //location.reload(); 
        //var link = "http://localhost:4000/api2/audits?type=Results&audit_id="+audit_case_id;
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

    render() {
       
        
        return (
            <div className="container home">
                <h1>Demonstration version</h1>
                <h5><a href="..\administration_local">Open administration panel</a></h5>
                <h5><a href="..\results">Open audit results</a></h5>
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
                
                Audit id:<input style={{margin: "20px"}} placeholder="audit case id" ref="audit_case_id"/>
                Target id:<input style={{margin: "20px"}} placeholder="target id" ref="target_id"/>
                <div className={q_visibility}>
                    <h3>Audit questions</h3>
                    
                    <table>
                    
                        {this.state.questions_for_target.map(question => {
                            return (
                                <tbody>
                                <tr>
                                    
                                        <QuestionText q_id = {question.question_id} questions = {this.state.questions}/>
                                        
                                    
                                    
                                </tr>
                                <tr>
                                    <td style={{width: "200px"}}><input type="radio" id={question.question_id+"-01"} name={question.question_id} value="5"/>Good</td>
                                    <td style={{width: "200px"}}><input type="radio" id={question.question_id+"-02"} name={question.question_id} value="3"/>Ok</td>
                                    <td style={{width: "200px"}}><input type="radio" id={question.question_id+"-03"} name={question.question_id} value="0"/>Bad</td>
                                    
                                </tr>
                                <tr>
                                    <td colSpan="3" style={{backgroundColor: "black"}}></td>
                                </tr>
                                   </tbody> 
                            )
                        })}
                        
                    
                    </table>
                    <button onClick={this.readyClicked}>Ready</button>

                </div>
            </div>
        )
    }

}

export default StartLocal;