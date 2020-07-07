/*
 * Copyright (c) Schrocken Inc.
 * Author: Ravi Teja
 * File Description: Message rooms in user dashboard
 */

import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    root: {
        flexGrow: 1
    },
    messageroom: {
        borderLeft: 'none',
        textAlign: 'center',
        [theme.breakpoints.up('md')]: {
            borderLeft: '1px solid black',
            minHeight: '84.1vh'
        }
    }
});

class MessageRooms extends Component {
    render() {
        const { classes } = this.props;
        return (
            <Grid item xs={12} md={3} className={classes.messageroom}>
                <Typography
                    variant="h5"
                    gutterBottom
                    style={{ marginTop: '3rem' }}>
                    Message Rooms
                </Typography>
                <Typography variant="body1" gutterBottom>
                    Coming soon
                </Typography>
            </Grid>
        );
    }
}

MessageRooms.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MessageRooms);
