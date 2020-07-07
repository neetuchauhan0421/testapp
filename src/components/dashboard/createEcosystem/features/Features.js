/*
 * Copyright (c) Schrocken Inc.
 * Author: Ravi Teja
 * File Description: Component for getting features of ecosystem
 */

import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import {
    Grid,
    Typography,
    Button,
    FormGroup,
    FormControlLabel,
    Checkbox
} from '@material-ui/core';

import {
    getFeatures,
    saveFeatures
} from '../../../../containers/actions/ecosystemActions';

// eslint-disable-next-line no-unused-vars
const styles = theme => ({
    grow: { flexGrow: 1 },
    label: {
        margin: '0 0 -0.5rem 0rem'
    }
});

class Features extends Component {
    state = {
        features: []
    };

    componentDidMount() {
        const selectedEcosystem = {
            ecosystemTypeId: this.props.ecosystems.selectedEcosystem
                .ecosystemTypeId
        };
        this.props.getFeatures(selectedEcosystem);
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.ecosystems.features) {
            this.setState({ features: nextProps.ecosystems.features });
        }
    }

    // eslint-disable-next-line no-unused-vars
    handleChange = feature_id => event => {
        this.setState(prevState => ({
            features: prevState.features.map(obj =>
                obj.ecosystemTypeFeatureId === feature_id
                    ? Object.assign(obj, {
                        isSelected: obj.isSelected === 0 ? 1 : 0
                    })
                    : obj
            )
        }));

        // for (var i = 0; i < this.state.features.length; i++) {
        //   if (this.state.features[i].ecosystemTypeFeatureId === feature_id) {

        //     // console.log(this.state.features[i].isSelected);
        //     this.setState({ [this.state.features[i].isSelected]: 0 });
        //   }
        // }
    };
    sendFeatures = () => {
        const featuresToSave = {
            ecosystemTypeId: this.props.ecosystems.selectedEcosystem
                .ecosystemTypeId,
            featuresToSend: this.state.features
        };
        this.props.saveFeatures(featuresToSave);
        this.props.next();
    };

    render() {
        const ecosystemData = this.props.ecosystems.selectedEcosystem;
        const { classes } = this.props;
        const feature = this.state.features.map((element, i) => (
            <FormControlLabel
                key={i}
                className={classes.label}
                control={
                    <Checkbox
                        checked={element.isSelected === 1 ? true : false}
                        onChange={this.handleChange(
                            element.ecosystemTypeFeatureId
                        )}
                    />
                }
                label={element.featureDisplayName}
            />
        ));
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
                            Add Stakeholders and team members
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
                            <Button
                                variant="contained"
                                type="submit"
                                style={{
                                    borderRadius: '1rem',
                                    margin: '2.5rem 0',
                                    marginRight: '1rem',
                                    padding: '0 3rem',
                                    backgroundColor: 'green'
                                }}
                                onClick={this.sendFeatures}>
                                Save
                            </Button>
                        </div>
                        <div
                            style={{
                                border: '1px solid black',
                                marginTop: '0.2rem'
                            }}>
                            <Typography
                                component="p"
                                style={{
                                    margin: '1rem 0 1rem 1rem',
                                    fontSize: '1rem'
                                }}>
                                Default features for this template are
                                auto-selected. Uncheck what you don&apos;t need.
                            </Typography>
                            <FormGroup>{feature}</FormGroup>
                        </div>
                    </Grid>
                </Grid>
            </Fragment>
        );
    }
}

Features.propTypes = {
    classes: PropTypes.object.isRequired,
    getFeatures: PropTypes.func.isRequired,
    saveFeatures: PropTypes.func.isRequired,
    next: PropTypes.func.isRequired,
    ecosystems: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    ecosystems: state.ecosystems
});

export default withStyles(styles)(
    connect(
        mapStateToProps,
        { getFeatures, saveFeatures }
    )(Features)
);
