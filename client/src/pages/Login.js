import React, { useState, useEffect } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCardFooter,
  MDBValidation,
  MDBBtn,
  MDBIcon,
  MDBSpinner,
} from "mdb-react-ui-kit";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { googleSignIn, login } from "../redux/features/authSlice";
import { GoogleLogin } from "react-google-login";
import { gapi } from 'gapi-script';

const initialState = {
  email: "",
  password: "",
};

const clientId="704464996874-bsrg1fpdmrb741p3iftmq19e9u8jekq4.apps.googleusercontent.com"

const Login = () => {
  const [formValue, setFormValue] = useState(initialState);
  const { loading, error } = useSelector((state) => ({ ...state.auth }));
  const { email, password } = formValue;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //intalizing the google oauth
  React.useEffect(() => {
    function start() {
     gapi.client.init({
      clientId: clientId,
      scope: '',
     });
    }
    gapi.load('client:auth2', start);
   }, []);

  useEffect(() => {
    error && toast.error(error);
  }, [error]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      dispatch(login({ formValue, navigate, toast }));
    }
  };
  const onInputChange = (e) => {
    let { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };


  const devEnv = process.env.NODE_ENV !== "production";

  

  const googleSuccess = (resp) => {
    console.log("Hi Success");
    const email = resp?.profileObj?.email;
    const name = resp?.profileObj?.name;
    const token = resp?.tokenId;
    const googleId = resp?.googleId;
    const result = { email, name, token, googleId };
    dispatch(googleSignIn({ result, navigate, toast }));
  };
  const googleFailure = (error) => {
    console.log(error)
    toast.error(error);
  };
  return (
    <div
      style={{
        margin: "auto",
        padding: "15px",
        maxWidth: "450px",
        alignContent: "center",
        marginTop: "120px",
      }}
    >
      <MDBCard alignment="center">
        <MDBIcon fas icon="user-circle" className="fa-2x" />
        <h5>Sign In</h5>
        <MDBCardBody>
          <MDBValidation onSubmit={handleSubmit} noValidate className="row g-3">
            <div className="col-md-12">
              <MDBInput
                label="Email"
                type="email"
                value={email}
                name="email"
                onChange={onInputChange}
                required
                invalid
                validation="Please provide your email"
              />
            </div>
            <div className="col-md-12">
              <MDBInput
                label="Password"
                type="password"
                value={password}
                name="password"
                onChange={onInputChange}
                required
                invalid
                validation="Please provide your password"
              />
            </div>
            <div className="col-12">
              <MDBBtn style={{ width: "100%" }} className="mt-2">
                {loading && (
                  <MDBSpinner
                    size="sm"
                    role="status"
                    tag="span"
                    className="me-2"
                  />
                )}
                Login
              </MDBBtn>
            </div>
          </MDBValidation>
          <br />
          {/* <GoogleLogin
            clientId="704464996874-bsrg1fpdmrb741p3iftmq19e9u8jekq4.apps.googleusercontent.com"
            // Client ID: - 704464996874-bsrg1fpdmrb741p3iftmq19e9u8jekq4.apps.googleusercontent.com
            // Client secrete key: - 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
            render={(renderProps) => (
              <MDBBtn
                style={{ width: "100%" }}
                color="danger"
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
              >
                <MDBIcon className="me-2" fab icon="google" /> Google Sign In
              </MDBBtn>
            )}
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy="single_host_origin"
          /> */}
          <GoogleLoginButton/>
        </MDBCardBody>
        <MDBCardFooter>
          <Link to="/register">
            <p>Don't have an account ? Sign Up</p>
          </Link>
        </MDBCardFooter>
      </MDBCard>
    </div>
  );
};

function GoogleLoginButton() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onSuccess = async (resp) => {
    const email = resp?.profileObj?.email;
    const name = resp?.profileObj?.name;
    const token = resp?.tokenId;
    const googleId = resp?.googleId;
    const result = { email, name, token, googleId };
    dispatch(googleSignIn({ result, navigate, toast }));
   console.log("Login ho gaya",resp)
  };
  const onFailure = (res) => {
   alert('Google Auth Failed');
   console.log('Login falied res: ', res);
  };
  return (
   <div style={{ textAlign: 'center' }}>
    <GoogleLogin
     clientId={clientId}
     buttonText='Login'
     onSuccess={onSuccess}
     onFailure={onFailure}
     cookiePolicy={'single_host_origin'}
     isSignedIn={false}
    />
   </div>
  );
 }
 

export default Login;
