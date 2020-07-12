import React from "react";
import { useForm, Controller } from "react-hook-form";
import { useAuth } from "../../hooks/useAuth";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";
import SentimentDissatisfiedIcon from "@material-ui/icons/SentimentDissatisfied";
import MeetingRoomIcon from "@material-ui/icons/MeetingRoom";
import "./LoginForm.css";

type FormData = {
  email: string;
  password: string;
};

interface LoginButtonIconProps {
  loading: boolean;
  error: Object | null;
}

function LoginButtonIcon({ loading, error }: LoginButtonIconProps) {
  if (loading) return <CircularProgress size={24} />;
  else if (error) return <SentimentDissatisfiedIcon />;
  else return <MeetingRoomIcon />;
}

export default () => {
  const auth = useAuth();
  const { control, handleSubmit, errors: formErrors, setError } = useForm<
    FormData
  >();
  const onSubmit = handleSubmit(async (f) => {
    const res = await auth?.login(f.email, f.password);
    if (!!res?.error) {
      setError("email", {
        type: "manual",
        message: "Wrong credentials.",
      });
    }
  });

  return (
    <form onSubmit={onSubmit} className="loginForm">
      <Controller
        as={TextField}
        name="email"
        label="E-mail"
        control={control}
        defaultValue=""
        error={!!formErrors.email}
        helperText={formErrors.email?.message}
        rules={{
          required: "This field is required.",
          pattern: {
            value: /[A-Za-z0-9]+@[A-Za-z0-9]+\.[A-Za-z0-9]+/,
            message: "Not even an email...",
          },
        }}
      />
      <Controller
        as={TextField}
        name="password"
        type="password"
        label="Password"
        control={control}
        defaultValue=""
        error={!!formErrors.password}
        helperText={formErrors.password?.message}
        rules={{ required: "This field is required." }}
      />
      <Button
        type="submit"
        color="primary"
        startIcon={
          <LoginButtonIcon loading={auth?.loading} error={auth?.error} />
        }
      >
        Login
      </Button>
    </form>
  );
};
