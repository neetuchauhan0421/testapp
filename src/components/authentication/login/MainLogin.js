/*
 * Copyright (c) Schrocken Inc.
 * Author: Ravi Teja
 * File Description: Main login component (Right side in screen)
 */

import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { Visibility, VisibilityOff } from "@material-ui/icons";
import { withStyles } from "@material-ui/core/styles";
import {
  Grid,
  Card,
  CardContent,
  Button,
  Typography,
  TextField,
  IconButton,
  InputAdornment
  // FormControlLabel,
  // Checkbox,
} from "@material-ui/core";

import { StyleCss } from "../../../resources/css/style";

import Footer from "../footer/Footer";

import { loginUser } from "../../../containers/actions/authActions";

const styles = StyleCss;

class MainLogin extends Component {
  state = {
    superadminEmail: "",
    superadminPassword: "",
    rememberMe: false,
    showPassword: false,
    errors: {
      superadminEmail: false,
      superadminPassword: false,
      wrongData: false
    }
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.auth) {
      if (nextProps.auth.login.status === false) {
        this.setState(prevState => ({
          errors: {
            ...prevState.errors,
            superadminEmail: true,
            superadminPassword: true,
            wrongData: true
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
        [name]: false,
        wrongData: false
      }
    }));
  };

  ShowPassword = () => {
    this.setState({ showPassword: !this.state.showPassword });
  };

  handleCheck = () => {
    this.setState({ rememberMe: !this.state.rememberMe });
  };

  onSubmit = e => {
    e.preventDefault();
    if (this.state.superadminEmail === "") {
      this.setState(prevState => ({
        errors: {
          ...prevState.errors,
          superadminEmail: true
        }
      }));
    } else if (this.state.superadminPassword === "") {
      this.setState(prevState => ({
        errors: {
          ...prevState.errors,
          superadminPassword: true
        }
      }));
    } else {
      const signInData = {
        superadminEmail: this.state.superadminEmail,
        superadminPassword: this.state.superadminPassword,
        rememberMe: this.state.rememberMe ? 1 : 0
      };
      this.props.loginUser(signInData, this.props.history);
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <Grid item xs={12} md={8}>
        <div className={classes.main}>
          <Typography variant="h4" className={classes.header4}>
            Sign In
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Access your Schrocken Ecosystems
          </Typography>
          <Typography
            variant="subtitle1"
            gutterBottom
            className={classes.nfoText}
          >
            Enter your credentials
          </Typography>
          <form onSubmit={this.onSubmit} autoComplete="off">
            <Card raised>
              <CardContent className={classes.cardContent}>
                <TextField
                  label="Email"
                  name="superadminEmail"
                  type="email"
                  variant="outlined"
                  fullWidth
                  autoFocus
                  value={this.state.superadminEmail}
                  onChange={this.handleChange}
                  error={this.state.errors.superadminEmail}
                  helperText={
                    this.state.errors.wrongData
                      ? "Email/Password combination is wrong"
                      : null
                  }
                  className={classes.textFieldMargin}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">&nbsp;</InputAdornment>
                    )
                  }}
                />
                <TextField
                  label="Password"
                  name="superadminPassword"
                  variant="outlined"
                  fullWidth
                  type={this.state.showPassword ? "text" : "password"}
                  value={this.state.superadminPassword}
                  onChange={this.handleChange}
                  error={this.state.errors.superadminPassword}
                  helperText={
                    this.state.errors.wrongData
                      ? "Email/Password combination is wrong"
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
                {/* <FormControlLabel
                  control={(
                    <Checkbox
                      checked={this.state.rememberMe}
                      onChange={this.handleCheck}
                      color="primary"
                    />
)}
                  label="Remember me"
                /> */}
                <br />
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  style={{ marginTop: "1rem" }}
                >
                  Sign In
                </Button>
              </CardContent>
            </Card>
          </form>
          <Typography className={classes.forgot}>
            <Link
              to="/forgotPassword"
              style={{
                textDecoration: "none",
                color: "#333232",
                fontWeight: 500
              }}
            >
              Forgot Password ?
            </Link>
          </Typography>
          {/* <Typography
                        variant="subtitle1"
                        className={classes.haveAccount}
                    >
                        Don&apos;t have an account ?
                    </Typography>
                    <Link to="/register" style={{ textDecoration: 'none' }}>
                        <Button variant="outlined" color="secondary">
                            GET STARTED
                        </Button>
                    </Link> */}
          <Footer />
        </div>
      </Grid>
    );
  }
}

MainLogin.propTypes = {
  history: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default withStyles(styles)(
  connect(mapStateToProps, { loginUser })(withRouter(MainLogin))
);
