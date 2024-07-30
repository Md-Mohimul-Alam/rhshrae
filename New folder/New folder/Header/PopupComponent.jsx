import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import './header.css';
import { addUser, getUserByEmail, getUserByPhone, userExists } from '../indexedDB';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import Stack from '@mui/material/Stack';
import gif from "./output-onlinegiftools.gif";

  // Snackbar states
const PopupComponent = ({ show, handleClose  }) => {
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(true);
  const [usePhone, setUsePhone] = useState(true);

  // Snackbar states
  const [open, setOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState('success'); // default to 'success'

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (usePhone) {
        if (isRegister) {
          if (await userExists(phone, 'phone')) {
            setAlertMessage('User already exists');
            setAlertSeverity('error');
            setOpen(true);
            return;
          }
          await addUser({ phone, password }, 'phone');
          setAlertMessage('User registered successfully');
          setAlertSeverity('success');
          setOpen(true);
        } else {
          const user = await getUserByPhone(phone);
          if (user && user.password === password) {
            setAlertMessage('Login successful');
            setAlertSeverity('success');
            setOpen(true);
          } else {
            setAlertMessage('Invalid credentials');
            setAlertSeverity('error');
            setOpen(true);
          }
        }
      } else {
        if (isRegister) {
          if (await userExists(email, 'email')) {
            setAlertMessage('User already exists');
            setAlertSeverity('error');
            setOpen(true);
            return;
          }
          await addUser({ email, password }, 'email');
          setAlertMessage('User registered successfully');
          setAlertSeverity('success');
          setOpen(true);
        } else {
          const user = await getUserByEmail(email);
          if (user && user.password === password) {
            setAlertMessage('Login successful');
            setAlertSeverity('success');
            setOpen(true);
            if (onLoginSuccess) onLoginSuccess(); 
          } else {
            setAlertMessage('Invalid credentials');
            setAlertSeverity('error');
            setOpen(true);
          }
        }
      }
    } catch (error) {
      setAlertMessage('An error occurred');
      setAlertSeverity('error');
      setOpen(true);
    }
  };

  const toggleForm = () => setIsRegister(!isRegister);

  const handleCloseSnackbar = () => {
    setOpen(false);
  };
  // Debugging output
  console.log('Snackbar Open:', open);
  console.log('Alert Message:', alertMessage);
  console.log('Alert Severity:', alertSeverity);
  return (
    <Modal show={show} onHide={handleClose} top>
      <Modal.Header closeButton>
        <Modal.Title style={{ paddingLeft: '190px' }}>
          {isRegister ? 'Register' : 'Login'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="bodyTable1">
          <div className="phoneNumberLogin outsideDialog authForm">
            <button className="facebookLoginButton loginBtn loginButton" style={{ background: '#49639f', color: 'white' }} onClick={() => console.log('Facebook login button clicked')}>
              <svg width="20px" height="20px" style={{ fill: 'white', stroke: 'white', display: 'inline-block', verticalAlign: 'middle' }} viewBox="0 0 430.113 430.114">
                <path id="Facebook" d="M158.081,83.3c0,10.839,0,59.218,0,59.218h-43.385v72.412h43.385v215.183h89.122V214.936h59.805c0,0,5.601-34.721,8.316-72.685c-7.784,0-67.784,0-67.784,0s0-42.127,0-49.511c0-7.4,9.717-17.354,19.321-17.354c9.586,0,29.818,0,48.557,0c0-9.859,0-43.924,0-75.385c-25.016,0-53.476,0-66.021,0C155.878-0.004,158.081,72.48,158.081,83.3z" />
              </svg>
              <div className="buttonText">
                <span>Sign Up or Login with <b>Facebook</b></span>
              </div>
            </button>
            <button className="loginBtn emailLoginBtn" onClick={toggleForm}>
              <img src={gif} alt="" style={{ display: 'inline-block', verticalAlign: 'middle' }} width="30px" height="30px"  />
              <span>{isRegister ? 'Register ' : 'Login '}</span>
            </button>
            <button className="loginBtn emailLoginBtn" onClick={() => setUsePhone(!usePhone)}>
              <svg style={{ display: 'inline-block', verticalAlign: 'middle' }} width="25px" height="25px" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 491.52 491.52">
                <rect y="85.914" style={{ fill: '#F6C358' }} width="491.52" height="319.693" />
                <polygon style={{ fill: '#FCD462' }} points="245.76,217.258 491.52,405.604 0,405.604" />
                <polygon style={{ fill: '#DC8744' }} points="245.76,291.673 0,85.916 491.52,85.916" />
                <polygon style={{ fill: '#FCD462' }} points="245.76,274.261 0,85.916 491.52,85.916" />
              </svg>
              <span>{usePhone ? 'Switch to Email Login' : 'Switch to Phone Login'}</span>
            </button>
            <div className="orContainer">
              <span>or</span>
            </div>
            <form className="phoneNumberInputContainer" onSubmit={handleSubmit}>
              {usePhone ? (
                <>
                  <div className="phoneNumberLoginField focused">
                    <div className='phone-i' style={{ color: 'black' }}>
                      <PhoneInput
                        style={{ paddingLeft: '15px' }}
                        inputStyle={{ color: 'black', width: '250px' }}
                        value={phone}
                        onChange={(phone) => setPhone(phone)}
                        inputclassName="phone-input"
                        dropdownclassName="phone-dropdown"
                        placeholder='e.g. +8801672955886'
                      />
                    </div>
                  </div>
                   <div style={{ paddingBottom: '5px' }}>
                    <div className="passwordInputField">
                      <input
                        style={{ width: '100%' }}
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        required
                      />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div style={{ paddingBottom: '5px' }}>
                    <div className="emailInputField">
                      <input
                        style={{ width: '100%' }}
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                  </div>
                  <div style={{ paddingBottom: '5px' }}>
                    <div className="passwordInputField">
                      <input
                        style={{ width: '100%' }}
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        required
                      />
                    </div>
                  </div>
                </>
              )}
              <div className="errorContainer"></div>
              <div className="actions">
                <button className="loginBtn" type="submit">
                  {isRegister ? 'SIGN UP' : 'LOGIN'}
                </button>
              </div>
            </form>

            <div className="recaptcha">
              <h5 className="recaptchaTxt">
                <span>This site is protected by reCAPTCHA and the Google </span>
                <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Privacy Policy</a>
                <span> and </span>
                <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer">Terms of Service</a>
                <span> apply.</span>
              </h5>
            </div>
          </div>
        </div>
      </Modal.Body>
      <Stack sx={{ width: '100%' }} spacing={2}>
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} // Position Snackbar
        >
          <Alert onClose={handleCloseSnackbar} severity={alertSeverity}>
            {alertMessage}
          </Alert>
        </Snackbar>
      </Stack>

    </Modal>
  );
};

export default PopupComponent;
