import React, { Component } from "react";

import { withRouter } from "react-router-dom";

import Header from "../../dashboard/layout/Header";
import MyProfile from "./myProfile";
import OrgProfile from "./orgProfile";
import CompletionStatus from "./completionStatus";
import OrgCompletionStatus from "./orgProfileCompletion";

import { withStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core/";

import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

const styles = theme => ({
  flexContainer: {
    justifyContent: "space-between",
    borderBottom: "1px solid #E5E5E5"
  },
  indicator: {
    backgroundColor: "black"
  },
  tabsContainer: {
    paddingRight: "1rem",
    [theme.breakpoints.down("sm")]: {
      paddingRight: "2rem"
    }
  }
});
class AdminProfile extends Component {
  state = {
    value: 0
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { value } = this.state;
    const { classes } = this.props;
    const { role } = this.props.match.params;
    return (
      <div style={{ overflowX: "hidden" }}>
        {/* Profile page */}
        <Header screen="profile" />

        <Grid container style={{ marginTop: "4.8rem", marginLeft: "1rem" }}>
          <Grid item xs={12} md={9} className={classes.tabsContainer}>
            <Tabs
              value={this.state.value}
              indicatorColor="primary"
              textcolor="primary"
              onChange={this.handleChange}
              classes={{
                flexContainer: classes.flexContainer,
                indicator: classes.indicator
              }}
            >
              <Tab label="My Profile" />

              {/* {role === "Admin" && <Tab label="Organization Profile" />} */}
              {role === "Admin" ? (
                <Tab label="Organization Profile" />
              ) : role === "Super Admin" ? (
                <Tab label="Organization Profile" />
              ) : null}
            </Tabs>

            {value === 0 && <MyProfile />}

            {value === 1 && <OrgProfile />}
          </Grid>
          {value === 0 && <CompletionStatus />}

          {value === 1 && <OrgCompletionStatus />}
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(withRouter(AdminProfile));
