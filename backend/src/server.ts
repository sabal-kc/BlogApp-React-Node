import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";

import connectDB from "./db";
import postRoute from "./routes/posts";
import userRoute from "./routes/users";
import isAuth from "./middlewares/auth";
import cors from "cors";
import path from "path";

dotenv.config();
const port = process.env.PORT || 5000;
const app = express();

connectDB();

// MIDDLEWARES
app.use(cors());


app.use(bodyParser.json());
app.use(isAuth);

// ROUTES
app.use("/api/posts", postRoute);
app.use("/api/users", userRoute);
app.get("/api", (req, res) => {
	res.send("Server is running!");
});


// SERVE
app.use(
	express.static(path.join(__dirname, "../../../frontend/app", "build"))
);
// Handles any requests that don't match the ones above
app.get("/*", (req, res) => {
	res.sendFile(
		path.join(__dirname, "../../../frontend/app/build", "index.html")
	);
});
app.use(express.static("../../../frontend/app/public"));



app.listen(port, () => console.log(`Server is listening at http://localhost:${port}`));
