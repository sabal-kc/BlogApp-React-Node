export interface UserProfile {
  email: String;
  phone: String;
  socials: {
    twitter: String;
    linkedin: String;
    github: String;
  };
  description: String;
}

export interface Post {
  _id: String;
  title: String;
  content: String;
  image?: String;
  createdDate: Date;
  updatedDate: Date;
  tags: String[];
}
