import React, { useEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
// layout for this page
import Admin from "layouts/Admin.js";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Chip from '@material-ui/core/Chip';
import Table from "components/Table/Table.js";

import DateRange from "@material-ui/icons/DateRange";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import NoteIcon from '@material-ui/icons/Note';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import RecordVoiceOverIcon from '@material-ui/icons/RecordVoiceOver';
import SubjectTwoToneIcon from '@material-ui/icons/SubjectTwoTone';
import ExitToAppTwoToneIcon from '@material-ui/icons/ExitToAppTwoTone';
import RefreshIcon from '@material-ui/icons/Refresh';

import avatar from "assets/img/faces/marc.jpg";

const styles = {
  formControl: {
    // margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    // marginTop: theme.spacing(2),
  },
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0",
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
  },
};

function Outbound() {
  const [state, setState] = React.useState({
    uuid: "",
    type: "",
    sender: "",
    description: "",
    date: new Date()
  });

  const handleOnChange = (name, value) => {
    setState({
      ...state,
      [name]: value.charAt(0).toUpperCase() + value.slice(1)
    })
  }

  const useStyles = makeStyles(styles);
  const classes = useStyles();
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={6}>
          <Card>
            <CardHeader color="danger">
              <h4 className={classes.cardTitleWhite}>Outbound Document</h4>
              <p className={classes.cardCategoryWhite}>Fill in document details</p>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                <FormControl className={classes.formControl}>
                    <InputLabel>Type</InputLabel>
                    <NativeSelect
                    value={state.type}
                    onChange={(e) => {
                      const {name, value} = e.target;
                      handleOnChange(name, value)
                    }}
                    inputProps={{
                        name: 'type',
                        id: 'type',
                    }}
                    >
                    <option aria-label="None" value="" />
                    <option value="memo">Memo</option>
                    <option value="communication">Communication</option>
                    <option value="recommendation">Recommendation</option>
                    </NativeSelect>
                    {state.type ? "" : <FormHelperText>Select document type received</FormHelperText>}
                </FormControl>
                </GridItem>
              </GridContainer>
              <GridContainer>
              <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="From"
                    id="sender"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      name: "sender",
                      value: state.sender,
                      onChange: (e) => {
                        const {name, value} = e.target;
                        handleOnChange(name, value)
                      },
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <CustomInput
                    labelText="Description"
                    id="description"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      name: "description",
                      value: state.description,
                      onChange: (e) => {
                        const {name, value} = e.target;
                        handleOnChange(name, value)
                      },
                    }}
                  />
                </GridItem>
              </GridContainer>
            </CardBody>
            <CardFooter>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <Button color="danger" onClick={() => { setState({}) }}>Submit</Button>
                </GridItem>
              </GridContainer>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card profile>
            <div style={{paddingBottom: 20, paddingTop: 20}}>
              <Chip color="danger" label="Preview"/>
            </div>
            <CardAvatar style={{color: "#e7403c"}}>
              {
                state.type === "Memo" ? <NoteIcon style={{fontSize: 100}}/> :
                state.type === "Communication" ? <RecordVoiceOverIcon style={{fontSize: 100}}/> :
                state.type === "Recommendation" ? <ThumbUpIcon style={{fontSize: 100}}/> :
                <LibraryBooks style={{fontSize: 100}}/>
              }
            </CardAvatar>
            <CardBody>
              <Chip icon={<DateRange />} label={`${state.date.getMonth()}/${state.date.getDay()}/${state.date.getUTCFullYear()}`}/>
              <Chip icon={<ExitToAppTwoToneIcon/>} label="OUT"/>
              <h3 className={classes.cardTitle}>{state.type ? state.type : "Document type"}</h3>
              <h4 className={classes.cardCategory}>{state.sender ? `${state.sender}` : "Source"}</h4>
              <p className={classes.description}>{state.description ? state.description : "Document description..."}</p>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="danger">
              <GridContainer>
                <GridItem xs={12} sm={12} md={10}>
                  <h4 className={classes.cardTitleWhite}>Outbound Feed</h4>
                  <p className={classes.cardCategoryWhite}>
                    Documents forwarded to persons concerned
                  </p>
                </GridItem>
                <GridItem xs={12} sm={12} md={2}>
                  <Button style={{color: "#e7403c", backgroundColor: "White"}}><RefreshIcon/>Refresh</Button>
                </GridItem>
              </GridContainer>
            </CardHeader>
            <CardBody>
              <Table
                tableHeaderColor="danger"
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

Outbound.layout = Admin;

export default Outbound;