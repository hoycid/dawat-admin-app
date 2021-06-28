import React from "react";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Store from "@material-ui/icons/Store";
import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import Accessibility from "@material-ui/icons/Accessibility";
import BugReport from "@material-ui/icons/BugReport";
import Code from "@material-ui/icons/Code";
import Cloud from "@material-ui/icons/Cloud";
import AssignmentReturnedRoundedIcon from '@material-ui/icons/AssignmentReturnedRounded';
import ExitToAppTwoToneIcon from '@material-ui/icons/ExitToAppTwoTone';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import Person from "@material-ui/icons/Person";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import NoteIcon from '@material-ui/icons/Note';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import RecordVoiceOverIcon from '@material-ui/icons/RecordVoiceOver';
import SubjectTwoToneIcon from '@material-ui/icons/SubjectTwoTone';
import Link from 'next/link';

// layout for this page
import Admin from "layouts/Admin.js";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Tasks from "components/Tasks/Tasks.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import Danger from "components/Typography/Danger.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

import { bugs, website, server, bugsIdArr, websiteIdArr, serverIdArr } from "variables/general.js";

import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart,
} from "variables/charts.js";

import styles from "assets/jss/nextjs-material-dashboard/views/dashboardStyle.js";

function Dashboard() {
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={6} md={6}>
          <Link href='/admin/inbound'>
            <Card>
              <CardHeader color="warning" stats icon>
                <CardIcon color="warning">
                  <AssignmentReturnedRoundedIcon/>
                </CardIcon>
                <p className={classes.cardCategory}>INBOUND DOCUMENTS</p>
                <h3 className={classes.cardTitle}>
                  0 <small>out of</small> 0
                </h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <HelpOutlineIcon/>
                  Click to process an inbound document
                </div>
              </CardFooter>
            </Card>
          </Link>
        </GridItem>
        <GridItem xs={12} sm={6} md={6}>
          <a href="#pablo" onClick={(e) => e.preventDefault()}>
            <Card>
              <CardHeader color="danger" stats icon>
                <CardIcon color="danger">
                  <ExitToAppTwoToneIcon/>
                </CardIcon>
                <p className={classes.cardCategory}>OUTBOUND DOCUMENTS</p>
                <h3 className={classes.cardTitle}>
                  0 <small>out of</small> 0
                </h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <HelpOutlineIcon/>
                  Click to process and designate an outbound document
                </div>
              </CardFooter>
            </Card>
          </a>
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="info" icon>
              <CardIcon color="info">
                <NoteIcon/>
              </CardIcon>
              <p className={classes.cardCategory}>Memos</p>
              <h3 className={classes.cardTitle}>
                0 <small>received</small>
              </h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <DateRange />
                Last 24 Hours
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="warning" icon>
              <CardIcon color="warning">
                <ThumbUpIcon/>
              </CardIcon>
              <p className={classes.cardCategory}>Recommendations</p>
              <h3 className={classes.cardTitle}>
                0 <small>received</small>
              </h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <DateRange />
                Last 24 Hours
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="danger" icon>
              <CardIcon color="danger">
                <RecordVoiceOverIcon/>
              </CardIcon>
              <p className={classes.cardCategory}>Communications</p>
              <h3 className={classes.cardTitle}>
                0 <small>received</small>
              </h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <DateRange />
                Last 24 Hours
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="dark" icon>
              <CardIcon color="dark">
                <LibraryBooks/>
              </CardIcon>
              <p className={classes.cardCategory}>Others</p>
              <h3 className={classes.cardTitle}>
                0 <small>received</small>
              </h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <a href="#pablo" onClick={(e) => e.preventDefault()}>
                  <SubjectTwoToneIcon />
                  View more document types
                </a>
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={12} md={6}>
          <CustomTabs
            title="Inbound Feed:"
            headerColor="dark"
            tabs={[
              {
                tabName: "IN",
                tabIcon: AssignmentReturnedRoundedIcon,
                tabContent: (
                  <Tasks
                    checkedIndexes={[0]}
                    tasksIndexes={[0, 1, 2, 3]}
                    tasksIdArr={bugsIdArr}
                    tasks={bugs}
                  />
                ),
              },
              {
                tabName: "HEAD",
                tabIcon: Person,
                tabContent: (
                  <Tasks
                    checkedIndexes={[0]}
                    tasksIndexes={[0, 1]}
                    tasksIdArr={websiteIdArr}
                    tasks={website}
                  />
                ),
              },
              {
                tabName: "OUT",
                tabIcon: ExitToAppTwoToneIcon,
                tabContent: (
                  <Tasks
                    checkedIndexes={[1]}
                    tasksIndexes={[0, 1, 2]}
                    tasksIdArr={serverIdArr}
                    tasks={server}
                  />
                ),
              },
            ]}
          />
        </GridItem>
        <GridItem xs={12} sm={12} md={6}>
          <Card>
            <CardHeader color="warning">
              <h4 className={classes.cardTitleWhite}>Outbound Feed</h4>
              <p className={classes.cardCategoryWhite}>
                Documents forwarded to persons concerned
              </p>
            </CardHeader>
            <CardBody>
              <Table
                tableHeaderColor="warning"
                tableHead={["ID", "Type", "Designated", "Date", "Time"]}
                tableData={[
                  ["x0948", "Memo", "Emma Ravelo", "6/16/2021", "11:24AM" ],
                  ["x0949", "Communication", "Richel Tilanduca", "6/16/2021", "10:05AM"],
                  ["x0950", "Recommendation", "Lilith Turan", "6/16/2021", "9:55AM"],
                  ["x0948", "Memo", "Richel Tilanduca", "6/15/2021", "3:30PM"],
                ]}
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}

Dashboard.layout = Admin;

export default Dashboard;
