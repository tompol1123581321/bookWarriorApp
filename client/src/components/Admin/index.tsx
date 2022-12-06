import {
  ListItem,
  List,
  ListItemText,
  Typography,
  Box,
  Grid,
  Button,
} from "@mui/material";
import React from "react";

function AddNewBookToDB() {}
function AcceptUser() {}
function BanUser() {}
function DeleteBookFromDB() {}
function EditBook() {}

export const AdminPages = () => {
  const getUsers = React.useCallback(async () => {
    const users = await fetch("/api/users");
    const resp = await users.json();
    console.log(resp);
    return resp;
  }, []);

  React.useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <h1>AdminPages</h1>
      <Grid container direction="row" justifyContent="space-around">
        <Grid item xs={5}>
          <Typography variant="h5" sx={{ p: 3 }}>
            Zoznam uživateľov
          </Typography>
          <List>{RenderUsers()}</List>
        </Grid>
        <Grid item xs={5}>
          <Grid container>
            <Typography variant="h5" sx={{ p: 3 }}>
              Zoznam kníh
            </Typography>
            <Button onClick={AddNewBookToDB}>Add new book</Button>
          </Grid>
          <List>{RenderBooks()}</List>
        </Grid>
      </Grid>
    </>
  );
};

const RenderUsers = () => {
  let content = [];
  for (let i = 0; i < 5; i++) {
    content.push(
      <>
        <Box>
          <ListItem sx={{ boxShadow: 1 }}>
            <Grid container direction="row" alignItems="start">
              <Grid item>
                <ListItemText
                  sx={{ p: 0.5 }}
                  primary="Vladolf Putler"
                  secondary={
                    <React.Fragment>
                      <Typography>Rodné číslo: </Typography>
                      <Typography>Adresa: </Typography>
                      <Typography>Počet požičaných kníh: </Typography>
                    </React.Fragment>
                  }
                />
              </Grid>
            </Grid>
            <Grid container justifyContent="flex-end">
              <Grid item xs={6}>
                <Grid>
                  <Button onClick={AcceptUser}>Accept user</Button>
                </Grid>
                <Grid>
                  <Button onClick={BanUser}>Ban user</Button>
                </Grid>
              </Grid>
            </Grid>
          </ListItem>
        </Box>
      </>
    );
  }
  return content;
};

const RenderBooks = () => {
  let content = [];
  for (let i = 0; i < 5; i++) {
    content.push(
      <>
        <Box>
          <ListItem sx={{ boxShadow: 1 }}>
            <Grid container direction="row" alignItems="start">
              <Grid item>
                <ListItemText
                  sx={{ p: 0.5 }}
                  primary="Title: "
                  secondary={
                    <React.Fragment>
                      <Typography>Author: </Typography>
                      <Typography>Available licences: </Typography>
                    </React.Fragment>
                  }
                />
              </Grid>
            </Grid>
            <Grid container justifyContent="flex-end">
              <Grid item xs={6}>
                <Grid>
                  <Button onClick={DeleteBookFromDB}>Delete book</Button>
                </Grid>
                <Grid>
                  <Button onClick={EditBook}>Edit book</Button>
                </Grid>
              </Grid>
            </Grid>
          </ListItem>
        </Box>
      </>
    );
  }
  return content;
};
