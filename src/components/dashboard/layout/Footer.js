/*
 * Copyright (c) Schrocken Inc.
 * Author: Ravi Teja
 * File Description: Footer component for dashboard layout
 */

import React from 'react';
import PropTypes from 'prop-types';

import { Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

// eslint-disable-next-line no-unused-vars
const styles = theme => ({
    asideFooter: {
        textAlign: 'center',
        backgroundColor: '#9ca4ab',
        paddingTop: '0.5rem',
        paddingBottom: '0.5rem'
    },
    footer: {
        display: 'inline-block',
        marginRight: '1%',
        textDecoration: 'none'
    }
});

const Footer = props => {
    const { classes } = props;
    return (
        <div className={classes.asideFooter}>
            <Typography variant="subtitle2" className={classes.footer}>
                &copy;{new Date().getFullYear()} Schrocken Inc.
            </Typography>
            <a href="/terms" className={classes.footer}>
                Terms
            </a>
            <a href="/terms" className={classes.footer}>
                Privacy
            </a>
        </div>
    );
};

Footer.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Footer);
