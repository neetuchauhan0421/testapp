/*
 * Copyright (c) Schrocken Inc.
 * Author: Ravi Teja
 * File Description: Component to show added people in ecosystem
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';

import { Fab, Typography, Tooltip } from '@material-ui/core';

import { addedPeople } from '../../../../containers/actions/ecosystemActions';
import { clearRemovedUser } from '../../../../containers/actions/ecosystemActions';

// eslint-disable-next-line no-unused-vars
const styles = theme => ({
    paper: {
        flexGrow: 1
    }
});

class AddedPeople extends Component {
    state = {
        people: []
    };

    componentDidMount() {
        const selectedEcosystem = {
            ecosystemTypeId: this.props.ecosystems.selectedEcosystem
                .ecosystemTypeId
        };
        this.props.addedPeople(selectedEcosystem);
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.ecosystems.people.length > 0) {
            this.setState({ people: nextProps.ecosystems.people });
        }
        if (
            nextProps.ecosystems.removedUser &&
            Object.keys(nextProps.ecosystems.removedUser).length > 0
        ) {
            for (var i = 0; i < this.state.people.length; i++) {
                if (
                    this.state.people[i].emailAddress ===
                    nextProps.ecosystems.removedUser.emailAddress
                ) {
                    this.state.people.splice(i, 1);
                }
            }
            this.props.clearRemovedUser();
        }
    }
    render() {
        const peoples = this.state.people.map((element, i) => (
            <Tooltip title={element.emailAddress} aria-label="Add" key={i}>
                <Fab
                    size="medium"
                    color="primary"
                    aria-label="Add"
                    style={{ marginRight: '1rem' }}
                >
                    {element.emailAddress[0]}
                    {element.organizationName[0]}
                </Fab>
            </Tooltip>
        ));
        return (
            <div
                style={{
                    borderTop: '1px solid black',
                    marginTop: '1.5rem',
                    padding: '0 1rem',
                    minHeight: '5rem'
                }}
            >
                <Typography component="p" style={{ margin: '0.5rem 0' }}>
                    ADDED PEOPLE
                </Typography>
                {peoples}
            </div>
        );
    }
}

AddedPeople.propTypes = {
    ecosystems: PropTypes.object.isRequired,
    addedPeople: PropTypes.func.isRequired,
    clearRemovedUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    ecosystems: state.ecosystems
});

export default withStyles(styles)(
    connect(
        mapStateToProps,
        { addedPeople, clearRemovedUser }
    )(AddedPeople)
);
