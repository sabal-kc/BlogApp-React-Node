import mongoose from "mongoose";

interface User {
  username: String;
  password: String;
  profile: {
    email: String;
    phone: String;
    socials: {
      twitter: String;
      linkedin: String;
      github: String;
    };
    description: String;
  };
}

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  profile: {
    email: String,
    phone: String,
    description: String,
    socials: {
      twitter: String,
      linkedin: String,
      github: String,
    },
  },
});

export const User = mongoose.model<User>("User", UserSchema);
