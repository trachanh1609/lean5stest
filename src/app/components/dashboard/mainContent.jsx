import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';

const styles = theme => ({
    root: {
      padding: 20,
    },
    paper: {
        // alignItems: 'stretch',
    },
    filler: {
        flexGrow: 1,

    },
    filterContainer: {
        paddingTop: 20,
        paddingBottom: 20,
        paddingLeft: '15%',
        paddingRight: '15%',
    },
    tableContainer: {
        padding: 20,
    },
    formControl:{
        minWidth: 120,
    },
    form:{
        display: 'flex',
        flexWrap: 'wrap',
    }
  });

class MainContent extends React.Component {

    constructor(props){
        super(props);
        this.state= {
            company: '',
            location: '',
            year: '',
        }
    }

    handleSelectionChange = event => {
        this.setState({ [event.target.name]: event.target.value }, ()=>{
                console.log(this.state)
            });
      };

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <Paper className={classes.paper} elevation={3} square={true}>
                    <Toolbar>
                        <Typography variant="title" color="inherit" >
                            5S Raportti
                        </Typography>
                        <div className={classes.filler} />
                        <Button color="inherit" variant="outlined">Eksportoi Raportti</Button>
                    </Toolbar>
                    <Divider/>
                    <div className={classes.filterContainer}>
                        <Grid container>
                            <Grid item xs={4}>
                                <form className={classes.form} autoComplete="off">
                                    <FormControl className={classes.formControl}>
                                        <InputLabel htmlFor="company-selection">Yhtiö</InputLabel>
                                        <Select
                                            value={this.state.company}
                                            onChange={this.handleSelectionChange}
                                            inputProps={{
                                                name: 'company',
                                                id: 'company-selection',
                                            }}
                                            
                                        >
                                            <MenuItem value="">
                                                <em>None</em>
                                            </MenuItem>
                                            <MenuItem value={'Yahoo'}>Yahoo</MenuItem>
                                            <MenuItem value={'Google'}>Google</MenuItem>
                                            <MenuItem value={'Faceboo'}>Facebook</MenuItem>
                                        </Select>
                                    </FormControl>
                                </form>
                            </Grid>
                            <Grid item xs={4}>
                            <form className={classes.form} autoComplete="off">
                                    <FormControl className={classes.formControl}>
                                        <InputLabel htmlFor="location-selection">Toimipiste</InputLabel>
                                        <Select
                                            value={this.state.location}
                                            onChange={this.handleSelectionChange}
                                            inputProps={{
                                                name: 'location',
                                                id: 'location-selection',
                                            }}
                                            
                                        >
                                            <MenuItem value="">
                                                <em>None</em>
                                            </MenuItem>
                                            <MenuItem value={'Helsinki'}>Helsinki</MenuItem>
                                            <MenuItem value={'Espoo'}>Espoo</MenuItem>
                                            <MenuItem value={'Vantaa'}>Vantaa</MenuItem>
                                        </Select>
                                    </FormControl>
                                </form>
                            </Grid>
                            <Grid item xs={4}>
                                <form className={classes.form} autoComplete="off">
                                    <FormControl className={classes.formControl}>
                                        <InputLabel htmlFor="year-selection">Vuosi</InputLabel>
                                        <Select
                                            value={this.state.year}
                                            onChange={this.handleSelectionChange}
                                            inputProps={{
                                                name: 'year',
                                                id: 'year-selection',
                                            }}
                                            
                                        >
                                            <MenuItem value="">
                                                <em>None</em>
                                            </MenuItem>
                                            <MenuItem value={2018}>2018</MenuItem>
                                            <MenuItem value={2017}>2017</MenuItem>
                                            <MenuItem value={2016}>2016</MenuItem>
                                        </Select>
                                    </FormControl>
                                </form>
                            </Grid>
                        </Grid>
                    </div>
                    <div className={classes.tableContainer}>
                        <Paper className={classes.paper} elevation={3} square={true}>
                            <Typography variant="title" color="inherit" >
                                Data Table
                            </Typography>
                        </Paper>
                    </div>
                </Paper>
            </div>
        )
    } 
};

MainContent.propTypes = {
    classes: PropTypes.object.isRequired,
};
  
export default withStyles(styles)(MainContent);