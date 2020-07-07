/* eslint-disable react/jsx-filename-extension */
/*
 * Copyright (c) Schrocken Inc.
 * Author: Ravi Teja
 * File Description: Reset password component
 */

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import {
  Grid, Card, CardContent, Button, Typography, TextField,
} from '@material-ui/core';

import Footer from '../footer/Footer';

import SchrockenLogo from '../../../resources/images/Schrocken-Logo-Dark.png';

import { resetPassword } from '../../../containers/actions/authActions';

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginTop: '2%',
  },
  logoDark: {
    width: '23%',
  },
  bigReset: {
    color: '#039be5',
    marginTop: '3%',
    fontSize: '2.8rem',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: '1',
    flexShrink: '1',
    width: '40%',
    marginLeft: '30%',
    marginRight: '30%',
    marginTop: '1rem',
  },
  mainDiv: {
    textAlign: 'center',
  },
  signUpButton: {
    display: 'inline-block',
    marginRight: '1.2rem',
    marginTop: '2rem',
  },
  passChanged: {
    padding: '3% 5% ',
    color: 'green',
    textAlign: 'left',
  },
  passChangedText: {
    padding: '3% 5%',
    textAlign: 'left',
  },
  error: {
    color: 'red',
    fontSize: '0.8rem',
    textAlign: 'left',
  },
  button: {
    marginTop: '0.8rem',
  },
  smallChecks: {
    marginLeft: '0.5rem',
  },
  displayChecks: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textField: {
    marginTop: '0.5rem',
  },
  [theme.breakpoints.down('sm')]: {
    card: {
      width: '80%',
      marginLeft: '10%',
      marginRight: '10%',
    },
    bigReset: {
      fontSize: '2rem',
    },
    logoDark: {
      width: '50%',
    },
    displayChecks: {
      flexDirection: 'column',
      alignItems: 'flex-start',
      textAlign: 'left',
    },
  },
});

class ResetPassword extends Component {
  state = {
    password: '',
    confirmpassword: '',
    passwordChanged: false,
    errPassword: false,
    message: false,
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    this.setState({
      errPassword: false,
    });
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.auth) {
      if (nextProps.auth.resetPasswordResponse.status === true) {
        this.setState({
          passwordChanged: true,
          message: 'Password changed successfully',
        });
      } else if (nextProps.auth.resetPasswordResponse.errorType === 'JsonWebTokenError') {
        this.setState({
          message: true,
        });
      }
    }
  }

  onSubmit = (e) => {
    e.preventDefault();
    if (this.state.password !== this.state.confirmpassword) {
      this.setState({ errPassword: true });
    } else {
      const userData = {
        jwtToken: this.props.match.params.token,
        password: this.state.password,
        confirmpassword: this.state.confirmpassword,
      };
      this.props.resetPassword(userData);
    }
  };

  render() {
    const { classes } = this.props;

    return (
      <Grid container className={classes.root} direction="column" justify="center">
        <div className={classes.mainDiv}>
          <img src={SchrockenLogo} alt="logo" className={classes.logoDark} />
          <Typography variant="h3" className={classes.bigReset}>
            Reset Password
          </Typography>
          <Card className={classes.card} raised>
            {this.state.passwordChanged ? (
              <div>
                <CardContent>
                  <Typography variant="h6" className={classes.passChanged}>
                    Password changed successfully!
                  </Typography>
                  <Typography variant="subtitle2" className={classes.passChangedText} gutterBottom>
                    Your password has been changed. Please sign back in.
                  </Typography>
                  <Link to="/login" style={{ textDecoration: 'none' }}>
                    <Button variant="contained" color="primary">
                      sign In
                    </Button>
                  </Link>
                </CardContent>
              </div>
            ) : (
              <form onSubmit={this.onSubmit}>
                <CardContent className={classes.CardContent}>
                  <TextField
                    id="outlined-email"
                    label="Password"
                    value={this.state.password}
                    onChange={this.handleChange}
                    required
                    type="password"
                    name="password"
                    margin="normal"
                    variant="outlined"
                    error={this.state.errPassword}
                    helperText={this.state.errPassword ? 'Password not matched' : null}
                    fullWidth
                    inputProps={{
                      maxLength: 100,
                      minLength: 4,
                    }}
                  />
                  <TextField
                    id="outlined-email-input"
                    label="Confirm Password"
                    value={this.state.confirmpassword}
                    onChange={this.handleChange}
                    error={this.state.errPassword}
                    helperText={this.state.errPassword ? 'Password not matched' : null}
                    className={classes.textField}
                    type="password"
                    name="confirmpassword"
                    margin="normal"
                    variant="outlined"
                    required
                    fullWidth
                    inputProps={{
                      maxLength: 100,
                      minLength: 4,
                    }}
                  />

                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    type="submit"
                  >
                    Continue
                  </Button>
                </CardContent>
              </form>
            )}
          </Card>
          <Typography variant="subtitle2" className={classes.signUpButton}>
            Remember Password ?
          </Typography>
          <Link to="/login" style={{ textDecoration: 'none' }}>
            <Button variant="outlined" color="secondary">
              Sign In
            </Button>
          </Link>
          <Footer />
        </div>
      </Grid>
    );
  }
}

ResetPassword.propTypes = {
  match: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  resetPassword: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default withStyles(styles)(
  connect(
    mapStateToProps,
    { resetPassword },
  )(ResetPassword),
);
