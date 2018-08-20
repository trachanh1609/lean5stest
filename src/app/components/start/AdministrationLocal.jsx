import React from 'react';
import axios from 'axios';

import Panel from './Panel';


const API_URL = "http://localhost:4000/api2/audits";

var buttonCorp = "Show";
var showOffices = false;
var showTargets = false;
var selectedCorporation = '';
var selectedOffice = '';

class AdministrationLocal extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          corporations: [],
          offices: [],
          targets: [],
          corporationsList: [],
          officesList: [],
          targetsList: []
        };
    }

    componentDidMount() {
        this.getCorporations();
        //this.getOffices();
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
            if (buttonCorp == "Hide") {
                self.setState({corporationsList: json});
            };
        })
        .catch(function(err){
          console.error(err)
        });
      
        console.log('getCorporations running');
      }

      getOffices = () => {
        var self = this;
        let url = API_URL + "?type=Office";
        
        fetch(url)
        .then(function(response) {
          return response.json();
        })
        .then(function(json){
            
            self.setState({offices: json});
            getSomeOffices();
           
        })
        .catch(function(err){
          console.error(err)
        });
      
        console.log('getOffices running');
        

      }  

        
      getSomeOffices = () => {
        var self = this;
        let url;
        var id = this.refs.corporation.value;
        if (id == "all") url = API_URL + "?type=Office";
        else url = API_URL + "?type=Office&corporation_id=" + id;
        
        fetch(url)
        .then(function(response) {
          return response.json();
        })
        .then(function(json){
            
            self.setState({officesList: json});
            
        })
        .catch(function(err){
          console.error(err)
        });
      
        console.log('getOffices running');
      }   
      
      getTargets = () => {
        var self = this;
        let url = API_URL + "?type=Target";
        
        fetch(url)
        .then(function(response) {
          return response.json();
        })
        .then(function(json){
            
            self.setState({targets: json});
            getSomeTargets();
           
        })
        .catch(function(err){
          console.error(err)
        });
      
        console.log('getTargets running');
        

      }  
      getSomeTargets = () => {
        var self = this;
        let url;
        var id = this.refs.selected_office.value;
        if (id == "all") url = API_URL + "?type=Target";
        else url = API_URL + "?type=Target&office_id=" + id;
        
        fetch(url)
        .then(function(response) {
          return response.json();
        })
        .then(function(json){
            
            self.setState({targetsList: json});
            
        })
        .catch(function(err){
          console.error(err)
        });
      
        console.log('getOffices running');
      }   

    switchButton = (index, id, name, corp_name) => {
        switch (index) {
            case "corporations":
                if (buttonCorp == "Show") {
                    this.getCorporations();
                    buttonCorp = "Hide";
                    
                } else {
                    this.setState({corporationsList: []});
                    buttonCorp = "Show";             
                }
                break;
            case "show_offices":
                showOffices = true;
                this.getSomeOffices();
                //selectedCorporationName = this.corporationById(this.refs.corporation.value);
                
                break;
            case "hide_offices":
                this.setState({officesList: []});
                showOffices = false;
                break;
            case "show_targets":
                showTargets = true;
                this.getSomeTargets();
                
                break;
            case "hide_targets":
                this.setState({targetsList: []});
                showTargets = false;
                break;
            case "target_pressed":
                this.refs.selected_office.value = id;
                showTargets = true;
                selectedOffice = name;
                selectedCorporation = corp_name;
                
                this.getSomeTargets();
                
        }
        
        
    }

    postCorporation = (nextFunction) => {
        axios.post(API_URL, {
            type: 'Corporation',
            corporation_name: this.refs.new_corporation.value
          })
          .then(function (response) {
            console.log(response);
            nextFunction();
          })
          .catch(function (error) {
            console.log(error);
          });
    }

    postItem = (type, nextFunction) => {
        switch (type) {
            case 'office':
                if (this.refs.corporation.value == "all") {
                    alert("Please select corporation first");
                    break;
                } else 
                axios.post(API_URL, {
                    type: 'Office',
                    office_name: this.refs.new_office.value,
                    corporation_id: this.refs.corporation.value
                })
                .then(function (response) {
                    console.log(response);
                    nextFunction();
                    //this.getSomeOffices();
                    //setTimeout(function() {this.getSomeOffices(this.refs.corporation.value)}.bind(this), 1000);
                })
                .catch(function (error) {
                    console.log(error);
                });
                break;
            
        }
        
    }
    
    deleteItem = (id, name, type) => {
        
        axios.delete(API_URL+'/'+id);
        //alert("Item '"+ name + "' was successfully deleted" );
        
        switch (type) {
            case "corporation":
                setTimeout(function() {this.getCorporations()}.bind(this), 500);
                break;
            case "office":
                setTimeout(function() {this.getSomeOffices()}.bind(this), 500);
                break;
        }
        
        
    }

    
    corporationById = (id) => {
        //alert("Corporation id" + id);
        this.state.corporations.map(corporation=> {
            if (corporation.id = id) return(corporation.corporation_name);
            alert(corporation.corporation_name);
        });
    }
    render() {
        return (
            <div className="container home">
                <h1>Administration panel</h1>
                <Panel/>
              
                   
                 <div className="bordered">
                <h3>List of corporations in database</h3>
                <button onClick={this.switchButton.bind(this,'corporations')}>{buttonCorp}</button>
                <div className="center">
                    <table className="table">
                    <tbody>
                        {
                            this.state.corporationsList.map(corporation=> {
                                    var id = corporation.id;
                                    var name = corporation.corporation_name;
                                    return (<tr><td> {corporation.id}</td>
                                    <td>{corporation.corporation_name}</td>
                                    <td>
                                    <button onClick={this.deleteItem.bind(this,id, name, 'corporation')}>-</button>
                                    </td></tr>)
                            })
                        }
                        </tbody>
                    </table>
                </div>
                <h4>Add a new corporation</h4>
                <input ref="new_corporation" type="text" name="corporation_name" placeholder="Enter corporation name"/>
                <button onClick={this.postCorporation.bind(this,this.getCorporations)}>Add</button>
                <br/>
                <br/>
                
                     
                 </div>  
                 <br/>
                 <div className="bordered">    
                <h3>List of factories</h3>
                
                Select corporation:  
                <select ref="corporation" onChange={this.switchButton.bind(this,'show_offices')}>
                    <option value="all">All corporations</option>
                    {this.state.corporations.map(corporation=> {
                        return (<option value={corporation.id}>{corporation.corporation_name}</option>)
                    })}
                </select>
                <button onClick={this.switchButton.bind(this,'show_offices')}>Show</button>
                <button onClick={this.switchButton.bind(this,'hide_offices')}>Hide</button>
                <br/>
                <div className="center">
                    <table className="table">
                    <tbody>
                        {
                            this.state.officesList.map(office=> {
                                    var id = office.id;
                                    var name = office.office_name;
                                    var corporation_id = office.corporation_id;
                                    var corporation_name = this.corporationById(corporation_id);
                                    return (<tr><td> {id}</td>
                                    <td>{name}</td>
                                    <td>
                                    <button onClick={this.deleteItem.bind(this,id, name, 'office')}>-</button>
                                    <button onClick={this.switchButton.bind(this,'target_pressed',id,name,corporation_name)}>Targets</button>
                                    </td></tr>)
                            })
                        }
                    </tbody>
                    </table>
                </div>
                <h4>Add a new office/factory</h4>
                <input ref="new_office" type="text" placeholder="Enter name"/>
               
                <button onClick={this.postItem.bind(this,'office', this.getSomeOffices)}>Add</button>
                <br/>
                <br/>
                </div>        

                <br/>            
                <div className="bordered">    
                <h3>List of targets
                </h3>
                Corporation: {selectedCorporation}
                <br/>
                Office/factory: {selectedOffice}
                <br/>
                <button onClick={this.switchButton.bind(this,'hide_targets')}>Hide</button>
                <div className="center">
                    <table className="table">
                        {
                            this.state.targetsList.map(target=> {
                                    var id = target.id;
                                    var name = target.target_name;
                                    var office = target.office_name;
                                    var corporation = target.corporation_name;
                                    return (<tr>
                                        <td> {corporation}</td>
                                        <td> {office}</td>
                                        <td> {id}</td>
                                        <td>{name}</td>
                                        <td><button onClick={this.deleteItem.bind(this,id, name, 'target')}>-</button></td>
                                        
                                        </tr>)
                            })
                        }
                    </table>
                </div>
                <input ref="selected_office" type="hidden"/>
                <h4>Add a new target</h4>
                <input ref="new_target" type="text" placeholder="Enter name"/>
               
                <button onClick={this.postItem.bind(this,'target', this.getSomeTargets)}>Add</button>
                <br/>
                <br/>
                </div>        
            </div>
            
        )
    }
    
  }

export default AdministrationLocal;