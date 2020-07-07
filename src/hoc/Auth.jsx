import React, { Component } from 'react';
import { CircularProgress } from '@material-ui/core';
import axios from 'axios';

import { url } from '../utils/config';
import ServerError from '../components/defaultFiles/ServerError';

export default function (ComposedClass, reload) {
  class AuthenticationCheck extends Component {
    state = {
      loading: true,
      serverError: false
    };

    componentDidMount() {
      axios
        .get(`${url}/auth`)
        .then((res) => {
          if (reload === false) {
            this.props.history.push('/');
          } else {
            this.setState({ loading: false });
          }
        })
        .catch((err) => {
          if (err.response && err.response.status === 401) {
            if (reload) {
              this.props.history.push('/login');
            } else {
              this.setState({ loading: false });
            }
          } else {
            this.setState({ loading: false });
          }
        });
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
      if (
        nextProps.errors &&
        nextProps.errors !== this.props.errors &&
        nextProps.errors.errorCode === 500
      ) {
        this.setState({ isLoading: false, serverError: true });
      }
    }

    render() {
      const { loading } = this.state;
      if (loading) {
        return (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '100vh'
            }}
          >
            <CircularProgress style={{ color: 'primary' }} thickness={7} />
          </div>
        );
      }
      if (this.state.serverError) {
        return <ServerError />;
      }
      return <ComposedClass {...this.props} />;
    }
  }

  return AuthenticationCheck;
}







// import React, { Component } from "react";
// import { CircularProgress } from "@material-ui/core";
// import axios from "axios";

// import { url } from "../utils/config";
// // src / utils / config.js
// export default function (ComposedClass, reload) {
//   class AuthenticationCheck extends Component {
//     state = {
//       loading: true,
//     };

//     componentDidMount() {
//       axios
//         .get(`${url}/auth`)
//         .then((res) => {
//           if (reload === false) {
//             this.props.history.push("/");
//           } else {
//             this.setState({ loading: false });
//           }
//         })

//         .catch((err) => {
//           if (err.response === 401) {
//             this.props.userLogout(this.props.history);
//           }
//         });
//     }

//     render() {
//       const { loading } = this.state;
//       if (loading) {
//         return (
//           <div
//             style={{
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               minHeight: "100vh",
//             }}
//           >
//             <CircularProgress style={{ color: "primary" }} thickness={7} />
//           </div>
//         );
//       }
//       return <ComposedClass {...this.props} />;
//     }
//   }

//   return AuthenticationCheck;
// }


// *
//  * Copyright(c) Schrocken Inc.
//  * Author: Harish D
//   * File Description: Authentication of user
//     * /

// import React, { Component } from "react";

// import axios from "axios";

// import { CircularProgress } from "@material-ui/core";

// import { withRouter } from "react-router-dom";
// import { connect } from "react-redux";

// import { url } from "../utils/config";
// // import ServerError from "../../defaultFiles/ServerError";

// import { userLogout } from "../containers/actions/userActions";

// export default function (ComposedClass, type) {
//   class PcmpAuth extends Component {
//     state = {
//       isLoading: true,
//       // serverError: false
//     };

//     componentDidMount() {
//       if (sessionStorage.network && sessionStorage.appName) {
//         const data = {
//           ...this.props.match.params,
//           collabType: type
//         };
//         const { params } = this.props.match;

//         axios
//           .post(
//             `${url}/${sessionStorage.appName}/${sessionStorage.network}/${type}/${params.roleName}/pcmpAuth`,
//             data
//           )
//           .then((res) => {
//             if (res.data.status === true) {
//               this.setState({ isLoading: false });
//             } else {
//               this.props.userLogout(this.props.history);
//             }
//           })
//           .catch((err) => {
//             if (err.response.status === 401) {
//               this.props.userLogout(this.props.history);
//             }
//           });
//       } else {
//         this.props.history.push("/");
//       }
//     }

//     UNSAFE_componentWillReceiveProps(nextProps) {
//       if (
//         nextProps.errors &&
//         nextProps.errors !== this.props.errors &&
//         nextProps.errors.errorCode === 500
//       ) {
//         this.setState({
//           isLoading: false,
//           //  serverError: true 
//         });
//       }
//     }

//     render() {
//       if (this.state.isLoading) {
//         return (
//           <div style={{ textAlign: "center", marginTop: "25%" }}>
//             <CircularProgress color="primary" thickness={7} />
//           </div>
//         );
//       }
//       // if (this.state.serverError) {
//       //   return <ServerError />;
//       // }
//       return <ComposedClass {...this.props} />;
//     }
//   }
//   const mapStateToProps = (state) => ({ errors: state.errors });
//   return connect(mapStateToProps, { userLogout })(withRouter(PcmpAuth));
// }