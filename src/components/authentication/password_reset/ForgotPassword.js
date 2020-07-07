/*
 * Copyright (c) Schrocken Inc.
 * Author: Ravi Teja
 * File Description: Forgot password component
 */

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  Grid, Typography, Card, CardContent, TextField, Button,
} from '@material-ui/core';
import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import Footer from '../footer/Footer';

import SchrockenLogo from '../../../resources/images/Schrocken-Logo-Dark.png';

import { forgotPassword } from '../../../containers/actions/authActions';

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginTop: '2%',
  },
  logoDark: {
    width: '23%',
  },
  bigForgot: {
    color: '#039be5',
    margin: '3% 0% 1% 0%',
    fontSize: '2.8rem',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: '1',
    flexShrink: '1',
    marginLeft: '30%',
    marginRight: '30%',
    marginTop: '2.5rem',
  },
  mainDiv: {
    textAlign: 'center',
  },
  enterEmail: {
    color: '#039be5',
    textAlign: 'left',
  },
  button: {
    marginTop: '1rem',
  },
  signUpButton: {
    display: 'inline-block',
    marginRight: '1.2rem',
    marginTop: '2rem',
  },
  emailSent: {
    padding: '5% 5% ',
    color: 'green',
  },
  emailSentText: {
    paddingLeft: '1.2rem',
    paddingRight: '1.2rem',
    paddingBottom: '1.2rem',
    textAlign: 'left',
  },
  [theme.breakpoints.down('sm')]: {
    card: {
      marginLeft: '10%',
      marginRight: '10%',
    },
    bigForgot: {
      fontSize: '2rem',
    },
    noWorries: {
      fontSize: '0.85rem',
    },
    logoDark: {
      width: '50%',
    },
  },
});

const theme = createMuiTheme({
  palette: {
    primary: { main: '#e36e39' },
    secondary: { main: '#039be5' },
  },
  typography: { useNextVariants: true },
});

class ForgotPassword extends Component {
  state = {
    superadminEmail: '',
    error: '',
    errorEmail: '',
    emailSent: false,
    message: '',
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.auth) {
      if (nextProps.auth.forgotPasswordResponse.status === true) {
        this.setState({
          emailSent: true,
          message: 'Email sent successfully',
        });
      } else {
        if (nextProps.auth.forgotPasswordResponse.errorType === 'email') {
          this.setState({
            error: 'Invalid email.',
          });
        }
        if (nextProps.auth.forgotPasswordResponse.message) {
          this.setState({
            message: 'Email does not exist.',
          });
        }
      }
    }
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.setState({ error: '', errorEmail: '', message: '' });

    if (this.state.superadminEmail === '') {
      this.setState({
        errorEmail: 'Please enter your email address.',
      });
    } else {
      const user = {
        superadminEmail: this.state.superadminEmail,
      };

      this.props.forgotPassword(user);
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <Grid container className={classes.root} direction="column" justify="center">
        <div className={classes.mainDiv}>
          <img src={SchrockenLogo} alt="logo" className={classes.logoDark} />
          <Typography variant="h3" className={classes.bigForgot}>
            Forgot Password
          </Typography>
          <Typography variant="subtitle1" className={classes.noWorries}>
            No worries. We will send you a reset link.
          </Typography>

          <div>
            <Card className={classes.card} raised>
              {this.state.emailSent ? (
                <div>
                  <Typography variant="h6" className={classes.emailSent}>
                    Email sent successfully!
                  </Typography>
                  <Typography variant="subtitle2" className={classes.emailSentText} gutterBottom>
                    We have sent an email with a link to reset your password. Please use it to
                    change password and sign back in.
                  </Typography>
                </div>
              ) : (
                <form onSubmit={this.onSubmit}>
                  <CardContent className={classes.CardContent}>
                    <Typography variant="body1" className={classes.enterEmail}>
                      Your Email Address
                    </Typography>
                    <TextField
                      id="outlined-email-input"
                      label="Email"
                      value={this.state.superadminEmail}
                      onChange={this.handleChange}
                      className={classes.textField}
                      type="email"
                      name="superadminEmail"
                      margin="normal"
                      variant="outlined"
                      fullWidth
                    />
                    {/* show errors */}
                    {this.state.errorEmail && (
                      <Typography
                        variant="caption"
                        style={{
                          color: 'red',
                          textAlign: 'left',
                        }}
                        gutterBottom
                      >
                        {this.state.errorEmail}
                      </Typography>
                    )}
                    {this.state.error && (
                      <Typography
                        variant="caption"
                        style={{
                          color: 'red',
                          textAlign: 'left',
                        }}
                        gutterBottom
                      >
                        {this.state.error}
                      </Typography>
                    )}
                    {this.state.message && (
                      <Typography
                        variant="caption"
                        style={{
                          color: 'red',
                          textAlign: 'left',
                        }}
                        gutterBottom
                      >
                        {this.state.message}
                      </Typography>
                    )}
                    <MuiThemeProvider theme={theme}>
                      <Button
                        variant="contained"
                        color="secondary"
                        className={classes.button}
                        type="submit"
                      >
                        Reset Password
                      </Button>
                    </MuiThemeProvider>
                  </CardContent>
                </form>
              )}
            </Card>
          </div>
          <Typography variant="subtitle2" className={classes.signUpButton}>
            Remember Password ?
          </Typography>
          <Link to="/login" style={{ textDecoration: 'none' }}>
            <MuiThemeProvider theme={theme}>
              <Button variant="contained" color="primary">
                Sign In
              </Button>
            </MuiThemeProvider>
          </Link>
          <Footer />
        </div>
      </Grid>
    );
  }
}

ForgotPassword.propTypes = {
  classes: PropTypes.object.isRequired,
  forgotPassword: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default withStyles(styles)(
  connect(
    mapStateToProps,
    { forgotPassword },
  )(ForgotPassword),
);
