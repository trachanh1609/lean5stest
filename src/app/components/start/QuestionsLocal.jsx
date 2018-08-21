import React from 'react';
import axios from 'axios';
import Panel from './Panel';
const API_URL = "http://localhost:4000/api2/audits";

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
            
        return (<td>{text}</td>);
        
        
    }
}

class QuestionsLocal extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          corporations: [],
          offices: [],
          targets: [],
          questions: [],
          questionTagretLinks: []
          
        };
    }
    componentDidMount() {
        this.getCorporations();
        this.getOffices();
        this.getAllQuestions();
        
    }

    getCorporations = () => {
        var self = this;
        let url = API_URL + "?type=Corporation";
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
        console.log('getCorporations running');
    }

    getOffices = () => {
        var self = this;
        let url;
        if (this.refs.selectedCorporationId.value == "all") url = API_URL + "?type=Office";
        else url = API_URL + "?type=Office&corporation_id="+this.refs.selectedCorporationId.value;
        
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
        
        console.log('getOffices running');
       
    }  

    getTargets = () => {
        var self = this;
        let url;
        if (this.refs.selectedOfficeId.value == "all") url = API_URL + "?type=Target";
        else url = API_URL + "?type=Target&office_id="+this.refs.selectedOfficeId.value;
        
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
    getAllQuestions = () => {
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
    getQuestionsForTargets = () => {
        var self = this;
        let url;
        if (this.refs.selectedTargetId.value == "all") alert("Please select target");
        else url = API_URL + "?type=Question-Target-Link&target_id="+this.refs.selectedTargetId.value;
        
        fetch(url)
        .then(function(response) {
          return response.json();
        })
        .then(function(json){
            self.setState({questionTagretLinks: json});
        })
        .catch(function(err){
          console.error(err)
        });
        
        console.log('getOffices running');
    }

    updateItem = (type) => {
        switch (type) {
            case "qtLink":
            axios.put(API_URL+'/'+id, {
                type: 'Question-Target-Link',
                question_id: this.refs.detailsQuestionId.value,
                target_id: this.refs.detailsTargetId.value
                
              })
              .then(function (response) {
                console.log(response);
               
              })
              .catch(function (error) {
                console.log(error);
              });
              break;
            case "question":
              var id = this.refs.updateQuestionId.value;
              axios.put(API_URL+'/'+id, {
                  type: 'Question',
                  question_text: this.refs.updateQuestionText.value
                  
                  
                })
                .then(function (response) {
                  console.log(response);
                 
                })
                .catch(function (error) {
                  console.log(error);
                });
                break;
              
        }
        
    }

    deleteItem = (del_id) => {
        
        axios.delete(API_URL+'/'+del_id);
            //alert("Item '"+ name + "' was successfully deleted" );
            
        //setTimeout(function() {this.getTargets()}.bind(this), 500);
           
    }
    showDetails = (id) => {
        
        this.state.questionTagretLinks.map(q=> {
            if (q.id == id) {
                this.refs.detailsTargetId.value = q.target_id;
            
            this.refs.detailsQuestionId.value = q.question_id;
            this.refs.detailsId.value = q.id;
            
            this.targetNameById(q.target_id);
            this.questionTextById(q.question_id);
            }
        });     
        
    }
    showQuestionDetails = (id) => {
        
        this.state.questions.map(q=> {
            if (q.id == id) {
                
                this.refs.updateQuestionId.value = q.id;
                this.refs.updateQuestionText.value = q.question_text;
            
            }
        });     
        
    }
    targetNameById = (id) => {
        this.state.targets.map(t => {
            if (id == t.id)
                this.refs.detailsTargetName.value = t.target_name;
        });
    }
    
    questionTextById = (id) => {
        this.state.questions.map(q => {
            if (id == q.id)
                this.refs.detailsQuestionText.value = q.question_text;
        });
    }

    deleteClicked = () => {
        var del_id = this.refs.detailsId.value;
        this.deleteItem(del_id);
        setTimeout(function() {this.getQuestionsForTargets()}.bind(this), 1000); 
        
    }

    postItem = (type) => {
            
        switch (type) {
            case "newQuestion":
                axios.post(API_URL, {
                type: 'Question',
                question_text: this.refs.newQuestionText.value,
                
            })
            .then(function (response) {
                console.log(response);
                
                
            })
            .catch(function (error) {
                console.log(error);
            });  
            setTimeout(function() {this.getAllQuestions()}.bind(this), 1000);  
        }

             
        
    }

    updateQuestionPressed = (type) => {
        this.updateItem(type);
       
        setTimeout(function() {this.getAllQuestions()}.bind(this), 1000);  
    }

    deleteQuestionPressed = () => {
        var id = this.refs.updateQuestionId.value;
        this.deleteItem(id);
        setTimeout(function() {this.getAllQuestions()}.bind(this), 1000);
        this.refs.updateQuestionId.value = "";
        this.refs.updateQuestionText.value = "";
    }

    addQuestionForTargetPressed = () => {
        var q_id = this.refs.newQuestionForTarget.value;
        var t_id = this.refs.selectedTargetId.value;
        if (t_id == "all") alert("Please select target");
        else {
        
            axios.post(API_URL, {
                type: 'Question-Target-Link',
                question_id: q_id,
                target_id: t_id
                
            })
            .then(function (response) {
                console.log(response);
                
                
            })
            .catch(function (error) {
                console.log(error);
            });  
            setTimeout(function() {this.getQuestionsForTargets()}.bind(this), 1000);  
        }

    }
    render() {
        return (
            <div className="container home">
                <h1>Administration panel</h1>
                <Panel/>
     
                <div className="bordered"> 
                <h3> All questions in database</h3>
                <br/>
                    <table>
                    <tbody>
                        {
                            this.state.questions.map(qt=> {
                                    
                                    return (
                                    <tr>
                                        
                                        <td>
                                            <button onClick={this.showQuestionDetails.bind(this,qt.id)}>...</button>
                                        </td>
                                        <td>
                                            {qt.question_text}
                                        </td>
                                        
                                            
                                            
                                        
                                        
                                    </tr>)
                            })
                        }
                    </tbody>
                    </table>
                    <div className="details">
                    <h4>Details</h4>
                    <table>
                        <tbody>
                            <tr>
                                <td>id:</td>
                                <td><input ref="updateQuestionId" disabled/></td>
                            </tr>
                            <tr>
                            <td>question text</td>
                                <td><input ref="updateQuestionText"/></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td><button onClick={this.updateQuestionPressed.bind(this,"question")}>Update</button></td>
                                <td><button onClick={this.deleteQuestionPressed}>Delete</button></td>
                            </tr>
                        </tbody>
                    </table>
                    </div>
                    <div className="center details">
                    
                    <h4>Add a new question: </h4>
                    
                    <input ref="newQuestionText" type="text" placeholder="Enter question"/>
                    <button onClick={this.postItem.bind(this,"newQuestion")}>Add</button>
                    </div>
                </div>
                  
                <br/>
                <div className="bordered details">    
                <h3>List of questions for target</h3>
                <table>
                    <tbody>
                        <tr>
                            <td>Select corporation:</td>
                            <td>
                                <select ref="selectedCorporationId" onChange={this.getOffices}>
                                    <option value="all">not selected</option>
                                    {this.state.corporations.map(corporation=> {
                                    return (<option value={corporation.id}>{corporation.corporation_name}</option>)
                                    })}
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td>Select office/factory:</td>
                            <td>
                                <select ref="selectedOfficeId" onChange={this.getTargets}>
                                    <option value="all">not selected</option>
                                    {this.state.offices.map(office=> {
                                    return (<option value={office.id}>{office.office_name}</option>)
                                    })}
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td>Select target:</td>
                            <td>
                                <select ref="selectedTargetId" onChange={this.getQuestionsForTargets}>
                                    <option value="all">not selected</option>
                                    {this.state.targets.map(t=> {
                                    return (<option value={t.id}>{t.target_name}</option>)
                                    })}
                                </select>
                            </td>
                        </tr>
                    </tbody>
                </table>
               
                <br/>
                
                    <table>
                    <tbody>
                        {
                            this.state.questionTagretLinks.map(qt=> {
                                    
                                    return (
                                    <tr>
                                        
                                        <td>
                                            <button onClick={this.showDetails.bind(this,qt.id)}>...</button>
                                        </td>
                                        <QuestionText q_id = {qt.question_id} questions = {this.state.questions}/>
                                            
                                            
                                        
                                        
                                    </tr>)
                            })
                        }
                    </tbody>
                    </table>
                
                    <br/>
                    Add a new question: 
                <select ref="newQuestionForTarget">
                    {this.state.questions.map(q=> {
                        var uniq = true;
                        this.state.questionTagretLinks.map(qt=> {
                            
                            if (qt.question_id == q.id) {
                                uniq = false;
                                
                            }
                        });
                        if (uniq) return (<option value={q.id}>{q.question_text}</option>)
                    })}
                </select>
                <button onClick={this.addQuestionForTargetPressed}>Add</button>
                <br/>
                <table>
                    <tbody>
                        <tr>
                            <td>Id:</td>
                            <td><input ref="detailsId" type="text"  disabled/></td>
                        </tr>
                        <tr>
                            <td>Question id:</td>
                            <td><input ref="detailsQuestionId" disabled/></td>
                        </tr>
                        <tr>
                            <td>Question text:</td>
                            <td><input ref="detailsQuestionText" disabled/></td>
                        </tr>
                        <tr>
                            <td>Target id:</td>
                            <td><input ref="detailsTargetId" disabled/></td>
                        </tr>
                        <tr>
                            <td>Target name:</td>
                            <td><input ref="detailsTargetName" disabled/></td>
                        </tr>
                        
                        <tr>
                            <td></td>
                            <td><button onClick={this.deleteClicked}>Delete</button></td>
                        </tr>
                    </tbody>
                    </table>
                </div>     

                <br/>
                
            </div>            
        )
    }


}

export default QuestionsLocal;