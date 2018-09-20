import React from 'react';
import Header from '../common/Header';

function Home() {
  return (
    <div className="container">
      <Header />
      <a href="../Testcsv">Test csv</a>
      <br/>
      <a href="../reduxtest">Redux</a>
      <br/>
      <a href="../audit">Audit</a>
    </div>
  )
}

export default Home;