/*
 * Copyright (c) Schrocken Inc.
 * Author: Ravi Teja
 * File Description: Component for getting roles for selected colaborator
 */

import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import {
    OutlinedInput,
    InputLabel,
    MenuItem,
    FormControl,
    Select,
    Typography
} from '@material-ui/core';

// eslint-disable-next-line no-unused-vars
const styles = theme => ({
    paper: {
        flexGrow: 1
    }
});

class Roles extends Component {
    state = {
        labelWidth: 0,
        roles: []
    };

    componentDidMount() {
        this.setState({
            // eslint-disable-next-line react/no-find-dom-node
            labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth
        });
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.ecosystems.roles) {
            this.setState({ roles: nextProps.ecosystems.roles });
        }
    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    render() {
        const Role = this.state.roles.map((role, i) => (
            <MenuItem value={role.roleId} key={i}>
                {role.roleName}
            </MenuItem>
        ));
        return (
            <Fragment>
                <FormControl variant="outlined" style={{ width: '40%' }}>
                    <InputLabel
                        ref={ref => {
                            this.InputLabelRef = ref;
                        }}
                        required>
                        Select Role
                    </InputLabel>
                    <Select
                        error={this.props.errorvalue}
                        value={this.props.roleId}
                        onChange={this.props.handleChangeRole}
                        input={
                            <OutlinedInput
                                labelWidth={this.state.labelWidth}
                                name="roleId"
                            />
                        }>
                        {Role}
                    </Select>
                    <Typography component="p" style={{ marginTop: '0.5rem' }}>
                        Select the role of your collaborators.
                    </Typography>
                </FormControl>
            </Fragment>
        );
    }
}

Roles.propTypes = {
    ecosystems: PropTypes.object.isRequired,
    handleChangeRole: PropTypes.func.isRequired,
    roleId: PropTypes.any.isRequired,
    errorvalue: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
    ecosystems: state.ecosystems
});

export default withStyles(styles)(connect(mapStateToProps)(Roles));
