import React from 'react';
import axios from 'axios';
import Panel from './Panel';
const API_URL = "http://localhost:4000/api2/audits";



class OfficesLocal extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          corporations: [],
          offices: [],
          selectedOffice: [],
          corporation_name_of_selected_office: ""
          
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
        if (this.refs.corp.value == "all") url = API_URL + "?type=Office";
        else url = API_URL + "?type=Office&corporation_id="+this.refs.corp.value;
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
    
    switchButton = (index, id, name, corp_name) => {
        switch (index) {
            
            case "show_offices":
                
                this.getOffices();
                //selectedCorporationName = this.corporationById(this.refs.corporation.value);
                
                break;
        }
    }

    postOffice = () => {
            
        if (this.refs.corp.value == "all") {
            alert("Please select corporation first");
                
        } else {
            
            
            axios.post(API_URL, {
                type: 'Office',
                office_name: this.refs.new_office_name.value,
                corporation_id: this.refs.corp.value
                

            })
            .then(function (response) {
                console.log(response);
                
                
            })
            .catch(function (error) {
                console.log(error);
            });  
            setTimeout(function() {this.getOffices()}.bind(this), 1000);   
        }
    }

    deleteItem = (id, name, type) => {
        var del_id = this.refs.table_office_id.value;
        axios.delete(API_URL+'/'+del_id);
            //alert("Item '"+ name + "' was successfully deleted" );
            
        setTimeout(function() {this.getOffices()}.bind(this), 500);
        this.clearForm();
    }
    
    clearForm = () => {
        this.refs.table_office_id.value = '';
            this.refs.table_office_name.value = '';
            this.refs.table_corporation_id.value = '';
            this.refs.table_corporation_name.value = '';
    }
    handleRadio = (id) => {
        this.showOffice(id);
        
        
        setTimeout(function() {this.fillTable()}.bind(this), 100); 
        
    }

    fillTable = () => {
       
        this.state.selectedOffice.map(o=> {
            this.refs.table_office_id.value = o.id;
            
            this.refs.table_office_name.value = o.office_name;
            this.refs.table_corporation_id.value = o.corporation_id;

        });
        this.corporationNameById();
    }

    showOffice = (id) => {
        
        var self = this;
        let url = API_URL + "?id=" + id;
        
        
        fetch(url)
        .then(function(response) {
          return response.json();
        })
        .then(function(json){
            
            self.setState({selectedOffice: json});
            

        })
        .catch(function(err){
          console.error(err)
        });
        console.log('showOffice running');
      
    }
    corporationNameById = () => {
        var corp_id = "";
        
        this.state.corporations.map(corp => {
            if (this.refs.table_corporation_id.value == corp.id)
                this.refs.table_corporation_name.value = corp.corporation_name;
        });
    }

    findCorporationNameById = () => {
        
        var corp_id ="";
        this.state.selectedOffice.map(selectedOff=> {
            
            corp_id = selectedOff.corporation_id;
            
        });

        corp_id = this.refs.corporation_id.value;
        
        self.setState({corporation_name_of_selected_office: ""});

        this.state.corporations.map(corp=> {
            alert(corp.corporation_name);
            if (corp.id == corp_id) {
                self.setState({corporation_name_of_selected_office: corp.corporation_name});
                alert(corp.corporation_name);
            }
        })
    }
    
    updateItem = () => {
        var update_id = this.refs.table_office_id.value;
        alert("in update");
        axios.put(API_URL+'/'+update_id, {
            type: 'Office',
            office_name: this.refs.table_office_name.value,
            corporation_name: this.refs.table_corporation_name.value,
            corporation_id: this.refs.table_corporation_id.value
          })
          .then(function (response) {
            console.log(response);
           
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
                <h3>List of offices/factories</h3>
                
                Select corporation:  
                <select ref="corp" onChange={this.getOffices}>
                    <option value="all">All corporations</option>
                    {this.state.corporations.map(corporation=> {
                        return (<option value={corporation.id}>{corporation.corporation_name}</option>)
                    })}
                </select>
                
                <button onClick={this.switchButton.bind(this,'hide_offices')}>Hide</button>
                <br/>
                <div className="center">
                    <table className="table" ref="officesTable">
                    <tbody>
                        {
                            this.state.offices.map(office=> {
                                    var id = office.id;
                                    var name = office.office_name;
                                    
                                    
                                    return (
                                    <tr>
                                        <td>
                                            <input type="radio" name="office_radio" value = {id} onClick={this.handleRadio.bind(this,id)}/>
                                        </td>
                                        <td>
                                            {name}
                                        </td>
                                    </tr>)
                            })
                        }
                    </tbody>
                    </table>
                </div>
                <h4>Add a new office/factory</h4>
                <input ref="new_office_name" type="text" placeholder="Enter name"/>
               
                <button onClick={this.postOffice}>Add</button>
                <br/>
                <br/>
                </div>    
                <br/>    
                <div className="bordered details">
                <table>
                    
                       
                                    <tbody>
                                    <tr>
                            <td>Office id:</td>
                     <td><input ref="table_office_id" type="text"  disabled/></td></tr>
                     <tr>
                     <td>
                    Name:</td><td><input ref="table_office_name"/></td></tr>
                     <tr><td>
                     Corporation name: </td><td><input ref="table_corporation_name"/></td></tr>
                     <tr><td>
                     Corporation id: </td><td><input ref="table_corporation_id"/></td></tr>
                     
                     <tr><td><button onClick={this.updateItem}>Update</button></td><td><button onClick={this.deleteItem}>Delete</button></td></tr>
                                 
                         
                         
                         </tbody>
                    
                    
                    
                    </table>
                </div>
                <br/>            
            </div>            
        )
    }

}

export default OfficesLocal;