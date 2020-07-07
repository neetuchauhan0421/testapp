/*
 * Copyright (c) Schrocken Inc.
 * Author: Ravi Teja
 * File Description: Component to combine all login components
 */

import React from 'react';
import PropTypes from 'prop-types';

import { Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import AsideLogin from './AsideLogin';
import MainLogin from './MainLogin';

const styles = {
  root: {
    flexGrow: 1,
  },
};

const Login = (props) => {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <Grid container direction="row">
        <AsideLogin />
        <MainLogin />
      </Grid>
    </div>
  );
};

Login.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Login);
