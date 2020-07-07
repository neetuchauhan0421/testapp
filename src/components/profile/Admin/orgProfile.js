import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  Grid,
  Typography,
  Button,
  // Dialog
} from '@material-ui/core/';
import { withStyles } from '@material-ui/core/styles';

import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';

import EditTextField from './editTextfield';
import {
  updateProfileField,
  orgProfileData,
  updateOrgProfile,
} from '../../../containers/actions/userActions';
import defaultImg from '../../../resources/images/profile2.png';

const styles = theme => ({
  grid: {
    display: 'flex',
    flexDirection: 'column',
    margin: '0.5rem 3rem 0 0',
  },
  borderBottom: {
    borderBottom: '2px solid #E5E5E5',
    paddingTop: '0.5rem',
    paddingBottom: '0.5rem',
  },
  textBottom: {
    borderBottom: '2px solid #E5E5E5',
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

class OrganizationProfile extends Component {
  state = {
    editField: '',
    file: '',
    orgDetails: {
      organization_name: '',
      about: '',
      org_address_1: '',
      country: '',
      org_logo: null,
    },
    imgTypeError: '',
  };

  // call api
  componentDidMount() {
    this.props.orgProfileData();
  }

  // props
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.updateField) {
      this.setState({ editField: nextProps.updateField });
    }
    if (nextProps.orgDetails) {
      this.setState({ orgDetails: nextProps.orgDetails });
    }
  }

  onEditField = (name) => {
    this.setState({
      editField: name,
    });
  };

  // save
  saveEdit = (key, value) => {
    const editField = [
      {
        [key]: value,
      },
    ];
    this.props.updateOrgProfile(editField);

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
              org_logo: e.target.result,
            },
          ];
          this.props.updateOrgProfile(editProfilePic);
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

  render() {
    const { classes } = this.props;
    const { editField } = this.state;
    const { org_logo } = this.state.orgDetails;

    let image = null;
    if (org_logo === null) {
      image = <img src={defaultImg} alt="no img" className={classes.profilePicDiv} />;
    } else {
      image = <img src={org_logo} alt="no img" className={classes.profilePicDiv} />;
    }
    return (
      <Grid container style={{ marginTop: '1.5rem' }}>
        <Grid item xs={12} sm={4}>
          <div className={classes.grid}>
            <div className={classes.borderBottom}>
              <div className={classes.profileDiv}>{image}</div>
            </div>
            <div className={classes.textBottom}>
              <InputLabel htmlFor="imgUpload">
                <Typography variant="body1" style={{ cursor: 'pointer' }}>
                  Change picture
                </Typography>
              </InputLabel>

              <Input
                id="imgUpload"
                type="file"
                onChange={this.uploadImage}
                style={{ display: 'none' }}
              />
            </div>
          </div>
        </Grid>

        <Grid item xs={12} sm={8}>
          <div className={classes.editField}>
            <div>
              {/* {editField === 'organization_name' ? (
                <div className={classes.borderBottom}>
                  <EditTextField
                    label="ORGANIZATION NAME"
                    value={
                      this.state.orgDetails.organization_name === null
                        ? 'Organization Name'
                        : this.state.orgDetails.organization_name
                    }
                    id="organization_name"
                    saveEdit={this.saveEdit}
                    cancelEdit={this.cancelEdit}
                  />
                </div>
              ) : (
                <React.Fragment> */}
                  <Typography variant="body1" className={classes.paddingTop}>
                    ORGANIZATION NAME
                  </Typography>

                  <div className={`${classes.editDiv} ${classes.borderBottom}`}>
                    <Typography variant="body1">
                      {/* {this.state.orgDetails.organization_name === null
                        ? 'Not Specified'
                        : */}
                        { this.state.orgDetails.organization_name}
                    </Typography>
                    {/* <Button
                      variant="outlined"
                      onClick={() => this.onEditField('organization_name')}
                    >
                      <Typography variant="button" className={classes.buttonText}>
                        EDIT
                      </Typography>
                    </Button> */}
                  </div>
                {/* </React.Fragment> */}
              {/* )} */}
            </div>

            <div>
              {editField === 'about_org' ? (
                <div className={classes.borderBottom}>
                  <EditTextField
                    label="ABOUT ORGANIZATION"
                    value={
                      this.state.orgDetails.about === null
                        ? 'Not Specified'
                        : this.state.orgDetails.about
                    }
                    id="about"
                    saveEdit={this.saveEdit}
                    cancelEdit={this.cancelEdit}
                  />
                </div>
              ) : (
                <React.Fragment>
                  <Typography variant="body1" className={classes.paddingTop}>
                    ABOUT ORGANIZATION
                  </Typography>
                  <div className={`${classes.editDiv} ${classes.borderBottom}`}>
                    <Typography variant="body1">
                      {this.state.orgDetails.about === null
                        ? 'Not Specified'
                        : this.state.orgDetails.about}
                    </Typography>
                    <Button variant="outlined" onClick={() => this.onEditField('about_org')}>
                      <Typography variant="button" className={classes.buttonText}>
                        EDIT
                      </Typography>
                    </Button>
                  </div>
                </React.Fragment>
              )}
            </div>

            <div>
              {editField === 'org_address_1' ? (
                <div className={classes.borderBottom}>
                  <EditTextField
                    label="HEAD QUARTERS ADDRESS"
                    value={
                      this.state.orgDetails.org_address_1 === null
                        ? 'Not Specified'
                        : this.state.orgDetails.org_address_1
                    }
                    id="org_address_1"
                    saveEdit={this.saveEdit}
                    cancelEdit={this.cancelEdit}
                  />
                </div>
              ) : (
                <React.Fragment>
                  <Typography variant="body1" className={classes.paddingTop}>
                    HEAD QUARTERS ADDRESS
                  </Typography>
                  <div className={`${classes.editDiv} ${classes.borderBottom}`}>
                    <Typography variant="body1">
                      {this.state.orgDetails.org_address_1 === null
                        ? 'Not Specified'
                        : this.state.orgDetails.org_address_1}
                    </Typography>
                    <Button variant="outlined" onClick={() => this.onEditField('org_address_1')}>
                      <Typography variant="button" className={classes.buttonText}>
                        EDIT
                      </Typography>
                    </Button>
                  </div>
                </React.Fragment>
              )}
            </div>

            <div>
              {editField === 'org_country' ? (
                <div className={classes.borderBottom}>
                  <EditTextField
                    label="HEAD QUARTERS COUNTRY"
                    value={
                      this.state.orgDetails.country === null
                        ? 'Not Specified'
                        : this.state.orgDetails.country
                    }
                    id="country"
                    saveEdit={this.saveEdit}
                    cancelEdit={this.cancelEdit}
                  />
                </div>
              ) : (
                <React.Fragment>
                  <Typography variant="body1" className={classes.paddingTop}>
                    HEAD QUARTERS COUNTRY
                  </Typography>
                  <div className={`${classes.editDiv} ${classes.borderBottom}`}>
                    <Typography variant="body1">
                      {this.state.orgDetails.country === null
                        ? 'Not Specified'
                        : this.state.orgDetails.country}
                    </Typography>
                    <Button variant="outlined" onClick={() => this.onEditField('org_country')}>
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

OrganizationProfile.propTypes = {
  classes: PropTypes.object.isRequired,
  orgDetails: PropTypes.object.isRequired,
  updateField: PropTypes.string,
  updateProfileField: PropTypes.func.isRequired,
  orgProfileData: PropTypes.func.isRequired,
  updateOrgProfile: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  orgDetails: state.user.orgDetails,
  updateField: state.user.updateField,
});

export default withStyles(styles)(
  connect(
    mapStateToProps,
    { updateProfileField, orgProfileData, updateOrgProfile },
  )(OrganizationProfile),
);
