import React from 'react';
import { connect } from 'react-redux';
import AdminPanel from '../../elements/AdminPanel';
import SelectFactories from '../../elements/SelectFactories';
import SelectCorporations from '../../elements/SelectCorporations';
import SelectYear from '../../elements/SelectYear';
import YearReport from '../../elements/YearReport';
import { addAuditReport, clearAuditReport, updateReport, clearReport, setCSVArray } from "../../actions/index";
import {API_URL} from "../../constants/urls";
import classNames from 'classnames';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Button from '@material-ui/core/Button';


const mapStateToProps = (state) => {
    return {
        selectedFactory: state.selectedFactory,
        selectedYear: state.selectedYear,
        report: state.report,
        audits: state.audits
    }
};

const mapDispatchToProps = dispatch => {
    return {
      addAuditReport: audits => dispatch(addAuditReport(audits)),
      clearAuditReport: audits => dispatch(clearAuditReport(audits)),
      updateReport: report => dispatch(updateReport(report)),
      clearReport: report => dispatch(clearReport(report)),
      setCSVArray: csvReport => dispatch(setCSVArray(csvReport))
    };
};

class Report extends React.Component {
    constructor(props){
        super(props);
        this.state={
            audit_cases: [],
            open: false
        }
    }

    componentDidMount() {
        this.getAuditCases();
    }
    componentWillUnmount() {
        this.props.clearAuditReport();
    }

    getAuditCases = () => {
        var self = this;
        let url = API_URL + "?type=Audit_case";
        fetch(url)
        .then(function(response) {
          return response.json();
        })
        .then(function(json){
            self.setState({audit_cases: json});
        })
        .catch(function(err){
          console.error(err)
        });
    }

    loadYearReport = () => {
        
        if (this.props.selectedFactory.id == "") alert("Choose the factory first");
        else {
            this.props.clearAuditReport();
            this.state.audit_cases.map(audit=>{
                if ((audit.date.includes(this.props.selectedYear,0)) && (audit.office_id == this.props.selectedFactory.id) && (audit.stage == "ready")){

                    this.props.addAuditReport({
                        id:audit.id,
                        date: audit.date,
                        target_id:audit.target_id,
                        target_name:audit.target_name,
                        average_grade:audit.average_grade,
                        office_name:audit.office_name,
                        average_grade: audit.average_grade
                    });
                    
                }
            });
        }

    setTimeout(function() {this.tableGeneration()}.bind(this),500) ;

    }

    tableGeneration = () => {
        var table = [];
        this.props.audits.map(audit=>{

            var found = false;
            var month = "m"+audit.date.substr(5,2);
            var data = {
                m01 : {sum:0, col:0},
                m02 : {sum:0, col:0},
                m03 : {sum:0, col:0},
                m04 : {sum:0, col:0},
                m05 : {sum:0, col:0},
                m06 : {sum:0, col:0},
                m07 : {sum:0, col:0},
                m08 : {sum:0, col:0},
                m09 : {sum:0, col:0},
                m10 : {sum:0, col:0},
                m11 : {sum:0, col:0},
                m12 : {sum:0, col:0}
            };
            // check, is the target already in the table?

            for (var i=0; i < table.length; i++) {
                if (table[i].target_id == audit.target_id) {
                    found = true;
                    table[i].data[month].col++;
                    table[i].data[month].sum += audit.average_grade;
                    var col = table[i].data[month].col;
                    var sum = table[i].data[month].sum;
                    table[i].data[month].average_grade = parseInt(sum / col);
                    var av_grade = table[i].data[month].average_grade;
                    table[i].data[month].color = this.getColor(av_grade);
                    break;
                }
            }
            if (!found) {
                data[month]={sum:audit.average_grade, col:1, average_grade:audit.average_grade, color:this.getColor(audit.average_grade)};
                table.push({target_id: audit.target_id, target_name: audit.target_name, data: data});
            }
        });
        const payload = table;
        
        this.props.updateReport(payload);
        console.log(this.props.report);
        this.prepareCSV(table);
    }
    prepareCSV = (table) => {
        var array = [];
        table.map(row=>{
            array.push({
                "Target":row.target_name,
                "January":row.data.m01.average_grade,
                "February":row.data.m02.average_grade,
                "March":row.data.m03.average_grade,
                "April":row.data.m04.average_grade,
                "May":row.data.m05.average_grade,
                "June":row.data.m06.average_grade,
                "July":row.data.m07.average_grade,
                "August":row.data.m08.average_grade,
                "September":row.data.m09.average_grade,
                "October":row.data.m10.average_grade,
                "November":row.data.m11.average_grade,
                "December":row.data.m12.average_grade
            });
        });
        const payload = array;
        this.props.setCSVArray(payload);
        console.log(payload);

    }
    getColor = (grade) => {
        var av_grade = parseInt(grade);
        if ((av_grade >= 60 )&&(av_grade < 80 ))
            return "#B2FF66";
        else if (av_grade >= 80 )
            return "#00CC00";
        else return "#F0F0F0";
    }
    handleDrawerOpen = () => {
        this.setState({ open: true });
      };
    
      handleDrawerClose = () => {
        this.setState({ open: false });
      };
      onUpdateUser() {
        //this.props.onUpdateUser('Sammy');
      }
      onFetchPosts = () => {
        //this.props.onApiRequest();
      }

    render() {
        
        return(
            <div>
                
            <AdminPanel/>
            <br/>
            <br/>
            <br/>
            <h1>Annual report</h1>
                <div className="bordered report" style={{width: "95%", margin: "auto"}}>
                <table>
                    <tbody>
                        <tr>
                            <td style={{padding: "20px"}}> <SelectYear/> </td>
                            <td style={{padding: "20px"}}> <SelectCorporations/> </td>
                            <td style={{padding: "20px"}}> <SelectFactories/> </td>
                        </tr>
                    </tbody>
                </table>
                    
                    <br/>
                    <Button onClick={this.loadYearReport} variant="outlined" color="primary">Load report</Button>
                
                    <YearReport/>
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Report);