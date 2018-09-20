import React from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router';
import PropTypes from "prop-types";
import {clearAudit, setQuestions } from "../actions/index";
import {API_URL} from "../constants/urls";
import axios from 'axios';
const mapStateToProps = state => {
    return { 
        startedAudit: state.startedAudit,
        questions: state.questions
    };
  };
  const mapDispatchToProps = dispatch => {
    return {
      clearAudit: startedAudit => dispatch(clearAudit(startedAudit)),
      setQuestions: questions => dispatch(setQuestions(questions))
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

    questionsDataRetrieving = () => {
        //console.log("questionsDataRetrieving");
        //console.log("props.startedAudit.target_id: "+this.props.startedAudit.target_id);
        this.setState({target_id: this.props.startedAudit.target_id});
        var target_id = this.state.target_id;
       
        if (target_id =! "") {
            
            //this.getLinks();
            setTimeout(function () {this.getLinks()}.bind(this),500);
            
            //this.getQuestions();   /// it was 2 times
            //setTimeout(function () {this.setTargetQuestions()}.bind(this),1000);
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
            self.getQuestions();
        })
        .catch(function(err){
          console.error(err)
        });
    }

    getQuestions = () => {
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

    
    readyClicked = () => {
        //alert(event.target.value); 
        var results = [];
        var comments = this.refs.comments.value;
        this.props.questions.map(q=>{
            if (document.getElementById(q.id+"-01").checked) {
                var grade = document.getElementById(q.id+"-01").value;
            } else if (document.getElementById(q.id+"-02").checked){
                var grade = document.getElementById(q.id+"-02").value;
            } else if (document.getElementById(q.id+"-03").checked){
                var grade = document.getElementById(q.id+"-03").value;
            }
            results.push({"question_id":q.id,"question_text":q.question_text,"grade":grade});
        });
        this.updateResults(results, comments);
    }
    

    updateResults = (results, comments) => {
        var clearReadyAuditCase = this.props.clearAudit;
        var clearQuestions = this.props.setQuestions;
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
            date: this.props.startedAudit.date,
            auditor: this.props.startedAudit.auditor,
            results: results,
            comments: comments,
            stage: "ready",
            average_grade: parseInt(average)
        })
        .then(function (response) {
            //console.log(response);
            alert("Database is updated");
            clearReadyAuditCase();
            clearQuestions("");


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
                    <td style={{width: "200px"}}><input type="radio" id={q.id+"-01"} name={q.id} value="100" />Good</td>
                    <td style={{width: "200px"}}><input type="radio" id={q.id+"-02"} name={q.id} value="50" />Ok</td>
                    <td style={{width: "200px"}}><input type="radio" id={q.id+"-03"} name={q.id} value="0" />Bad</td>
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
            <Link to="/results"><button onClick={this.readyClicked}>Ready</button></Link>
            
                    
            </td>
            </tr>
            </tbody>
            
            </table>
        )
        
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(RowsAuditQuestions);