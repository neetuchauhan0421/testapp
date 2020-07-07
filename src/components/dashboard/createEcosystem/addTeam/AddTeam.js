/*
 * Copyright (c) Schrocken Inc.
 * Author: Ravi Teja
 * File Description: Component for adding people to ecosystem
 */

/* eslint-disable no-console */
import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import {
  Grid,
  Typography,
  OutlinedInput,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Paper,
  Tabs,
  Tab,
  TextField,
  Button,
} from '@material-ui/core';

import Roles from './Roles';
import SearchUsers from './searchUsers/SearchUsers';
import AddedPeople from '../addedPeople/AddedPeople';

import {
  getCollaborators,
  getRoles,
  sendInvite,
} from '../../../../containers/actions/ecosystemActions';

// eslint-disable-next-line no-unused-vars
const styles = theme => ({
  paper: {
    flexGrow: 1,
  },
});

class AddTeam extends Component {
  state = {
    collaborators: [],
    roles: [],
    collaboratorTypeId: '',
    collaboratorTypeName: '',
    roleId: '',
    roleName: '',
    fullName: '',
    orgName: '',
    emailAddress: '',
    labelWidth: 0,
    value: 0,
    errcollaborator: false,
    errRole: false,
    errFullName: false,
    errorOrg: false,
    errorUser: false,
    errorOrgText: '',
    errorEmailInfo: '',
  };

  componentDidMount() {
    this.setState({
      // eslint-disable-next-line react/no-find-dom-node
      labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth,
    });
    const ecosystemId = {
      ecosystemTypeId: this.props.ecosystems.selectedEcosystem.ecosystemTypeId,
    };
    this.props.getCollaborators(ecosystemId);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.ecosystems.collaborators) {
      this.setState({
        collaborators: nextProps.ecosystems.collaborators,
      });
    }
    if (nextProps.ecosystems.roles) {
      this.setState({ roles: nextProps.ecosystems.roles });
    }
    if (nextProps.ecosystems.errorInvite) {
      if (nextProps.ecosystems.errorInvite.status === false) {
        if (nextProps.ecosystems.errorInvite.errorType === 'organization') {
          this.setState({
            errorOrg: true,
            errorOrgText: `Please use existing organization name for this user. ${
              nextProps.ecosystems.errorInvite.organizationName
            }`,
          });
        }
        if (nextProps.ecosystems.errorInvite.errorType === 'user') {
          this.setState({
            errorUser: true,
            errorEmailInfo: 'User already exist',
          });
        }
      }
    }

