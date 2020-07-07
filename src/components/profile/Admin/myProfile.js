import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { Grid, Typography, Button } from '@material-ui/core/';
// dialog
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';

import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';

import EditTextField from './editTextfield';
import {
  updateProfileField,
  userProfileData,
  updateUserProfile,
  userLogout,
} from '../../../containers/actions/userActions';
import { forgotPassword } from '../../../containers/actions/authActions';
import defaultImg from '../../../resources/images/profile2.png';

const styles = theme => ({
  grid: {
    display: 'flex',
    flexDirection: 'column',
    margin: '0.5rem 3rem 0 0',
  },
  paper: {
    width: '100%',
  },
  borderBottom: {
    borderBottom: '1px solid #E5E5E5',
    paddingTop: '0.5rem',
    paddingBottom: '0.5rem',
  },
  textBottom: {
    borderBottom: '1px solid #E5E5E5',
    paddingTop: '0.5rem',
    paddingBottom: '0.5rem',
    textAlign: 'center',
  },
  profileDiv: {
    textAlign: 'center',
  },
  editField: {
    display: 'flex',
    flexDirection: 'column',
  },
  editDiv: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  paddingTop: {
    paddingTop: '1rem',
  },
  divPadding: {
    paddingTop: '0.5rem',
    paddingBottom: '0.5rem',
  },
  profilePicDiv: {
    width: '200px',
    height: '200px',
    border: '1px solid #E3E3E3',
    borderRadius: '50%',
  },
  buttonText: {
    paddingRight: '1rem',
    paddingLeft: '1rem',
  },
});

class MyProfile extends Component {
  state = {
    editField: '',
    open: false,
    resetEmail: '',
    userProfile: {
      email_address: '',
      profile_pic: null,
      full_name: '',
      about: '',
      country: '',
      gender: 'Male',
      organization_name: '',
      completion_status: '',
    },
    file: '',
    error: '',
    imgTypeError: '',
  };

  componentDidMount() {
    this.props.userProfileData();
  }

