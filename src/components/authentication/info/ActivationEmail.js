/*
 * Copyright (c) Schrocken Inc.
 * Author: Ravi Teja
 * File Description: Email sent information screen after successful sign up
 */

import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import {
    withStyles,
    MuiThemeProvider,
    createMuiTheme
} from '@material-ui/core/styles';
import { Grid, Card, CardContent, Button, Typography } from '@material-ui/core';

import AsideRegister from '../register/AsideRegister';
import Footer from '../footer/Footer';

const styles = {
    root: {
        flexGrow: 1
    },
    grid2: {
        position: 'relative'
    },
    main: {
        margin: 'auto 15%',
        marginTop: '3%',
        verticalAlign: 'middle',
        transform: 'translate(0%,50%)'
    },
    bigSignup: {
        color: '#e36e39',
        fontSize: '5vmin',
        marginBottom: '0.5rem'
    },
    thankuText: {
        margin: '5% 0% 3% 0%',
        color: 'green',
        fontSize: '2.5vmin'
    },
    cardText: {
        marginTop: '10%',
        fontSize: '0.9rem',
        marginBottom: '1rem'
    },
    CardContent: {
        padding: '2.5rem'
    }
};

const theme = createMuiTheme({
    palette: {
        primary: { main: '#e36e39' },
        secondary: { main: '#039be5' }
    },
    typography: { useNextVariants: true }
});

const ActivationEmail = props => {
    const { classes } = props;
    return (
        <div className={classes.root}>
            <Grid container direction="row">
                <AsideRegister />
                <Grid item xs={12} md={8} className={classes.grid2}>
                    <div className={classes.main}>
                        <Card className={classes.card} raised>
                            <CardContent className={classes.CardContent}>
                                <Typography variant="h5" gutterBottom>
                                    We just sent you an activation email. Please
                                    activate your account now for instant
                                    access.
                                </Typography>
                                <Typography
                                    variant="body1"
                                    className={classes.cardText}
                                >
                                    If your link is deactivated, please retry
                                    sign up.
                                </Typography>
                                <Link
                                    to="/login"
                                    style={{ textDecoration: 'none' }}
                                >
                                    <MuiThemeProvider theme={theme}>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                        >
                                            Sign In
                                        </Button>
                                    </MuiThemeProvider>
                                </Link>
                            </CardContent>
                        </Card>
                        <Footer />
                    </div>
                </Grid>
            </Grid>
        </div>
    );
};

ActivationEmail.propTypes = {
    classes: PropTypes.object.isRequired
};
export default withStyles(styles)(ActivationEmail);
