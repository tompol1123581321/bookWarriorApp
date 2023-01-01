import { Button, Card, CardActions, CardContent, Divider, Grid, Typography } from "@mui/material";
import React from "react";
import { isTemplateExpression } from "typescript";
import { apiCall } from "../../api";

var DBcolection2 = 11;
interface Book {
  _id: string;
  Author: string;
  Title: string;
  Pages: number;
  YOP: number;
  BIL: number;
  SRC: string;
}

interface User_Books{
  userId: string;
  bookId: string;
}

/* interface User {
  _id: string;
  userName: string;
  password: string;
  name: string;
  surname: string;
  adress: string;
  role: string;
} */

export const VisitorPages = () => {
 const [books, setBooks] = React.useState<Array<Book>>([]);
 const getData = React.useCallback(async () => {
   const books = await fetch("/api/books")
   const resp = await books.json();
   setBooks(resp);
},[]);

const [user, setUser] = React.useState('');
const getDataUser = React.useCallback(async () => {
  const books = await fetch("/api/currentUserId")
  const resp = await books.json();
  setUser(resp);
},[]);

React.useEffect(() => {
  getData();
  getDataUser();
 }, [getData, getDataUser]);


  return (
    <> 
      <h1>VisitorPages</h1>
      <Typography variant="h4" sx={{ p: 2, textAlign: "center" }}>
        Available books
      </Typography>
      <Divider sx={{ m: 1, variant: "middle", bgcolor: "black" }} />
      <Grid container spacing={1}>
        {RenderAvailableBooks(books, user)}
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

const RenderAvailableBooks = (books: Book[], currentUserId: string) => {
  
const [error, setError] = React.useState<string>();
const [success, setSuccess] = React.useState(false);

const onRent = React.useCallback(async (book: Book, userId: string) => {
  console.log(book.Title);
  console.log(userId);
  const userBooksData: User_Books = {
    userId: userId,
    bookId: book._id
  };
  try {
    const response: {
      ok: boolean;
      error?: string;
    } = await apiCall<User_Books>({
      method: "POST",
      body: userBooksData,
      url: "/api/rent",
    });
    if (response.error) {
      setError(response.error);
      setSuccess(false);
    }
    if (response.ok) {
      setSuccess(true);
    }
  } catch {
    setError("Unknown error");
  }
}, []);

  console.log(books);
  let content: JSX.Element[] = [];
  books.map(item => {
    if(item.BIL > 0){
      content.push(
        <>
          <Card sx={{ m: 2 }}>
            <Card sx={{ display: "inline", boxShadow: "1" }}>
              <CardContent>
                <Typography variant="h5">{item.Title}</Typography>
                <Typography>Author: {item.Author} </Typography>
                <Typography>Year of publication: {item.YOP}</Typography>
                <Typography>Pages: {item.Pages}</Typography>
                <Typography>Books in library: {item.BIL}</Typography>
              </CardContent>
              <CardActions>
                <Button onClick={() => onRent(item, currentUserId)}>Take book</Button>
              </CardActions>
            </Card>
          </Card>
        </>
      );
    }   
  })
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
