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
import DateRange from "@material-ui/icons/DateRange";

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

function TableList() {
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Activity Log</h4>
            <p className={classes.cardCategoryWhite}>
              For the last 2 months
            </p>
          </CardHeader>
          <CardBody>
            <Table
              tableHeaderColor="primary"
              tableHead={["ID", "Action", "Type", "Bound for", "Date", "Time"]}
              tableData={[
                ["x0486859", "OUT", "Memo", "Emma Ravelo", "6/22/2021", "3:10PM"],
                ["x0486858", "HEAD", "Memo", "Alson Quimba", "6/22/2021", "3:00PM"],
                ["x0486857", "IN", "Memo", "Emma Ravelo", "6/22/2021", "2:16PM"],
                ["x0486856", "OUT", "Memo", "Richel Tilanduca", "6/22/2021", "2:07PM"],
                ["x0486855", "HEAD", "Memo", "Alson Quimba", "6/22/2021", "2:05PM"],
                ["x0486854", "IN", "Memo", "Richel Tilanduca", "6/22/2021", "2:00PM"],
              ]}
            />
          </CardBody>
        </Card>
      </GridItem>
      <GridItem xs={12} sm={12} md={12}>
        <Card plain>
          <CardHeader plain color="primary">
            <h4 className={classes.cardTitleWhite}>
              Documents Kept
            </h4>
            <p className={classes.cardCategoryWhite}>
              For the last 3 weeks
            </p>
          </CardHeader>
          <CardBody>
            <Table
              tableHeaderColor="primary"
              tableHead={["ID", "Type", "Recipient", "Description", "Date", "Time"]}
              tableData={[
                [
                  "x0486854",
                  "Memo",
                  "Richel Tilanduca",
                  "Sign contract for What are conference organizers afraid of?",
                  "6/22/2021",
                  "2:00PM"
                ],
                [
                  "x0486854",
                  "Communication",
                  "Alson Quimba",
                  "Sign contract for What are conference organizers afraid of?",
                  "6/22/2021",
                  "3:00PM"
                ],
                [
                  "x0486854",
                  "Memo",
                  "Alson Quimba",
                  "Sign contract for What are conference organizers afraid of?",
                  "6/22/2021",
                  "2:00PM"
                ],
                [
                  "x0486854",
                  "Memo",
                  "Alson Quimba",
                  "Sign contract for What are conference organizers afraid of?",
                  "6/22/2021",
                  "2:00PM"
                ],
                [
                  "x0486854",
                  "Recommendation",
                  "Richel Tilanduca",
                  "Sign contract for What are conference organizers afraid of?",
                  "6/22/2021",
                  "2:00PM"
                ],
                [
                  "x0486854",
                  "Memo",
                  "Alson Quimba",
                  "Sign contract for What are conference organizers afraid of?",
                  "6/22/2021",
                  "2:00PM"
                ],
              ]}
            />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}

TableList.layout = Admin;

export default TableList;
