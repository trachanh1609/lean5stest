import React from 'react';
import { Link } from 'react-router';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';


function AdminPanel() {
  return (
    <header>
      <AppBar position="absolute">
                <Toolbar>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
             
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="title" color="inherit" noWrap>
              Lean 5S (Administration panel)
            </Typography>
            
            <nav>
        <ul>
          <li>
            <Link to="/administration_local" className="whiteText">Corporations</Link>
          </li>
          <li>
            <Link to="/administration_local/offices" className="whiteText">Factories</Link>
          </li>
          <li>
            <Link to="/administration_local/targets" className="whiteText">Targets</Link>
          </li>
          <li>
            <Link to="/administration_local/questions" className="whiteText">Questions</Link>
          </li>
          <li>
            <Link to="/administration_local/audit_cases" className="whiteText">Audits</Link>
          </li>
          <li>
            <Link to="/administration/report" className="whiteText">Report</Link>
          </li>
          <li>
            <Link to="/audit" className="whiteText">Demo</Link>
          </li>
          
        </ul>
      </nav>
          </Toolbar>
                </AppBar>
      
    </header>
  )
}

export default AdminPanel;