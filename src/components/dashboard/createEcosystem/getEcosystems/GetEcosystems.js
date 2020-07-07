/*
 * Copyright (c) Schrocken Inc.
 * Author: Ravi Teja
 * File Description: Component for getting all ecosystems
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Grid, Card, CardContent, Typography, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import {
    getAllEcosystems,
    selectEcosystem,
    clearEcosystem
} from '../../../../containers/actions/ecosystemActions';

// eslint-disable-next-line no-unused-vars
const styles = theme => ({
    selected: {
        boxShadow: '0 0 1rem red'
    }
});

class GetEcosystems extends Component {
    state = {
        ecosystems: [],
        selected_ecosystem: ''
    };

    componentDidMount() {
        this.props.getAllEcosystems();
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.ecosystems) {
            this.setState({ ecosystems: nextProps.ecosystems.allEcosystems });
        }
    }

    selectEcosystem = ecosystem_name => {
        this.setState({ selected_ecosystem: ecosystem_name });
        const selected_ecosystem = this.state.ecosystems.filter(element => {
            return element.ecosystemTypeName === ecosystem_name;
        });
        this.props.selectEcosystem(selected_ecosystem[0]);
        this.props.clearEcosystem();
    };

    render() {
        const { classes } = this.props;
        const ecosystem = this.state.ecosystems.map((ecosystem, i) => (
            <Grid
                item
                xs={12}
                sm={6}
                md={3}
                key={i}
                style={{ display: 'flex' }}>
                <Card
                    style={{
                        padding: '1rem',
                        margin: '1rem',
                        textAlign: 'center',
                        borderRadius: '1rem',
                        width: '100%'
                    }}
                    className={
                        this.state.selected_ecosystem ===
                        ecosystem.ecosystemTypeName
                            ? classes.selected
                            : null
                    }
                    raised>
                    <CardContent>
                        <Typography
                            gutterBottom
                            variant="h5"
                            component="h2"
                            style={{
                                height: '4rem',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis'
                            }}>
                            {ecosystem.displayName}
                        </Typography>
                        <img
                            src={`data:image/png;base64,${
                                ecosystem.ecosystemTypeImage
                            }`}
                            alt={ecosystem.ecosystemTypeName}
                            style={{ height: '5rem', margin: '1rem 0' }}
                        />
                        <Typography
                            component="p"
                            style={{
                                height: '3rem',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                marginBottom: '1rem'
                            }}>
                            {ecosystem.ecosystemTypeDescription}
                        </Typography>
                        <Button
                            variant="contained"
                            color="primary"
                            disabled={
                                ecosystem.isCreated === true ? true : false
                            }
                            onClick={() => {
                                this.selectEcosystem(
                                    ecosystem.ecosystemTypeName
                                );
                            }}>
                            {ecosystem.paymentDisplayName}
                        </Button>
                    </CardContent>
                </Card>
            </Grid>
        ));
        return (
            <Grid
                container
                style={{
                    margin: '0.5rem 0',
                    textAlign: 'center',
                    justifyContent: 'center'
                }}>
                <Grid item xs={12}>
                    <Typography
                        component="h2"
                        style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
                        Choose Your Ecosystem
                    </Typography>
                </Grid>
                {ecosystem}
            </Grid>
        );
    }
}

GetEcosystems.propTypes = {
    classes: PropTypes.object.isRequired,
    getAllEcosystems: PropTypes.func.isRequired,
    selectEcosystem: PropTypes.func.isRequired,
    ecosystems: PropTypes.object.isRequired,
    clearEcosystem: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    ecosystems: state.ecosystems
});

export default withStyles(styles)(
    connect(
        mapStateToProps,
        { getAllEcosystems, selectEcosystem, clearEcosystem }
    )(GetEcosystems)
);
