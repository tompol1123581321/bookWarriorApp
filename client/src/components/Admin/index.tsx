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
import { useAthentication } from "../../userContext";

function AddNewBookToDB() {}
function AcceptUser() {}
function BanUser() {}
function DeleteBookFromDB() {}
function EditBook() {}

export const AdminPages = () => {
  interface User{
    _id: string;
    userName: string;
    password: string;
    birthNumber: string;
    name: string;
    surename: string;
    adress: string;
    role: string;
  }

  const { role } = useAthentication();
  const [users, setUsers] = React.useState<Array<User>>([]);

  const getUsers = React.useCallback(async () => {
    const response = await fetch("/api/users");
    const resp = await response.json();
    setUsers(resp);
  }, []);

  React.useEffect(() => {
    getUsers();
  }, [role, setUsers]);

  return (
    <>
      <h1>AdminPages</h1>
      <Grid container direction="row" justifyContent="space-around">
        <Grid item xs={5}>
          <Typography variant="h5" sx={{ p: 3 }}>
            Zoznam uživateľov
          </Typography>
          <List>{RenderUsers(users)}</List>
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

const RenderUsers = (users: any) => {
  let content = [];
  for (let i = 0; i < users.length; i++) {
    var name = users[i].name.concat(" ",users[i].surname);
    content.push(
      <>
        <Box>
          <ListItem sx={{ boxShadow: 1 }}>
            <Grid container direction="row" alignItems="start">
              <Grid item>
                <ListItemText
                  sx={{ p: 0.5 }}
                  primary= {name} 
                  secondary={
                    <React.Fragment>
                      <Typography>Rodné číslo: {users[i].birthNumber}</Typography>
                      <Typography>Adresa: {users[i].adress}</Typography>
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
