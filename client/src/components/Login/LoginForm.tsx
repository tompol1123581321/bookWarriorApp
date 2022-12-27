import { Alert, Box, Button, TextField, Typography } from "@mui/material";
import React from "react";
import { apiCall } from "../../api";
import { useAthentication } from "../../userContext";

export const LoginForm = () => {
  const [error, setError] = React.useState<Error>();
  const { authenticate } = useAthentication();
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
      authenticate && authenticate(ok, role);
    } catch {
      setError(new Error("Unknown error"));
    }
  }, [formData]);

  return (
    <Box
      component={"div"}
      sx={{
        height: "15rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        position: "relative",
      }}
    >
      <Typography sx={{ mb: "1rem" }} variant={"h5"} align="center">
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
    </Box>
  );
};
