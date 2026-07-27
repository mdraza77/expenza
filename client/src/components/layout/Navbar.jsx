import api from "../../services/api";
import { Link, Outlet, useNavigate } from "react-router-dom";

const Navbar = ({ isLoggedIn }) => {
  const navigate = useNavigate();
  const logout = () => {
    api.post("/auth/logout").then((res) => {
      console.log(res.data);
      navigate("/login");
    });
  };
  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link to="/dashboard" className="text-2xl font-bold text-blue-600">
          Expenza
        </Link>

        {/* Menu */}
        <div className="flex items-center gap-6">
          <Link to="/dashboard" className="hover:text-blue-600">
            Dashboard
          </Link>

          <Link to="/groups" className="hover:text-blue-600">
            Groups
          </Link>

          <button onClick={logout} className="hover:text-blue-600">
            Logout
          </button>

          {isLoggedIn ? (
            <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
              Logout
            </button>
          ) : (
            <>
              <Link to="/login" className="px-4 py-2 rounded border">
                Login
              </Link>

              <Link
                to="/register"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
