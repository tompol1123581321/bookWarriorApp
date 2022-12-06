import { Alert, Button, Paper, TextField, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { apiCall } from "../../api";

export const LoginForm = () => {
  const navigate = useNavigate();
  const [error, setError] = React.useState<Error>();
  const [formData, setFormData] = React.useState({
    userName: "",
    password: "",
  });
  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setError(undefined);
    const key = e.target.id;
    setFormData({ ...formData, [key]: e.target.value });
  };
  const onSubmit = React.useCallback(async () => {
    try {
      const response: {
        ok: boolean;
        role?: "VISITOR" | "ADMIN";
      } = await apiCall<typeof formData>({
        method: "POST",
        body: formData,
        url: "/api/logIn",
      });
      const { ok, role } = response;

      if (!ok || !role) {
        setError(new Error("Wrong password and/or username"));
        return;
      }
      navigate(`/${role.toLowerCase()}`);
    } catch (_) {
      setError(new Error("Unknown error"));
    }
  }, [formData]);

  return (
    <Paper
      elevation={3}
      component={"div"}
      sx={{
        padding: "3rem",
        width: "20rem",
        height: "20rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
      }}
    >
      <Typography sx={{ mb: "1rem" }} variant={"h4"} align="center">
        Please log in
      </Typography>
      <TextField
        onChange={onChange}
        value={formData.userName}
        id="userName"
        label="UserName"
      />
      <TextField
        onChange={onChange}
        value={formData.password}
        type={"password"}
        id="password"
        label="Password"
      />
      <Button
        variant="contained"
        disabled={!(formData.password && formData.userName)}
        onClick={onSubmit}
      >
        Login
      </Button>
      {error && <Alert severity="error">{error.message}</Alert>}
    </Paper>
  );
};
