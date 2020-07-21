import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import LoginPage from "./pages/LoginPage";
import Container from "@material-ui/core/Container";
import { AuthProvider } from "./hooks/useAuth";
import { AlertProvider } from "./components/alert/Alert";

ReactDOM.render(
  <React.StrictMode>
    <AlertProvider>
      <AuthProvider>
        <Container>
          <LoginPage />
        </Container>
      </AuthProvider>
    </AlertProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
