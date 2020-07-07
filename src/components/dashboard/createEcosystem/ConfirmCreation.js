/*
 * Copyright (c) Schrocken Inc.
 * Author: Ravi Teja
 * File Description: Component for final screen in ecosystem creation
 */

import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import {
    Grid,
    Typography,
    Button,
    TextField,
    Tooltip
} from '@material-ui/core';

import AddedPeople from './addedPeople/AddedPeople';

function arrowGenerator(color) {
    return {
        '&[x-placement*="bottom"] $arrow': {
            top: 0,
            left: 0,
            marginTop: '-0.9em',
            width: '3em',
            height: '1em',
            '&::before': {
                borderWidth: '0 1em 1em 1em',
                borderColor: `transparent transparent ${color} transparent`
            }
        },
        '&[x-placement*="top"] $arrow': {
            bottom: 0,
            left: 0,
            marginBottom: '-0.9em',
            width: '3em',
            height: '1em',
            '&::before': {
                borderWidth: '1em 1em 0 1em',
                borderColor: `${color} transparent transparent transparent`
            }
        },
        '&[x-placement*="right"] $arrow': {
            left: 0,
            marginLeft: '-0.9em',
            height: '3em',
            width: '1em',
            '&::before': {
                borderWidth: '1em 1em 1em 0',
                borderColor: `transparent ${color} transparent transparent`
            }
        },
        '&[x-placement*="left"] $arrow': {
            right: 0,
            marginRight: '-0.9em',
            height: '3em',
            width: '1em',
            '&::before': {
                borderWidth: '1em 0 1em 1em',
                borderColor: `transparent transparent transparent ${color}`
            }
        }
    };
}

const styles = theme => ({
    grow: { flexGrow: 1 },
    arrowPopper: arrowGenerator(theme.palette.grey[700]),
    arrow: {
        position: 'absolute',
        fontSize: 7,
        '&::before': {
            content: '""',
            display: 'block',
            width: 0,
            height: 0,
            borderStyle: 'solid'
        }
    },
    bootstrapPopper: arrowGenerator(theme.palette.common.black),
    bootstrapTooltip: {
        backgroundColor: theme.palette.common.black,
        maxWidth: 200
    },
    bootstrapPlacementLeft: {
        margin: '0 8px'
    },
    bootstrapPlacementRight: {
        margin: '0 8px'
    },
    bootstrapPlacementTop: {
        margin: '8px 0'
    },
    bootstrapPlacementBottom: {
        margin: '8px 0'
    }
});

class ConfirmCreation extends Component {
    state = {
        arrowRef: null
    };
    handleArrowRef = node => {
        this.setState({
            arrowRef: node
        });
    };
    render() {
        const { classes } = this.props;
        const ecosystemData = this.props.ecosystems.selectedEcosystem;
        return (
            <Fragment>
                <Grid container>
                    <Grid item lg={2} />
                    <Grid item xs={12} lg={8}>
                        <Typography
                            component="h2"
                            style={{
                                fontSize: '2rem',
                                margin: '1rem',
                                textAlign: 'center'
                            }}>
                            Confirm Ecosystem Creation
                        </Typography>
                        <TextField
                            error={this.props.error}
                            label="Network name"
                            margin="normal"
                            variant="outlined"
                            helperText="Name this ecosystem network."
                            fullWidth
                            name="networkName"
                            autoComplete="off"
                            onChange={this.props.networkName}
                        />
                        <div
                            style={{
                                borderTop: '1px solid black',
                                marginTop: '1.5rem'
                            }}>
                            <Typography
                                component="p"
                                style={{ margin: '1.5rem 0' }}>
                                Ecosystem Template Used
                            </Typography>
                            <div
                                style={{
                                    display: 'flex',
                                    border: '1px solid black'
                                }}>
                                <img
                                    src={`data:image/png;base64,${
                                        ecosystemData.ecosystemTypeImage
                                    }`}
                                    alt={ecosystemData.ecosystemTypeName}
                                    style={{ height: '5rem', margin: '1rem 0' }}
                                />
                                <div>
                                    <div style={{ display: 'flex' }}>
                                        <Typography
                                            component="h5"
                                            style={{
                                                fontSize: '1.5rem',
                                                margin: '1rem'
                                            }}>
                                            {ecosystemData.ecosystemTypeName}
                                        </Typography>
                                        <Button
                                            disabled
                                            variant="outlined"
                                            style={{
                                                margin: '1.2rem 0',
                                                padding: '0 1.5rem'
                                            }}>
                                            {ecosystemData.paymentDisplayName}
                                        </Button>
                                    </div>
                                    <Typography
                                        component="p"
                                        style={{ marginBottom: '1rem' }}>
                                        {ecosystemData.ecosystemTypeDescription}
                                    </Typography>
                                </div>
                                <div className={classes.grow} />
                                <Tooltip
                                    title={
                                        <React.Fragment>
                                            <p
                                                style={{
                                                    textAlign: 'center',
                                                    margin: '0',
                                                    padding: '0'
                                                }}>
                                                Check the apps before creating
                                                the network.
                                            </p>
                                            <span
                                                className={classes.arrow}
                                                ref={this.handleArrowRef}
                                            />
                                        </React.Fragment>
                                    }
                                    classes={{
                                        tooltip: classes.bootstrapTooltip,
                                        popper: classes.bootstrapPopper,
                                        tooltipPlacementLeft:
                                            classes.bootstrapPlacementLeft,
                                        tooltipPlacementRight:
                                            classes.bootstrapPlacementRight,
                                        tooltipPlacementTop:
                                            classes.bootstrapPlacementTop,
                                        tooltipPlacementBottom:
                                            classes.bootstrapPlacementBottom
                                    }}
                                    PopperProps={{
                                        popperOptions: {
                                            modifiers: {
                                                arrow: {
                                                    enabled: Boolean(
                                                        this.state.arrowRef
                                                    ),
                                                    element: this.state.arrowRef
                                                }
                                            }
                                        }
                                    }}>
                                    <Button
                                        variant="contained"
                                        type="submit"
                                        style={{
                                            margin: '2.5rem 0',
                                            marginRight: '1rem',
                                            padding: '0 2rem',
                                            backgroundColor: '#e36e39',
                                            color: '#ffffff'
                                        }}
                                        onClick={this.props.back}>
                                        Edit App Pages
                                    </Button>
                                </Tooltip>
                            </div>
                        </div>
                        <AddedPeople />
                    </Grid>
                </Grid>
            </Fragment>
        );
    }
}

ConfirmCreation.propTypes = {
    classes: PropTypes.object.isRequired,
    error: PropTypes.bool.isRequired,
    ecosystems: PropTypes.object.isRequired,
    networkName: PropTypes.func.isRequired,
    back: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
    ecosystems: state.ecosystems
});
export default withStyles(styles)(connect(mapStateToProps)(ConfirmCreation));
