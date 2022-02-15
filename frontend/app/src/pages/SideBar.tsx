import React, { useEffect, useState } from "react";
import api from "../api/api";
import { Profile } from "../components/Profile";

interface SideBarProps {}

export const SideBar: React.FC<SideBarProps> = ({ children }) => {
  const [profile, setProfile] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    api
      .get("/users")
      .then((res) => {
        setProfile(res.data[0].profile);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return isLoading ? <div>Loading ... </div> : <Profile user={profile as any} />;
};
