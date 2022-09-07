import React from "react";
import ReactDOM from "react-dom";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import NativeSelect from "@material-ui/core/NativeSelect";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import Chip from "@material-ui/core/Chip";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Icon from "@material-ui/core/Icon";

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
import Table from "components/Table/Table.js";
import Snackbar from "components/Snackbar/Snackbar.js";
import PageChange from "components/PageChange/PageChange.js";

// material icons
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
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";

import axios from "axios";
import moment from "moment";

import defaultPhoto from "assets/img/default.jpg";

const styles = {
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: 3,
  },
  paper: {
    backgroundColor: "transparent",
    border: 0,
    boxShadow: 3,
  },
  paragraphClickable: {
    fontSize: 12,
    color: "black",
    "&:hover": {
      color: "#D1B8D6",
    },
  },
  formControl: {
    minWidth: 120,
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
  const [inboundDocs, setInboundDocs] = React.useState([]);
  const [documentTypes, setDocumentTypes] = React.useState([]);

  const [loadingData, setLoadingData] = React.useState(true);
  const [loadingInboundsFailed, setLoadingInboundsFailed] =
    React.useState(false);

  const [openAttachModal, setOpenAttachModal] = React.useState(false);

  const [notificationSuccess, setNotificationSuccess] = React.useState(false);
  const [notificationFail, setNotificationFail] = React.useState(false);
  const [notificationUploadSuccess, setNotificationUploadSuccess] =
    React.useState(false);
  const [notificationUploadFail, setNotificationUploadFail] =
    React.useState(false);
  const [notificationIncomplete, setNotificationIncomplete] =
    React.useState(false);

  const [selectedImage, setSelectedImage] = React.useState(null);
  const [uploadedFile, setUploadedFile] = React.useState("");

  const [state, setState] = React.useState({
    img: defaultPhoto,
    type: "",
    sender: "",
    description: "",
    date: moment().format(),
  });

  const [receiver, setReceiver] = React.useState("user");

  React.useEffect(() => {
    getData();

    const interval = setInterval(() => {
      getData();
    }, 15000);

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
  }

  async function handleSubmit(details) {
    if (details.type && details.sender) {
      document.body.classList.add("body-page-transition");
      ReactDOM.render(
        <PageChange path={"/admin/inbound-sent"} />,
        document.getElementById("page-transition")
      );

      const data = { ...details, receiver: receiver };

      const response = await fetch("/api/inbound", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const res = await response.json();
      if (res.success) {
        const logResponse = await fetch("/api/log", {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        });

        const logRes = await logResponse.json();
        if (res.success && logRes.success) {
          setState({
            img: defaultPhoto,
            type: "",
            sender: "",
            description: "",
            date: moment().format(),
          });
          showNotification("success");
        } else {
          showNotification("failed");
        }

        ReactDOM.unmountComponentAtNode(
          document.getElementById("page-transition")
        );
        document.body.classList.remove("body-page-transition");
      } else {
        showNotification("failed");
      }
    } else {
      showNotification("incomplete");
    }
    handleCloseAttachModal();
  }

  const handleOnChange = (name, value) => {
    setState({
      ...state,
      [name]: value,
    });
  };

  const handleOpenAttachModal = () => {
    setOpenAttachModal(true);
  };

  const handleCloseAttachModal = () => {
    setOpenAttachModal(false);
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
      case "upload-success":
        if (!notificationSuccess) {
          setNotificationUploadSuccess(true);
          setTimeout(function () {
            setNotificationUploadSuccess(false);
          }, 4000);
        }
        break;
      case "upload-failed":
        if (!notificationFail) {
          setNotificationUploadFail(true);
          setTimeout(function () {
            setNotificationUploadFail(false);
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

  async function handleUploadFile() {
    if (selectedImage) {
      const form = new FormData();

      form.append("media", selectedImage);

      // for (var [key, value] of form.entries()) {
      //   console.log(key, value);
      // }

      // const response = await fetch("/api/upload", {
      //   method: "POST",
      //   body: form,
      // });

      await axios(`/api/upload`, {
        method: "POST",
        data: form,
        "content-type": "multipart/form-data",
      }).then(res => {
        if (res.status === 201) {
          setUploadedFile(res.data.media.path.toString());
          showNotification("upload-success");
        } else {
          showNotification("upload-failed");
        }
      });
    } else {
      showNotification("incomplete");
      handleCloseAttachModal();
    }
  }

  const handleChooseFile = e => {
    setSelectedImage(e.target.files[0]);
  };

  const useStyles = makeStyles(styles);
  const classes = useStyles();

  const inputRef = React.useRef();

  return (
    <div>
      <GridContainer>
        <GridItem
          xs={12}
          sm={12}
          md={state.type || state.description || state.sender ? 8 : 12}
        >
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
                      onChange={e => {
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
                    {notificationIncomplete ? (
                      <FormHelperText>
                        Select document type received.
                      </FormHelperText>
                    ) : (
                      ""
                    )}
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
                      onChange: e => {
                        const { name, value } = e.target;
                        handleOnChange(name, value);
                      },
                    }}
                  />
                  {notificationIncomplete ? (
                    <FormHelperText>
                      Enter document source or sender.
                    </FormHelperText>
                  ) : (
                    ""
                  )}
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
                      onChange: e => {
                        const { name, value } = e.target;
                        handleOnChange(name, value);
                      },
                    }}
                  />
                  {state.description ? (
                    <FormHelperText>
                      (Optional) Enter document description.
                    </FormHelperText>
                  ) : (
                    ""
                  )}
                </GridItem>
              </GridContainer>
            </CardBody>
            <CardFooter>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <Button
                    disabled={state.type && state.sender ? false : true}
                    color="primary"
                    onClick={handleOpenAttachModal}
                  >
                    Attach file
                  </Button>
                </GridItem>
              </GridContainer>
            </CardFooter>
          </Card>
        </GridItem>
        {state.sender || state.type || state.description ? (
          <GridItem xs={12} sm={12} md={4}>
            <Card profile>
              <div
                style={{
                  paddingBottom: 20,
                  paddingTop: 20,
                  textAlign: "Center",
                }}
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
        ) : (
          ""
        )}
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
                tableHead={["Type", "Description", "Date", "Receiver"]}
                tableData={inboundDocs.map(doc => [
                  doc.type,
                  doc.description,
                  moment(doc.date).format("MM/DD/YYYY, hh:mm A"),
                  doc.receiver,
                ])}
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
              message="Inbound document has been saved successfully!"
              open={notificationSuccess}
              closeNotification={() => setNotificationSuccess(false)}
              close
            />
            <Snackbar
              place="br"
              color="success"
              icon={DoneOutlineIcon}
              message="Image uploaded successfully!"
              open={notificationUploadSuccess}
              closeNotification={() => setNotificationUploadSuccess(false)}
              close
            />
            <Snackbar
              place="br"
              color="danger"
              icon={ErrorOutlineIcon}
              message="Something went wrong. Image upload failed."
              open={notificationUploadFail}
              closeNotification={() => setNotificationUploadFail(false)}
              close
            />
            <Snackbar
              place="br"
              color="warning"
              icon={ErrorOutlineIcon}
              message="Please complete the required document details."
              open={notificationIncomplete}
              closeNotification={() => setNotificationIncomplete(false)}
              close
            />
            <Snackbar
              place="br"
              color="danger"
              icon={ErrorOutlineIcon}
              message="Oops! Something went wrong. Please try again later."
              open={notificationFail}
              closeNotification={() => setNotificationFail(false)}
              close
            />
          </GridItem>
        </GridContainer>
      </GridContainer>
      <GridContainer>
        <Modal
          className={classes.modal}
          open={openAttachModal}
          onClose={handleCloseAttachModal}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 10,
          }}
        >
          <Fade in={openAttachModal}>
            <div className={classes.paper}>
              <Card profile>
                <div
                  style={{
                    paddingBottom: 20,
                    paddingTop: 8,
                    textAlign: "Center",
                  }}
                >
                  <CardHeader color="primary">
                    <h4 className={classes.cardTitleWhite}>Attach File</h4>
                    <p className={classes.cardCategoryWhite}>
                      Attach a scanned copy of the document
                    </p>
                  </CardHeader>
                </div>
                {/* <CardAvatar>
                  <img src={uploadedFile || state.img} alt="image" />
                </CardAvatar> */}
                <CardBody>
                  <input
                    type="file"
                    className="custom-file-input"
                    id="customFile"
                    multiple={true}
                    onChange={handleChooseFile}
                  />
                  <Button
                    color="primary"
                    disabled={selectedImage ? false : true}
                    onClick={() => {
                      // !uploadedFile ? handleUploadFile() : handleSubmit(state);
                      handleSubmit(state);
                    }}
                  >
                    {/* {!uploadedFile ? "Upload" : "Submit"} */}
                    Submit
                  </Button>
                  <Button
                    color="primary"
                    onClick={() => {
                      setState({
                        img: defaultPhoto,
                        type: "",
                        sender: "",
                        description: "",
                        date: moment().format(),
                      });
                      setSelectedImage(null);
                      setUploadedFile("");
                      setOpenAttachModal(false);
                    }}
                  >
                    Cancel
                  </Button>
                </CardBody>
              </Card>
            </div>
          </Fade>
        </Modal>
      </GridContainer>
    </div>
  );
}

Inbound.layout = Admin;

export default Inbound;
