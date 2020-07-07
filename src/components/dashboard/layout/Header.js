/*
 * Copyright (c) Schrocken Inc.
 * Author: Ravi Teja
 * File Description: Header component for dashboard layout
 */

import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";

import PropTypes from "prop-types";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  MenuItem,
  Menu
} from "@material-ui/core";

import { withStyles } from "@material-ui/core/styles";
// import ExpandMore from "@material-ui/icons/ExpandMore";
import {
  SettingsInputSvideo,
  ExpandMore,
  KeyboardArrowLeft
} from "@material-ui/icons";
import MoreIcon from "@material-ui/icons/MoreVert";

import header_logo from "../../../resources/images/Schrocken-Logo-White.png";
import defaultImg from "../../../resources/images/profile2.png";

import {
  fetchDashboardData,
  userLogout
} from "../../../containers/actions/userActions";

const styles = theme => ({
  header: {
    backgroundColor: "#1f2632",
    boxShadow: "none"
  },
  toolbar: {
    paddingLeft: 0,
    paddingRight: 0,
    minHeight: "auto"
  },
  grow: {
    flexGrow: 1
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
      marginRight: "1rem",
      alignItems: "center"
    }
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  },
  navs: {
    marginRight: "1rem"
  }
});

class Header extends Component {
  state = {
    anchorEl: null,
    mobileMoreAnchorEl: null,
    profilePic: null,
    fullName: ""
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleMobileMenuOpen = event => {
    this.setState({ mobileMoreAnchorEl: event.currentTarget });
  };

  handleMobileMenuClose = () => {
    this.setState({ mobileMoreAnchorEl: null });
  };

  componentDidMount() {
    this.props.fetchDashboardData();
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.user) {
      this.setState({
        fullName: nextProps.user.data.fullName,
        profilePic: nextProps.user.data.profilePic
      });
    }
  }

  handleLogout = () => {
    this.props.userLogout(this.props.history);
  };

  render() {
    const role = localStorage.role;
    const { anchorEl, mobileMoreAnchorEl } = this.state;
    const { classes } = this.props;
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    const user_profilePic =
      this.state.profilePic === null ? defaultImg : this.state.profilePic;

    const renderMobileMenu = (
      <Menu
        anchorEl={mobileMoreAnchorEl}
        open={isMobileMenuOpen}
        onClose={this.handleMobileMenuClose}
      >
        <MenuItem>
          <SettingsInputSvideo fontSize="small" />
          <Typography
            variant="body2"
            color="inherit"
            style={{
              marginRight: "1rem",
              marginLeft: "0.3rem"
            }}
          >
            Support
          </Typography>
        </MenuItem>
        <MenuItem component={Link} to={`/${role}/profile`}>
          Profile Settings
        </MenuItem>
        <MenuItem onClick={this.handleLogout}>Logout</MenuItem>
      </Menu>
    );

    return (
      <div>
        <AppBar position="fixed" className={classes.header}>
          <Toolbar className={classes.toolbar}>
            <div
              style={{
                backgroundColor: "#000000",
                display: "flex",
                padding: "0.8rem",
                alignItems: "center"
              }}
            >
              <Link
                to="/"
                style={{
                  textDecoration: "none",
                  cursor: "pointer"
                }}
              >
                <img
                  src={header_logo}
                  alt="Logo"
                  style={{ height: "2.5rem" }}
                />
              </Link>
            </div>
            {this.props.screen === "profile" ? (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginLeft: "2rem"
                }}
              >
                <Link
                  to="/"
                  style={{ textDecoration: "none", color: "#ffffff" }}
                >
                  <KeyboardArrowLeft
                    fontSize="large"
                    style={{ marginTop: "0.2rem", fontSize: "3.5rem" }}
                  />
                </Link>
                <Typography variant="h5" color="inherit">
                  Profile Settings
                </Typography>
              </div>
            ) : (
              <Typography
                variant="h5"
                color="inherit"
                style={{ marginLeft: "2rem" }}
              >
                Dashboard
              </Typography>
            )}
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <SettingsInputSvideo fontSize="small" />
              <Typography
                variant="body2"
                color="inherit"
                style={{
                  marginRight: "1rem",
                  marginLeft: "0.3rem"
                }}
              >
                Support
              </Typography>
              <div style={{ color: "#ffffff" }}>|</div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer"
                }}
                onClick={this.handleClick}
              >
                <Typography
                  variant="body2"
                  color="inherit"
                  style={{
                    marginLeft: "1rem"
                  }}
                >
                  {this.state.fullName}
                </Typography>
                <ExpandMore fontSize="small" style={{ marginLeft: "0.5rem" }} />
                <img
                  src={user_profilePic}
                  alt="Profile icon"
                  style={{
                    width: "2rem",
                    height: "2rem",
                    borderRadius: "50%",
                    marginLeft: 10
                  }}
                />
              </div>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={this.handleClose}
                style={{
                  marginTop: "3rem"
                }}
              >
                <MenuItem component={Link} to={`/${role}/profile`}>
                  Profile Settings
                </MenuItem>
                <MenuItem onClick={this.handleLogout}>Logout</MenuItem>
              </Menu>
            </div>
            <div className={classes.sectionMobile}>
              <IconButton
                aria-haspopup="true"
                onClick={this.handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        {renderMobileMenu}
      </div>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  fetchDashboardData: PropTypes.func.isRequired,
  userLogout: PropTypes.func.isRequired,
  user: PropTypes.object
};

const mapStateToProps = state => ({
  user: state.user.user_dashboard_data
});

export default withStyles(styles)(
  connect(
    mapStateToProps,
    { fetchDashboardData, userLogout }
  )(withRouter(Header))
);
