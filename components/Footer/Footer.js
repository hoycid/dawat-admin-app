/*eslint-disable*/
import React from "react";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";

// core components
import styles from "assets/jss/nextjs-material-dashboard/components/footerStyle.js";

import Link from "next/link";

export default function Footer(props) {
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  return (
    <footer className={classes.footer}>
      <div className={classes.container}>
        <div className={classes.left}>
          <List className={classes.list}>
            <ListItem className={classes.inlineBlock}>
              {/* <Link
                href="/admin/inbound"
                onClick={(e) => e.preventDefault()}
                className={classes.block}
              >
                Inbound Documents
              </Link>
              <Link
                href="/admin/outbound"
                onClick={(e) => e.preventDefault()}
                className={classes.block}
              >
                Outbound Documents
              </Link>
              <Link
                href="/admin/activity-log"
                onClick={(e) => e.preventDefault()}
                className={classes.block}
              >
                Activity Logs
              </Link>
              <Link
                href="/admin/user-profile"
                onClick={(e) => e.preventDefault()}
                className={classes.block}
              >
                User Profile
              </Link> */}
              <Link
                href="/admin/settings"
                onClick={(e) => e.preventDefault()}
                className={classes.block}
              >
                Settings
              </Link>
            </ListItem>
          </List>
        </div>
        <p className={classes.right}>
          <span>
            &copy; {1900 + new Date().getYear()} Provincial Agriculture Office
          </span>
        </p>
      </div>
    </footer>
  );
}
