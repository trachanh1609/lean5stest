import React from 'react';
import axios from 'axios';

import Panel from './Panel';


const API_URL = "http://localhost:4000/api2/audits";

var buttonCorp = "Show";

var selectedCorporation = '';
var selectedOffice = '';

class AdministrationLocal extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          corporations: [],
          selectedCorporation: [],
          corporationsList: []
         
        };
    }

    componentDidMount() {
        //this.getCorporations();
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
           
        }
        
        
    }

    /// OK
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

    /// OK
    deleteItem = (id, name, type) => {
        
        axios.delete(API_URL+'/'+id);
        alert("Item '"+ name + "' will be deleted" );
        
        switch (type) {
            case "corporation":
                setTimeout(function() {this.getCorporations()}.bind(this), 500);
                break;
            case "office":
                setTimeout(function() {this.getSomeOffices()}.bind(this), 500);
                break;
        }
        
        
    }

    deleteCorporation = () => {
        var id = this.refs.table_corp_id.value;
        axios.delete(API_URL+'/'+id);
        setTimeout(function() {this.getCorporations()}.bind(this), 500);
        clearTable();
    }
    
    showCorporationDetails = (id) => {
        this.findDetails(id);
        setTimeout(function() {this.fillTable()}.bind(this), 100);
    }

    findDetails = (id) => {
        var self = this;
        let url = API_URL + "?id=" + id;
        
        
        fetch(url)
        .then(function(response) {
          return response.json();
        })
        .then(function(json){
            
            self.setState({selectedCorporation: json});
            

        })
        .catch(function(err){
          console.error(err)
        });
       
    }
    clearTable = () => {
        this.refs.table_corp_id.value = "";
            this.refs.table_corp_name.value = "";
    }
    fillTable = () => {
        this.state.selectedCorporation.map(c=> {
            this.refs.table_corp_id.value = c.id;
            this.refs.table_corp_name.value = c.corporation_name;
        });
    }

    updateItem = (nextFunction) => {
        var update_id = this.refs.table_corp_id.value;
        
        axios.put(API_URL+'/'+update_id, {
            type: 'Corporation',
            corporation_name: this.refs.table_corp_name.value,
          })
          .then(function (response) {
            console.log(response);
            setTimeout(function() {nextFunction()}.bind(this), 100); 
          })
          .catch(function (error) {
            console.log(error);
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
                                        <button onClick={this.showCorporationDetails.bind(this, id)}>...</button>
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
                <div className="bordered details">
                    <h3>Details</h3>
                    <table>
                    
                       
                    <tbody>
                        <tr><td>Corporation id:</td><td><input ref="table_corp_id" type="text"  disabled/></td></tr>
                        <tr><td> Name:</td><td><input ref="table_corp_name"/></td></tr>
                        <tr><td><button onClick={this.updateItem.bind(this, this.getCorporations)}>Update</button></td><td><button onClick={this.deleteCorporation}>Delete</button></td></tr>
                    </tbody> 
                    </table>
                </div>
                 
                <br/>
                 
                
                <br/>
                <br/>
                        

                <br/>            
                
            
            </div>    
        )
    }
    
  }

export default AdministrationLocal;