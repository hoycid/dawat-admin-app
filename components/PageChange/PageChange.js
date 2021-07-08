import React from "react";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

// core components
import { infoColor, title } from "assets/jss/nextjs-material-dashboard.js";

const styles = {
  progress: {
    color: infoColor,
    width: "6rem !important",
    height: "6rem !important",
  },
  wrapperDiv: {
    margin: "100px auto",
    padding: "0px",
    maxWidth: "360px",
    textAlign: "center",
    position: "relative",
    zIndex: "9999",
    top: "0",
  },
  iconWrapper: {
    display: "block",
  },
  title: {
    ...title,
    color: "#FFFFFF",
  },
};

export default function PageChange(props) {
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const path = props.path;
  return (
    <div>
      <div className={classes.wrapperDiv}>
        <div className={classes.iconWrapper}>
          <CircularProgress className={classes.progress} />
        </div>
        <h4 className={classes.title}>
          LOADING
          <p>
            {
              path === "/admin/dashboard" ? "Dashboard" :
              path === "/admin/activity-log" ? "Activity Log" :
              path === "/admin/user-profile" ? "User Profile" :
              path === "/admin/inbound" ? "Inbound Documents" :
              path === "/admin/outbound" ? "Outbound Documents" :
              path === "/admin/settings" ? "Settings" :
              path === "/admin/inbound-sent" ? "Submitting Document" :
              path === "/admin/loading-dashboard-data" ? "Dashboard data" : ""
            }
          </p>
        </h4>
      </div>
    </div>
  );
}