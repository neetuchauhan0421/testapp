/*
 * Copyright (c) Schrocken Inc.
 * Author: Ravi Teja
 * File Description: Search and add user component
 */

import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import {
    TextField,
    Table,
    TableBody,
    TableCell,
    TableRow,
    Paper,
    Fab,
    Button,
    Typography
} from '@material-ui/core';

import { searchUser } from '../../../../../containers/actions/ecosystemActions';
import { removeInvite } from '../../../../../containers/actions/ecosystemActions';

// eslint-disable-next-line no-unused-vars
const styles = theme => ({
    paper: {
        flexGrow: 1
    },
    root: {
        width: '100%',
        overflowX: 'auto',
        height: '20rem',
        overflowY: 'hidden auto'
    },
    table: {
        minWidth: 700
    }
});

class SearchUsers extends Component {
    state = {
        users: [],
        searchKey: ''
    };

    componentDidMount() {
        const selectedEcosystem = {
            ecosystemTypeId: this.props.ecosystems.selectedEcosystem
                .ecosystemTypeId
        };
        this.props.searchUser(selectedEcosystem);
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.ecosystems.users) {
            this.setState({ users: nextProps.ecosystems.users });
        }
        if (nextProps.ecosystems.removedUser) {
            for (var i = 0; i < this.state.users.length; i++) {
                if (
                    this.state.users[i].emailAddress ===
                    nextProps.ecosystems.removedUser.emailAddress
                ) {
                    this.state.users.splice(i, 1);
                }
            }
        }
    }

    handleSearch = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    removeUser = email => {
        const user = {
            ecosystemTypeId: this.props.ecosystems.selectedEcosystem
                .ecosystemTypeId,
            emailAddress: email
        };
        this.props.removeInvite(user);
    };

    render() {
        const { classes } = this.props;
        const searchData = this.state.searchKey
            ? this.state.users.filter(x =>
                x['emailAddress'].includes(this.state.searchKey)
            )
            : this.state.users;
        const searchUser = searchData.map((element, index) => (
            <TableRow key={index}>
                <TableCell component="th" scope="row">
                    <div style={{ display: 'flex', margin: '0.5rem 0rem' }}>
                        <Fab
                            size="small"
                            color="primary"
                            aria-label="Add"
                            style={{ margin: 'auto 0.5rem' }}
                        >
                            {element.emailAddress[0]}
                            {element.organizationName[0]}
                        </Fab>
                        <div style={{ margin: 'auto 0.5rem' }}>
                            <Typography component="p">
                                {element.organizationName}
                            </Typography>
                            <Typography component="p">
                                {element.emailAddress}
                            </Typography>
                        </div>
                    </div>
                </TableCell>
                <TableCell align="right">
                    <Button
                        variant="contained"
                        type="submit"
                        color="secondary"
                        style={{ borderRadius: '1rem' }}
                        onClick={
                            element.added === true
                                ? () => {
                                    this.removeUser(element.emailAddress);
                                }
                                : () => {
                                    this.props.addUser(
                                        element.organizationName,
                                        element.emailAddress
                                    );
                                }
                        }
                    >
                        {element.added === true ? 'Remove' : 'Add'}
                    </Button>
                </TableCell>
            </TableRow>
        ));
        return (
            <Fragment>
                <TextField
                    label="Search using email address"
                    margin="normal"
                    variant="outlined"
                    fullWidth
                    name="searchKey"
                    value={this.state.searchKey}
                    onChange={this.handleSearch}
                />
                <Paper className={classes.root}>
                    <Table className={classes.table}>
                        <TableBody>
                            {searchUser}
                            {/* <TableRow>
                <TableCell component="th" scope="row">
                  <div style={{ display: "flex", margin: "0.5rem 0rem" }}>
                    <Fab
                      size="small"
                      color="primary"
                      aria-label="Add"
                      style={{ margin: "auto 0.5rem" }}
                    >
                      RT
                    </Fab>
                    <div style={{ margin: "auto 0.5rem" }}>
                      <Typography component="p">Full Name</Typography>
                      <Typography component="p">Email Address</Typography>
                    </div>
                  </div>
                </TableCell>
                <TableCell align="right">
                  <Button
                    variant="contained"
                    type="submit"
                    color="secondary"
                    style={{ borderRadius: "1rem" }}
                  >
                    Send Invite
                  </Button>
                </TableCell>
              </TableRow> */}
                        </TableBody>
                    </Table>
                </Paper>
            </Fragment>
        );
    }
}

SearchUsers.propTypes = {
    // getCollaborators: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    searchUser: PropTypes.func.isRequired,
    ecosystems: PropTypes.object.isRequired,
    addUser: PropTypes.func.isRequired,
    removeInvite: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    ecosystems: state.ecosystems
});

export default withStyles(styles)(
    connect(
        mapStateToProps,
        { searchUser, removeInvite }
    )(SearchUsers)
);
