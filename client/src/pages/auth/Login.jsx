import { useState } from "react";
import axios from "axios";
import api from "../../services/api";
import { Link, Outlet } from "react-router-dom";

const Login = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    api
      .post("/auth/login", {
        login,
        password,
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.response?.data || err.message);
      });

    console.log({
      login,
      password,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <div className="text-center">
          <img
            src="https://www.svgrepo.com/show/301692/login.svg"
            alt="Login"
            className="mx-auto h-12 w-12"
          />

          <h1 className="mt-4 text-3xl font-bold text-gray-900">
            Sign in to your account
          </h1>

          <p>
            Or <span></span>
            <Link className="mt-2 text-sm text-gray-600" to="/register">
              create a new account
            </Link>
          </p>
        </div>

        <div className="mt-8 rounded-lg bg-white p-8 shadow">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Login */}
            <div>
              <label
                htmlFor="login"
                className="block text-sm font-medium text-gray-700"
              >
                Username or Email
              </label>

              <input
                id="login"
                type="text"
                placeholder="Enter username or email"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                required
                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>

              <input
                id="password"
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
              />
            </div>

            {/* Remember */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-gray-700">
                <input type="checkbox" />
                Remember me
              </label>

              <a href="#" className="text-sm text-blue-600 hover:underline">
                Forgot Password?
              </a>
            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full rounded-md bg-blue-600 py-2 font-medium text-white hover:bg-blue-700"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
