import { Box, Button, Card, CardActions, CardContent, CardHeader, Divider, Grid, Typography } from "@mui/material";
import { width } from "@mui/system";
import React from "react";

export const VisitorPages = () => {
  return (
    <>
      <h1>VisitorPages</h1>
      <Typography variant="h4" sx={{ p: 2, textAlign: "center" }}>
        Available books
      </Typography>
      <Divider sx={{ m: 1, variant: "middle", bgcolor: "black" }} />
      <Typography variant="h4" sx={{ p: 2, textAlign: "center" }}>
        My books
      </Typography>
      <Divider sx={{ m: 1, variant: "middle", bgcolor: "black" }} />
      <Grid container spacing={1}>
        {RenderMyBooks()}
      </Grid>
    </>
  );
};

const RenderMyBooks = () => {
  let content = [];
  for (let i = 0; i < 10; i++) {
    content.push(
      <>
        <Card sx={{ m: 2 }}>
          <Card sx={{ display: "inline", boxShadow: "1" }}>
            <CardContent>
              <Typography variant="h5">Book title</Typography>
              <Typography>Author: </Typography>
              <Typography>Year of publication: </Typography>
              <Typography>Pages: </Typography>
            </CardContent>
            <CardActions>
              <Button>Return book</Button>
              <Button>Open book</Button>
            </CardActions>
          </Card>
        </Card>
      </>
    );
  }
  return content;
};
