import React from 'react';

function Test() {
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
      <a href="/api/reports">All data</a>
    </div>
  )
}

export default Test;
