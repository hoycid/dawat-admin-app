import React, { useEffect } from "react";
import ReactDOM from "react-dom";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
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
import TableClickable from "components/TableClickable/TableClickable.js";
import PageChange from "components/PageChange/PageChange.js";

import DateRange from "@material-ui/icons/DateRange";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import NoteIcon from "@material-ui/icons/Note";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import RecordVoiceOverIcon from "@material-ui/icons/RecordVoiceOver";
import SubjectTwoToneIcon from "@material-ui/icons/SubjectTwoTone";
import ExitToAppTwoToneIcon from "@material-ui/icons/ExitToAppTwoTone";
import RefreshIcon from "@material-ui/icons/Refresh";

import moment from "moment";

import defaultPhoto from "assets/img/default.jpg";

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
  const positions = [
    "Provincial Agriculturist",
    "Assistant Agriculturist",
    "Supervising Agriculturist",
  ];

  const [selected, setSelected] = React.useState({
    img: defaultPhoto,
    type: "",
    sender: "",
    description: "",
    date: moment().format(),
    receiver: "",
  });

  const [forwardInputVisible, setForwardInputVisible] = React.useState(false);

  const [inboundDocs, setInboundDocs] = React.useState([]);

  const [outboundDocs, setOutboundDocs] = React.useState([]);

  const [loadingData, setLoadingData] = React.useState(true);

  const [recipient, setRecipient] = React.useState(positions[0]);

  const [notificationSuccess, setNotificationSuccess] = React.useState(false);
  const [notificationFail, setNotificationFail] = React.useState(false);
  const [notificationIncomplete, setNotificationIncomplete] =
    React.useState(false);

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
      setLoadingData(false);
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
      setLoadingData(false);
    } else {
      showNotification("loadingOutboundsFailed");
    }
  }

  const submitHandler = async () => {
    if (selected && recipient) {
      document.body.classList.add("body-page-transition");
      ReactDOM.render(
        <PageChange path={"/admin/outbound-sent"} />,
        document.getElementById("page-transition")
      );
      const data = { ...selected, recipient };

      const postResponse = await fetch("/api/outbound", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const postResult = await postResponse.json();
      if (postResult.success) {
        setSelected({
          img: defaultPhoto,
          type: "",
          sender: "",
          description: "",
          date: moment().format(),
        });

        const deleteResponse = await fetch("/api/inbound", {
          method: "DELETE",
          body: JSON.stringify(selected._id),
          headers: {
            "Content-Type": "application/json",
          },
        });

        const deletResult = await deleteResponse.json();

        if (postResult.success && deletResult.success) {
          setInboundDocs(inboundDocs.filter(doc => doc._id !== selected._id));
          showNotification("success");
        } else {
          showNotification("failed");
        }

        toggleForwardInput();
        setRecipient("");
      } else {
        showNotification("failed");
      }
    } else {
      showNotification("incomplete");
    }
    ReactDOM.unmountComponentAtNode(document.getElementById("page-transition"));
    document.body.classList.remove("body-page-transition");
  };

  const showNotification = type => {
    switch (type) {
      case "success":
        if (!notificationSuccess) {
          setNotificationSuccess(true);
          setTimeout(function () {
            setNotificationSuccess(false);
          }, 4000);
        }
        break;
      case "failed":
        if (!notificationFail) {
          setNotificationFail(true);
          setTimeout(function () {
            setNotificationFail(false);
          }, 4000);
        }
        break;
      case "incomplete":
        if (!notificationIncomplete) {
          setNotificationIncomplete(true);
          setTimeout(function () {
            setNotificationIncomplete(false);
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

  const rowClickHandler = id => {
    const match = inboundDocs.find(item => item._id === id);
    setRecipient("");
    setSelected(match);
  };

  const toggleForwardInput = () => {
    setForwardInputVisible(prevState => !prevState);
  };

  const handleOnChange = (name, value) => {
    if (name && value) {
      if (name === "recipient") {
        setRecipient(value);
      } else {
        setSelected({
          ...selected,
          [name]: value,
        });
      }
    }
  };

  const useStyles = makeStyles(styles);
  const classes = useStyles();
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={4}>
          <Card profile>
            <div
              style={{ paddingBottom: 20, paddingTop: 20, textAlign: "Center" }}
            >
              Preview
            </div>
            <CardAvatar style={{ color: "#e7403c" }}>
              {selected.type === "Memo" ? (
                <NoteIcon style={{ fontSize: 100 }} />
              ) : selected.type === "Communication" ? (
                <RecordVoiceOverIcon style={{ fontSize: 100 }} />
              ) : selected.type === "Recommendation" ? (
                <ThumbUpIcon style={{ fontSize: 100 }} />
              ) : (
                <LibraryBooks style={{ fontSize: 100 }} />
              )}
            </CardAvatar>
            <CardBody>
              <Chip
                icon={<DateRange />}
                label={`${moment(selected.date).format("MM/DD/YYYY, hh:mm A")}`}
              />
              <Chip icon={<ExitToAppTwoToneIcon />} label="OUT" />
              <h3 className={classes.cardTitle}>
                {selected.type ? selected.type : "Document type"}
              </h3>
              <h4 className={classes.cardCategory}>
                {selected.sender ? `${selected.sender}` : "Source"}
              </h4>
              <p className={classes.description}>
                {selected.description
                  ? selected.description
                  : "Document description..."}
              </p>
              {!forwardInputVisible && (
                <Button color="danger" onClick={toggleForwardInput}>
                  Forward
                </Button>
              )}
            </CardBody>
            <CardFooter>
              {forwardInputVisible ? (
                <div>
                  <label>Forward to: </label>
                  <select
                    name="recipient"
                    id="recipient"
                    value={recipient}
                    onChange={e => {
                      const { name, value } = e.target;
                      handleOnChange(name, value);
                    }}
                  >
                    <option aria-label="None" value="" />
                    {positions.map((position, index) => {
                      return (
                        <option value={position} key={index}>
                          {position}
                        </option>
                      );
                    })}
                  </select>
                  <div>
                    <Button
                      color="rose"
                      onClick={() => {
                        setRecipient("");
                        toggleForwardInput();
                      }}
                    >
                      Cancel
                    </Button>
                    <Button color="danger" onClick={submitHandler}>
                      Submit
                    </Button>
                  </div>
                </div>
              ) : (
                <p>
                  Click Forward to forward documents to respective recipients.
                </p>
              )}
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={8}>
          <Card>
            <CardHeader color="danger">
              <GridContainer>
                <GridItem xs={12} sm={12} md={9}>
                  <h4 className={classes.cardTitleWhite}>Inbound Feed</h4>
                  <p className={classes.cardCategoryWhite}>
                    Documents delivered to office
                  </p>
                </GridItem>
                <GridItem xs={12} sm={12} md={2}>
                  <Button
                    style={{ color: "#e7403c", backgroundColor: "White" }}
                  >
                    <RefreshIcon />
                    Refresh
                  </Button>
                </GridItem>
              </GridContainer>
            </CardHeader>
            <CardBody>
              <TableClickable
                onClickHandler={rowClickHandler}
                tableHeaderColor="danger"
                tableHead={["ID", "Type", "Description", "Date"]}
                tableData={inboundDocs.map(doc => [
                  doc._id,
                  doc.type,
                  doc.description,
                  moment(doc.date).format("MM/DD/YYYY, hh:mm A"),
                ])}
              />
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
                    Documents forwarded to persons concerned. For the last 3
                    weeks
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
                  "Recipient",
                  "Sender",
                  "Type",
                  "Description",
                  "Date",
                  "Recieved by",
                ]}
                tableData={outboundDocs.map(doc => [
                  doc.recipient,
                  doc.sender,
                  doc.type,
                  doc.description,
                  moment(doc.date).format("MM/DD/YYYY, hh:mm A"),
                  doc.receiver,
                ])}
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
