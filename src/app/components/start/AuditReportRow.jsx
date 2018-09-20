import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';

import TableRow from '@material-ui/core/TableRow';

const mapStateToProps = state => {
  return { audits: state.audits };
};

const ConnectedRows = ({ audits }) => (
    <TableBody>
      {audits.map(audit => (
        <TableRow>
            <TableCell>{audit.id}</TableCell>
            <TableCell>{audit.date}</TableCell>
            <TableCell>{audit.auditor}</TableCell>
            <TableCell>{audit.target_id}</TableCell>
            <TableCell>{audit.office_id}</TableCell>
            <TableCell>{audit.corporation_id}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  );

  const AuditReportRow = connect(mapStateToProps)(ConnectedRows);

  ConnectedRows.propTypes = {
      audits: PropTypes.array.isRequired
  };

  export default AuditReportRow;