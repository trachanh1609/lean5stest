import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: 0,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  tableCell: {
    textAlign: 'center',
  }
});

let id = 0;
function createData(name, Tammi, Helmi, Maalis, Huhti, Touko, Kesä, Heinä, Elo, Syys, Loka, Marras, Joulu) {
  id += 1;
  return { id, name, Tammi, Helmi, Maalis, Huhti, Touko, Kesä, Heinä, Elo, Syys, Loka, Marras, Joulu };
}



const rows = [
  createData('Kaikki', 159, 6.0, 24, 4.0, 159, 6.0, 24, 4.0, 159, 6.0, 24, 4.0),
  createData('Kuorimo', 237, 9.0, 37, 4.3, 159, 6.0, 24, 4.0, 159, 6.0, 24, 4.0),
  createData('Vilupinkkari', 262, 16.0, 24, 6.0, 159, 6.0, 24, 4.0, 159, 6.0, 24, 4.0),
  createData('Kuivaja', 305, 3.7, 67, 4.3, 159, 6.0, 24, 4.0, 159, 6.0, 24, 4.0),
  createData('Saumaus', 356, 16.0, 49, 3.9, 159, 6.0, 24, 4.0, 159, 6.0, 24, 4.0),
];


function DataTable(props) {
  const { classes } = props;

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow selected = {true}>
            <TableCell>Kohde</TableCell>
            <TableCell className={classes.tableCell} padding='none' numeric>Tammi</TableCell>
            <TableCell className={classes.tableCell} padding='none' numeric>Helmi</TableCell>
            <TableCell className={classes.tableCell} padding='none' numeric>Maalis</TableCell>
            <TableCell className={classes.tableCell} padding='none' numeric>Huhti</TableCell>
            <TableCell className={classes.tableCell} padding='none' numeric>Touko</TableCell>
            <TableCell className={classes.tableCell} padding='none' numeric>Kesä</TableCell>
            <TableCell className={classes.tableCell} padding='none' numeric>Heinä</TableCell>
            <TableCell className={classes.tableCell} padding='none' numeric>Elo</TableCell>
            <TableCell className={classes.tableCell} padding='none' numeric>Syys</TableCell>
            <TableCell className={classes.tableCell} padding='none' numeric>Loka</TableCell>
            <TableCell className={classes.tableCell} padding='none' numeric>Marras</TableCell>
            <TableCell className={classes.tableCell} padding='none' numeric>Joulu</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => {
            return (
              <TableRow key={row.id} hover={true}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell className={classes.tableCell} padding='none' numeric>{row.Tammi}</TableCell>
                <TableCell className={classes.tableCell} padding='none' numeric>{row.Helmi}</TableCell>
                <TableCell className={classes.tableCell} padding='none' numeric>{row.Maalis}</TableCell>
                <TableCell className={classes.tableCell} padding='none' numeric>{row.Huhti}</TableCell>
                <TableCell className={classes.tableCell} padding='none' numeric>{row.Touko}</TableCell>
                <TableCell className={classes.tableCell} padding='none' numeric>{row.Kesä}</TableCell>
                <TableCell className={classes.tableCell} padding='none' numeric>{row.Heinä}</TableCell>
                <TableCell className={classes.tableCell} padding='none' numeric>{row.Elo}</TableCell>
                <TableCell className={classes.tableCell} padding='none' numeric>{row.Syys}</TableCell>
                <TableCell className={classes.tableCell} padding='none' numeric>{row.Loka}</TableCell>
                <TableCell className={classes.tableCell} padding='none' numeric>{row.Marras}</TableCell>
                <TableCell className={classes.tableCell} padding='none' numeric>{row.Joulu}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  );
}

DataTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DataTable);