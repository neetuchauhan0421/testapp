import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core/';

import { updateProfileField } from '../../../containers/actions/userActions';
const styles = theme => ({
    detailsDiv: {
        display: 'flex',
        flexDirection: 'column'
    },
    borderBottom: {
        borderBottom: '2px solid #E5E5E5',
        paddingTop: '0.5rem',
        paddingBottom: '0.5rem',
        textAlign:'center',
        marginTop:'1.5rem'
    },
    text:{
      cursor:'pointer'
    },
    completionStatusGrid:{
        borderLeft: '1px solid #A4A4A4',
        [theme.breakpoints.down('sm')]:{
            display:'none'
        }
    }
});

class OrgCompletionStatus extends Component {

    state={
        orgDetails: {
            organization_name: '',
            about: '',
            org_address_1: '',
            country: '',
            completionStatus:0
            }
    };

    UNSAFE_componentWillReceiveProps(nextProps){
        if(nextProps.orgDetails){
            this.setState({orgDetails:nextProps.orgDetails})
        }
    }
    editField = name => {
        this.props.updateProfileField(name);
    };
    render() {
        const { classes } = this.props;

        const {organization_name,about,org_address_1,country,completionStatus} =this.state.orgDetails;

        const percentage = Math.floor(completionStatus);
        const width = 200;
        const viewBox = `0 0 ${width} ${width}`;
        const strokeWidth = 10;
        const radius = (width - strokeWidth) / 2;
        const dashArray = radius * Math.PI * 2;
        const dashOffset = dashArray - (dashArray * percentage) / 100;

        return (
            <Grid item md={3} className={classes.completionStatusGrid}>
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        borderBottom: '2px solid #E5E5E5',
                        minHeight: 48,
                        paddingLeft: '0.5rem'
                    }}
                >
                    <Typography
                        variant="button"
                        style={{ fontSize: '0.8125rem' }}
                    >
                        Organization Profile Completion Status
                    </Typography>
                </div>

                <div className={classes.borderBottom}>
                    <svg width={width} height={width} viewBox={viewBox}>
                        <circle
                            fill="transparent"
                            stroke="#ddd"
                            cx={width / 2}
                            cy={width / 2}
                            r={radius}
                            strokeWidth={strokeWidth}
                        />

                        <circle
                            fill="transparent"
                            stroke="#F65629"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            cx="100"
                            cy="100"
                            r="95"
                            strokeWidth={strokeWidth}
                            strokeDasharray={dashArray}
                            strokeDashoffset={dashOffset}
                            // Start progress marker at 12 O'Clock

                            transform="rotate(-90 100 100)"
                        />
                        <text
                            fontSize="0.8125 rem"
                            fill="#000000de"
                            x="50%"
                            y="50%"
                            dy=".3em"
                            textAnchor="middle"
                        >
                            {percentage}% complete
                        </text>
                    </svg>
                </div>
                <div className={classes.detailsDiv}>
                    {
                        organization_name===null&&
                    
                    <div
                        className={classes.borderBottom}
                        onClick={() => this.editField('organization_name')}
                    >
                        <Typography variant="body1" className={classes.text}>
                            Add Organization Name
                        </Typography>
                    </div>
                    }
                    {
                        about===null&&
                    
                    <div
                        className={classes.borderBottom}
                        onClick={() => this.editField('about_org')}
                    >
                        <Typography variant="body1" className={classes.text}>
                            Add about Organization
                        </Typography>
                    </div>
                    }

                    {
                        org_address_1===null&&

                    <div className={classes.borderBottom}
                    onClick={() => this.editField('org_address_1')} >
                        <Typography variant="body1" className={classes.text}>
                            Headquarters Address
                        </Typography>
                    </div>
                    }

                    {
                        country===null&&
                    
                    <div className={classes.borderBottom}
                    onClick={() => this.editField('org_country')} >
                        <Typography variant="body1" className={classes.text}>
                            Headquarters Country
                        </Typography>
                    </div>
                    }
                </div>
            </Grid>
        );
    }
}

OrgCompletionStatus.propTypes = {
    orgDetails:PropTypes.object.isRequired,
    updateProfileField: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    orgDetails:state.user.orgDetails,
    updateField: state.user.updateField
});
export default withStyles(styles)(
    connect(
        mapStateToProps,
        { updateProfileField }
    )(OrgCompletionStatus)
);
