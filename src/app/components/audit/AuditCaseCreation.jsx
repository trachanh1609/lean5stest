import React from 'react';
import UserPanel from '../../elements/UserPanel';
import SelectFactories from '../../elements/SelectFactories';
import SelectTargets from '../../elements/SelectTargets';
import SelectCorporations from '../../elements/SelectCorporations';
import SelectDate from '../../elements/SelectDate';
import UserName from '../../elements/UserName';
import { Link } from 'react-router';

import Button from '@material-ui/core/Button';

class AuditCaseCreation extends React.Component {
    constructor(props) {
        super(props);
    }
    startAudit = () => {
       
    }

    refreshClicked = () => {
        let link = "..\\audit";
        location.href=link;
        
    }

    render() {
        return (
            
            <div className="container home">
            <UserPanel/>
                <br/>
                <h1>Demonstration version (Redux store is used)</h1>
                <Button onClick={this.refreshClicked} variant="outlined" size="small" color="primary">Refresh</Button>
                <div className="bordered center details" style={{width: "300px"}}>

                    <table>
                        <tbody>
                            <tr>
                                <td>
                                    <SelectCorporations/>
                                </td>
                            </tr>
                            
                            <tr>
                                <td>
                                    <SelectFactories/>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <SelectTargets/>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <SelectDate/>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <UserName/>
                                    
                                </td>
                            </tr>
                            <tr>
                            
                        </tr>
                        </tbody>
                    </table>
                    <br/>
                    
                    <Link to="/audit_questions" style={{ textDecoration: 'none' }}><Button variant="contained" color="secondary" size="small" onClick={this.startAudit}>Start audit</Button></Link>
                    
                </div>
                
            </div>
        )
    }
}

export default AuditCaseCreation;