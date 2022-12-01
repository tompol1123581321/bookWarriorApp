import { Button, Paper, TextField, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

export const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = React.useState({
    userName: "",
    password: "",
  });
  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const key = e.target.id;
    setFormData({ ...formData, [key]: e.target.value });
  };
  const onSubmit = React.useCallback(() => {
    // post data and validate it
    // if success
    // route to admin or visitor
    navigate("/admin");
    
    if (formData.userName === "client") {
      navigate("/visitor");
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
      <Button variant="contained" onClick={onSubmit}>
        Login
      </Button>
    </Paper>
  );
};
