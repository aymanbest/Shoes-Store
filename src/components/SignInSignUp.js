import React, { useState } from 'react';

import CloseButton from './CloseButton';


const SignInSignUpModal = ({ isOpen, onClose, onSignIn }) => {
  const [currentView, setCurrentView] = useState('signUp');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const changeView = (view) => {
    setCurrentView(view);
    setError('');
  };

  const handleSignIn = () => {
    // Replace with your actual authentication logic here
    const storedUsername = localStorage.getItem('username');
    const storedPassword = localStorage.getItem('password');

    if (username === storedUsername && password === storedPassword) {
      setError('');
      localStorage.setItem('loggedIn', true);
      onSignIn(true); // Inform the parent component about the successful sign-in
      onClose();
    } else {
      setError('Invalid username or password');
    }
  };

  const handleSignUp = () => {
    // Replace with your actual sign-up logic here
    localStorage.setItem('username', username);
    localStorage.setItem('password', password);
    localStorage.setItem('email', email);
    setError('');
    setCurrentView('logIn');
  };

  const handlePasswordReset = () => {
    // Implement password reset logic here
    // Send a reset link to the user's email address
    // Update the view accordingly
  };

  const renderSignUpView = () => (
    <form>
      <h2>Sign Up!</h2>
      <fieldset>
        <legend>Create Account</legend>
        <ul>
          <li>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </li>
          <li>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </li>
          <li>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </li>
        </ul>
      </fieldset>
      <button onClick={handleSignUp}>Submit</button>
      <button type="button" onClick={() => changeView('logIn')}>
        Have an Account?
      </button>
    </form>
  );

  const renderLogInView = () => (
    <form>
      <h2>Welcome Back!</h2>
      <fieldset>
        <legend>Log In</legend>
        <ul>
          <li>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </li>
          <li>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </li>
          <li>
            <i />
            <a onClick={() => changeView('PWReset')} href="#">
              Forgot Password?
            </a>
          </li>
        </ul>
      </fieldset>
      <button onClick={handleSignIn}>Login</button>
      <button type="button" onClick={() => changeView('signUp')}>
        Create an Account
      </button>
    </form>
  );

  const renderPasswordResetView = () => (
    <form>
      <h2>Reset Password</h2>
      <fieldset>
        <legend>Password Reset</legend>
        <ul>
          <li>
            <em>A reset link will be sent to your inbox!</em>
          </li>
          <li>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </li>
        </ul>
      </fieldset>
      <button onClick={handlePasswordReset}>Send Reset Link</button>
      <button type="button" onClick={() => changeView('logIn')}>
        Go Back
      </button>
    </form>
  );

  const renderView = () => {
    switch (currentView) {
      case 'signUp':
        return renderSignUpView();
      case 'logIn':
        return renderLogInView();
      case 'PWReset':
        return renderPasswordResetView();
      default:
        return null;
    }
  };

  return (
    <div>
      {isOpen && (
        <style>
          {`
            /* Example 'sign.css' styles */
           
          }
            body {
              margin: 0;
              padding: 0;
              color: black;
              background-color: #1E2937;
            }
            h1, h2, h3, h4, h5, h6, p {
              margin: 0;
              color: black;
              font-family: Jura, Arial;
              font-weight: 400;
            }
            section#entry-page {
              display: grid;
              grid-template-columns: 1fr minmax(200px, 400px) 1fr;
              grid-template-rows: 1fr minmax(auto, 1fr) 1fr;
              grid-gap: 10px;
              width: 100%;
              height: 100vh;
              
              background-size: 400% 400%;
              -webkit-animation: Gradient 15s ease infinite;
                      animation: Gradient 15s ease infinite;
              box-sizing: border-box;
            }
            section#entry-page form {
              grid-column: 2;
              grid-row: 2;
              display: grid;
              grid-gap: 10px;
              margin: auto 0;
              padding: 20px;
              background-color: rgba(255, 255, 255, 0.9);
              border-radius: 10px;
              box-shadow: 0 32px 64px rgba(0, 0, 0, 0.2);
              color: black;
            }
            section#entry-page form h2 {
              margin-bottom: 5px;
              text-align: center;
              text-shadow: 0 4px 16px #fff;
              font-size: 30px;
              font-weight: 100;
            }
            section#entry-page form fieldset {
              margin: 0;
              background-color: #fff;
              border: none;
              border-radius: 5px;
              box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
            }
            section#entry-page form fieldset legend {
              padding: 5px;
              background-color: #fff;
              border-radius: 5px;
            }
            section#entry-page form fieldset ul {
              margin: 0;
              padding: 0;
            }
            section#entry-page form fieldset ul li {
              display: grid;
              align-items: center;
              margin: 10px;
            }
            section#entry-page form fieldset ul li a {
              color: #02c;
            }
            section#entry-page form fieldset ul li em {
              grid-column: span 2;
              text-align: center;
              padding: 5px;
            }
            section#entry-page form fieldset ul li label {
              text-align: left;
              padding-bottom: 2px;
            }
            section#entry-page form fieldset ul li input {
              padding: 5px;
              border: 1px solid #ddd;
              border-radius: 5px;
            }
            section#entry-page form fieldset ul li input:hover {
              border: 1px solid #aaf;
            }
            section#entry-page form button {
              padding: 10px;
              border: 1px solid rgba(0, 0, 0, 0);
              border-radius: 5px;
              background: #fff;
              box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
            }
            section#entry-page form button:hover {
              background-color: #eef;
              border: 1px solid #aaf;
            }
            
            @media only screen and (min-width: 420px) {
              form h2 {
                font-size: 40px;
              }
              form fieldset ul li {
                grid-template-columns: 100px 1fr;
              }
              form fieldset ul li label {
                padding-right: 10px;
                padding-bottom: 0;
                text-align: right !important;
              }
            }
            .section-container {
              background: #1E2937;
              min-height: 100vh;
            }
            
          `}
        </style>
      )}
      <section id="entry-page" className={isOpen ? 'section-container' : 'hidden'}>
      {renderView()}
    </section>
    </div>
  );
};

export default SignInSignUpModal;
