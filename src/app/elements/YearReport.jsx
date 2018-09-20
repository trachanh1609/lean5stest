import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {CSVLink} from 'react-csv';
import Button from '@material-ui/core/Button';

var months = ['m01','m02','m03','m04','m05','m06','m07','m08','m09','m10','m11','m12'];
const mapStateToProps = (state) => {
    return {
       
        report: state.report,
        selectedYear: state.selectedYear,
        selectedCorporation: state.selectedCorporation,
        selectedFactory: state.selectedFactory,
        csvReport: state.csvReport
    }
};

class YearReport extends React.Component {
    constructor(props){
        super(props);
        
    }

    render() {
        if (this.props.report.length<1) {

            return(<div></div>)
        } else
        return(
            <Paper style={{padding: "50px", margin: "50px"}}>
                <div style={{textAlign: "left", textSize: "1.5em"}}>
                <br/>
                Year: {this.props.selectedYear}
                <br/>
                Corporation: {this.props.selectedCorporation.name}
                <br/>
                Factory: {this.props.selectedFactory.name}
                <br/>
                </div>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell style={{padding: "10px"}}>Target</TableCell>
                            <TableCell style={{padding: "10px"}}>January</TableCell>
                            <TableCell style={{padding: "10px"}}>February</TableCell>
                            <TableCell style={{padding: "10px"}}>March</TableCell>
                            <TableCell style={{padding: "10px"}}>April</TableCell>
                            <TableCell style={{padding: "10px"}}>May</TableCell>
                            <TableCell style={{padding: "10px"}}>June</TableCell>
                            <TableCell style={{padding: "10px"}}>July</TableCell>
                            <TableCell style={{padding: "10px"}}>August</TableCell>
                            <TableCell style={{padding: "10px"}}>September</TableCell>
                            <TableCell style={{padding: "10px"}}>October</TableCell>
                            <TableCell style={{padding: "10px"}}>November</TableCell>
                            <TableCell style={{padding: "10px"}}>December</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.props.report.map(row=>{
                            return (
                                <TableRow key={row.id} hover={true}>
                                    <TableCell component="th" scope="row">{row.target_name}</TableCell>
                                    {months.map(m=>(

                                        <TableCell style={{backgroundColor: row.data[m].color}}>{row.data[m].average_grade}</TableCell>
                                    ))}
                                    
                                    
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
                <br/>
                <br/>
                <CSVLink data={this.props.csvReport} separator={";"}>
                    <Button variant="contained" color="primary" size="small">
                        Download report 
                    </Button>
                </CSVLink>
            </Paper>
        )
    }
}

export default connect(mapStateToProps)(YearReport);