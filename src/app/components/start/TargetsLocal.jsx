import React from 'react';
import axios from 'axios';
import Panel from './Panel';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const API_URL = "http://localhost:4000/api2/audits";


class TargetsLocal extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          corporations: [],
          offices: [],
          targets: []
          
        };
    }

    componentDidMount() {
        this.getCorporations();
        this.getOffices();
        
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
    
    postItem = () => {
            
        if ((this.refs.selectedOfficeId.value == "all") || (this.refs.selectedCorporationId.value == "all")) {
            alert("Please select corporation and office/factory first");
        
        } else {

            axios.post(API_URL, {
                type: 'Target',
                target_name: this.refs.newTargetName.value,
                office_id: this.refs.selectedOfficeId.value,
                corporation_id: this.refs.selectedCorporationId.value
            })
            .then(function (response) {
                console.log(response);
                
                
            })
            .catch(function (error) {
                console.log(error);
            });  
            setTimeout(function() {this.getTargets()}.bind(this), 1000);   
        }
    }

    deleteItem = () => {
        var del_id = this.refs.detailsTargetId.value;
        axios.delete(API_URL+'/'+del_id);
            //alert("Item '"+ name + "' was successfully deleted" );
            
        setTimeout(function() {this.getTargets()}.bind(this), 500);
        
        
    }
    
    showTarget = (id) => {
        
        this.state.targets.map(t=> {
            if (t.id == id) {
                this.refs.detailsTargetId.value = t.id;
            
            this.refs.detailsTargetName.value = t.target_name;
            this.refs.detailsOfficeId.value = t.office_id;
            this.refs.detailsCorporationId.value = t.corporation_id;
            this.officeNameById(t.office_id);
            this.corporationNameById(t.corporation_id);
            }
        });     
        
    }

    corporationNameById = (id) => {
        this.state.corporations.map(corp => {
            if (id == corp.id)
                this.refs.detailsCorporationName.value = corp.corporation_name;
        });
    }
    
    officeNameById = (id) => {
        this.state.offices.map(office => {
            if (id == office.id)
                this.refs.detailsOfficeName.value = office.office_name;
        });
    }
    

    updateItem = () => {
        var update_id = this.refs.detailsTargetId.value;
        axios.put(API_URL+'/'+update_id, {
            type: 'Target',
            target_name: this.refs.detailsTargetName.value,
            corporation_id: this.refs.detailsCorporationId.value,
            office_id: this.refs.detailsOfficeId.value
          })
          .then(function (response) {
            console.log(response);
           
          })
          .catch(function (error) {
            console.log(error);
          });
    }

    updatePressed = () => {
        this.updateItem();
        setTimeout(function() {this.getTargets()}.bind(this), 500);
    }

    render() {
        return (
            <div className="container home">
                <h1>Administration panel</h1>
                <Panel/>
     
                <div className="bordered">    
                <h3>List of targets</h3>
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
                            <TableCell>Select office/factory:</TableCell>
                            <TableCell>
                                <select ref="selectedOfficeId" onChange={this.getTargets}>
                                    <option value="all">not selected</option>
                                    {this.state.offices.map(office=> {
                                    return (<option value={office.id}>{office.office_name}</option>)
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
                            this.state.targets.map(target=> {
                                    var id = target.id;
                                    var name = target.target_name;
                                    return (
                                    <TableRow>
                                        <TableCell>
                                            {id}
                                        </TableCell>
                                        <TableCell>
                                            {name}
                                        </TableCell>
                                        <TableCell>
                                            <button onClick={this.showTarget.bind(this, id)}>...</button>
                                        </TableCell>
                                    </TableRow>)
                            })
                        }
                    </TableBody>
                    </Table>
                <div className="center">
                    <h4>Add a new target: </h4>
                    
                    <input ref="newTargetName" type="text" placeholder="Enter name"/>
                    <button onClick={this.postItem}>Add</button>
                </div>
                </div>
                <br/>
                <br/>
                <br/>   
                <div className = "bordered details"> 
                
                    <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell>Target id:</TableCell>
                            <TableCell><input ref="detailsTargetId" type="text"  disabled/></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Name:</TableCell>
                            <TableCell><input ref="detailsTargetName"/></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Office name:</TableCell>
                            <TableCell><input ref="detailsOfficeName" disabled/></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Office id:</TableCell>
                            <TableCell><input ref="detailsOfficeId" disabled/></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Corporation name:</TableCell>
                            <TableCell><input ref="detailsCorporationName"disabled/></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Corporation id:</TableCell>
                            <TableCell><input ref="detailsCorporationId" disabled/></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell><button onClick={this.updatePressed}>Update</button></TableCell>
                            <TableCell><button onClick={this.deleteItem}>Delete</button></TableCell>
                        </TableRow>
                    </TableBody>
                    </Table>
                
                </div>
                <br/>            
            </div>            
        )
    }

}

export default TargetsLocal;