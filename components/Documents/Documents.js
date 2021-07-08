import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";

// @material-ui/icons
import Edit from "@material-ui/icons/Edit";
import Close from "@material-ui/icons/Close";

// core components
import styles from "assets/jss/nextjs-material-dashboard/components/tasksStyle.js";

export default function Documents(props) {
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const { indexes, dates, types, descriptions } = props;
  const tableCellClasses = classnames(classes.tableCell);

  return (
    <Table className={classes.table}>
      <TableBody>
        {indexes.map((value) => (
          <TableRow key={value} className={classes.tableRow}>
            <TableCell className={tableCellClasses}>{dates[value]}</TableCell>
            <TableCell className={tableCellClasses}>{types[value]}</TableCell>
            <TableCell className={tableCellClasses}>
              {descriptions[value]}
            </TableCell>
            <TableCell className={classes.tableActions}>
              <Tooltip
                id="tooltip-top"
                title="Edit Task"
                placement="top"
                classes={{ tooltip: classes.tooltip }}
              >
                <IconButton
                  aria-label="Edit"
                  className={classes.tableActionButton}
                >
                  <Edit
                    className={
                      classes.tableActionButtonIcon + " " + classes.edit
                    }
                  />
                </IconButton>
              </Tooltip>
              <Tooltip
                id="tooltip-top-start"
                title="Remove"
                placement="top"
                classes={{ tooltip: classes.tooltip }}
              >
                <IconButton
                  aria-label="Close"
                  className={classes.tableActionButton}
                >
                  <Close
                    className={
                      classes.tableActionButtonIcon + " " + classes.close
                    }
                  />
                </IconButton>
              </Tooltip>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

Documents.propTypes = {
  indexes: PropTypes.arrayOf(PropTypes.number),
  dates: PropTypes.arrayOf(PropTypes.string),
  types: PropTypes.arrayOf(PropTypes.string),
  descriptions: PropTypes.arrayOf(PropTypes.string),
};
