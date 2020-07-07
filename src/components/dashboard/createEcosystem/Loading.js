/*
 * Copyright (c) Schrocken Inc.
 * Author: Ravi Teja
 * File Description: Creating ecosystem animation component
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import LoadingIcon from '../../../resources/images/blockChainLoading.gif';

class Loading extends Component {
    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.ecosystems.networkCreated === true) {
            this.props.history.push('/');
        }
    }
    render() {
        return (
            <div style={{ textAlign: 'center' }}>
                <img
                    src={LoadingIcon}
                    alt="Loading"
                    style={{ width: '20rem', marginTop: '3rem' }}
                />
                <h1>Creating Your Blockchain Network</h1>
            </div>
        );
    }
}

Loading.propTypes = {
    history: PropTypes.object.isRequired,
    ecosystems: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    ecosystems: state.ecosystems
});

export default connect(mapStateToProps)(Loading);
