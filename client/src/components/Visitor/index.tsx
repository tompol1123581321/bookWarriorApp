import { Button, Card, CardActions, CardContent, Divider, Grid, Typography } from "@mui/material";

var DBcolection1 = 2;
var DBcolection2 = 11;

export const VisitorPages = () => {
  return (
    <>
      <h1>VisitorPages</h1>
      <Typography variant="h4" sx={{ p: 2, textAlign: "center" }}>
        Available books
      </Typography>
      <Divider sx={{ m: 1, variant: "middle", bgcolor: "black" }} />
      <Grid container spacing={1}>
        {RenderAvailableBooks(DBcolection1)}
      </Grid>
      
      <Typography variant="h4" sx={{ p: 2, textAlign: "center" }}>
        My books
      </Typography>
      <Divider sx={{ m: 1, variant: "middle", bgcolor: "black" }} />
      <Grid container spacing={1}>
        {RenderMyBooks(DBcolection2)}
      </Grid>
      
    </>
  );
};

const RenderAvailableBooks = (DBcol: any) => {
  let content = [];
  for (let i = 0; i < DBcol; i++) {
    content.push(
      <>
        <Card sx={{ m: 2 }}>
          <Card sx={{ display: "inline", boxShadow: "1" }}>
            <CardContent>
              <Typography variant="h5">Book title</Typography>
              <Typography>Author: </Typography>
              <Typography>Year of publication: </Typography>
              <Typography>Pages: </Typography>
              <Typography>Books in library: </Typography>
            </CardContent>
            <CardActions>
              <Button>Take book</Button>
            </CardActions>
          </Card>
        </Card>
      </>
    );
  }
  return content;
};

const RenderMyBooks = (DBcol: any) => {
  let content = [];
  for (let i = 0; i < DBcol; i++) {
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
