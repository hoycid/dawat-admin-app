import React from "react";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// layout for this page
import Admin from "layouts/Admin.js";

// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Snackbar from "components/Snackbar/Snackbar.js";

import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";

import moment from "moment";

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0",
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF",
    },
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1",
    },
  },
};

function ActivityLog() {
  const useStyles = makeStyles(styles);
  const classes = useStyles();

  const [data, setData] = React.useState([]);
  const [loadingData, setLoadingData] = React.useState(true);
  const [loadingDataFailed, setLoadingDataFailed] = React.useState(false);

  React.useEffect(() => {
    getData();

    const interval = setInterval(() => {
      getData();
    }, 10000);

    return function cleanup() {
      clearInterval(interval);

      // to stop the warning of calling setState of unmounted component
      var id = window.setTimeout(null, 0);
      while (id--) {
        window.clearTimeout(id);
      }
    };
  }, []);

  async function getData() {
    const response = await fetch("/api/log", {
      method: "GET",
      body: JSON.stringify(),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const res = await response.json();
    if (res.success) {
      setData(res.data);
    } else {
      showFailedNotification();
    }
  }

  const showFailedNotification = () => {
    if (!loadingDataFailed) {
      setLoadingDataFailed(true);
      setTimeout(function () {
        setLoadingDataFailed(false);
      }, 4000);
    }
  };

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Activity Log</h4>
              <p className={classes.cardCategoryWhite}>For the last 3 months</p>
            </CardHeader>
            <CardBody>
              <Table
                tableHeaderColor="primary"
                tableHead={[
                  "Category",
                  "ID",
                  "Type",
                  "Sender",
                  "Recipient",
                  "Description",
                  "Date",
                  "Reciever",
                ]}
                tableData={data.map(doc => [
                  doc.recipient ? "Outbound" : "Inbound",
                  doc._id,
                  doc.type,
                  doc.sender,
                  doc.recipient || "To Be Assigned",
                  doc.description || "No description",
                  moment(doc.date).format("MM/DD/YYYY, hh:mm A"),
                  doc.receiver,
                ])}
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
      <GridContainer justify={"center"}>
        <GridItem xs={12} sm={12} md={3}>
          <Snackbar
            place="br"
            color="danger"
            icon={ErrorOutlineIcon}
            message="Oops! An error occured while loading the activity log."
            open={loadingDataFailed}
            closeNotification={() => setLoadingDataFailed(false)}
            close
          />
        </GridItem>
      </GridContainer>
    </div>
  );
}

ActivityLog.layout = Admin;

export default ActivityLog;
