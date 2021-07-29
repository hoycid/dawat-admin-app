import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// layout for this page
import Login from "layouts/Login.js";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

import logo from "assets/img/pgblogo.png";

import { useAuth0 } from "@auth0/auth0-react";

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

function LoginPage() {
  const [state, setState] = React.useState({
    username: "",
    password: "",
  });

  const handleOnChange = (name, value) => {
    setState({
      ...state,
      [name]: value,
    });
  };

  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const { loginWithRedirect } = useAuth0();
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={6}>
          <Card profile>
            <CardAvatar profile>
              <img src={logo} alt="..." />
            </CardAvatar>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <h6 className={classes.cardCategory}>PAGRO - Admin</h6>
                  <h4 className={classes.cardTitle}>Welcome</h4>
                  <p className={classes.description}>
                    Enter username and password to proceed.
                  </p>
                </GridItem>
                <GridItem xs={12} sm={12} md={12}>
                  <CustomInput
                    labelText="Username"
                    id="username"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      name: "username",
                      value: state.username,
                      onChange: (e) => {
                        const { name, value } = e.target;
                        handleOnChange(name, value);
                      },
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={12}>
                  <CustomInput
                    labelText="Password"
                    id="password"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      name: "password",
                      value: state.password,
                      onChange: (e) => {
                        const { name, value } = e.target;
                        handleOnChange(name, value);
                      },
                    }}
                  />
                </GridItem>
              </GridContainer>
                <Button color="success" onClick={() => loginWithRedirect()}>Login</Button>
              <CardFooter>
                Forgot password?
              </CardFooter>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}

LoginPage.layout = Login;

export default LoginPage;
