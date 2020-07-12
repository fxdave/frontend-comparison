import React from "react";
import { useAuth } from "../hooks/useAuth";
import Button from "@material-ui/core/Button";
import LoginForm from "../components/auth/LoginForm";

export default () => {
  const auth = useAuth();
  console.log(auth);

  return (
    <>
      <h1>Login</h1>
      <p>Tip: Try eve.holt@reqres.in and cityslicka.</p>
      {auth?.isLoggedin && (
        <>
          Hi, you're logged in!
          <Button color="secondary" onClick={auth?.logout}>
            Logout
          </Button>
        </>
      )}
      <hr />
      <LoginForm />
    </>
  );
};
