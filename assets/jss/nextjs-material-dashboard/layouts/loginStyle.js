import {
  transition,
  container,
} from "assets/jss/nextjs-material-dashboard.js";

const appStyle = (theme) => ({
  wrapper: {
    position: "relative",
    top: "0",
    height: "100vh",
    marginRight: "5px"
  },
  mainPanel: {
    [theme.breakpoints.up("md")]: {
      width: "auto",
    },
    overflow: "auto",
    position: "relative",
    float: "right",
    ...transition,
    maxHeight: "100%",
    width: "100%",
    overflowScrolling: "touch",
  },
  content: {
    marginTop: "40px",
    padding: "0px 85px",
    minHeight: "calc(100vh - 123px)"
  },
  container,
  map: {
    marginTop: "70px",
  },
});

export default appStyle;
