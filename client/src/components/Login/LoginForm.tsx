import { Button, Paper, TextField } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

export const LoginForm = () => {
  const navigate = useNavigate();
  return (
    <Paper
      elevation={3}
      component={"div"}
      sx={{
        padding: "3rem",
        maxWidth: "25rem",
        height: "15rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
      }}
    >
      <TextField id="userName" label="UserName" defaultValue="Hello World" />
      <TextField id="password" label="Password" defaultValue="Hello World" />
      <Button
        variant="contained"
        onClick={() => {
          navigate("/admin");
        }}
      >
        Login
      </Button>
    </Paper>
  );
};
