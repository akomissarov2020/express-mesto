import React from 'react';
import AuthForm from './AuthForm';

function Login(props) {
  return (
    <>
      <AuthForm 
        name={props.name}
        handleSubmit={props.onLogin}
        formTitleText="Вход"
        formButtonText="Войти"
      />
    </>
  );
}

export default Login;
