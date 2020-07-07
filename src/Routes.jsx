/*
 * Copyright (c) Schrocken Inc.
 * Author: Ravi Teja
 * File Description: Main Routes file
 */

import React from "react";
import { Route, Switch } from "react-router-dom";

import Auth from "./hoc/Auth";

// Authentication Routes
import SendURL from "./components/authentication/sendURL/SendUrl";
import Register from "./components/authentication/register";
import Login from "./components/authentication/login";
import ForgotPassword from "./components/authentication/password_reset/ForgotPassword";
import ResetPassword from "./components/authentication/password_reset/ResetPassword";
import Terms from "./components/terms/terms";
import Dashboard from "./components/dashboard/mainDashboard";
import AdminProfile from "./components/profile/Admin/index";

import UserInvitation from "./components/authentication/UserInvitation";
// import NotFound from "./components/pcmp/notFound/NotFound";

// PCMP Routes
import PCMP from "./components/pcmp/PcmpRoutes";

const Routes = () => (
  <Switch>
    <Route
      exact
      path="/sendurl"
      name="Dashboard"
      component={Auth(SendURL, null)}
    />
    <Route
      exact
      path="/register/:token"
      name="Register"
      component={Auth(Register, false)}
    />
    <Route exact path="/login" name="Login" component={Auth(Login, false)} />
    <Route
      exact
      path="/forgotpassword"
      name="Forgot Password"
      component={Auth(ForgotPassword, false)}
    />
    <Route
      exact
      path="/resetpassword/:token"
      name="reset Password"
      component={Auth(ResetPassword, false)}
    />
    <Route exact path="/terms" name="Terms" component={Auth(Terms, null)} />
    <Route exact path="/" name="Dashboard" component={Auth(Dashboard, true)} />
    <Route
      exact
      path="/:role/profile"
      name="Admin Profile"
      component={Auth(AdminProfile, true)}
    />
    <Route
      exact
      path="/inviteduser/:token"
      name="User Invitation"
      component={Auth(UserInvitation, false)}
    />

    {/* PCMP Routes */}
    <Route path="/pcmp" name="PCMP Layout" component={PCMP} />
    {/* <Route exact name="404 Not Found" path="*" component={NotFound} /> */}
  </Switch>
);

export default Routes;
