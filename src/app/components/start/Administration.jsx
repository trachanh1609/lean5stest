import React from 'react';
const API_URL = "http://localhost:3000";

var corpId = "-";
var officeId = "-";
var targetId = "-";



class Administration extends React.Component {
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
    }

    getCorporations = () => {
        var self = this;
        let url = API_URL + "/api/testDB/corporations";
        
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

    render() {
        return (
            <div className="container home">
                <h1>Administration panel</h1>
                <h3>List of corporations in database</h3>
                <div style={{alignItems: 'center',display: 'flex',  justifyContent:'center'}}>
                <table>
                    <th>
                        <td>id</td>
                        <td>name</td>
                        <td>options</td>
                    </th>
                    {
                        this.state.corporations.map(corporation=>{
                        return (<tr><td> {corporation.id}</td>
                        <td>{corporation.corporation_name}</td>
                        <td><form action={API_URL+"/api/testDB/delete/"+corporation.id} method="DELETE">
                        <input type="submit" value="-"/>
                        </form></td></tr>)
                        })
                    }
                    
                </table>
                </div>
                <div style={{alignItems: 'center',display: 'flex',  justifyContent:'center'}}>
                <h4>Add a new corporation</h4>
                <br/>
                <form method="POST" action={API_URL+"/api/testDB/new_corporation/"}>
                    <input type="text" name="corporation_name" placeholder="Enter corporation name"/>
                    <button type="submit">Add</button>
                </form>
                </div>
                <div style={{alignItems: 'center',display: 'flex',  justifyContent:'center'}}>
                <h3>Factories in database</h3>
                <br/>
                <select ref="corporation" name="corporation" onChange={this.handleCorporationChange} style={{width: "200px"}}>
                    <option value="all">All corporations</option>
                    {
                    this.state.corporations.map(corporation=> {
                        return(<option value={corporation.id}>{corporation.corporation_name}</option>)
                    })
                    }
            
                </select>
                <button onClick={this.showOffices}>Show</button>
                <br/>
                <br/>
                    <h4>Add a new factory</h4>
              <form method="POST" action={API_URL+"/api/testDB/new_office/"}>
                  <input type="text" name="office_name" placeholder="Enter factory name"/>
                  <button type="submit">Add</button>
              </form>
              </div>
            </div>
            
          )
    }
    
  }

export default Administration;