import { Avatar, Box, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import { UserProfile } from "../models/models";
import TwitterIcon from "@mui/icons-material/Twitter";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import GitHubIcon from "@mui/icons-material/GitHub";

interface ProfileProps {
  user: UserProfile;
}

const useStyles = makeStyles((theme: { spacing: (arg0: number) => any }) => ({
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
    flexDirection: "column",
    alignItems: "center",
    padding: "2em",
    maxWidth: "200px",
  },
  paginationContainer: {
    display: "flex",
    justifyContent: "center",
  },
  socials: {
    padding: "0.5em",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
  },
}));

export const Profile: React.FC<ProfileProps> = ({ user }) => {
  const classes = useStyles();
  return (
    <div>
      <Box className={classes.author}>
        <Avatar sx={{ height: "140px", width: "140px" }} src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" />
        <Box>
          <Typography variant="h6" component="p">
            {"Admin"}
          </Typography>

          <Typography variant="subtitle1" component="div" gutterBottom>
            {user.description}
          </Typography>
        </Box>
      </Box>
      <Box pl={2}>
        <Box className={classes.socials}>
          <EmailIcon />
          <Typography ml={2} variant="subtitle2" color="textSecondary" component="p">
            {user.email}
          </Typography>
        </Box>
        <Box className={classes.socials}>
          <PhoneIcon />
          <Typography ml={2} variant="subtitle2" color="textSecondary" component="p">
            +977- {user.phone}
          </Typography>
        </Box>
        <Box className={classes.socials}>
          <TwitterIcon />
          <Typography ml={2} variant="subtitle2" color="textSecondary" component="p">
            {user.socials.twitter}
          </Typography>
        </Box>

        <Box className={classes.socials}>
          <GitHubIcon />
          <Typography ml={2} variant="subtitle2" color="textSecondary" component="p">
            {user.socials.github}
          </Typography>
        </Box>
      </Box>
    </div>
  );
};
