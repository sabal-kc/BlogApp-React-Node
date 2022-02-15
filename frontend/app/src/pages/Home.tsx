import { Container, Typography, Grid, Card, CircularProgress, Button, Snackbar, Alert } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import api from "../api/api";
import { BlogCard } from "../components/BlogCard";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../context/LoginContext";
import { SideBar } from "./SideBar";

interface HomeProps {}
const useStyles = makeStyles((theme: { spacing: (arg0: number) => any }) => ({
  appBar: {
    backgroundColor: "#fff",
  },
  blogsContainer: {
    paddingTop: theme.spacing(3),
  },
  blogTitle: {
    fontWeight: 800,
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
  card: {
    maxWidth: "100%",
  },
  media: {
    height: 240,
  },
  cardActions: {
    display: "flex",
    margin: "0 10px",
    justifyContent: "space-between",
  },
  author: {
    display: "flex",
  },
  paginationContainer: {
    display: "flex",
    justifyContent: "center",
  },
}));
export const Home: React.FC<HomeProps> = ({ children }) => {
  const { loggedIn } = useContext(LoginContext);
  const token = localStorage.getItem("token");

  const classes = useStyles();
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getPosts = () => {
    api
      .get("/posts")
      .then((res) => {
        setPosts(res.data.reverse());
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getPosts();
  }, []);

  const deletePost = (id: String) => {
    api
      .delete(`/posts/${id}`, { headers: { Authorization: localStorage.getItem("token") || "" } })
      .then((res) => {
        setOpen(true);
        console.log(res);
        getPosts();
      })
      .catch((err) => {
        navigate(`/`);
        console.log(err);
      });
  };

  const editPost = (id: String) => {
    navigate(`/editPost/${id}`);
  };

  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div style={{ display: "flex" }}>
      <SideBar></SideBar>
      <Container maxWidth="lg" className={classes.blogsContainer}>
        {token && <Button onClick={() => navigate("/createPost")}>Add new blog post</Button>}
        {token && <Button onClick={() => localStorage.removeItem("token")}>Remove token</Button>}
        <Typography variant="h4" className={classes.blogTitle}>
          Articles
        </Typography>
        <Grid container spacing={3}>
          <Card className={classes.card}></Card>
          {isLoading ? (
            <CircularProgress />
          ) : (
            posts.map((post) => (
              <Grid item xs={12} sm={6} md={4}>
                <BlogCard post={post} deleteHandler={deletePost} editHandler={editPost} editable={Boolean(token)} />
              </Grid>
            ))
          )}
        </Grid>

        <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
            Blog removed successfully
          </Alert>
        </Snackbar>
      </Container>
    </div>
  );
};
