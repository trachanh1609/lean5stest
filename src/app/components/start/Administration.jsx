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
                <h1>Administration</h1>
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
                    <h4>Add a new corporation</h4>
              <form method="POST" action={API_URL+"/api/testDB/new_corporation/"}>
                  <input type="text" name="corporation_name" placeholder="Enter corporation name"/>
                  <button type="submit">Add</button>
              </form>
            </div>
          )
    }
    
  }

export default Administration;