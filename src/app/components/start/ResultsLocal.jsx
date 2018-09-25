import React from 'react';
import axios from 'axios';
import UserPanel from '../../elements/UserPanel';
import { Link } from 'react-router';
const API_URL = "http://localhost:4000/api2/audits";
import { connect } from 'react-redux';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {createAudit, updateSelectedCorporation, updateSelectedDate, updateSelectedFactory, updateSelectedTarget, clearFactories, addFactory, clearTargets, addTarget } from "../../actions/index";
import Button from '@material-ui/core/Button';

const mapStateToProps = (state) => {
    return {
        user: state.user,
        startedAudit: state.startedAudit,
        selectedCorporation: state.selectedCorporation,
        selectedFactory: state.selectedFactory,
        factories: state.factories,
        targets: state.targets
    }
};

const mapDispatchToProps = dispatch => {
    return {
      createAudit: startedAudit => dispatch(createAudit(startedAudit)),
      updateSelectedTarget: selectedTarget => dispatch(updateSelectedTarget(selectedTarget)),
      updateSelectedFactory: selectedFactory => dispatch(updateSelectedFactory(selectedFactory)),
      updateSelectedCorporation: selectedCorporation => dispatch(updateSelectedCorporation(selectedCorporation)),
      updateSelectedDate: selectedDate => dispatch(updateSelectedDate(selectedDate)),
      clearFactories: factories => dispatch(clearFactories(factories)),
      addFactory: factories => dispatch(addFactory(factories)),
      clearTargets: targets => dispatch(clearTargets(targets)),
      addTarget: targets => dispatch(addTarget(targets))
    };
  }
