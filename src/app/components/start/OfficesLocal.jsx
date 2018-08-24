import React from 'react';
import axios from 'axios';
import Panel from './Panel';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';

const API_URL = "http://localhost:4000/api2/audits";
var detailsVisibility = "invisible";



class OfficesLocal extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          corporations: [],
          offices: [],
          selectedOffice: [],
          joins: []
          
          
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
    getJoins = (id, type) => {
        var self = this;
        let url = API_URL + "?"+ type + "=" + id;
        fetch(url)
        .then(function(response) {
          return response.json();
        })
        .then(function(json){
            self.setState({joins: json});
        })
        .catch(function(err){
          console.error(err)
        });
       
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
        detailsVisibility = "invisible";
        this.refs.table_office_id.value = '';
            this.refs.table_office_name.value = '';
            this.refs.table_corporation_id.value = '';
            this.refs.table_corporation_name.value = '';
            
    }
    

    showOfficeDetails = (id) => {
        detailsVisibility = "bordered details";
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
        var link = "#factoryDetails";
        location.href=link;
        
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
    updateButtonPressed = () => {
        this.updateItem();
        setTimeout(function() {this.getOffices()}.bind(this), 500);
    }

    selectPressed = () => {
        this.getOffices();
        this.clearForm();
    }
    
    
    updateItem = (nextFunction) => {
        var update_id = this.refs.table_office_id.value;
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
    joinsMap = () => {
        var num = 0;
        var joins = "";
        this.state.joins.map(j=>{
            num++;
            joins += num + ") Document type: "+j.type+"\nDocument id: "+j.id+"\n--------------------------------\n";
        });
         
        
        alert(this.state.selectedOffice.office_name + " has " + num + " connected documents\n---------------------------------\n"+joins);
    }

    showJoins = () => {
        
        this.getJoins(this.refs.table_office_id.value,"office_id");
        setTimeout(function() {this.joinsMap()}.bind(this), 1000);
        

    }
      render() {
        return (
            <div className="container home">
                <h1>Administration panel</h1>
                <Panel/>
     
                 <div className="bordered">    
                <h3>List of factories ("Toimipisteet")</h3>
                
                Select corporation:  
                <select ref="corp" onChange={this.selectPressed}>
                    <option value="all">All corporations</option>
                    {this.state.corporations.map(corporation=> {
                        return (<option value={corporation.id}>{corporation.corporation_name}</option>)
                    })}
                </select>
                
                
                <br/>
                <div className="center">
                    <Table className="Table" ref="officesTable">
                    <TableHead>
                        <TableRow>
                            <TableCell></TableCell>
                            <TableCell>id</TableCell>
                            <TableCell>Factory</TableCell>
                            <TableCell>Corporation</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            this.state.offices.map(office=> {
                                    var id = office.id;
                                    var name = office.office_name;
                                    
                                    
                                    return (
                                    <TableRow>
                                        <TableCell>
                                            
                                            <button onClick={this.showOfficeDetails.bind(this, id)}>...</button>
                                        </TableCell>
                                       <TableCell>
                                            {id}
                                        </TableCell>
                                        <TableCell>
                                            {name}
                                        </TableCell>
                                        
                                            {this.state.corporations.map(c=> {
                                                if (c.id == office.corporation_id) {
                                                    return (<TableCell>{c.corporation_name}</TableCell>);
                                                }
                                            })}
                                        
                                        
                                    </TableRow>)
                            })
                        }
                    </TableBody>
                    </Table>
                </div>
                <h4>Add a new office/factory</h4>
                <input ref="new_office_name" type="text" placeholder="Enter name"/>
               
                <button onClick={this.postOffice}>Add</button>
                <br/>
                <br/>
                </div>    
                <br/>    
                <div className={detailsVisibility}>
                <a name="factoryDetails"/>
                <Table>
                    
                                    <TableBody>
                                    <TableRow>
                            <TableCell>Office id:</TableCell>
                     <TableCell><input ref="table_office_id" type="text"  disabled/></TableCell></TableRow>
                     <TableRow>
                     <TableCell>
                    Name:</TableCell><TableCell><input ref="table_office_name"/></TableCell></TableRow>
                     <TableRow><TableCell>
                     Corporation name: </TableCell><TableCell><input ref="table_corporation_name" disabled/></TableCell></TableRow>
                     <TableRow><TableCell>
                     Corporation id: </TableCell><TableCell><input ref="table_corporation_id" disabled/></TableCell></TableRow>
                     
                     <TableRow><TableCell><button onClick={this.updateButtonPressed}>Update</button></TableCell>
                     <TableCell><button onClick={this.deleteItem}>Delete</button><Button onClick={this.showJoins}>Show joins</Button></TableCell></TableRow>
                                 
                         
                         
                         </TableBody>
                    
                    
                    
                    </Table>
                </div>
                <br/>            
            </div>            
        )
    }

}

export default OfficesLocal;