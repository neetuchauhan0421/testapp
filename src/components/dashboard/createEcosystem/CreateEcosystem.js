import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import {
    Button,
    Typography,
    Stepper,
    Step,
    StepLabel,
    Grid
} from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';

import GetEcosystems from './getEcosystems/GetEcosystems';
import AddTeam from './addTeam/AddTeam';
import Features from './features/Features';
import ConfirmCreation from './ConfirmCreation';

import { createNetwork } from '../../../containers/actions/ecosystemActions';

const styles = () => ({
    grow: {
        flexGrow: 1
    },
    stepper: {
        padding: '0',
        margin: '1rem'
    },
    cancel: {
        marginTop: '1rem',
        marginRight: '0.6rem'
    },
    cancel_icon: {
        marginTop: '1.1rem',
        marginRight: '2rem'
    },
    btngreen: {
        borderRadius: '1.2rem',
        margin: '2.5rem 0',
        marginRight: '1rem',
        padding: '0.7rem 3.5rem',
        backgroundColor: 'green',
        color: '#ffffff',
        '&:hover': {
            backgroundColor: 'darkgreen'
        }
    },
    btnred: {
        borderRadius: '1.2rem',
        margin: '2.5rem 0',
        marginRight: '1rem',
        padding: '0.7rem 3.5rem',
        backgroundColor: 'red',
        color: '#ffffff',
        '&:hover': {
            backgroundColor: 'darkred'
        }
    },
    btnblue: {
        borderRadius: '1.2rem',
        margin: '2.5rem 0',
        marginRight: '1rem',
        padding: '0.7rem 3.5rem',
        backgroundColor: 'blue',
        color: '#ffffff',
        '&:hover': {
            backgroundColor: 'darkblue'
        }
    }
});

class CreateEcosystem extends Component {
    state = {
        activeStep: 0,
        networkName: '',
        errNetworkName: false
    };

    handleNext = () => {
        const { activeStep } = this.state;
        if (activeStep < 3) {
            this.setState({
                activeStep: activeStep + 1
            });
        }
        if (activeStep === 3) {
            if (this.state.networkName === '') {
                this.setState({ errNetworkName: true });
            } else {
                const networkData = {
                    ecosystemTypeId: this.props.ecosystems.selectedEcosystem
                        .ecosystemTypeId,
                    ecosystemTypeName: this.props.ecosystems.selectedEcosystem
                        .ecosystemTypeName,
                    networkName: this.state.networkName
                };
                this.props.createNetwork(networkData);
                this.props.history.push('/creatingecosystem');
            }
        }
    };

    handleBack = () => {
        this.setState(state => ({
            activeStep: state.activeStep - 1
        }));
    };

    networkName = e => {
        this.setState({ errNetworkName: false });
        this.setState({ [e.target.name]: e.target.value });
    };

    render() {
        const { classes } = this.props;
        const { activeStep } = this.state;

        const getStepContent = step => {
            switch (step) {
            case 0:
                return <GetEcosystems />;
            case 1:
                return <AddTeam />;
            case 2:
                return <Features next={this.handleNext} />;
            default:
                return (
                    <ConfirmCreation
                        back={this.handleBack}
                        networkName={this.networkName}
                        error={this.state.errNetworkName}
                    />
                );
            }
        };

        return (
            <Fragment>
                <Grid
                    container
                    style={{ position: 'fixed', backgroundColor: '#ffffff' }}
                >
                    <Grid item xs={2}>
                        <Button
                            disabled={activeStep === 0}
                            onClick={this.handleBack}
                            variant="contained"
                            color="primary"
                            style={{ marginTop: '1.2rem', marginLeft: '1rem' }}
                        >
                            Back
                        </Button>
                    </Grid>
                    <Grid item xs={8}>
                        <Stepper
                            alternativeLabel
                            className={classes.stepper}
                            activeStep={activeStep}
                        >
                            <Step className={classes.step}>
                                <StepLabel>
                                    <Typography
                                        variant="body1"
                                        style={{
                                            fontSize: '0.8rem',
                                            marginTop: '-0.6rem',
                                            lineHeight: '1rem'
                                        }}
                                    >
                                        {activeStep >= 1
                                            ? this.props.ecosystems
                                                .selectedEcosystem
                                                .ecosystemTypeName
                                            : null}
                                    </Typography>
                                </StepLabel>
                            </Step>
                            <Step className={classes.step}>
                                <StepLabel />
                            </Step>
                            <Step className={classes.step}>
                                <StepLabel />
                            </Step>
                            <Step className={classes.step}>
                                <StepLabel />
                            </Step>
                        </Stepper>
                    </Grid>
                    <Grid item xs={2} style={{ display: 'flex' }}>
                        <div className={classes.grow} />
                        <Typography
                            variant="subtitle1"
                            className={classes.cancel}
                        >
                            Cancel
                        </Typography>
                        <ClearIcon
                            fontSize="default"
                            className={classes.cancel_icon}
                            onClick={this.props.closeDialog}
                            style={{ cursor: 'pointer' }}
                        />
                    </Grid>
                </Grid>
                <Grid container style={{ marginTop: '5rem' }}>
                    <Grid item xs={12}>
                        {getStepContent(activeStep)}
                    </Grid>
                    <Grid item xs={12} style={{ textAlign: 'center' }}>
                        <Button
                            disabled={
                                activeStep === 0 &&
                                Object.keys(
                                    this.props.ecosystems.selectedEcosystem
                                ).length === 0
                            }
                            variant="contained"
                            className={
                                activeStep === 2
                                    ? `${classes.btnred}`
                                    : activeStep === 3
                                        ? `${classes.btnblue}`
                                        : `${classes.btngreen}`
                            }
                            onClick={this.handleNext}
                        >
                            {activeStep === 2
                                ? 'CANCEL'
                                : activeStep === 3
                                    ? 'Create Network'
                                    : 'Next'}
                        </Button>
                    </Grid>
                </Grid>
            </Fragment>
        );
    }
}

CreateEcosystem.propTypes = {
    classes: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    ecosystems: PropTypes.object.isRequired,
    createNetwork: PropTypes.func.isRequired,
    closeDialog: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    ecosystems: state.ecosystems
});

export default withStyles(styles)(
    connect(
        mapStateToProps,
        { createNetwork }
    )(withRouter(CreateEcosystem))
);
