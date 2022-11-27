import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

import { LoginForm } from "./LoginForm";

export const LoginPages = () => {
  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Typography marginBottom={"5rem"} variant="h3">
        BookWarriorApp
      </Typography>
      <LoginForm />
    </Box>
  );
};
