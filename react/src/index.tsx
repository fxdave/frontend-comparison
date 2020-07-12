import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import LoginPage from "./pages/LoginPage";
import Container from "@material-ui/core/Container";
import { AuthProvider } from "./hooks/useAuth";

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <Container>
        <LoginPage />
      </Container>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
