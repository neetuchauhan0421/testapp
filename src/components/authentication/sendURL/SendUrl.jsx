/*
 * Copyright (c) Schrocken Inc.
 * Author: Ravi Teja
 * File Description: URL generator component
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import jwt from 'jsonwebtoken';

import {
  Grid, TextField, Typography, Button,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  header4: {
    marginBottom: '1rem',
  },
  textFieldMargin: {
    marginBottom: '0.7rem',
  },
};

class SendUrl extends Component {
  state = {
    fullName: '',
    organizationName: '',
    collaboratorTypeId: '',
    collaboratorType: '',
    collaboratorRoleId: '',
    collaboratorRole: '',
    ecosystemTypeId: '',
    ecosystemName: '',
    superadminEmail: '',
    url: '',
    link: '',
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  generateURL = (e) => {
    e.preventDefault();
    const tokenData = {
      fullName: this.state.fullName,
      organizationName: this.state.organizationName,
      collaboratorTypeId: this.state.collaboratorTypeId,
      collaboratorType: this.state.collaboratorType,
      collaboratorRoleId: this.state.collaboratorRoleId,
      collaboratorRole: this.state.collaboratorRole,
      ecosystemTypeId: this.state.ecosystemTypeId,
      ecosystemName: this.state.ecosystemName,
      superadminEmail: this.state.superadminEmail,
    };
    const token = jwt.sign(tokenData, 'SUPERSECRETPASSWORDSCHROCKEN');
    const link = `${this.state.url}/register/${token}`;
    this.setState({ link });
  };

  render() {
    const { classes } = this.props;
    return (
      <Grid
        container
        direction="row"
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          display: 'flex',
        }}
      >
        <Grid
          item
          xs={12}
          md={8}
          lg={6}
          style={{
            margin: '2rem 1rem 0rem 1rem',
            textAlign: 'center',
            textOverflow: 'scrool',
          }}
        >
          <Typography variant="h4" color="secondary" className={classes.header4}>
            URL Generation Form
          </Typography>
          <form onSubmit={this.generateURL}>
            <TextField
              label="Full Name *"
              type="text"
              name="fullName"
              variant="outlined"
              fullWidth
              value={this.state.fullName}
              onChange={this.handleChange}
              className={classes.textFieldMargin}
            />
            <TextField
              label="Company Name *"
              type="text"
              name="organizationName"
              variant="outlined"
              fullWidth
              value={this.state.organizationName}
              onChange={this.handleChange}
              className={classes.textFieldMargin}
            />
            <TextField
              label="collaborator Type Id *"
              type="text"
              name="collaboratorTypeId"
              variant="outlined"
              fullWidth
              value={this.state.collaboratorTypeId}
              onChange={this.handleChange}
              className={classes.textFieldMargin}
              style={{
                width: '48%',
                marginRight: '4%',
              }}
            />
            <TextField
              label="Collaborator Type *"
              type="text"
              name="collaboratorType"
              variant="outlined"
              fullWidth
              value={this.state.collaboratorType}
              onChange={this.handleChange}
              className={classes.textFieldMargin}
              style={{
                width: '48%',
              }}
            />
            <TextField
              label="Collaborator Role Id *"
              type="text"
              name="collaboratorRoleId"
              variant="outlined"
              fullWidth
              value={this.state.collaboratorRoleId}
              onChange={this.handleChange}
              className={classes.textFieldMargin}
              style={{
                width: '48%',
                marginRight: '4%',
              }}
            />
            <TextField
              label="Collaborator Role *"
              type="text"
              name="collaboratorRole"
              variant="outlined"
              fullWidth
              value={this.state.collaboratorRole}
              onChange={this.handleChange}
              className={classes.textFieldMargin}
              style={{
                width: '48%',
              }}
            />
            <TextField
              label="Ecosystem Type Id *"
              type="text"
              name="ecosystemTypeId"
              variant="outlined"
              fullWidth
              value={this.state.ecosystemTypeId}
              onChange={this.handleChange}
              className={classes.textFieldMargin}
              style={{
                width: '48%',
                marginRight: '4%',
              }}
            />
            <TextField
              label="Ecosystem Name *"
              type="text"
              name="ecosystemName"
              variant="outlined"
              fullWidth
              value={this.state.ecosystemName}
              onChange={this.handleChange}
              className={classes.textFieldMargin}
              style={{
                width: '48%',
              }}
            />
            <TextField
              label="Email *"
              type="text"
              name="superadminEmail"
              variant="outlined"
              fullWidth
              value={this.state.superadminEmail}
              onChange={this.handleChange}
              className={classes.textFieldMargin}
            />
            <TextField
              label="URL *"
              type="text"
              name="url"
              variant="outlined"
              value={this.state.url}
              onChange={this.handleChange}
              fullWidth
            />
            <Button variant="contained" color="primary" type="submit" style={{ marginTop: '1rem' }}>
              Continue
            </Button>
          </form>
          <Typography
            variant="subtitle1"
            gutterBottom
            style={{
              marginTop: '1rem',
              width: '100%',
              overflow: 'scroll',
            }}
          >
            {this.state.link}
          </Typography>
        </Grid>
      </Grid>
    );
  }
}

SendUrl.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SendUrl);
