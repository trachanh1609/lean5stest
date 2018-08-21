import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

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
  });

class MainContent extends React.Component {



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
                                <Typography variant="title" color="inherit" >
                                    Select Button
                                </Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography variant="title" color="inherit" >
                                    Select Button
                                </Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography variant="title" color="inherit" >
                                    Select Button
                                </Typography>
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