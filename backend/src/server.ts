import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";

import connectDB from "./db";
import postRoute from "./routes/posts";
import userRoute from "./routes/users";
import isAuth from "./middlewares/auth";
import cors from "cors";

dotenv.config();
const port = process.env.PORT || 5000;
const app = express();

connectDB();

// MIDDLEWARES
app.use(cors());
app.use(bodyParser.json());
app.use(isAuth);

// ROUTES
app.use("/posts", postRoute);
app.use("/users", userRoute);
app.get("/", (req, res) => {
	res.send("Server is running!");
});

app.listen(port, () => console.log(`Server is listening at http://localhost:${port}`));
