/*
 * Copyright (c) Schrocken Inc.
 * Author: Ravi Teja
 * File Description: Component for created networks in dashboard
 */

/* eslint-disable no-console */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import {
  Grid,
  Typography,
  Divider,
  Button,
  Card,
  CardContent,
  Fab,
  Tooltip
} from '@material-ui/core/';
import { withStyles } from '@material-ui/core/styles';

import { getNetworks } from '../../../containers/actions/userActions';
import { removeEcosystem } from '../../../containers/actions/ecosystemActions';

// eslint-disable-next-line no-unused-vars
const styles = (theme) => ({
  ecosystems__navbar: {
    display: 'inline-flex',
    marginTop: '1.5rem'
  },
  addicon: {
    position: 'absolute',
    top: '2rem',
    right: '2rem'
  },
  createnew: {
    padding: '5.5rem 1rem',
    margin: '0.6rem',
    textAlign: 'center',
    border: '2px dotted black',
    borderRadius: '1rem'
  },
  button: {
    marginTop: '1.5rem'
  }
});

class Ecosystems extends Component {
  state = {
    isDialogOpen: false,
    networks: []
  };

  componentDidMount() {
    this.props.getNetworks();
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.user.networks) {
      this.setState({ networks: nextProps.user.networks });
    }
  }

  openDialog = () => {
    this.setState({ isDialogOpen: true });
  };

  closeDialog = () => {
    this.setState({ isDialogOpen: false });
    this.props.removeEcosystem();
  };

  launchEcosystem = async (
    ecosystemName,
    collaboratorTypeName,
    roleName,
    organizationName,
    ecosystemTypeId,
    ecosystemId,
    organizationId,
    nodeName,
    organizationNumber,
    displayName
  ) => {
    let setStorage = new Promise((resolve, reject) => {
      sessionStorage.setItem('ecosystemTypeId', ecosystemTypeId);
      sessionStorage.setItem('organizationId', organizationId);
      sessionStorage.setItem('network', nodeName);
      sessionStorage.setItem('organizationNumber', organizationNumber);
      sessionStorage.setItem('appName', displayName);
      resolve(true);
    });
    let store = await setStorage;

    if (store) {
      if (collaboratorTypeName === 'Pharma Co') {
        this.props.history.push(
          `/pcmp/Pharma Co/${roleName}/${organizationName}/${ecosystemId}/dashboard`
        );
      } else if (collaboratorTypeName === 'CMO') {
        this.props.history.push(
          `/pcmp/cmo/${roleName}/${organizationName}/${ecosystemId}/dashboard`
        );
      }
    }
  };

  render() {
    const { classes } = this.props;

    const Network = this.state.networks.map((network, i) => (
      <Grid item xs={12} sm={6} md={3} key={i} style={{ display: 'flex' }}>
        <Card
          style={{
            margin: '0.5rem',
            width: '100%'
          }}
          raised
        >
          <CardContent>
            <Typography variant="caption" style={{ fontSize: '0.6rem' }}>
              NAME
            </Typography>
            <Typography
              variant="body1"
              gutterBottom
              style={{
                color: '#000000',
                height: '1.5rem',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}
            >
              {network.networkName}
            </Typography>
            <Typography variant="caption" style={{ fontSize: '0.6rem' }}>
              ECOSYSTEM TYPE
            </Typography>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                marginTop: 5,
                marginBottom: 10
              }}
            >
              <img
                src={`data:image/png;base64,${network.ecosystemTypeImage}`}
                alt="ecosystem template icon"
                style={{ width: '3rem' }}
              />
              <Typography
                variant="body2"
                gutterBottom
                style={{
                  color: 'black',
                  marginLeft: 10,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  width: '9rem'
                }}
              >
                {network.displayName}
              </Typography>
              <Button variant="outlined">
                <Typography variant="caption">
                  {network.paymentdisplayName}
                </Typography>
              </Button>
            </div>
            <Typography variant="caption" style={{ fontSize: '0.6rem' }}>
              STAKEHOLDERS &amp; TEAM
            </Typography>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: 20,
                marginTop: 10
              }}
            >
              {network.collaborators === false
                ? null
                : network.collaborators.map((collaborator, i) => (
                    <Tooltip
                      title={collaborator.emailAddress}
                      aria-label="Add"
                      key={i}
                    >
                      <Fab
                        size="small"
                        color="primary"
                        style={{
                          width: '2.3rem',
                          height: '1rem',
                          marginRight: 5
                        }}
                      >
                        {collaborator.emailAddress[0]}
                        {collaborator.organizationName[0]}
                      </Fab>
                    </Tooltip>
                  ))}
            </div>

            <div style={{ textAlign: 'center' }}>
              <Button
                color="primary"
                variant="contained"
                onClick={() =>
                  this.launchEcosystem(
                    network.ecosystemName,
                    network.collaboratorTypeName,
                    network.roleName,
                    network.organization_name,
                    network.ecosystemTypeId,
                    network.ecosystemId,
                    network.organizationId,
                    network.nodeName,
                    network.organizationNumber,
                    network.displayName
                  )
                }
                style={{
                  borderRadius: '10rem',
                  backgroundColor: '#2196f3'
                }}
              >
                LAUNCH ECOSYSTEM
              </Button>
            </div>
          </CardContent>
        </Card>
      </Grid>
    ));

    return (
      <Grid
        item
        xs={12}
        style={{
          position: 'relative',
          minHeight: '85vh'
        }}
      >
        <div className={classes.ecosystems__navbar}>
          <Typography
            variant="subtitle1"
            style={{
              marginLeft: '2rem',
              borderBottom: '1.5px solid',
              paddingLeft: '0.5rem',
              paddingRight: '0.5rem'
            }}
          >
            Ecosystems
          </Typography>
        </div>
        <Divider />
        <Grid
          container
          style={{
            margin: '2rem 0rem',
            paddingLeft: '1rem',
            paddingRight: '1rem'
          }}
        >
          {Network}
        </Grid>
      </Grid>
    );
  }
}

Ecosystems.propTypes = {
  history: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  getNetworks: PropTypes.func.isRequired,
  removeEcosystem: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  user: state.user
});

export default withStyles(styles)(
  connect(mapStateToProps, { getNetworks, removeEcosystem })(
    withRouter(Ecosystems)
  )
);
