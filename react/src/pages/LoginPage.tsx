import React from "react";
import { useAuth } from "../hooks/useAuth";
import Button from "@material-ui/core/Button";
import LoginForm from "../components/auth/LoginForm";
import { useAlert } from "../components/alert/Alert";


export default () => {
  const auth = useAuth();
  const alertContext = useAlert();

  return (
    <>
      <h1>Login</h1>
      <p>Tip: Try eve.holt@reqres.in and cityslicka.</p>
      {auth?.isLoggedin && (
        <>
          Hi, you're logged in! 
          <button onClick={() =>{
            alertContext?.addAlert({ 
              message: "jajj", 
              severity: "info", 
              timeout: Math.random()*30
            })
          }}> Say error </button>
          <Button color="secondary" onClick={() => {
            auth?.logout()
            
          }}>
            Logout
          </Button>
        </>
      )}
      <hr />
      <LoginForm />
    </>
  );
};
