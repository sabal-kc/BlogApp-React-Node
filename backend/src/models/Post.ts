import mongoose from "mongoose";

interface Post {
  title: String;
  content: String;
  image?: String;
  createdDate: Date;
  updatedDate: Date;
  tags: String[];
}

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
  updatedDate: {
    type: Date,
    default: Date.now,
  },
  tags: [
    {
      type: String,
    },
  ],
});

export const Post = mongoose.model<Post>("Posts", PostSchema);
