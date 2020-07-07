/*
 * Copyright (c) Schrocken Inc.
 * Author: Ravi Teja
 * File Description: Index file for user dashboard
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import Ecosystems from './Ecosystems';
// import MessageRooms from './MessageRooms';

import Layout from '../layout';

// eslint-disable-next-line no-unused-vars
const styles = theme => ({
    root: {
        flexGrow: 1
    },
    dashboard: {
        marginTop: '4rem'
    }
});

class Dashboard extends Component {
    render() {
        const { classes } = this.props;
        return (
            <Layout>
                <div className={classes.root}>
                    <Grid container className={classes.dashboard}>
                        <Ecosystems />
                        {/* <MessageRooms /> */}
                    </Grid>
                </div>
            </Layout>
        );
    }
}

Dashboard.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Dashboard);
