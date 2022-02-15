import React from "react";
import { Post } from "../models/models";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Avatar, Box, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography, IconButton } from "@mui/material";
import { makeStyles } from "@mui/styles";

interface BlogCardProps {
  post: Post;
  editable: boolean;
  editHandler: (id: String) => void;
  deleteHandler: (id: String) => void;
}
const useStyles = makeStyles((theme: { spacing: (arg0: number) => any }) => ({
  blogTitle: {
    fontWeight: 800,
    paddingBottom: theme.spacing(3),
  },
  card: {
    maxWidth: "100%",
    margin: theme.spacing(1),
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

export const BlogCard: React.FC<BlogCardProps> = ({ post, editable, editHandler, deleteHandler }) => {
  const classes = useStyles();

  return (
    <div>
      <Card className={classes.card}>
        <CardActionArea>
          <CardMedia className={classes.media} image="https://images.pexels.com/photos/2004161/pexels-photo-2004161.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {post.title}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {`${post.content} Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad voluptatum consequatur impedit repellat, et possimus, adipisci pariatur quod, illo harum
              perferendis voluptatibus dolore ipsum dolorem explicabo mollitia repudiandae iusto id? Repellat ut eius neque eaque autem odit iste maxime consequuntur, officia quasi impedit mollitia
              fugiat iure, quam et porro aspernatur!`.substring(0, 150)}
              ...
            </Typography>
            <Typography variant="subtitle2" color="primary">
              Continue reading...
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions className={classes.cardActions}>
          <Box className={classes.author}>
            <Avatar src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" />
            <Box ml={2}>
              <Typography variant="subtitle2" component="p">
                {"Posted by admin"}
              </Typography>
              <Typography variant="subtitle2" color="textSecondary" component="p">
                {post.createdDate.toString()?.split("T")[0] || "-"}
              </Typography>
              <Typography variant="subtitle2" color="textSecondary" component="p">
                {post.createdDate.toString()?.split("T")[1]?.split(".")[0] || "-"}
              </Typography>
            </Box>
          </Box>

          {editable ? (
            <Box>
              <IconButton onClick={() => editHandler(post._id)}>
                <EditIcon />
              </IconButton>

              <IconButton onClick={() => deleteHandler(post._id)}>
                <DeleteIcon />
              </IconButton>
            </Box>
          ) : (
            <Box>
              <IconButton onClick={() => console.log(post._id)}>
                <BookmarkIcon />
              </IconButton>
            </Box>
          )}
        </CardActions>
      </Card>
    </div>
  );
};
