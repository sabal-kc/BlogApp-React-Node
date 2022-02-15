import express from "express";
import { User } from "../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import isAuth from "../middlewares/auth";

const router = express.Router();
router.get("/", isAuth, async (req, res) => {
	try {
		const users = await User.find();
		res.json(users);
	} catch (error) {
		res.status(400).json({ message: error.toString() });
	}
});

router.post("/", async (req, res) => {
	try {
		const found = await User.findOne({ username: req.body.username });
		if (found) throw new Error("User exists already.");

		const hashedPassword = await bcrypt.hash(req.body.password as string, 12);
		const user = new User({
			username: req.body.username,
			password: hashedPassword,
			profile: req.body.profile,
		});
		const result = await user.save();
		res.json(result);
	} catch (error) {
		res.status(400).json({ message: error.toString() });
	}
});

router.post("/login", async (req, res) => {
	try {
		const user = await User.findOne({ username: req.body.username }).select("password");
		if (!user) throw new Error("Username is invalid.");
		const isValidPassword = await bcrypt.compare(req.body.password, user.password.toString());
		if (!isValidPassword) throw new Error("Password is invalid.");

		const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY, {
			expiresIn: "1h",
		});
		res.json({
			id: user._id,
			token,
			tokenExpiration: 1,
		});
	} catch (error) {
		res.status(400).json({ message: error.toString() });
	}
});

router.patch("/:userId", async (req, res) => {
	try {
		const updatedUser = await User.updateOne({ _id: req.params.userId }, req.body);
		res.json(updatedUser);
	} catch (error) {
		res.status(400).json({ message: error.toString() });
	}
});

router.delete("/:userId", async (req, res) => {
	try {
		const deletedUser = await User.updateOne({ _id: req.params.userId });
		res.json(deletedUser);
	} catch (error) {
		res.status(400).json({ message: error.toString() });
	}
});

export default router;