    if (nextProps.ecosystems.inviteSuccess) {
      this.setState({
        collaboratorTypeId: '',
        roleId: '',
        fullName: '',
        orgName: '',
        emailAddress: '',
        errorInvite: false,
        errorOrg: false,
        errorUser: false,
      });
    }
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
    this.setState({ errcollaborator: false });
    this.state.collaborators.forEach((item) => {
      if (item.collaboratorTypeId === event.target.value) {
        this.setState({
          collaboratorTypeName: item.collaboratorTypeName,
        });
        const role = {
          collaboratorTypeId: item.collaboratorTypeId,
        };
        this.props.getRoles(role);
        this.setState({ roleId: '' });
      }
    });
  };

  handleChangeRole = (event) => {
    this.setState({ [event.target.name]: event.target.value });
    this.state.roles.forEach((item) => {
      if (item.roleId === event.target.value) {
        this.setState({ roleName: item.roleName });
      }
    });
    this.setState({ errRole: false });
  };

  handleChangeData = (event) => {
    this.setState({ [event.target.name]: event.target.value });
    if (event.target.name === 'fullName') {
      this.setState({ errFullName: false });
    }
    if (event.target.name === 'orgName') {
      this.setState({ errOrganizationName: false });
    }
    if (event.target.name === 'emailAddress') {
      this.setState({ errEmailAddress: false });
    }
  };

  handleChangeTab = (event, value) => {
    this.setState({ value });
  };

  addUser = (org, email) => {
    if (this.state.collaboratorTypeName === '') {
      this.setState({ errcollaborator: true });
    } else if (this.state.roleName === '') {
      this.setState({ errRole: true });
    } else {
      const inviteUser = {
        ecosystemTypeId: this.props.ecosystems.selectedEcosystem.ecosystemTypeId,
        collaboratorTypeId: this.state.collaboratorTypeId,
        collaboratorTypeName: this.state.collaboratorTypeName,
        roleId: this.state.roleId,
        roleName: this.state.roleName,
        fullName: this.state.fullName,
        organizationName: org,
        emailAddress: email,
      };
      this.props.sendInvite(inviteUser);
      this.setState({
        collaboratorTypeName: '',
        roleName: '',
      });
    }
  };

  sendInvite = (e) => {
    e.preventDefault();
    if (this.state.collaboratorTypeId === '') {
      this.setState({ errcollaborator: true });
    } else if (this.state.roleId === '') {
      this.setState({ errRole: true });
    } else if (this.state.fullName === '') {
      this.setState({ errFullName: true });
    } else if (this.state.orgName === '') {
      this.setState({
        errorOrg: true,
        errorOrgText: 'Please enter organization name.',
      });
    } else if (this.state.emailAddress === '') {
      this.setState({
        errorUser: true,
        errorEmailInfo: 'Please enter email address.',
      });
    } else {
      const inviteUser = {
        ecosystemTypeId: this.props.ecosystems.selectedEcosystem.ecosystemTypeId,
        collaboratorTypeId: this.state.collaboratorTypeId,
        collaboratorTypeName: this.state.collaboratorTypeName,
        roleId: this.state.roleId,
        roleName: this.state.roleName,
        fullName: this.state.fullName,
        organizationName: this.state.orgName,
        emailAddress: this.state.emailAddress,
      };
      this.props.sendInvite(inviteUser);
    }
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;
    const Collaborator = this.state.collaborators.map((collaborator, i) => (
      <MenuItem value={collaborator.collaboratorTypeId} key={i}>
        {collaborator.collaboratorTypeName}
      </MenuItem>
    ));
    return (
      <Fragment>
        <Grid container>
          <Grid item lg={2} />
          <Grid item xs={12} lg={8}>
            <Typography
              component="h2"
              style={{
                fontSize: '2rem',
                margin: '1rem',
                textAlign: 'center',
              }}
            >
              Add Stakeholders
            </Typography>
            <form autoComplete="off" style={{ display: 'flex', marginBottom: '2rem' }}>
              <FormControl variant="outlined" style={{ width: '58%', marginRight: '1rem' }}>
                <InputLabel
                  ref={(ref) => {
                    this.InputLabelRef = ref;
                  }}
                  required
                >
                  Select Collaborator Type
                </InputLabel>
                <Select
                  error={this.state.errcollaborator}
                  value={this.state.collaboratorTypeId}
                  onChange={this.handleChange}
                  input={
                    <OutlinedInput labelWidth={this.state.labelWidth} name="collaboratorTypeId" />
                  }
                >
                  {Collaborator}
                </Select>
                <Typography component="p" style={{ marginTop: '0.5rem' }}>
                  Invite your partners&apos; representatives and your team members to join this
                  ecosystem.
                </Typography>
              </FormControl>
              <Roles
                handleChangeRole={this.handleChangeRole}
                roleId={this.state.roleId}
                errorvalue={this.state.errRole}
              />
            </form>
            <Paper className={classes.paper}>
              <Tabs
                value={this.state.value}
                onChange={this.handleChangeTab}
                indicatorColor="primary"
                textColor="primary"
                centered
              >
                <Tab label="INVITE NEW MEMBER" />
                <Tab label="SEARCH AND ADD FROM EXISTING" />
              </Tabs>
            </Paper>
            {value === 0 && (
              <form
                noValidate
                style={{ textAlign: 'center' }}
                onSubmit={this.sendInvite}
                autoComplete="off"
              >
                <TextField
                  error={this.state.errFullName}
                  label="Full Name"
                  margin="normal"
                  variant="outlined"
                  helperText="Your partner's representative."
                  style={{
                    width: '49%',
                    marginRight: '1rem',
                  }}
                  name="fullName"
                  value={this.state.fullName}
                  onChange={this.handleChangeData}
                  required
                />
                <TextField
                  error={this.state.errorOrg}
                  label="Organisation Name"
                  margin="normal"
                  variant="outlined"
                  helperText={
                    this.state.errorOrg
                      ? this.state.errorOrgText
                      : 'Name of organization represented.'
                  }
                  style={{ width: '49%' }}
                  name="orgName"
                  value={this.state.orgName}
                  onChange={this.handleChangeData}
                  required
                />
                <TextField
                  error={this.state.errorUser}
                  label="Email Address"
                  margin="normal"
                  variant="outlined"
                  helperText={
                    this.state.errorUser
                      ? this.state.errorEmailInfo
                      : "Your partner representative's official email address."
                  }
                  fullWidth
                  name="emailAddress"
                  type="email"
                  value={this.state.emailAddress}
                  onChange={this.handleChangeData}
                  required
                />
                <Button
                  variant="contained"
                  type="submit"
                  color="secondary"
                  style={{ borderRadius: '1rem' }}
                >
                  Send Invite
                </Button>
              </form>
            )}
            {value === 1 && <SearchUsers addUser={this.addUser} />}
            <AddedPeople />
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}

AddTeam.propTypes = {
  classes: PropTypes.object.isRequired,
  getCollaborators: PropTypes.func.isRequired,
  getRoles: PropTypes.func.isRequired,
  ecosystems: PropTypes.object.isRequired,
  sendInvite: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  ecosystems: state.ecosystems,
});

export default withStyles(styles)(
  connect(
    mapStateToProps,
    { getCollaborators, getRoles, sendInvite },
  )(AddTeam),
);
