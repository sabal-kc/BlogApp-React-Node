import express from "express";
import { Post } from "../models/Post";
import isAuth from "../middlewares/auth";

const router = express.Router();
router.get("/", async (req, res) => {
	try {
		const posts = await Post.find();
		res.json(posts);
	} catch (error) {
		res.json({ message: error.toString() });
	}
});

router.post("/", isAuth, async (req, res) => {
	try {
		if (!req.isAuth) {
			res.status(401).send("Unauthorized");
			return;
		}
		const post = new Post({
			title: req.body.title,
			content: req.body.content,
			image: req.body.image,
			tags: req.body.tags,
		});
		const savedPost = await post.save();
		res.json(savedPost);
	} catch (error) {
		res.status(400).json({ message: error.toString() });
	}
});

router.get("/:postId", async (req, res) => {
	try {
		const post = await Post.findById(req.params.postId);
		res.json(post);
	} catch (error) {
		res.status(400).json({ message: error.toString() });
	}
});

router.patch("/:postId", isAuth, async (req, res) => {
	try {
		if (!req.isAuth) {
			res.status(401).send("Unauthorized");
			return;
		}
		const updatedPost = await Post.findOneAndUpdate({ _id: req.params.postId }, req.body);
		res.json(updatedPost);
	} catch (error) {
		res.status(400).json({ message: error.toString() });
	}
});

router.delete("/:postId", isAuth, async (req, res) => {
	try {
		if (!req.isAuth) {
			res.status(401).send("Unauthorized");
			return;
		}
		const deletedPost = await Post.findOneAndDelete({ _id: req.params.postId });
		res.json(deletedPost);
	} catch (error) {
		res.status(400).json({ message: error.toString() });
	}
});

export default router;
