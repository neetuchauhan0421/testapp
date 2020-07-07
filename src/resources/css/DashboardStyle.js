/*
 * Copyright (c) Schrocken Inc.
 * Author: Ravi Teja
 * File Description: Style file for main dashboard
 */

export const DashboardStyleCss = theme => ({
    header: {
        backgroundColor: '#1f2632'
    },
    grow: {
        flexGrow: 1
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
            marginLeft: '2rem',
            marginTop: '0.5rem'
        }
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none'
        }
    },
    navs: {
        marginRight: '1rem',
        fontSize: '0.8rem'
    }
});
