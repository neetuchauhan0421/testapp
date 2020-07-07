/*
 * Copyright (c) Schrocken Inc.
 * Author: Ravi Teja
 * File Description: Side Register component (Left side in screen)
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';

import { Grid, Typography, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import SchrockenLogo from '../../../resources/images/Schrocken-Logo-White.png';
import bg_image from '../../../resources/images/bg-SignUp.png';

const styles = theme => ({
    grid: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex'
        },
        minHeight: '100vh',
        background: `url(${bg_image}) no-repeat fixed`,
        backgroundSize: '100% 100%'
    },
    sideDiv: {
        margin: '7% 10%'
    },
    logo: {
        width: '70%'
    },
    textMember: {
        color: 'white',
        marginTop: '20%'
    },
    textNfo: {
        color: 'white',
        marginTop: '5%'
    },
    noUnderline: {
        textDecoration: 'none'
    },
    button: {
        color: '#e36e39',
        marginTop: '1.5rem',
        borderWidth: '2px',
        '&:hover': {
            borderWidth: '2px'
        }
    }
});

const AsideRegister = props => {
    const { classes } = props;
    return (
        <Grid item md={4} className={classes.grid}>
            <div className={classes.sideDiv}>
                <img src={SchrockenLogo} alt="Logo" className={classes.logo} />
                <Typography variant="h5" className={classes.textMember}>
                    Already a member?
                </Typography>
                <Typography variant="subtitle1" className={classes.textNfo}>
                    That&apos;s awesome! You can login clicking on the button to
                    skip this next time, you can ask us to remember login
                    credentials.
                </Typography>
                <Link to="/login" className={classes.noUnderline}>
                    <Button
                        variant="outlined"
                        color="primary"
                        className={classes.button}
                    >
                        Sign In
                    </Button>
                </Link>
            </div>
        </Grid>
    );
};

AsideRegister.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AsideRegister);
