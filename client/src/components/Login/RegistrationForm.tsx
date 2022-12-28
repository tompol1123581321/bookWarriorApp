import { Alert, Box, Button, TextField, Typography } from "@mui/material";
import React from "react";
import { apiCall } from "../../api";
import { useAthentication } from "../../userContext";

export const RegistrationForm = () => {
  const [error, setError] = React.useState<string>();
  const [success, setSuccess] = React.useState(false);
  const [formData, setFormData] = React.useState({
    userName: "",
    password: "",
    birthNumber: "",
    name: "",
    surname: "",
    adress: "",
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
        error?: string;
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
      setError("Unknown error");
    }
  }, [formData]);

  const isDisabled = React.useMemo(() => {
    return !(
      formData.password &&
      formData.userName &&
      formData.adress &&
      formData.birthNumber &&
      formData.name &&
      formData.surname
    );
  }, [formData]);

  return (
    <Box
      component={"div"}
      sx={{
        height: "35rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        position: "relative",
      }}
    >
      <Typography sx={{ mb: "1rem" }} variant={"h5"} align="center">
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
      <TextField
        onChange={onChange}
        value={formData.name}
        type={"text"}
        id="name"
        label="Name"
      />
      <TextField
        onChange={onChange}
        value={formData.surname}
        type={"text"}
        id="surname"
        label="Surename"
      />
      <TextField
        onChange={onChange}
        value={formData.adress}
        type={"text"}
        id="adress"
        label="Adress"
      />
      <TextField
        type={"text"}
        label="Birth number"
        id="birthNumber"
        InputLabelProps={{
          shrink: true,
        }}
        onChange={onChange}
        value={formData.birthNumber}
      />
      <Button variant="contained" disabled={isDisabled} onClick={onSubmit}>
        Register
      </Button>
      {error && <Alert severity="error">{error}</Alert>}
      {success && <Alert severity="success">Registration successful</Alert>}
    </Box>
  );
};
