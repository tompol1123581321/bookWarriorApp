import { Alert, Box, Button, TextField, Typography } from "@mui/material";
import React from "react";
import { apiCall } from "../../api";
import { useAthentication } from "../../userContext";

export const RegistrationForm = () => {
  const [error, setError] = React.useState<Error>();
  const [success, setSuccess] = React.useState(false);
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
        error?: Error;
      } = await apiCall<typeof formData>({
        method: "POST",
        body: formData,
        url: "/api/register",
      });
      if (response.error) {
        setError(response.error);
        setSuccess(false);
      }
      if (response.ok) {
        setSuccess(true);
      }
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
      <Typography sx={{ mb: "1rem" }} variant={"h4"} align="center">
        Please register
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
        Register
      </Button>
      {error && <Alert severity="error">{error.message}</Alert>}
      {success && <Alert severity="success">Registration successful</Alert>}
    </Box>
  );
};
