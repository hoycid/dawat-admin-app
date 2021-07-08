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

import {
  server,
  serverIdArr,
} from "variables/general.js";

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
  const [loadingInboundsFailed, setLoadingInboundsFailed] = React.useState(false);

  const [stats, setStats] = React.useState({
    totalInboundToday: undefined,
    totalInbound: undefined,
    totalOutboundToday: undefined,
    totalOutbound: undefined,
    provinceMemos: undefined,
    officeMemos: undefined,
    endorsements: undefined,
    meetingWorkshopSeminars: undefined,
    businessCorrespondence: undefined,
    privateBusinessCorrespondence: undefined,
    requests: undefined,
  });

  const currentDate = moment(new Date());
  
  React.useEffect(() => {
    getData();
    getStats();
    
    return function cleanup() {
      // to stop the warning of calling setState of unmounted component
      var id = window.setTimeout(null, 0);
      while (id--) {
        window.clearTimeout(id);
      }
    };
  }, [loadingData]);

  async function getData() {
    const getInboundFetchResponse = await fetch("/api/inbound", {
      method: "GET",
      body: JSON.stringify(),
      headers: {
        "Content-Type": "application/json",
      },
    });

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
    }

    const getInboundResponse = await getInboundFetchResponse.json();
    if (getInboundResponse.success) {
      setInboundDocs(getInboundResponse.data);
      setLoadingData(false);
    } else {
      showNotification("loadingInboundsFailed");
    }
  }

  const getStats = () => {
    if (inboundDocs) {
      const totalInboundProvincialMemo = inboundDocs.filter(
        (doc) => doc.type === "Provincial Memo"
      );
      const totalInboundOfficeMemo = inboundDocs.filter(
        (doc) => doc.type === "Office Memo"
      );
      const totalInboundEndorsement = inboundDocs.filter(
        (doc) => doc.type === "Endorsement"
      );
      const totalInboundMeetingWorkshopSeminar = inboundDocs.filter(
        (doc) =>
          doc.type === "Meeting/Workshop/Seminar"
      );
      const totalInboundBusinessCorrespondence = inboundDocs.filter(
        (doc) => doc.type === "Business Correspondence"
      );
      const totalInboundPrivateBusinessCorrespondence = inboundDocs.filter(
        (doc) => doc.type === "Private Business Correspondence"
      );
      const totalInboundRequest = inboundDocs.filter(
        (doc) => doc.type === "Request"
      );

      // set stats in the span of 3 weeks
      setStats({
        totalInboundToday: inboundDocs.filter(
          (doc) =>
            moment(doc.date).format("MM/DD/YYYY") ===
            moment().format("MM/DD/YYYY")
        ).length,
        totalInbound: inboundDocs.length,
        totalOutboundToday: outboundDocs.length,
        totalOutbound: outboundDocs.length,
        provinceMemos: totalInboundProvincialMemo.length,
        officeMemos: totalInboundOfficeMemo.length,
        endorsements: totalInboundEndorsement.length,
        meetingWorkshopSeminars: totalInboundMeetingWorkshopSeminar.length,
        businessCorrespondence: totalInboundBusinessCorrespondence.length,
        privateBusinessCorrespondence:
          totalInboundPrivateBusinessCorrespondence.length,
        requests: totalInboundRequest.length,
      });
    }
  };

  const showNotification = (type) => {
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
                {stats.totalInboundToday
                  ? stats.totalInboundToday
                  : stats.totalInboundToday === 0
                  ? "0"
                  : "--"}{" "}
                <small>out of</small>{" "}
                {stats.totalInbound
                  ? stats.totalInbound
                  : stats.totalInbound === 0
                  ? "0"
                  : "--"}
              </h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Link href="/admin/inbound" onClick={(e) => e.preventDefault()}>
                  <div>
                    <HelpOutlineIcon />
                    Click here to process an inbound document.
                  </div>
                </Link>
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
                {stats.totalOutboundToday
                  ? stats.totalOutboundToday
                  : stats.totalOutboundToday === 0
                  ? "0"
                  : "--"}{" "}
                <small>out of</small>{" "}
                {stats.totalOutbound
                  ? stats.totalOutbound
                  : stats.totalOutbound === 0
                  ? "0"
                  : "--"}
              </h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Link
                  href="/admin/outbound"
                  onClick={(e) => e.preventDefault()}
                >
                  <div>
                    <HelpOutlineIcon />
                    Click here to process and designate an outbound document.
                  </div>
                </Link>
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
                    <CardHeader color={type.color} icon>
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
                          ? stats.provinceMemos
                          : type.name === "Office Memo"
                          ? stats.officeMemos
                          : type.name === "Endorsement"
                          ? stats.endorsements
                          : type.name === "Meeting/Workshop/Seminar"
                          ? stats.meetingWorkshopSeminars
                          : type.name === "Business Correspondence"
                          ? stats.businessCorrespondence
                          : type.name === "Private Business Correspondence"
                          ? stats.businessCorrespondence
                          : type.name === "Request"
                          ? stats.requests
                          : "0"}{" "}
                        <small>received</small>
                      </h3>
                    </CardHeader>
                    <CardFooter stats>
                      <div className={classes.stats}>
                        <DateRange />
                        For the last 3 weeks
                      </div>
                    </CardFooter>
                  </Card>
                </GridItem>
              );
            })
          : ""}
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={12} md={6}>
          <CustomTabs
            title="Processing Feed:"
            headerColor="dark"
            tabs={[
              {
                tabName: "IN",
                tabIcon: AssignmentReturnedRoundedIcon,
                tabContent: (
                  <Documents
                    indexes={inboundDocs.map((doc, index) => index)}
                    dates={inboundDocs.map((doc) => 
                      moment(doc.date).fromNow()
                    )}
                    types={inboundDocs.map((doc) => doc.type)}
                    descriptions={inboundDocs.map((doc) =>
                      doc.description ? doc.description : "No description"
                    )}
                  />
                ),
              },
              {
                tabName: "OUT",
                tabIcon: ExitToAppTwoToneIcon,
                tabContent: (
                  <Documents
                    indexes={inboundDocs.map((doc, index) => index)}
                    dates={inboundDocs.map((doc) =>
                      moment(doc.date).format("hh:mm A")
                    )}
                    types={inboundDocs.map((doc) => doc.type)}
                    descriptions={inboundDocs.map((doc) =>
                      doc.description ? doc.description : "No description"
                    )}
                  />
                ),
              },
            ]}
          />
        </GridItem>
        <GridItem xs={12} sm={12} md={6}>
          <Card>
            <CardHeader color="warning">
              <h4 className={classes.cardTitleWhite}>Document Designations</h4>
              <p className={classes.cardCategoryWhite}>
                Documents forwarded to persons concerned.
                <small>For the last 3 weeks</small>
              </p>
            </CardHeader>
            <CardBody>
              <Table
                tableHeaderColor="warning"
                tableHead={["ID", "Type", "Designated", "Date", "Time"]}
                tableData={[
                  ["x0948", "Memo", "Emma Ravelo", "6/16/2021", "11:24AM"],
                  [
                    "x0949",
                    "Communication",
                    "Richel Tilanduca",
                    "6/16/2021",
                    "10:05AM",
                  ],
                  [
                    "x0950",
                    "Recommendation",
                    "Lilith Turan",
                    "6/16/2021",
                    "9:55AM",
                  ],
                  ["x0948", "Memo", "Richel Tilanduca", "6/15/2021", "3:30PM"],
                ]}
              />
            </CardBody>
          </Card>
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
