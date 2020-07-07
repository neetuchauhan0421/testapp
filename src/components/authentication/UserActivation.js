/*
 * Copyright (c) Schrocken Inc.
 * Author: Ravi Teja
 * File Description: Email activation screen
 */

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  Grid, Button, Typography, CircularProgress,
} from '@material-ui/core';

import { withStyles } from '@material-ui/core/styles';

import { StyleCss } from '../../resources/css/style';

import LogoDark from '../../resources/images/Schrocken-Logo-Dark.png';

import { activateUser } from '../../containers/actions/authActions';

const styles = StyleCss;

class UserActivation extends Component {
  state = {
    success: null,
  };

  componentDidMount() {
    const activationToken = {
      token: this.props.match.params.token,
    };
    this.props.activateUser(activationToken);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.activateUser) {
      if (nextProps.auth.activateUser.status === false) {
        this.setState({ success: false });
      }
      if (nextProps.auth.activateUser.status === true) {
        this.setState({ success: true });
        setTimeout(() => {
          this.props.history.push('/login');
        }, 5000);
      }
    }
  }

  render() {
    if (this.state.success === null) {
      return (
        <div style={{ textAlign: 'center', marginTop: '10%' }}>
          <CircularProgress style={{ color: '#2196F3' }} thickness={7} />
        </div>
      );
    }
    if (this.state.success === true) {
      return (
        <Grid container justify="center">
          <Grid item xs={12} md={6} style={{ textAlign: 'center', marginTop: '5rem' }}>
            <img src={LogoDark} alt="logo" style={{ width: '15rem' }} />
            <Typography variant="h4" gutterBottom style={{ margin: '2rem 0', color: 'green' }}>
              Authentication Successful
            </Typography>
            <Typography variant="body1" gutterBottom>
              Congratulations! your email has been verified for Schrocken account.
            </Typography>
            <Typography variant="body1" gutterBottom style={{ margin: '1rem 0' }}>
              You will be redirected to login page in 5 seconds or click here to access login page
              directly.
            </Typography>
            <Link to="/login" style={{ textDecoration: 'none' }}>
              <Button variant="contained" color="primary">
                Login
              </Button>
            </Link>
          </Grid>
        </Grid>
      );
    }
    if (this.state.success === false) {
      return (
        <Grid container justify="center">
          <Grid item xs={12} md={6} style={{ textAlign: 'center', marginTop: '5rem' }}>
            <img src={LogoDark} alt="logo" style={{ width: '15rem' }} />
            <Typography variant="h4" gutterBottom style={{ margin: '2rem 0', color: 'red' }}>
              Authentication Failure!
            </Typography>
            <Typography variant="body1" gutterBottom>
              Hello, your email was not verified with Schrocken because we received the response
              from you after 24 hours.
            </Typography>
            <Typography variant="body1" gutterBottom style={{ margin: '1rem 0' }}>
              To assure security, we request you to sign-up again by clicking the link below.
            </Typography>
            <Link to="/register" style={{ textDecoration: 'none' }}>
              <Button variant="contained" color="primary">
                Sign Up Here
              </Button>
            </Link>
          </Grid>
        </Grid>
      );
    }
  }
}

UserActivation.propTypes = {
  auth: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  activateUser: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default withStyles(styles)(
  connect(
    mapStateToProps,
    { activateUser },
  )(UserActivation),
);
