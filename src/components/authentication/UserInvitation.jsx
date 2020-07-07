/*
 * Copyright (c) Schrocken Inc.
 * Author: Ravi Teja
 * File Description: Screen for user invitation for ecosystem
 */
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import {
  Grid,
  Button,
  Typography,
  TextField,
  IconButton,
  InputAdornment,
  CircularProgress
} from "@material-ui/core";
import { VisibilityOff, Visibility } from "@material-ui/icons";
import { withStyles } from "@material-ui/core/styles";

import SchrockenLogo from "../../resources/images/Schrocken-Logo-Dark.png";

import {
  checkUserInvite,
  joinNetwork
} from "../../containers/actions/authActions";

const styles = {
  logo: {
    width: "13rem"
  },
  displayChecks: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: "0.8rem"
  },
  joinButton: {
    borderRadius: "1.2rem",
    marginTop: "2rem",
    padding: "0.7rem 3.5rem",
    backgroundColor: "green",
    color: "#ffffff",
    "&:hover": {
      backgroundColor: "darkgreen"
    }
  }
};

class UserInvitation extends Component {
  state = {
    loading: true,
    showPassword: false,
    ecosystemTypeName: "",
    organizationName: "",
    collaboratorTypeName: "",
    roleName: "",
    emailAddress: "",
    password: "",
    ecosystemId: "",
    saasUserId: "",
    fullName: "",
    organizationId: "",
    btnDisable: false,
    errors: {
      fullName: false,
      password: false
    }
  };

  componentDidMount() {
    const invitedUserToken = {
      token: this.props.match.params.token
    };
    this.props.checkUserInvite(invitedUserToken);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.auth.invitedUserData) {
      const userData = nextProps.auth.invitedUserData;
      this.setState({
        loading: false,
        ecosystemTypeName: userData.ecosystemTypeName,
        organizationName: userData.organizationName,
        collaboratorTypeName: userData.collaboratorTypeName,
        roleName: userData.roleName,
        emailAddress: userData.emailAddress,
        ecosystemId: userData.ecosystemId,
        saasUserId: userData.saasUserId,
        fullName: userData.fullName,
        organizationId: userData.organizationId,
        password: userData.password === "0" ? null : ""
      });
    }
  }

  onChange = e => {
    const field = e.target.name;
    this.setState({ [e.target.name]: e.target.value });
    this.setState(prevState => ({
      errors: {
        ...prevState.errors,
        [field]: false
      }
    }));
  };

  ShowPassword = () => {
    this.setState(prevState => ({
      ...prevState,
      showPassword: !prevState.showPassword
    }));
  };

  onSubmit = () => {
    if (this.state.fullName === "") {
      this.setState(prevState => ({
        errors: {
          ...prevState.errors,
          fullName: true
        }
      }));
    } else if (this.state.password === "") {
      this.setState(prevState => ({
        errors: {
          ...prevState.errors,
          password: true
        }
      }));
    } else {
      const userData = {
        ecosystemTypeName: this.state.ecosystemTypeName,
        organizationName: this.state.organizationName,
        collaboratorTypeName: this.state.collaboratorTypeName,
        roleName: this.state.roleName,
        emailAddress: this.state.emailAddress,
        password: this.state.password,
        organizationId: this.state.organizationId,
        ecosystemId: this.state.ecosystemId,
        saasUserId: this.state.saasUserId,
        fullName: this.state.fullName
      };
      this.props.joinNetwork(userData, this.props.history);
      this.setState({ btnDisable: true });
    }
  };

  render() {
    const { classes } = this.props;
    const { fullName, password } = this.state.errors;
    if (this.state.loading) {
      return (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100vh"
          }}
        >
          <CircularProgress style={{ color: "primary" }} thickness={7} />
        </div>
      );
    }
    return (
      <Grid
        container
        justify="center"
        style={{ backgroundColor: "#eeeeee", minHeight: "100vh" }}
      >
        <Grid
          item
          xs={12}
          md={8}
          lg={6}
          style={{
            textAlign: "center",
            marginTop: "3rem"
          }}
        >
          <img src={SchrockenLogo} alt="logo" className={classes.logo} />
          <div
            style={{
              width: "100%",
              backgroundColor: "#ffffff",
              borderRadius: "1rem",
              margin: "3rem 0rem",
              padding: "2rem"
            }}
          >
            <Typography variant="h5" gutterBottom>
              Join
              {this.state.ecosystemTypeName}
              Ecosystem
            </Typography>
            <Typography variant="body1">
              Confirm your details given below
            </Typography>
            <Grid container>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Full Name"
                  name="fullName"
                  value={this.state.fullName}
                  onChange={this.onChange}
                  margin="normal"
                  variant="outlined"
                  fullWidth
                  style={{ marginRight: "0.5rem" }}
                  error={fullName}
                  helperText={fullName ? "Please enter name." : null}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Company"
                  name="organizationName"
                  value={this.state.organizationName}
                  onChange={this.onChange}
                  margin="normal"
                  variant="outlined"
                  fullWidth
                  style={{ marginLeft: "0.5rem" }}
                  required
                  disabled
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Email"
                  name="emailAddress"
                  value={this.state.emailAddress}
                  onChange={this.onChange}
                  disabled
                  margin="normal"
                  variant="outlined"
                  fullWidth
                  style={{ marginRight: "0.5rem" }}
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Password"
                  name="password"
                  type={this.state.showPassword ? "text" : "password"}
                  value={
                    this.state.password === false
                      ? "*******"
                      : this.state.password
                  }
                  onChange={this.onChange}
                  disabled={this.state.password === null}
                  margin="normal"
                  variant="outlined"
                  fullWidth
                  error={password}
                  helperText={password ? "Please enter password." : null}
                  InputProps={{
                    maxLength: 100,
                    minLength: 4,
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="Toggle password visibility"
                          onClick={this.ShowPassword}
                        >
                          {this.state.showPassword === false ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                  style={{ marginLeft: "0.5rem" }}
                />
              </Grid>
            </Grid>
            <Typography
              variant="body1"
              gutterBottom
              style={{ marginTop: "2rem", color: "#999999" }}
            >
              Assigned role in the Ecosystem
            </Typography>
            <Grid container>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Collaborator Type"
                  name="collaboratorTypeName"
                  value={this.state.collaboratorTypeName}
                  onChange={this.onChange}
                  disabled
                  margin="normal"
                  variant="outlined"
                  fullWidth
                  style={{ marginRight: "0.5rem" }}
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Role"
                  name="roleName"
                  value={this.state.roleName}
                  onChange={this.onChange}
                  disabled
                  margin="normal"
                  variant="outlined"
                  fullWidth
                  style={{ marginLeft: "0.5rem" }}
                  required
                />
              </Grid>
            </Grid>
            <Button
              variant="contained"
              disabled={this.state.btnDisable}
              className={classes.joinButton}
              onClick={this.onSubmit}
            >
              Join Ecosystem
            </Button>
          </div>
        </Grid>
      </Grid>
    );
  }
}

UserInvitation.propTypes = {
  classes: PropTypes.object.isRequired,
  checkUserInvite: PropTypes.func.isRequired,
  joinNetwork: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default withStyles(styles)(
  connect(mapStateToProps, { checkUserInvite, joinNetwork })(
    withRouter(UserInvitation)
  )
);
