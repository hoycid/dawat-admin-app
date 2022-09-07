import React from "react";
// react plugin for creating charts
// import ChartistGraph from "react-chartist";

// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";

// @material-ui/icons
import AssignmentReturnedRoundedIcon from "@material-ui/icons/AssignmentReturnedRounded";
import ExitToAppTwoToneIcon from "@material-ui/icons/ExitToAppTwoTone";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import DoneOutlineIcon from "@material-ui/icons/DoneOutline";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import DateRange from "@material-ui/icons/DateRange";

// layout for this page
import Admin from "layouts/Admin.js";

// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Documents from "components/Documents/Documents.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import Danger from "components/Typography/Danger.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import Snackbar from "components/Snackbar/Snackbar.js";

import Link from "next/link";
import moment from "moment";

import { server, serverIdArr } from "variables/general.js";

// import {
//   dailySalesChart,
//   emailsSubscriptionChart,
//   completedTasksChart,
// } from "variables/charts.js";

import styles from "assets/jss/nextjs-material-dashboard/views/dashboardStyle.js";

function Dashboard() {
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const [inboundDocs, setInboundDocs] = React.useState([]);
  const [outboundDocs, setOutboundDocs] = React.useState([]);
  const [documentTypes, setDocumentTypes] = React.useState([]);

  const [loadingData, setLoadingData] = React.useState(true);
  const [loadingInboundsFailed, setLoadingInboundsFailed] =
    React.useState(false);

  React.useEffect(() => {
    getData();
    const interval = setInterval(() => {
      getData();
      console.log("Refreshing");
    }, 10000);

    return function cleanup() {
      clearInterval(interval);

      // to stop the warning of calling setState of unmounted component
      var id = window.setTimeout(null, 0);
      while (id--) {
        window.clearTimeout(id);
      }
    };
  }, [loadingData]);

  async function getData() {
    // inbounds fetch
    const getInboundFetchResponse = await fetch("/api/inbound", {
      method: "GET",
      body: JSON.stringify(),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const getInboundResponse = await getInboundFetchResponse.json();
    if (getInboundResponse.success) {
      setInboundDocs(getInboundResponse.data);
    } else {
      showNotification("loadingInboundsFailed");
    }

    //outbounds fetch
    const getOutboundFetchResponse = await fetch("/api/outbound", {
      method: "GET",
      body: JSON.stringify(),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const getOutboundResponse = await getOutboundFetchResponse.json();
    if (getOutboundResponse.success) {
      setOutboundDocs(getOutboundResponse.data);
    } else {
      showNotification("loadingOutboundsFailed");
    }

    const getDocumentTypesFetchResponse = await fetch("/api/types", {
      method: "GET",
      body: JSON.stringify(),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const getDocumentTypesResponse = await getDocumentTypesFetchResponse.json();
    if (getDocumentTypesResponse.success) {
      setDocumentTypes(getDocumentTypesResponse.data);
      setLoadingData(false);
    }
  }

  const showNotification = type => {
    switch (type) {
      case "loadingInboundsFailed":
        if (!loadingInboundsFailed) {
          setLoadingInboundsFailed(true);
          setTimeout(function () {
            setLoadingInboundsFailed(false);
          }, 4000);
        }
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={6} md={6}>
          <Card>
            <CardHeader color="warning" stats icon>
              <CardIcon color="warning">
                <AssignmentReturnedRoundedIcon />
              </CardIcon>
              <p className={classes.cardCategory}>INBOUND DOCUMENTS</p>
              <h3 className={classes.cardTitle}>
                {inboundDocs.length > 0 ? inboundDocs.length : "0"}
              </h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <div>
                  <HelpOutlineIcon />
                  Shown is the total pending inbound documents.
                </div>
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={6}>
          <Card>
            <CardHeader color="danger" stats icon>
              <CardIcon color="danger">
                <ExitToAppTwoToneIcon />
              </CardIcon>
              <p className={classes.cardCategory}>OUTBOUND DOCUMENTS</p>
              <h3 className={classes.cardTitle}>
                {outboundDocs.filter(
                  doc =>
                    moment(doc.date).format("MM/DD/YYYY") ===
                    moment().format("MM/DD/YYYY")
                ).length > 0
                  ? outboundDocs.filter(
                      doc =>
                        moment(doc.date).format("MM/DD/YYYY") ===
                        moment().format("MM/DD/YYYY")
                    ).length
                  : "0"}{" "}
                <small>out of</small>{" "}
                {outboundDocs.length > 0 ? outboundDocs.length : "0"}
              </h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <div>
                  <HelpOutlineIcon />
                  Shown is the total processed outbound documents in the span of
                  3 weeks compared to the overall total outbound documents
                  recieved in the last 3 months.
                </div>
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
      <GridContainer>
        {documentTypes
          ? documentTypes.map((type, index) => {
              return (
                <GridItem xs={12} sm={6} md={4} key={index}>
                  <Card>
                    <CardHeader icon>
                      <CardIcon color={type.color}>
                        {typeof type.icon === "string" ? (
                          <Icon>{type.icon}</Icon>
                        ) : (
                          <type.icon />
                        )}
                      </CardIcon>
                      <p className={classes.cardCategory}>{type.name}</p>
                      <h3 className={classes.cardTitle}>
                        {type.name === "Provincial Memo"
                          ? inboundDocs.filter(
                              doc => doc.type === "Provincial Memo"
                            ).length
                          : type.name === "Office Memo"
                          ? inboundDocs.filter(
                              doc => doc.type === "Office Memo"
                            ).length
                          : type.name === "Endorsement"
                          ? inboundDocs.filter(
                              doc => doc.type === "Endorsement"
                            ).length
                          : type.name === "Meeting/Workshop/Seminar"
                          ? inboundDocs.filter(
                              doc => doc.type === "Meeting/Workshop/Seminar"
                            ).length
                          : type.name === "Business Correspondence"
                          ? inboundDocs.filter(
                              doc => doc.type === "Business Correspondence"
                            ).length
                          : type.name === "Private Business Correspondence"
                          ? inboundDocs.filter(
                              doc =>
                                doc.type === "Private Business Correspondence"
                            ).length
                          : type.name === "Request"
                          ? inboundDocs.filter(doc => doc.type === "Request")
                              .length
                          : ""}
                      </h3>
                    </CardHeader>
                    <CardFooter stats>
                      <div className={classes.stats}>
                        <DateRange />
                        {type.name === "Provincial Memo"
                          ? inboundDocs.filter(
                              doc => doc.type === "Provincial Memo"
                            ).length > 0
                            ? moment(
                                inboundDocs.filter(
                                  doc => doc.type === "Provincial Memo"
                                )[0].date
                              ).fromNow()
                            : "No recent documents"
                          : type.name === "Office Memo"
                          ? inboundDocs.filter(
                              doc => doc.type === "Office Memo"
                            ).length > 0
                            ? moment(
                                inboundDocs.filter(
                                  doc => doc.type === "Office Memo"
                                )[0].date
                              ).fromNow()
                            : "No recent documents"
                          : type.name === "Endorsement"
                          ? inboundDocs.filter(
                              doc => doc.type === "Endorsement"
                            ).length > 0
                            ? moment(
                                inboundDocs.filter(
                                  doc => doc.type === "Endorsement"
                                )[0].date
                              ).fromNow()
                            : "No recent documents"
                          : type.name === "Meeting/Workshop/Seminar"
                          ? inboundDocs.filter(
                              doc => doc.type === "Meeting/Workshop/Seminar"
                            ).length > 0
                            ? moment(
                                inboundDocs.filter(
                                  doc => doc.type === "Meeting/Workshop/Seminar"
                                )[0].date
                              ).fromNow()
                            : "No recent documents"
                          : type.name === "Business Correspondence"
                          ? inboundDocs.filter(
                              doc => doc.type === "Business Correspondence"
                            ).length > 0
                            ? moment(
                                inboundDocs.filter(
                                  doc => doc.type === "Business Correspondence"
                                )[0].date
                              ).fromNow()
                            : "No recent documents"
                          : type.name === "Private Business Correspondence"
                          ? inboundDocs.filter(
                              doc =>
                                doc.type === "Private Business Correspondence"
                            ).length > 0
                            ? moment(
                                privateBusinessCorrespondence[0].date
                              ).fromNow()
                            : "No recent documents"
                          : type.name === "Request"
                          ? inboundDocs.filter(doc => doc.type === "Request")
                              .length > 0
                            ? moment(
                                inboundDocs.filter(
                                  doc => doc.type === "Request"
                                )[0].date
                              ).fromNow()
                            : "No recent documents"
                          : "0"}
                      </div>
                    </CardFooter>
                  </Card>
                </GridItem>
              );
            })
          : ""}
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <CustomTabs
            title="Activity Feed:"
            headerColor="dark"
            tabs={[
              {
                tabName: "IN",
                tabIcon: AssignmentReturnedRoundedIcon,
                tabContent: (
                  <Documents
                    indexes={inboundDocs.map((doc, index) => index)}
                    dates={inboundDocs.map(doc => moment(doc.date).fromNow())}
                    id={inboundDocs.map(doc => doc._id)}
                    senders={inboundDocs.map(doc => doc.sender)}
                    types={inboundDocs.map(doc => doc.type)}
                    descriptions={inboundDocs.map(doc =>
                      doc.description ? doc.description : "No description"
                    )}
                    receivers={inboundDocs.map(doc => doc.receiver)}
                  />
                ),
              },
              {
                tabName: "OUT",
                tabIcon: ExitToAppTwoToneIcon,
                tabContent: (
                  <Documents
                    indexes={outboundDocs.map((doc, index) => index)}
                    dates={outboundDocs.map(doc => moment(doc.date).fromNow())}
                    id={outboundDocs.map(doc => doc._id)}
                    senders={outboundDocs.map(doc => doc.sender)}
                    types={outboundDocs.map(doc => doc.type)}
                    descriptions={outboundDocs.map(doc =>
                      doc.description ? doc.description : "No description"
                    )}
                    receivers={outboundDocs.map(doc => doc.receiver)}
                  />
                ),
              },
            ]}
          />
        </GridItem>
        <GridContainer justify={"center"}>
          <GridItem xs={12} sm={12} md={3}>
            <Snackbar
              place="br"
              color="danger"
              icon={ErrorOutlineIcon}
              message="Oops! There was an error while fetching inbound documents."
              open={loadingInboundsFailed}
              closeNotification={() => setLoadingInboundsFailed(false)}
              close
            />
          </GridItem>
        </GridContainer>
      </GridContainer>
    </div>
  );
}

Dashboard.layout = Admin;

export default Dashboard;