  // props
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.updateField) {
      this.setState({ editField: nextProps.updateField });
    }
    if (nextProps.userDetails) {
      this.setState({ userProfile: nextProps.userDetails });
    }
    if (nextProps.auth) {
      if (nextProps.auth.forgotPasswordResponse.status === true) {
        this.setState({
          // open:false,
          error: 'Email sent successfully. Please reset your password through email.',
        });
        this.props.userLogout(this.props.history);
      } else {
        if (nextProps.auth.forgotPasswordResponse.errorType === 'email') {
          this.setState({
            error: 'Invalid email.',
          });
        }
        if (nextProps.auth.forgotPasswordResponse.message) {
          this.setState({
            error: 'Email does not exist.',
          });
        }
      }
    }
  }

  onEditField = (name) => {
    this.setState({
      editField: name,
    });
  };

  // save
  saveEdit = (key, value) => {
    const editData = [{ [key]: value }];
    this.props.updateUserProfile(editData);
    this.cancelEdit();
  };

  // undo edit
  cancelEdit = () => {
    this.setState({ editField: 'none' });
    this.props.updateProfileField('none');
  };

  // profile img upload
  uploadImage = (e) => {
    e.preventDefault();

    const reader = new FileReader();
    const file = e.target.files[0];

    // reader.readAsDataURL(file);
    reader.readAsArrayBuffer(file);
    reader.onload = (e) => {
      const arr = new Uint8Array(e.target.result).subarray(0, 4);
      let header = '';
      for (let i = 0; i < arr.length; i++) {
        header += arr[i].toString(16);
      }

      const imgType = this.imgfileType(header);
      if (imgType === true) {
        reader.readAsDataURL(file);
        reader.onload = (e) => {
          const editProfilePic = [
            {
              profile_pic: e.target.result,
            },
          ];
          this.props.updateUserProfile(editProfilePic);
          this.setState({ imgTypeError: '' });
        };
      } else {
        this.setState({
          imgTypeError: 'Please upload jpg, jpeg or png image only.',
        });
      }
    };
  };

  // validate image type , allow jpg,jpeg and png using magic numbers
  imgfileType = (header) => {
    switch (header) {
      case '89504e47':
        return true;

      case 'ffd8ffe0':
      case 'ffd8ffe1':
      case 'ffd8ffe2':
      case 'ffd8ffe3':
      case 'ffd8ffe8':
        return true;

      case '47494638':
        return false;
      default:
        return false;
    }
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  closeDialog = () => {
    this.setState({ open: false });
  };

  submitResetPassword = (e) => {
    // this.setState({ open: false, resetEmail:'' });
    e.preventDefault();
    if (this.state.resetEmail === '') {
      this.setState({
        error: 'Please enter your email.',
      });
    } else {
      // this.setState({open:false,resetEmail:''})
      const user = {
        superadminEmail: this.state.resetEmail,
      };
      this.props.forgotPassword(user);
    }
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
      error: '',
    });
  };

  render() {
    const { classes } = this.props;
    const { editField, error, imgTypeError } = this.state;
    const { profile_pic } = this.state.userProfile;

    let image = null;
    if (profile_pic === null) {
      image = <img src={defaultImg} alt="no img" className={classes.profilePicDiv} />;
    } else {
      image = <img src={profile_pic} alt="no img" className={classes.profilePicDiv} />;
    }
    return (
      <Grid container style={{ marginTop: '1.5rem' }}>
        <Grid item xs={12} sm={4} md={4}>
          <Dialog
            // fullScreen
            open={this.state.open}
            onClose={this.closeDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            classes={{
              paper: classes.paper,
            }}
          >
            <form onSubmit={this.submitResetPassword}>
              <div
                style={{
                  textAlign: 'center',
                  padding: '2rem 1rem 1rem 1rem',
                }}
              >
                <Typography variant="h4" color="secondary">
                  Reset Password
                </Typography>

                <Typography variant="body1" style={{ paddingTop: '0.5rem' }}>
                  Confirm your email address to reset password
                </Typography>
              </div>
              <div
                style={{
                  textAlign: 'center',
                  padding: '0.5rem 1rem 1rem 1rem',
                }}
              >
                <TextField
                  label="Email Address"
                  autoFocus
                  type="email"
                  name="resetEmail"
                  value={this.state.resetEmail}
                  onChange={this.handleChange}
                  margin="normal"
                  variant="outlined"
                  style={{ width: '80%' }}
                />
                {error && (
                  <Typography variant="body1" color="error">
                    {error}
                  </Typography>
                )}
              </div>
              <div
                style={{
                  textAlign: 'center',
                  marginBottom: '1.5rem',
                }}
              >
                <Button variant="contained" color="secondary" type="submit">
                  Reset Password
                </Button>
              </div>
            </form>
          </Dialog>

          <div className={classes.grid}>
            <div className={classes.borderBottom}>
              <div className={classes.profileDiv}>{image}</div>
              {imgTypeError && (
                <Typography variant="caption" color="error">
                  {imgTypeError}
                </Typography>
              )}
            </div>

            <div className={classes.textBottom}>
              <InputLabel htmlFor="imgUpload">
                <Typography variant="body1" style={{ cursor: 'pointer', color: '#000000' }}>
                  Change picture
                </Typography>
              </InputLabel>

              <Input
                id="imgUpload"
                type="file"
                accept=".jpg,.jpeg,.png"
                onChange={this.uploadImage}
                style={{ display: 'none' }}
              />
            </div>

            <div
              className={classes.textBottom}
              onClick={this.handleClickOpen}
              style={{ cursor: 'pointer' }}
            >
              <Typography variant="body1">Change password</Typography>
            </div>
          </div>
        </Grid>

        <Grid item xs={12} sm={8} md={8}>
          <div className={classes.editField}>
            <div>
              {editField === 'full_name' ? (
                <div className={classes.borderBottom}>
                  <EditTextField
                    label="FULL NAME"
                    value={
                      this.state.userProfile.full_name === null
                        ? 'Your Name'
                        : this.state.userProfile.full_name
                    }
                    id="full_name"
                    saveEdit={this.saveEdit}
                    cancelEdit={this.cancelEdit}
                  />
                </div>
              ) : (
                <React.Fragment>
                  <Typography variant="body1" className={classes.paddingTop}>
                    FULL NAME
                  </Typography>

                  <div className={`${classes.editDiv} ${classes.borderBottom}`}>
                    <Typography variant="body1">
                      {this.state.userProfile.full_name === null
                        ? 'Not specified'
                        : this.state.userProfile.full_name}
                    </Typography>
                    <Button variant="outlined" onClick={() => this.onEditField('full_name')}>
                      <Typography variant="button" className={classes.buttonText}>
                        EDIT
                      </Typography>
                    </Button>
                  </div>
                </React.Fragment>
              )}
            </div>

            <div>
              <Typography variant="body1" className={classes.paddingTop}>
                EMAIL ADDRESS
              </Typography>
              <Typography variant="body1" className={classes.borderBottom}>
                {this.state.userProfile.email_address}
              </Typography>
            </div>

            <div>
              <Typography variant="body1" className={classes.paddingTop}>
                ORGANIZATION
              </Typography>

              <Typography variant="body1" className={classes.borderBottom}>
                {this.state.userProfile.organization_name}
              </Typography>
            </div>

            <div>
              {editField === 'about' ? (
                <div className={classes.borderBottom}>
                  <EditTextField
                    label="ABOUT"
                    value={
                      this.state.userProfile.about === null
                        ? 'Not Specified'
                        : this.state.userProfile.about
                    }
                    id="about"
                    saveEdit={this.saveEdit}
                    cancelEdit={this.cancelEdit}
                  />
                </div>
              ) : (
                <React.Fragment>
                  <Typography variant="body1" className={classes.paddingTop}>
                    ABOUT
                  </Typography>
                  <div className={`${classes.editDiv} ${classes.borderBottom}`}>
                    <Typography variant="body1">
                      {this.state.userProfile.about === null
                        ? 'Not Specified'
                        : this.state.userProfile.about}
                    </Typography>
                    <Button variant="outlined" onClick={() => this.onEditField('about')}>
                      <Typography variant="button" className={classes.buttonText}>
                        EDIT
                      </Typography>
                    </Button>
                  </div>
                </React.Fragment>
              )}
            </div>

            <div>
              {editField === 'country' ? (
                <div className={classes.borderBottom}>
                  <EditTextField
                    label="COUNTRY"
                    value={
                      this.state.userProfile.country === null
                        ? 'Country'
                        : this.state.userProfile.country
                    }
                    id="country"
                    saveEdit={this.saveEdit}
                    cancelEdit={this.cancelEdit}
                  />
                </div>
              ) : (
                <React.Fragment>
                  <Typography variant="body1" className={classes.paddingTop}>
                    COUNTRY
                  </Typography>
                  <div className={`${classes.editDiv} ${classes.borderBottom}`}>
                    <Typography variant="body1">
                      {this.state.userProfile.country === null
                        ? 'Not Specified'
                        : this.state.userProfile.country}
                    </Typography>
                    <Button variant="outlined" onClick={() => this.onEditField('country')}>
                      <Typography variant="button" className={classes.buttonText}>
                        EDIT
                      </Typography>
                    </Button>
                  </div>
                </React.Fragment>
              )}
            </div>

            <div>
              {editField === 'gender' ? (
                <div className={classes.borderBottom}>
                  <EditTextField
                    label="GENDER"
                    value={
                      this.state.userProfile.gender === null
                        ? 'Gender'
                        : this.state.userProfile.gender
                    }
                    id="gender"
                    saveEdit={this.saveEdit}
                    cancelEdit={this.cancelEdit}
                  />
                </div>
              ) : (
                <React.Fragment>
                  <Typography
                    variant="body1"
                    className={classes.paddingTop}
                    color={this.state.userProfile.gender === '' ? 'error' : 'inherit'}
                  >
                    GENDER
                  </Typography>
                  <div className={`${classes.editDiv} ${classes.borderBottom}`}>
                    <Typography variant="body1">
                      {this.state.userProfile.gender === null
                        ? 'Not Specified'
                        : this.state.userProfile.gender}
                    </Typography>
                    <Button variant="outlined" onClick={() => this.onEditField('gender')}>
                      <Typography variant="button" className={classes.buttonText}>
                        EDIT
                      </Typography>
                    </Button>
                  </div>
                </React.Fragment>
              )}
            </div>
          </div>
        </Grid>
      </Grid>
    );
  }
}

MyProfile.propTypes = {
  classes: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,

  userDetails: PropTypes.object.isRequired,
  updateField: PropTypes.string,

  updateProfileField: PropTypes.func.isRequired,
  userProfileData: PropTypes.func.isRequired,
  updateUserProfile: PropTypes.func.isRequired,
  forgotPassword: PropTypes.func.isRequired,
  userLogout: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  updateField: state.user.updateField,
  userDetails: state.user.userDetails,
  auth: state.auth,
});

export default withStyles(styles)(
  connect(
    mapStateToProps,
    {
      updateProfileField,
      userProfileData,
      updateUserProfile,
      forgotPassword,
      userLogout,
    },
  )(withRouter(MyProfile)),
);
