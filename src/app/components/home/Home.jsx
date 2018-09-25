import React from 'react';
import Header from '../common/Header';

function buttonPressed () {
  alert(document.cookie);
}


function Home() {
  return (
    <div className="container">
      <Header />
      <a href="../Testcsv">Test csv</a>
      <br/>
      <a href="../reduxtest">Redux</a>
      <br/>
      <a href="../audit">Audit</a>
      <br/>
      <button onClick={buttonPressed}>Alert cookie</button>
    </div>
  )
}

export default Home;