import React from 'react';
import axios from 'axios';
import Panel from './Panel';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
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
            
        return (<TableCell style={{textAlign:"left"}}>{text}</TableCell>);
        
        
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
                    <Table>
                    <TableBody>
                        {
                            this.state.questions.map(qt=> {
                                    
                                    return (
                                    <TableRow>
                                        
                                        <TableCell>
                                            <button onClick={this.showQuestionDetails.bind(this,qt.id)}>...</button>
                                        </TableCell>
                                        <TableCell style={{textAlign:"left"}}>
                                            {qt.question_text}
                                        </TableCell>
                                        
                                            
                                            
                                        
                                        
                                    </TableRow>)
                            })
                        }
                    </TableBody>
                    </Table>
                    <div className="details">
                    <h4>Details</h4>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell>id:</TableCell>
                                <TableCell><input ref="updateQuestionId" disabled/></TableCell>
                            </TableRow>
                            <TableRow>
                            <TableCell>question text</TableCell>
                                <TableCell><input ref="updateQuestionText"/></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell></TableCell>
                                <TableCell>
                                    <button onClick={this.updateQuestionPressed.bind(this,"question")}>Update</button>
                                    <button onClick={this.deleteQuestionPressed}>Delete</button>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
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
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell>Select corporation:</TableCell>
                            <TableCell>
                                <select ref="selectedCorporationId" onChange={this.getOffices}>
                                    <option value="all">not selected</option>
                                    {this.state.corporations.map(corporation=> {
                                    return (<option value={corporation.id}>{corporation.corporation_name}</option>)
                                    })}
                                </select>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Select factory:</TableCell>
                            <TableCell>
                                <select ref="selectedOfficeId" onChange={this.getTargets}>
                                    <option value="all">not selected</option>
                                    {this.state.offices.map(office=> {
                                    return (<option value={office.id}>{office.office_name}</option>)
                                    })}
                                </select>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Select target:</TableCell>
                            <TableCell>
                                <select ref="selectedTargetId" onChange={this.getQuestionsForTargets}>
                                    <option value="all">not selected</option>
                                    {this.state.targets.map(t=> {
                                    return (<option value={t.id}>{t.target_name}</option>)
                                    })}
                                </select>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
               
                <br/>
                
                    <Table>
                    <TableBody>
                        {
                            this.state.questionTagretLinks.map(qt=> {
                                    
                                    return (
                                    <TableRow>
                                        
                                        <TableCell>
                                            <button onClick={this.showDetails.bind(this,qt.id)}>...</button>
                                        </TableCell>
                                        <QuestionText q_id = {qt.question_id} questions = {this.state.questions}/>
                                            
                                            
                                        
                                        
                                    </TableRow>)
                            })
                        }
                    </TableBody>
                    </Table>
                
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
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell>Id:</TableCell>
                            <TableCell><input ref="detailsId" type="text"  disabled/></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Question id:</TableCell>
                            <TableCell><input ref="detailsQuestionId" disabled/></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Question text:</TableCell>
                            <TableCell><input ref="detailsQuestionText" disabled/></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Target id:</TableCell>
                            <TableCell><input ref="detailsTargetId" disabled/></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Target name:</TableCell>
                            <TableCell><input ref="detailsTargetName" disabled/></TableCell>
                        </TableRow>
                        
                        <TableRow>
                            <TableCell></TableCell>
                            <TableCell><button onClick={this.deleteClicked}>Delete</button></TableCell>
                        </TableRow>
                    </TableBody>
                    </Table>
                </div>     

                <br/>
                
            </div>            
        )
    }


}

export default QuestionsLocal;