/*
 * Copyright - 2019 , Schrocken Inc
 * Author: Harish D
 * -----
 * File Description: Textfield that can be used to edit profile fields
 */
import React, { Component } from "react";

import TextField from "@material-ui/core/TextField";
import { Typography, Button } from "@material-ui/core";

import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

class EditTextField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      [this.props.id]: this.props.value
    };
  }
  handleChange = e => {
    this.setState({
      [this.props.id]: e.target.value
    });
  };
  //save
  saveValue = () => {
    this.props.saveEdit(this.props.id, this.state[this.props.id]);
  };
  render() {
    const { label, id } = this.props;
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        <div style={{ width: "70%" }}>
          {id === "gender" ? (
            <FormControl
              component="fieldset"
              // className={classes.formControl}
            >
              <FormLabel component="legend">Gender</FormLabel>
              <RadioGroup
                aria-label="Gender"
                name="gender"
                //  className={classes.group}
                value={this.state[this.props.id]}
                onChange={this.handleChange}
              >
                <FormControlLabel
                  value="Female"
                  control={<Radio />}
                  label="Female"
                />
                <FormControlLabel
                  value="Male"
                  control={<Radio />}
                  label="Male"
                />
                <FormControlLabel
                  value="Other"
                  control={<Radio />}
                  label="Other"
                />
              </RadioGroup>
            </FormControl>
          ) : (
            <TextField
              id="outlined-name"
              label={label}
              autoFocus
              value={this.state[this.props.id]}
              onChange={this.handleChange}
              margin="normal"
              variant="outlined"
              style={{ width: "100%" }}
            />
          )}
        </div>
        <Typography
          variant="body1"
          style={{ fontSize: "0.8125 rem", cursor: "pointer" }}
          onClick={this.props.cancelEdit}
          color="error"
        >
          X Cancel
        </Typography>
        <Button
          variant="outlined"
          name="fullName"
          onClick={this.saveValue}
          style={{ cursor: "pointer", backgroundColor: "#00A800" }}
        >
          <Typography
            variant="button"
            style={{
              color: "white",
              paddingRight: "1rem",
              paddingLeft: "1rem"
            }}
          >
            SAVE
          </Typography>
        </Button>
      </div>
    );
  }
}

export default EditTextField;
