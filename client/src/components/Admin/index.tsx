import { ListItem, List, ListItemText, Divider } from "@mui/material";

import React from "react";

export const AdminPages = () => {
  return (
    <div>
      <h1>AdminPages</h1>
      <div>
        <h3>Zoznam uživateľov</h3>
        <List>{AllLine()}</List>
      </div>
    </div>
  );
};

const AllLine = () => {
  let content = [];
  for (let i = 0; i < 10; i++) {
    content.push(
      <ListItem sx={{justifyContent: "flex-start"}}>
        <ListItemText primary="Meno: Person #{i}" secondary="rodné číslo" />
        <ListItemText primary="Meno: Person #{i}" secondary="rodné číslo" />
      </ListItem>
    );
  }
  return content;
};
