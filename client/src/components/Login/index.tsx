import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

export const LoginPages = () => {
  const navigate = useNavigate();
  return (
    <div>
      LoginPages
      <Button
        onClick={() => {
          navigate("/admin");
        }}
      >
        click
      </Button>
    </div>
  );
};
