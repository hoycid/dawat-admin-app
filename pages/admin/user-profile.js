import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
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

import avatar from "assets/img/faces/marc.jpg";

const styles = {
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

function UserProfile() {
  const [state, setState] = React.useState({
    username: "cid123",
    password: "123456",
    email: "quilangcidrex@gmail.com",
    firstname: "Cidrex",
    lastname: "Quilang",
    designation: "Administrative Aide I",
    about:
      "Lamborghini Mercy, Your chick she so thirsty, I'm in that two seat Lambo.",
  });
  const [updating, setUpdating] = React.useState(false);

  const handleUpdateClick = () => {
    if (updating === false) {
      setUpdating(true);
    } else {
      setUpdating(false);
    }
  };

  const handleOnChange = (name, value) => {
    if (name && value) {
      setState({
        ...state,
        [name]: value,
      });
    }
  };

  const useStyles = makeStyles(styles);
  const classes = useStyles();
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={updating ? 4 : 12}>
          <Card profile>
            <CardAvatar profile>
              <a href="#pablo" onClick={(e) => e.preventDefault()}>
                <img src={avatar} alt="..." />
              </a>
            </CardAvatar>
            <CardBody profile>
              <h6 className={classes.cardCategory}>{`${designation}`}</h6>
              <h4
                className={classes.cardTitle}
              >{`${firstname} ${lastname}`}</h4>
              <p className={classes.description}>{about}</p>
              {!updating ? (
                <Button
                  color="primary"
                  round
                  onClick={() => {
                    handleUpdateClick();
                  }}
                >
                  Update
                </Button>
              ) : (
                ""
              )}
            </CardBody>
          </Card>
        </GridItem>
        {updating ? (
          <GridItem xs={12} sm={12} md={8}>
            <Card>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>
                  {updating ? "Update Profile" : "Profile Details"}
                </h4>
                <p className={classes.cardCategoryWhite}>
                  {updating
                    ? "Fill in updated details"
                    : "Last updated: 6/17/2021 1:03PM"}
                </p>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={3}>
                    <CustomInput
                      labelText="Username"
                      id="username"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        disabled: true,
                        name: "username",
                        value: username,
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText="Password"
                      id="password"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        disabled: true,
                        name: "password",
                        value: password,
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText="Email address"
                      id="email-address"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        disabled: true,
                        name: "email",
                        value: email,
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="First Name"
                      id="first-name"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        disabled: updating ? false : true,
                        name: "firstname",
                        value: firstname,
                        onChange: (e) => {
                          const { name, value } = e.target;
                          handleOnChange(name, value);
                        },
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Last Name"
                      id="last-name"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        disabled: updating ? false : true,
                        name: "lastname",
                        value: lastname,
                        onChange: (e) => {
                          const { name, value } = e.target;
                          handleOnChange(name, value);
                        },
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={8}>
                    <CustomInput
                      labelText="Designation"
                      id="city"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        disabled: updating ? false : true,
                        name: "designation",
                        value: designation,
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
                    {/* <InputLabel style={{ color: "#AAAAAA" }}>About</InputLabel> */}
                    <CustomInput
                      labelText="About"
                      id="about"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        name: "about",
                        value: about,
                        onChange: (e) => {
                          const { name, value } = e.target;
                          handleOnChange(name, value);
                        },
                        multiline: true,
                        rows: 5,
                        disabled: updating ? false : true,
                      }}
                    />
                  </GridItem>
                </GridContainer>
              </CardBody>
              <CardFooter>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <Button
                      color="danger"
                      onClick={() => {
                        setUpdating(false);
                        setFirstname("Cidrex");
                        setLastname("Quilang");
                        setDesignation("Administrative Aide I");
                      }}
                    >
                      Cancel
                    </Button>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <Button
                      color="primary"
                      onClick={() => {
                        setUpdating(false);
                      }}
                    >
                      Save
                    </Button>
                  </GridItem>
                </GridContainer>
              </CardFooter>
            </Card>
          </GridItem>
        ) : (
          ""
        )}
      </GridContainer>
    </div>
  );
}

UserProfile.layout = Admin;

export default UserProfile;
