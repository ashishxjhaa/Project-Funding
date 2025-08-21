"use client";

import { useEffect, useState } from "react";
import axios from "axios";

interface User {
  _id: string;
  fullName: string;
  email: string;
}

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("/api/me");
        setUser(res.data.user);
      } catch (err) {
        console.error("Failed to fetch user:", err);
      }
    };
    fetchUser();
  }, []);

  if (!user) {
    return <div className="p-8 text-white">Loading profile...</div>;
  }

  return (
    <div className="p-8 text-white">
      <h1 className="text-2xl font-bold">Profile Page</h1>
      <p>User ID: {user._id}</p>
      <p>Name: {user.fullName}</p>
      <p>Email: {user.email}</p>
    </div>
  );
}
