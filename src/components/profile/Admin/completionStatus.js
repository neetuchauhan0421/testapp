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

class CompletionStatus extends Component {
    state={
        userDetails:{
            full_name: '',
            about: '',
            country: '',
            gender: '',
            completionStatus:0
        }
    };
    UNSAFE_componentWillReceiveProps(nextProps){
        if(nextProps.userDetails){
            this.setState({userDetails:nextProps.userDetails})
        }
    }
    editField = name => {
        this.props.updateProfileField(name);
    };
    render() {
        const { classes } = this.props;
        const {full_name,about,country,gender,completionStatus}=this.state.userDetails
        const percentage = Math.floor(completionStatus);
        const width = 200;
        const viewBox = `0 0 ${width} ${width}`;
        const strokeWidth = 10;
        const radius = (width - strokeWidth) / 2;
        const dashArray = radius * Math.PI * 2;
        const dashOffset = dashArray - (dashArray * percentage) / 100;

        return (
            <Grid item md={3}  className={classes.completionStatusGrid}>
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
                        Your Profile Completion Status
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
                        full_name===null&&
                    
                        <div
                            className={classes.borderBottom}
                            onClick={() => this.editField('full_name')}
                        >
                            <Typography variant="body1" className={classes.text}>
                                Tell us your name
                            </Typography>
                        </div>
                    }

                    {
                      about===null&&
                    
                    <div
                        className={classes.borderBottom}
                        onClick={() => this.editField('about')}
                    >
                        <Typography variant="body1" className={classes.text}>
                            Tell us something about you
                        </Typography>
                    </div>
                    }

                    {
                      country===null&&
                      <div className={classes.borderBottom}
                      onClick={() => this.editField('country')} >
                        <Typography variant="body1" className={classes.text}>
                            Tell us where you are from
                        </Typography>
                    </div>
                    }
                    
                    {
                      gender===null&&
                    
                    <div className={classes.borderBottom}
                    onClick={() => this.editField('gender')} >
                        <Typography variant="body1" className={classes.text}>
                            Tell us your gender
                        </Typography>
                    </div>
                    }
                </div>
            </Grid>
        );
    }
}

CompletionStatus.propTypes = {
  userDetails:PropTypes.object.isRequired,
    updateProfileField: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    userDetails:state.user.userDetails,
    updateField: state.user.updateField
});
export default withStyles(styles)(
    connect(
        mapStateToProps,
        { updateProfileField }
    )(CompletionStatus)
);
