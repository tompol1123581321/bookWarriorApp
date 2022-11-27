import { ListItem, List, ListItemText, Divider, Typography } from "@mui/material";

import React from "react";

export const AdminPages = () => {
  return (
    <div>
      <h1>AdminPages</h1>
      <div>
        <h3>Zoznam uživateľov</h3>
        <List sx={{ width: "70%" }}>{AllLine()}</List>
      </div>
    </div>
  );
};

const AllLine = () => {
  let content = [];
  for (let i = 0; i < 10; i++) {
    content.push(
      <>
        <ListItem alignItems="flex-start">
          <ListItemText
            primary="Meno: Person"
            secondary={
              <React.Fragment>
                <Typography>Rodné číslo: </Typography>
                <Typography>Adresa: </Typography>
                <Typography>Požičané knihy: </Typography>
              </React.Fragment>
            }
          />
        </ListItem>
        <Divider />
      </>
    );
  }
  return content;
};
