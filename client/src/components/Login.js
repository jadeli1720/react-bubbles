import React, { useState } from "react";
import axios from 'axios';
import { Form } from 'semantic-ui-react';

const Login = props => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const [login, setLogin] = useState({
    username: '',
    password: ''
  });
  

  const handleChange = e => {
    setLogin({ ...login, [e.target.name]: e.target.value });
    console.log(
      "handleChange",
      e.target.name,
      e.target.value,
      setLogin()
    );
  }

  const loginSubmit = e => {
    e.preventDefault();
    axios.post(`http://localhost:5000/api/login`, login)
        .then(res => {
          localStorage.setItem('token', res.data.payload);
          props.history.push('/bubblepage');
          console.log('Successful Login', res.data)
        })
        .catch(err => {
          console.log('Opps, Something happened!', err.response)
        }) 
        setLogin({
          username: '',
          password: ''
      })
  }

  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <div className="formContainer">
        <h2>Please Login Below</h2>
        <Form onSubmit={loginSubmit} className="loginForm">
          <Form.Field className="loginField">
            <label className="loginLabel" >Username:</label>
            <input
              type="text"
              name="username"
              placeholder='username'
              // fluid
              className="loginInput"
              // width={6}//don't know if I'll need
              value={login.username}
              onChange={handleChange}
            />
          </Form.Field>
          <Form.Field className="loginField">
            <label className="loginLabel" >Password:</label>
            <input
              type="password"
              name="password"
              placeholder='password'
              // fluid
              className="loginInput"
              width={6}
              value={login.password}
              onChange={handleChange} />
          </Form.Field>
          <button type="submit" className="loginButton">Log in</button>

        </Form>
      </div>
    </>
  );
};

export default Login;
