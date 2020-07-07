/*
 * Copyright (c) Schrocken Inc.
 * Author: Ravi Teja
 * File Description: Main registration component (Right side in screen)
 */

import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import jwt from "jsonwebtoken";

import {
  Grid,
  Card,
  CardContent,
  Button,
  Typography,
  TextField,
  IconButton,
  InputAdornment,
  FormControlLabel,
  Checkbox,
  Dialog
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons/";
import { withStyles } from "@material-ui/core/styles";

import LoadingGif from "../../../resources/images/blockChainLoading.gif";

import Footer from "../footer/Footer";

import { registerUser } from "../../../containers/actions/authActions";

const styles = theme => ({
  flexRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },
  main: {
    margin: "auto 15%",
    marginTop: "4%"
  },
  header4: {
    marginBottom: "0.5rem"
  },
  nfoText: {
    margin: "5% 0% 1% 0%"
  },
  cardContent: {
    margin: "0.5rem 0.75rem 0rem 0rem"
  },
  textFieldMargin: {
    marginBottom: "0.7rem"
  }
});

class MainRegister extends Component {
  state = {
    jwtError: false,
    fullName: "",
    organizationName: "",
    collaboratorTypeId: "",
    collaboratorType: "",
    collaboratorRoleId: "",
    collaboratorRole: "",
    ecosystemTypeId: "",
    ecosystemName: "",
    superadminEmail: "",
    superadminPassword: "",
    emailPromotion: true,
    showPassword: false,
    errors: {
      fullName: false,
      organizationName: false,
      collaboratorType: false,
      collaboratorRole: false,
      superadminEmail: false,
      superadminPassword: false,
      userExists: false
    },
    dialog: false
  };

