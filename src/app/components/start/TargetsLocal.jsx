import React from 'react';
import axios from 'axios';
import Panel from './Panel';
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
                    </tbody>
                </table>
                <br/>
                
                
                    <table>
                    <tbody>
                        {
                            this.state.targets.map(target=> {
                                    var id = target.id;
                                    var name = target.target_name;
                                    return (
                                    <tr>
                                        <td>
                                            {id}
                                        </td>
                                        <td>
                                            {name}
                                        </td>
                                        <td>
                                            <button onClick={this.showTarget.bind(this, id)}>...</button>
                                        </td>
                                    </tr>)
                            })
                        }
                    </tbody>
                    </table>
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
                
                    <table>
                    <tbody>
                        <tr>
                            <td>Target id:</td>
                            <td><input ref="detailsTargetId" type="text"  disabled/></td>
                        </tr>
                        <tr>
                            <td>Name:</td>
                            <td><input ref="detailsTargetName"/></td>
                        </tr>
                        <tr>
                            <td>Office name:</td>
                            <td><input ref="detailsOfficeName" disabled/></td>
                        </tr>
                        <tr>
                            <td>Office id:</td>
                            <td><input ref="detailsOfficeId" disabled/></td>
                        </tr>
                        <tr>
                            <td>Corporation name:</td>
                            <td><input ref="detailsCorporationName"disabled/></td>
                        </tr>
                        <tr>
                            <td>Corporation id:</td>
                            <td><input ref="detailsCorporationId" disabled/></td>
                        </tr>
                        <tr>
                            <td><button onClick={this.updatePressed}>Update</button></td>
                            <td><button onClick={this.deleteItem}>Delete</button></td>
                        </tr>
                    </tbody>
                    </table>
                
                </div>
                <br/>            
            </div>            
        )
    }

}

export default TargetsLocal;