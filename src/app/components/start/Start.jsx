import React from 'react';
const API_URL = "http://localhost:3000";

/*
const isProduction = process.env.NODE_ENV === 'production';
if(isProduction) {
  const API_URL = "http://localhost:3000";
} else {
  const API_URL = "http://localhost:3000";
}
*/

var corpId = "";
var officeId = "";
var targetId = "";


class Office extends React.Component {
  handleOfficeChange = () => {
    officeId = this.refs.office.value;
    this.props.getTargets();
    
    
  }
  
  render() {
    var offices = this.props.offices.map(office => {
      return (
        
        <option value={office.id}>{office.office_name}</option>
        
      );
    });
    return (
      <select ref="office" style={{width: "200px"}} onChange={this.handleOfficeChange}>
      <option>Toimipisete</option>
      {offices}
      </select>
    )
    
  }     
}

class Target extends React.Component {
  handleTargetChange = () => {
    targetId = this.refs.target.value;
  }  
  render() {
    var targets = this.props.targets.map(target => {
      return (
        
          <option value={target.id}>{target.target_name}</option>
        
      );
    });
    return (
      <select ref="target" onChange = {this.handleTargetChange} style={{width: "200px"}}>
      <option>Kohde</option>
      {targets}</select>
    )
    
  }     
}

class Demo extends React.Component{
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
  this.getTargets();

  
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

getOffices = () => {
  var self = this;
  let url = API_URL + "/api/testDB/offices/"+corpId;
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

  console.log('getOffice running');
}

getTargets = () => {
  var self = this;
  let url = API_URL + "/api/testDB/targets/"+officeId;
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

  console.log('getOffice running');
}


handleCorporationChange = () => {
  corpId = this.refs.corporation.value;
  this.getOffices();
  
}

submitButtonPressed = () => {
  alert("Here will be implemented POST method to create Audit_case with following details:\nCorporation: " + corpId + "\nOffice id: "+ officeId + "\nTarget id: "+targetId + "\nDate: "+this.refs.inputDate.value+"\nUser: "+this.refs.inputUser.value);
}

render() {
  return (
    <div>
      <h1>Demonstration version</h1>
      <form onSubmit={this.submitButtonPressed}>
      <table  style={{alignItems: 'center',display: 'flex',  justifyContent:'center'}}>
      <tbody>
        <tr>
          
          <td>
            <select ref="corporation" onChange={this.handleCorporationChange} style={{width: "200px"}}>
            <option>Yhtiö</option>
            {
              this.state.corporations.map(corporation=> {
                return(<option value={corporation.id}>{corporation.corporation_name}</option>)
              })
            }
            </select>
            
          </td>
        </tr>
        

        <tr>
          
          
          <td>
            
            <Office offices = {this.state.offices} getTargets = {this.getTargets}/>
            
          </td>
        </tr>

        <tr>
          
          
          <td>
            
            <Target targets = {this.state.targets}/>
            
          </td>
        </tr>
        <tr>
          
          
          <td>
            
            
            <input ref="inputDate" type="date" style={{width: "200px"}} required/>
          </td>
        </tr>
        <tr>
          
          
          <td>
            
            
            <input ref="inputUser" type="text" placeholder="user" style={{width: "200px"}} required/>
          </td>
        </tr>
        </tbody>
        
        </table>
        <button type="submit">Start</button>
        </form>
    </div>

  )
}

}
export default Demo;