  componentDidMount() {
    const { token } = this.props.match.params;
    jwt.verify(token, "SUPERSECRETPASSWORDSCHROCKEN", (err, decodedData) => {
      if (err) {
        this.setState({ jwtError: true });
      } else {
        this.setState({
          fullName: decodedData.fullName,
          organizationName: decodedData.organizationName,
          collaboratorTypeId: decodedData.collaboratorTypeId,
          collaboratorType: decodedData.collaboratorType,
          collaboratorRoleId: decodedData.collaboratorRoleId,
          collaboratorRole: decodedData.collaboratorRole,
          ecosystemTypeId: decodedData.ecosystemTypeId,
          ecosystemName: decodedData.ecosystemName,
          superadminEmail: decodedData.superadminEmail
        });
      }
    });
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.auth) {
      if (nextProps.auth.register.userExists === false) {
        this.setState({ dialog: true });
      } else if (nextProps.auth.register.userExists === true) {
        this.setState(prevState => ({
          errors: {
            ...prevState.errors,
            superadminEmail: true,
            userExists: true
          }
        }));
      }
    }
  }

  handleChange = e => {
    const { name } = e.target;
    this.setState({ [e.target.name]: e.target.value });
    this.setState(prevState => ({
      errors: {
        ...prevState.errors,
        [name]: false
      }
    }));
  };

  ShowPassword = () => {
    this.setState({ showPassword: !this.state.showPassword });
  };

  handleCheck = () => {
    this.setState({ emailPromotion: !this.state.emailPromotion });
  };

  onSubmit = e => {
    e.preventDefault();
    if (this.state.fullName === "") {
      this.setState(prevState => ({
        errors: {
          ...prevState.errors,
          fullName: true
        }
      }));
    } else if (this.state.organizationName === "") {
      this.setState(prevState => ({
        errors: {
          ...prevState.errors,
          organizationName: true
        }
      }));
    } else if (this.state.collaboratorType === "") {
      this.setState(prevState => ({
        errors: {
          ...prevState.errors,
          collaboratorType: true
        }
      }));
    } else if (this.state.collaboratorRole === "") {
      this.setState(prevState => ({
        errors: {
          ...prevState.errors,
          collaboratorRole: true
        }
      }));
    } else if (this.state.superadminEmail === "") {
      this.setState(prevState => ({
        errors: {
          ...prevState.errors,
          superadminEmail: true
        }
      }));
    } else if (this.state.superadminPassword.length < 5) {
      this.setState(prevState => ({
        errors: {
          ...prevState.errors,
          superadminPassword: true
        }
      }));
    } else {
      const signUpData = {
        fullName: this.state.fullName,
        organizationName: this.state.organizationName,
        collaboratorTypeId: this.state.collaboratorTypeId,
        collaboratorType: this.state.collaboratorType,
        collaboratorRoleId: this.state.collaboratorRoleId,
        collaboratorRole: this.state.collaboratorRole,
        ecosystemTypeId: this.state.ecosystemTypeId,
        ecosystemName: this.state.ecosystemName,
        superadminEmail: this.state.superadminEmail,
        superadminPassword: this.state.superadminPassword,
        emailPromotion: this.state.emailPromotion ? 1 : 0
      };
      this.props.registerUser(signUpData, this.props.history);
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        {this.state.jwtError ? (
          <Grid
            item
            xs={12}
            md={8}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Typography
              variant="h4"
              className={classes.header4}
              color="primary"
            >
              Something wrong. Please try agian.
            </Typography>
          </Grid>
        ) : (
          <React.Fragment>
            <Grid item xs={12} md={8}>
              <div className={classes.main}>
                <Typography
                  variant="h4"
                  className={classes.header4}
                  color="secondary"
                >
                  Sign Up for an Account
                </Typography>
                <Typography variant="subtitle1">
                  Get Started with Schrocken Account.
                </Typography>
                <Typography
                  variant="subtitle1"
                  gutterBottom
                  className={classes.nfoText}
                >
                  Just enter details and verify your account. All fields are
                  manditory.
                </Typography>
                <form onSubmit={this.onSubmit} autoComplete="off">
                  <Card raised>
                    <CardContent className={classes.cardContent}>
                      <TextField
                        label="Full Name *"
                        type="text"
                        name="fullName"
                        variant="outlined"
                        fullWidth
                        value={this.state.fullName}
                        onChange={this.handleChange}
                        error={this.state.errors.fullName}
                        className={classes.textFieldMargin}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              &nbsp;
                            </InputAdornment>
                          )
                        }}
                      />
                      <TextField
                        label="Company Name *"
                        type="text"
                        name="organizationName"
                        variant="outlined"
                        fullWidth
                        value={this.state.organizationName}
                        onChange={this.handleChange}
                        error={this.state.errors.organizationName}
                        className={classes.textFieldMargin}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              &nbsp;
                            </InputAdornment>
                          )
                        }}
                      />
                      <TextField
                        label="Collaborator Type *"
                        type="text"
                        name="collaboratorType"
                        variant="outlined"
                        value={this.state.collaboratorType}
                        onChange={this.handleChange}
                        error={this.state.errors.collaboratorType}
                        fullWidth
                        disabled
                        className={classes.textFieldMargin}
                        style={{
                          width: "47%",
                          marginRight: "6%"
                        }}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              &nbsp;
                            </InputAdornment>
                          )
                        }}
                      />
                      <TextField
                        label="Role *"
                        type="text"
                        name="collaboratorRole"
                        variant="outlined"
                        value={this.state.collaboratorRole}
                        onChange={this.handleChange}
                        error={this.state.errors.collaboratorRole}
                        fullWidth
                        disabled
                        className={classes.textFieldMargin}
                        style={{ width: "47%" }}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              &nbsp;
                            </InputAdornment>
                          )
                        }}
                      />
                      <TextField
                        label="Email *"
                        type="email"
                        name="superadminEmail"
                        variant="outlined"
                        value={this.state.superadminEmail}
                        onChange={this.handleChange}
                        error={this.state.errors.superadminEmail}
                        helperText={
                          this.state.errors.userExists
                            ? "Email already exists. Please login"
                            : null
                        }
                        fullWidth
                        disabled
                        className={classes.textFieldMargin}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              &nbsp;
                            </InputAdornment>
                          )
                        }}
                      />
                      <TextField
                        label="Password *"
                        name="superadminPassword"
                        variant="outlined"
                        fullWidth
                        type={this.state.showPassword ? "text" : "password"}
                        value={this.state.superadminPassword}
                        onChange={this.handleChange}
                        error={this.state.errors.superadminPassword}
                        helperText={
                          this.state.errors.superadminPassword
                            ? "Password length should be more than 4 characters"
                            : null
                        }
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="Toggle password visibility"
                                onClick={this.ShowPassword}
                              >
                                {this.state.showPassword ? (
                                  <Visibility />
                                ) : (
                                  <VisibilityOff />
                                )}
                              </IconButton>
                            </InputAdornment>
                          )
                        }}
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={this.state.checked}
                            onChange={this.handleCheck}
                            color="primary"
                          />
                        }
                        label={
                          <Typography
                            gutterBottom
                            style={{ marginTop: "0.5em" }}
                            variant="caption"
                          >
                            I&apos;m not interested in updates about Schrocken
                            products and services.
                            <a
                              href="/terms"
                              style={{
                                marginTop: "0.25em",
                                textDecoration: "none",
                                marginLeft: "0.2em"
                              }}
                            >
                              Privacy Policy.
                            </a>
                          </Typography>
                        }
                      />
                      <Typography gutterBottom variant='body2'>
                        By clicking &quot;Continue&quot;, I agree to
                        Schrocken&apos;s
                        <a
                          href="/terms"
                          style={{
                            textDecoration: "none",
                            marginLeft: "0.5rem"
                          }}
                        >
                          Terms of Service.
                        </a>
                      </Typography>
                      <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        style={{ marginTop: "0.5rem" }}
                      >
                        Continue
                      </Button>
                    </CardContent>
                  </Card>
                </form>
                <Footer />
              </div>
            </Grid>
            <Dialog fullScreen open={this.state.dialog}>
              <div style={{ textAlign: "center" }}>
                <img
                  src={LoadingGif}
                  alt="Loading"
                  style={{ width: "20rem", marginTop: "3rem" }}
                />
                <h1>Creating Your Blockchain Network</h1>
              </div>
            </Dialog>
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

MainRegister.propTypes = {
  classes: PropTypes.object.isRequired,
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default withStyles(styles)(
  connect(
    mapStateToProps,
    { registerUser }
  )(withRouter(MainRegister))
);
