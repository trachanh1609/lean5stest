import React from 'react';
import { Link } from 'react-router';

function Panel() {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to="/administration_local">Corporations</Link>
          </li>
          <li>
            <Link to="/administration_local/offices">Factories</Link>
          </li>
          <li>
            <Link to="/administration_local/targets">Targets</Link>
          </li>
          <li>
            <Link to="/administration_local/questions">Questions</Link>
          </li>
          <li>
            <Link to="/administration_local/audit_cases">Audits</Link>
          </li>
          <li>
            <Link to="/start_local">Demo</Link>
          </li>
          
        </ul>
      </nav>
    </header>
  )
}

export default Panel;