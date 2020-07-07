/*
 * Copyright (c) Schrocken Inc.
 * Author: Ravi Teja
 * File Description: Left-side in login component
 */

import React from "react";
import PropTypes from "prop-types";

import { Grid, Typography, Button } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

import SchrockenLogo from "../../../resources/images/Schrocken-Logo-White.png";
import CordaLogo from "../../../resources/images/corda-logo.png";
import bgImage from "../../../resources/images/bg-SignIn.png";

const styles = theme => ({
  grid1: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex"
    },
    minHeight: "100vh",
    background: `url(${bgImage}) no-repeat fixed`,
    backgroundSize: "100% 100%"
  },
  sideDiv: {
    margin: "7% 10%"
  },
  logo: {
    width: "70%"
  },
  textSide: {
    color: "white",
    marginTop: "10%"
  },
  poweredBy: {
    color: "white",
    marginTop: "23%"
  },
  Button: {
    color: "white",
    border: "1px solid white",
    marginTop: "1.5rem",
    "&:hover": {
      border: "1px solid white",
      color: "black",
      background: "white"
    }
  },
  cordaLogo: {
    width: "55%",
    marginLeft: "-1.5rem",
    marginTop: "-1.5rem"
  }
});

const AsideLogin = props => {
  const { classes } = props;
  return (
    <Grid item md={4} className={classes.grid1}>
      <div className={classes.sideDiv}>
        <img src={SchrockenLogo} alt="Logo" className={classes.logo} />
        <Typography variant="h5" className={classes.textSide}>
          {/* Customise, create and integrate smart contracts to save money &amp;
          increase your productivity. */}
          Schrocken Mosymphony is your Partnership Portal.
        </Typography>
        <Typography variant="subtitle1" className={classes.textSide}>
          {/* An easy and simple way to create contracts. Big, small, simple,
          complex or smart and of course you can use IoT devices to create
          logical contracts. */}
          Work with your partners with full transparency and trust. Your data
          and transactions are secured with Enterprise-grade Blockchain
          technology.
        </Typography>
        <Button variant="outlined" color="primary" className={classes.Button}>
          Request for a demo
        </Button>
        <Typography
          variant="subtitle1"
          className={classes.poweredBy}
          gutterBottom
        >
          Powered By:
        </Typography>
        <img src={CordaLogo} alt="corda-logo" className={classes.cordaLogo} />
        {/* <Typography
          variant="h6"
          style={{
            color: "#ffffff"
          }}>
          Corda
        </Typography> */}
      </div>
    </Grid>
  );
};

AsideLogin.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AsideLogin);
