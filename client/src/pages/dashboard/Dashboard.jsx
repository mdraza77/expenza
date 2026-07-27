import React from "react";
import { useEffect } from "react";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get("/auth/me")
      .then((res) => {
        console.log(res.data.user);
        setUser(res.data.user);
      })
      .catch(() => {
        navigate("/login");
      });
  }, []);

  if (!user) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <div className="p-6">
        <h1 className="text-3xl font-bold text-red-600">
          Welcome, {user.name} 👋
        </h1>

        <p className="mt-2 text-gray-600">Username: {user.username}</p>

        <p className="text-gray-600">Email: {user.email}</p>
      </div>
    </div>
  );
};

export default Dashboard;
