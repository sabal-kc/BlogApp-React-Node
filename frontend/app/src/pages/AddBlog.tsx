import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import api from "../api/api";
import { Alert, Snackbar } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { makeStyles } from "@mui/styles";
import { useFormik } from "formik";
import * as yup from "yup";

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

export function AddBlog() {
  const classes = useStyles();
  const navigate = useNavigate();

  const [post, setPost] = React.useState({ title: "", content: "" });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);

    if (!id) {
      api
        .post(
          "/posts",
          {
            title: post.title,
            content: post.content,
          },
          { headers: { Authorization: localStorage.getItem("token") || "" } }
        )
        .then((resp) => {
          setSaving(false);
          setOpen(true);
          setTimeout(() => {
            navigate(-1);
          }, 1000);
        })
        .catch((err) => {
          navigate("/");
        });
    } else {
      api
        .patch(
          `/posts/${id}`,
          {
            title: post.title,
            content: post.content,
          },
          { headers: { Authorization: localStorage.getItem("token") || "" } }
        )
        .then((resp) => {
          setSaving(false);
          setOpen(true);
          setTimeout(() => {
            navigate(-1);
          }, 1000);
        })
        .catch((err) => {
          navigate("/");
        });
    }
  };

  // const validationSchema = yup.object({
  //   email: yup.string().required("Email is required"),
  //   password: yup.string().required("Password is required"),
  // });
  // const formik = useFormik({
  //   initialValues: post,
  //   enableReinitialize: true,
  //   validationSchema: validationSchema,
  //   onSubmit: (values) => {
  //     console.log(values);
  //     alert(JSON.stringify(values, null, 2));
  //   },
  // });

  const [saving, setSaving] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const { id } = useParams();

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (id) {
      api.get(`/posts/${id}`).then((resp) => {
        console.log(resp.data);
        setPost({ title: resp.data.title, content: resp.data.content });
      });
    }
  }, [id]);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
  });

  return (
    <div style={{ display: "flex" }}>
      <Container maxWidth="xl" className={classes.blogsContainer}>
        <Button onClick={() => navigate("/")} sx={{ mt: 3, mb: 2 }}>
          Back to posts
        </Button>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Typography component="h1" variant="h5">
            {id ? "Update" : "Add"} blog post
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, width: "80%" }}>
            <TextField
              onChange={(e) => setPost({ ...post, title: e.target.value })}
              value={post.title}
              margin="normal"
              required
              fullWidth
              id="title"
              name="title"
              label="Title"
              placeholder="Add title here"
              autoFocus
            />
            <TextField
              onChange={(e) => setPost({ ...post, content: e.target.value })}
              value={post.content}
              margin="normal"
              id="content"
              name="content"
              required
              fullWidth
              label="Content"
              placeholder="Add content here"
              multiline
              rows={20}
            />
            <Button disabled={saving} type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              {id ? "Update" : "Add"}
            </Button>
          </Box>
        </Box>
        {/* 
        <div>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              fullWidth
              id="email"
              name="email"
              label="Email"
              value={formik.values.title}
              onChange={formik.handleChange}
              error={formik.touched.title && Boolean(formik.errors.title)}
              helperText={formik.touched.title && formik.errors.title}
            />
            <TextField
              fullWidth
              id="password"
              name="password"
              label="Password"
              value={formik.values.content}
              onChange={(e) => setPost({ ...post, content: e.target.value })}
              error={formik.touched.content && Boolean(formik.errors.content)}
              helperText={formik.touched.content && formik.errors.content}
            />
            <Button color="primary" variant="contained" fullWidth type="submit">
              Submit
            </Button>
          </form>
        </div> */}

        <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
            Blog {id ? "updated" : "added"} successfully
          </Alert>
        </Snackbar>
      </Container>
    </div>
  );
}
