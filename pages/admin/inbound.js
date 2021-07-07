import React from "react";
import ReactDOM from "react-dom";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import NativeSelect from "@material-ui/core/NativeSelect";
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
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import Chip from "@material-ui/core/Chip";
import Table from "components/Table/Table.js";

import DateRange from "@material-ui/icons/DateRange";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import NoteIcon from "@material-ui/icons/Note";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import RecordVoiceOverIcon from "@material-ui/icons/RecordVoiceOver";
import SubjectTwoToneIcon from "@material-ui/icons/SubjectTwoTone";
import AssignmentReturnedRoundedIcon from "@material-ui/icons/AssignmentReturnedRounded";
import RefreshIcon from "@material-ui/icons/Refresh";
import DoneOutlineIcon from "@material-ui/icons/DoneOutline";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";

import Snackbar from "components/Snackbar/Snackbar.js";

import PageChange from "components/PageChange/PageChange.js";

import moment from 'moment';

import Icon from "@material-ui/core/Icon";
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

function Inbound() {
  const currentDate = moment().format("MM/DD/YYYY, hh:mm:ss")

  const [state, setState] = React.useState({
    type: "",
    sender: "",
    description: "",
    date: moment().format("MM/DD/YYYY, hh:mm:ss")
  });
  const [inboundDocs, setInboundDocs] = React.useState([]);
  const [loadingData, setLoadingData] = React.useState(true);
  const [loadingInboundsFailed, setLoadingInboundsFailed] =
    React.useState(false);
  const [documentTypes, setDocumentTypes] = React.useState([]);
  const [notificationFail, setNotificationFail] = React.useState(false);
  const [notificationSuccess, setnotificationSuccess] = React.useState(false);

  React.useEffect(() => {
    if (!inboundDocs.length) getData();

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

  const showNotification = (type) => {
    switch (type) {
      case "success":
        if (!notificationSuccess) {
          setnotificationSuccess(true);
          setTimeout(function () {
            setnotificationSuccess(false);
          }, 4000);
        }
        break;
      case "failed":
        if (!notificationFail) {
          setNotificationFail(true);
          setTimeout(function () {
            setnotificationFail(false);
          }, 4000);
        }
        break;
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

  async function inboundHandler(data) {
    document.body.classList.add("body-page-transition");
    ReactDOM.render(
      <PageChange path={"/admin/inbound-sent"} />,
      document.getElementById("page-transition")
    );
    const response = await fetch("/api/inbound", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const res = await response.json();
    if (res.success) {
      setState({
        type: "",
        sender: "",
        description: "",
        date: currentDate,
      });
      ReactDOM.unmountComponentAtNode(
        document.getElementById("page-transition")
      );
      document.body.classList.remove("body-page-transition");
      showNotification("success");
    } else {
      showNotification("failed");
    }
  }

  const handleOnChange = (name, value) => {
    setState({
      ...state,
      [name]: value,
    });
  };

  const useStyles = makeStyles(styles);
  const classes = useStyles();
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={6}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Inbound Document</h4>
              <p className={classes.cardCategoryWhite}>
                Fill in document details
              </p>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <FormControl className={classes.formControl}>
                    <InputLabel>Type</InputLabel>
                    <NativeSelect
                      onChange={(e) => {
                        const { name, value } = e.target;
                        handleOnChange(name, value);
                      }}
                      inputProps={{
                        name: "type",
                        id: "type",
                        value: state.type,
                      }}
                    >
                      <option aria-label="None" value="" />
                      {documentTypes.map((type, index) => {
                        return (
                          <option value={type.name} key={index}>
                            {type.name}
                          </option>
                        );
                      })}
                    </NativeSelect>
                    {state.type ? (
                      ""
                    ) : (
                      <FormHelperText>
                        Select document type received
                      </FormHelperText>
                    )}
                  </FormControl>
                </GridItem>
              </GridContainer>
              <GridContainer></GridContainer>
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
                        const { name, value } = e.target;
                        handleOnChange(name, value);
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
                        const { name, value } = e.target;
                        handleOnChange(name, value);
                      },
                    }}
                  />
                </GridItem>
              </GridContainer>
            </CardBody>
            <CardFooter>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <Button
                    color="primary"
                    onClick={() => {
                      inboundHandler(state);
                    }}
                  >
                    Submit
                  </Button>
                </GridItem>
              </GridContainer>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card profile>
            <div
              style={{ paddingBottom: 20, paddingTop: 20, textAlign: "Center" }}
            >
              Preview
            </div>
            <CardAvatar style={{ color: "#942bae" }}>
              <SubjectTwoToneIcon style={{ fontSize: 100 }} />
            </CardAvatar>
            <CardBody>
              <Chip
                icon={<DateRange />}
                label={`${moment(state.date).format("MM/DD/YYYY, hh:mm A")}`}
              />
              <Chip icon={<AssignmentReturnedRoundedIcon />} label="IN" />
              <h3 className={classes.cardTitle}>
                {state.type ? state.type : "Document type"}
              </h3>
              <h4 className={classes.cardCategory}>
                {state.sender ? `${state.sender}` : "Source"}
              </h4>
              <p className={classes.description}>
                {state.description
                  ? state.description
                  : "Document description..."}
              </p>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <GridContainer>
                <GridItem xs={12} sm={12} md={10}>
                  <h4 className={classes.cardTitleWhite}>Inbound Feed</h4>
                  <p className={classes.cardCategoryWhite}>
                    Documents delivered to office
                  </p>
                </GridItem>
                <GridItem xs={12} sm={12} md={2}>
                  <Button
                    style={{ color: "#9a33b2", backgroundColor: "White" }}
                    onClick={() => {
                      getData();
                    }}
                  >
                    <RefreshIcon />
                    Refresh
                  </Button>
                </GridItem>
              </GridContainer>
            </CardHeader>
            <CardBody>
              <Table
                tableHeaderColor="danger"
                tableHead={[
                  "Receiver",
                  "Type",
                  "Description",
                  "Date"
                ]}
                tableData={inboundDocs.map(doc => ["Cidrex", doc.type, doc.description, moment(doc.date).format("MM/DD/YYYY, hh:mm A")])}
              />
            </CardBody>
          </Card>
        </GridItem>
        <GridContainer justify={"center"}>
          <GridItem xs={12} sm={12} md={3}>
            <Snackbar
              place="br"
              color="success"
              icon={DoneOutlineIcon}
              message="Inbound document has been saved successfuly!"
              open={notificationSuccess}
              closeNotification={() => setNotificationSuccess(false)}
              close
            />
            <Snackbar
              place="br"
              color="danger"
              icon={ErrorOutlineIcon}
              message="Oops! An error occured. Inbound document was not saved."
              open={notificationFail}
              closeNotification={() => setnotificationFail(false)}
              close
            />
          </GridItem>
        </GridContainer>
      </GridContainer>
    </div>
  );
}

Inbound.layout = Admin;

export default Inbound;
