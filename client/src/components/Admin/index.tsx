import { ListItem, List, ListItemText, Typography, Box, Grid, Button } from "@mui/material";
import React from "react";
import { apiCall } from "../../api";

function AddNewBookToDB() {}
function DeleteBookFromDB() {}
function EditBook() {}

interface User {
  _id: string;
  userName: string;
  password: string;
  birthNumber: string;
  name: string;
  surename: string;
  adress: string;
  role: string;
  status: string;
}
export const AdminPages = () => {
  const [ignored, forceUpdate] = React.useReducer((x) => x + 1, 0);
  const [error, setError] = React.useState<string>();
  const [success, setSuccess] = React.useState(false);

  const [users, setUsers] = React.useState<Array<User>>([]);
  const getUsers = React.useCallback(async () => {
    const response = await fetch("/api/users");
    const resp = await response.json();
    setUsers(resp);
  }, []);

  React.useEffect(() => {
    getUsers();
  }, [setUsers, ignored]);

  const statusActionChange = React.useCallback(async (user: any, status: number) => {
    const data = { u: user, s: status };
    try {
      const response: {
        ok: boolean;
        error?: string;
      } = await apiCall<typeof data>({
        method: "POST",
        body: data,
        url: "/api/statusChange",
      });
      console.log(response);
      if (response.error) {
        setError(response.error);
        setSuccess(false);
      }
      if (response.ok) {
        setSuccess(true);
        forceUpdate();
      }
    } catch (error) {
      console.log(error);
      setError("error");
    }
  }, []);

  const RenderUsers = (users: any) => {
    const statusAction = (u: User) => {
      if (u.role === "ADMIN") {
        return;
      }
      if (u.status === "INACTIVE" || u.status === "BAN") {
        return <Button onClick={() => statusActionChange(u, 1)}>Accept user</Button>;
      } else {
        return <Button onClick={() => statusActionChange(u, 0)}>Ban user</Button>;
      }
    };

    let content = [];
    for (let i = 0; i < users.length; i++) {
      var name = users[i].name.concat(" ", users[i].surname);
      content.push(
        <>
          <Box>
            <ListItem sx={{ boxShadow: 1 }}>
              <Grid container direction="row" alignItems="start">
                <Grid item>
                  <ListItemText
                    sx={{ p: 0.5 }}
                    primary={name}
                    secondary={
                      <React.Fragment>
                        <Typography>Rodné číslo: {users[i].birthNumber}</Typography>
                        <Typography>Adresa: {users[i].adress}</Typography>
                        <Typography>Počet požičaných kníh: </Typography>
                        <Typography>Status účtu: {users[i].status}</Typography>
                      </React.Fragment>
                    }
                  />
                </Grid>
              </Grid>
              <Grid container justifyContent="flex-end">
                <Grid item xs={6}>
                  <Grid>{statusAction(users[i])}</Grid>
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
