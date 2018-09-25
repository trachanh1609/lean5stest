import React from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router';
import PropTypes from "prop-types";
import {clearAudit, setQuestions,updateAuditor } from "../actions/index";

import {API_URL} from "../constants/urls";
import axios from 'axios';
import Img from 'react-image';


var results = [];
const good_img = 'https://www.musikteatret.dk/wp-content/uploads/2017/02/Groen_smiley.jpg';
const ok_img = 'https://images.vexels.com//media/users/3/134541/isolated/preview/02f3c0cba01ca5fb7405293c55253afd-emoji-emoticon-straight-face-by-vexels.png';
const bad_img = 'https://i.ebayimg.com/images/g/qEsAAOSw~OdVWblA/s-l1600.jpg';

const mapStateToProps = state => {
    return { 
        startedAudit: state.startedAudit,
        questions: state.questions,
        selectedDate: state.selectedDate,
        user: state.user
    };
  };
  const mapDispatchToProps = dispatch => {
    return {
      clearAudit: startedAudit => dispatch(clearAudit(startedAudit)),
      setQuestions: questions => dispatch(setQuestions(questions)),
      updateAuditor: selectedAuditor => dispatch(updateAuditor(selectedAuditor))
    };
  }
class RowsAuditQuestions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            questions: [],
            links: [],
            target_id: "",
            results: []
        }
    }
    componentDidMount() {
        setTimeout(function() {this.questionsDataRetrieving()}.bind(this),2000);
    }

    componentWillUnmount() {
        this.props.setQuestions("");
    }

    questionsDataRetrieving = () => {
        this.setState({target_id: this.props.startedAudit.target_id});
        var target_id = this.state.target_id;
       
        if (target_id =! "") {
            console.log("started audit data is in store already");
            if (this.props.startedAudit.results!=null) {
                console.log("It has results: "+this.props.startedAudit.results.length);
                this.readResults();
            }
            else setTimeout(function () {this.getLinks()}.bind(this),500);
        }
    } 
    

    getLinks = () => {
        var self = this;
        var target_id = this.state.target_id;
        
        let url = API_URL + "?type=Question-Target-Link&target_id="+target_id;
        
        fetch(url)
        .then(function(response) {
          return response.json();
        })
        .then(function(json){
            self.setState({links: json});
            self.getQuestionsFromDB();
        })
        .catch(function(err){
          console.error(err)
        });
    }

    getQuestionsFromDB = () => {
        var self = this;
        let url;
        var array = [];
        this.state.links.map(link=>{
            url = API_URL + "?id="+link.question_id;
        
            fetch(url)
            .then(function(response) {
              return response.json();
            })
            .then(function(json){
                json.map(j=>{
                    array.push({id:link.question_id,question_text:j.question_text});
                });
            })
            .catch(function(err){
              console.error(err)
            });
        });
        
        const payload = array;
        setTimeout(function () {this.props.setQuestions(payload)}.bind(this),500);
        
    }
    
    readResults = () => {
        var array = [];
       
        this.props.startedAudit.results.map(r=>{
            var grade_good = "";
            var grade_ok = "";
            var grade_bad = "";
            switch(r.grade) {
                case "100":
                    grade_good = "checked";
                    break;
                case "50":
                    grade_ok = "checked";
                    break;
                case "0":
                    grade_bad = "checked";
                    break;
                default:
                    break;
            }
            array.push({id:r.question_id,question_text:r.question_text,grade_good:grade_good,grade_ok:grade_ok,grade_bad:grade_bad});
        });
        const payload = array;
        setTimeout(function () {this.props.setQuestions(payload)}.bind(this),500);
    }
    deleteClicked = () => {
        var id = this.props.startedAudit.id;
        alert("Audit report '"+id+"' will be deleted");
        axios.delete(API_URL+'/'+id);
    }
    readyClicked = () => {
        //alert(event.target.value); 
        this.pushResults();
        var comments = this.refs.comments.value;
       
        this.updateResults(results, comments, "ready");
        this.updateAuditor(this.props.user.name);
    }
    pushResults = () => {
        results = [];
        this.props.questions.map(q=>{
            var grade = "";
            if (document.getElementById(q.id+"-01").checked) {
               grade = document.getElementById(q.id+"-01").value;
            } else if (document.getElementById(q.id+"-02").checked){
               grade = document.getElementById(q.id+"-02").value;
            } else if (document.getElementById(q.id+"-03").checked){
               grade = document.getElementById(q.id+"-03").value;
           }
            results.push({"question_id":q.id,"question_text":q.question_text,"grade":grade});
        });
    }
     
    saveClicked = () => {
        this.pushResults();
        var comments = this.refs.comments.value;
        this.saveResults(results, comments);
    }

    saveResults = (results, comments) => {
        
            var self = this;
            var sum = 0;
            var i = 0;
            results.map(r=>{
                i++;
                sum += parseInt(r.grade);
            });
            var average = parseFloat(sum)/i;
            axios.put(API_URL+'/'+this.props.startedAudit.id, {
                type: 'Audit_case',
                corporation_id: this.props.startedAudit.corporation_id,
                corporation_name: this.props.startedAudit.corporation_name,
                office_id: this.props.startedAudit.office_id,
                office_name: this.props.startedAudit.office_name,
                target_id: this.props.startedAudit.target_id,
                target_name: this.props.startedAudit.target_name,
                date: this.props.selectedDate,
                auditor: this.props.user.name,
                results: results,
                comments: comments,
                stage: "started",
                average_grade: parseInt(average)
            })
            .then(function (response) {
                console.log(response);
                self.displaySavedData(response);
            })
            .catch(function (error) {
                console.log(error);
                alert("Something went wrong, please try again");
            });  
    }

        displaySavedData = (response) => {
	        var text = "Results are saved: \n";
	        response.data.results.map(r=> {
 	            text += r.question_text + " - (grade: " + r.grade + "%)\n";
            });
	        alert(text);
	    }
            

    updateResults = (results, comments, stage) => {
        //var clearReadyAuditCase = this.props.clearAudit;
        
        var sum = 0;
        var i = 0;
        results.map(r=>{
            i++;
            sum += parseInt(r.grade);
        });
        var average = parseFloat(sum)/i;
        axios.put(API_URL+'/'+this.props.startedAudit.id, {
            type: 'Audit_case',
            corporation_id: this.props.startedAudit.corporation_id,
            corporation_name: this.props.startedAudit.corporation_name,
            office_id: this.props.startedAudit.office_id,
            office_name: this.props.startedAudit.office_name,
            target_id: this.props.startedAudit.target_id,
            target_name: this.props.startedAudit.target_name,
            date: this.props.selectedDate,
            auditor: this.props.user.name,
            results: results,
            comments: comments,
            stage: stage,
            average_grade: parseInt(average)
        })
        .then(function (response) {
            //console.log(response);
            alert("Database is updated");
            //clearReadyAuditCase();
            


        })
        .catch(function (error) {
            console.log(error);
            alert("Something went wrong, please try again");
        });  

    }

    render () {
        return (
            <table>
            {this.props.questions.map(q=>{
            return (
                <tbody>
                <tr>
                    <td colSpan="3" style={{backgroundColor: "lightgrey"}}><br/>{q.question_text}</td>
                </tr>
                <tr>
                    
                    <td style={{width: "200px"}} className="good">
                        <input type="radio"  id={q.id+"-01"} name={q.id} value="100" defaultChecked={q.grade_good}/>
                        <label for={q.id+"-01"}> Good </label>
                    </td>
                    <td style={{width: "200px"}} className="ok" >
                        
                            <input type="radio" id={q.id+"-02"} name={q.id} value="50" defaultChecked={q.grade_ok}/>
                            
                            <label for={q.id+"-02"}> Ok </label>
                    </td>
                    <td style={{width: "200px"}} className="bad" >
                        
                            <input type="radio" id={q.id+"-03"} name={q.id} value="0" defaultChecked={q.grade_bad}/>
                            
                            <label for={q.id+"-03"}> Bad </label>
                    </td>
                </tr>
                <tr>
                    <td colSpan="3" style={{backgroundColor: "black"}}></td>
                </tr>
                </tbody>
                
            )
            })}
            <tbody>
            <tr>
            <td colSpan="3">
            Comments:<br/> <textarea ref="comments" style={{height: '50px', width: '100%'}}/><br/>
            <Link to="/administration_local/audit_cases"><button onClick={this.readyClicked}>Ready</button></Link>
            <button onClick={this.saveClicked}>Save</button>
            <Link to="/administration_local/audit_cases"><button onClick={this.deleteClicked}>Delete</button></Link>
                    
            </td>
            </tr>
            </tbody>
            
            </table>
        )
        
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(RowsAuditQuestions);