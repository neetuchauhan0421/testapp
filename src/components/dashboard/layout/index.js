/*
 * Copyright (c) Schrocken Inc.
 * Author: Ravi Teja
 * File Description: Index file for combining layout components
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Header from './Header';
import Footer from './Footer';

class Layout extends Component {
    render() {
        return (
            <div>
                <Header />
                {this.props.children}
                <Footer />
            </div>
        );
    }
}

Layout.propTypes = {
    children: PropTypes.object.isRequired
};

export default Layout;
