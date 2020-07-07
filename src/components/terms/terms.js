/*
 * Copyright (c) Schrocken Inc.
 * Author: Ravi Teja
 * File Description: Terms and conditions file
 */

import React from 'react';
import { Grid, Typography, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const styles = {
  main: {
    width: '70%',
    marginLeft: '15%',
    marginTop: '5%',
    textAlign: 'center',
  },
  content: {
    textAlign: 'left',
  },
};
const Terms = (props) => {
  const { classes } = props;
  return (
    <Grid container>
      <div className={classes.main}>
        <Typography variant="h6">Schrocken&apos;s Terms and Conditions</Typography>
        <br />
        <div className={classes.content}>
          <Typography variant="h6">Privacy</Typography>
          <br />
          <Typography variant="body1">
            Your privacy is important to us, and we know that you care about how information about
            your order is used and shared. We would like our international customers and customers
            making smart contracts internationally to be aware that cross-border laws are subject to
            judiciary enforcement of that particular nation and inspection by authorities.
            <br />
            Also, we may provide certain order, shipment, and product information, such as titles,
            to our international carriers, and such information may be communicated by the carriers
            to customs and/or postal authorities in order to facilitate customs clearance and comply
            with local laws.
          </Typography>
        </div>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <Button variant="contained" color="primary" type="submit" style={{ marginTop: '1rem' }}>
            Home
          </Button>
        </Link>
      </div>
    </Grid>
  );
};

Terms.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Terms);