class SelectAuditor extends React.Component {
    constructor(props){
        super(props);
    }
    render () {
        if (this.props.user == "Antti Auditoija") {
            return (
            <select ref="selectedAuditor" onChange={this.props.loadData} defaultValue={this.props.user}>
            
            <option value="Antti Auditoija">Antti Auditoija</option>
            <option value="Markku Tarkastaja">Markku Tarkastaja</option>
            <option value="Juha Seikkailija">Juha Seikkailija</option>
            
        </select>
        ) 
        } else {
            return (
                <select ref="selectedAuditor" onChange={this.props.loadData} defaultValue={this.props.user}>
            
                    <option value={this.props.user}>{this.props.user}</option>
            
            
                </select>
            )
        }

        
    }
        
    
}
class ResultsLocal extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            audits: [],
            audits_not_filtered: []
        }
    }
    
    componentDidMount() {
        setTimeout(function() {this.loadData()}.bind(this),1000);
    }

    loadData = () => {
        this.getAudits(this.refs.selectedAuditor.value);
        setTimeout(function() {this.showResults()}.bind(this),500);
    }

    getAudits = (auditor) => {
        var self = this;
        let url = API_URL + "?type=Audit_case&auditor="+auditor;
        fetch(url)
        .then(function(response) {
          return response.json();
        })
        .then(function(json){
            self.setState({audits_not_filtered: json});
        })
        .catch(function(err){
          console.error(err)
        });
        
    }

    showResults = () => {
        var tempData = this.state.audits_not_filtered;
        tempData.sort(function(a,b) {
            if(a.date < b.date) return 1;
            if(a.date > b.date) return -1;
            return 0;
        } );
        this.setState({audits: tempData});
    }

    modify = (id) => {
        var modifAudit = [];
        this.state.audits.map(audit=>{
            if(audit.id == id) modifAudit = audit;
        });
        this.saveAuditDataToStore(modifAudit);
    }

    saveAuditDataToStore = (audit) => {
        this.props.createAudit(audit);
        /* in data security purposes better to retreave only needed data
        this.props.createAudit({
            id: audit.id,
            target_id: audit.target_id,
            target_name: audit.target_name,
            office_id: audit.office_id,
            corporation_id: audit.corporation_id,
            corporation_name: audit.corporation_name,
            date: audit.date,
            auditor: this.props.user.name,
            results: audit.results
        });*/
        this.props.updateSelectedTarget({id:audit.target_id,name:audit.target_name});
        this.props.updateSelectedCorporation({id:audit.corporation_id,name:audit.corporation_name});
        this.props.updateSelectedFactory({id:audit.office_id,name:audit.office_name});
        this.props.updateSelectedDate(audit.date);
        this.getFactories(audit.corporation_id);
        this.getTargets(audit.office_id);
    }

    getFactories = (corporation_id) => {
        this.props.clearFactories();
        console.log("Old factories are cleared");
        var self = this;
        var filter = "";
        console.log("selectedCorporation.id="+this.props.selectedCorporation.id);
        if (corporation_id != "") filter = "&corporation_id="+corporation_id;
        let url = API_URL + "?type=Office"+filter;
        console.log(url);
        fetch(url)
        .then(function(response) {
          return response.json();
        })
        .then(function(json){
            json.map(factory=>{
                    self.props.addFactory({
                        id:factory.id,
                        office_name:factory.office_name
                    });
            });
        })
        .catch(function(err){
          console.error(err)
        });
    }

    getTargets = (office_id) => {
        this.props.clearTargets();
        var self = this;
        var filter = "";
        if (office_id != "") filter = "&office_id="+office_id;
        let url = API_URL + "?type=Target"+filter;
        fetch(url)
        .then(function(response) {
          return response.json();
        })
        .then(function(json){
            json.map(target=>{
                self.props.addTarget({
                    id:target.id,
                    target_name:target.target_name
                });
            });
        })
        .catch(function(err){
          console.error(err)
        });
    }

    deleteItem = (id) => {
        axios.delete(API_URL+'/'+id);
        setTimeout(function(){this.loadData()}.bind(this),2000);
    }

    convertToGrade = (grade) => {
        console.log(grade);
        switch(grade) {
            case 100:
                return "Good";
                break;
            case 50:
                return "Ok";
                break;
            case 0:
                return "Bad";
                break;
            default:
                return "-";
                break;
        }
    }

    render() {
 
        return (
            <div>
                <UserPanel/>
                <br/>
        <h1>Audit results</h1>
            
            <select ref="selectedAuditor" onChange={this.loadData} defaultValue={this.props.user.name}>
            
            <option value="Antti Auditoija">Antti Auditoija</option>
            <option value="Markku Tarkastaja">Markku Tarkastaja</option>
            <option value="Juha Seikkailija">Juha Seikkailija</option>
            
        </select>
        
        {
            this.state.audits.map(audit => {
                return(
                    <div className="bordered">
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell style={{width:"150px"}}>Audit Id</TableCell>
                            <TableCell style={{width:"150px"}}>Date</TableCell>
                            <TableCell style={{width:"150px"}}>Target</TableCell>
                            <TableCell style={{width:"150px"}}>Factory</TableCell>
                            <TableCell style={{width:"150px"}}>Corporation</TableCell>
                            <TableCell style={{width:"150px"}}>Av.grade</TableCell>
                            <TableCell style={{width:"150px"}}>Stage</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>{audit.id}</TableCell>
                            <TableCell style={{padding:"5px"}}>{audit.date}</TableCell>
                            <TableCell style={{padding:"5px"}}>{audit.target_name}</TableCell>
                            <TableCell>{audit.office_name}</TableCell>
                            <TableCell>{audit.corporation_name}</TableCell>
                            <TableCell>{audit.average_grade}</TableCell>
                            <TableCell>{audit.stage}</TableCell>
                        </TableRow>
                    </TableBody>
                    </Table>
                    <Table ref={audit.id}>
                    <TableHead>
                        <TableRow>
                            <TableCell style={{width:"80px"}}>Grade</TableCell>
                            <TableCell style={{textAlign:"left"}}>Question text</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            audit.results.map(r=>{
                                    return (
                                        <TableRow>
                                            <TableCell>{r.grade}</TableCell>
                                            <TableCell style={{textAlign:"left"}}>{r.question_text}</TableCell>
                                        </TableRow>
                                );
                            })
                        }
                        <TableRow>
                            <TableCell>Comments</TableCell>
                            <TableCell style={{textAlign:"left"}}>{audit.comments}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
                <Link to="/audit_questions" style={{ textDecoration: 'none' }}>
                    <Button onClick={this.modify.bind(this,audit.id)} variant="outlined" color="primary" size="small">
                        Modify
                    </Button>
                </Link>
                <Button onClick={this.deleteItem.bind(this,audit.id)} variant="outlined" color="primary" size="small">Delete</Button>
                </div>);
            })
        }
        </div>
        );
        
        
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(ResultsLocal);