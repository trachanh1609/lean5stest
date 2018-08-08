import React from 'react';

// function Test() {
//   return (
//     <div className="container test">
//       <h1>SQL database</h1>
//       <a href="/api/corporations">The list of corporations</a>
//       <br/>
//       <a href="/api/cities">Cities of Metsä Group</a>
//       <br/>
//       <a href="/api/rooms">Rooms in Äänekoski</a>
//       <br/>
//       <a href="/api/add_question">Add question</a>
//       <h1>Azure Cosmos DB</h1>
//       <br/>
//       <a href="/api/reports">All data</a>
//     </div>
//   )
// }

class Test extends React.Component{

  constructor(props){
    super(props);
    this.state= {
      reports: []
    };
}

  componentDidMount(){
  }

  // async/await not working until babel is configured
  // https://stackoverflow.com/questions/33527653/babel-6-regeneratorruntime-is-not-defined
  // async getReports() {
  //   let url = "http://localhost:3000/api/reports/";
  //   let response = await fetch(url);
  //   let json = response.json();
  //   console.log(json);
  //   console.log('getReports running');
  // }

  getReports= ()=>{
    var self = this;
    let url = "http://localhost:3000/api/reports/";
    fetch(url)
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      // console.log(json);
      self.setState({reports: json});
    })
    .catch(function(err){
      console.error(err)
    });

    console.log('getReports running');
  }


  render () {
    return (
      <div className="container test">
        <h1>SQL database</h1>
        <a href="/api/corporations">The list of corporations</a>
        <br/>
        <a href="/api/cities">Cities of Metsä Group</a>
        <br/>
        <a href="/api/rooms">Rooms in Äänekoski</a>
        <br/>
        <a href="/api/add_question">Add question</a>
        <h1>Azure Cosmos DB</h1>
        <br/>
        <a href="/api/reports">API/reports</a>
        <br/>
        <button onClick={this.getReports}>Test Button</button>
        <ul>
          {
            this.state.reports.map(report=>{
            return (<li key={report.id}>{report.name}</li>)
            })
          }
        </ul>
        <a href="/api/testDB/corporations">Corporations</a>
        <br/>
        <a href="/api/testDB/offices">All offices</a>
      </div>
    )
  }
}

export default Test;
