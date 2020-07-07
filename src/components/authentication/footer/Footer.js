/*
 * Copyright (c) Schrocken Inc.
 * Author: Ravi Teja
 * File Description: Footer component
 */

import React from 'react';
import PropTypes from 'prop-types';

import { Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

// eslint-disable-next-line no-unused-vars
const styles = theme => ({
    asideFooter: {
        margin: '1.5rem 0 0 0'
    },
    footer: {
        display: 'inline-block',
        marginRight: '2%',
        fontSize: '0.8rem'
    },
    alink: {
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
            <Typography variant="subtitle2" className={classes.footer}>
                <a href="/terms" className={classes.alink}>
                    Terms
                </a>
            </Typography>
            <Typography variant="subtitle2" className={classes.footer}>
                <a href="/terms" className={classes.alink}>
                    Privacy
                </a>
            </Typography>
        </div>
    );
};

Footer.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Footer);
