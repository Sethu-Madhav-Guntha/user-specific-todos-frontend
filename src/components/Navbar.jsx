import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

function Navbar() {
  const [username, setUsername] = useState("");
  const location = useLocation();
  const navigateFn = useNavigate();
  // console.log(location);
  const handleLogoutUser = () => {
    localStorage.clear();
    navigateFn("/");
  };
  useEffect(() => {
    setUsername(localStorage.getItem("username"));
  }, [location.pathname]);
  return (
    <div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        {!username && (
          <>
            <li>
              <Link to="/signup">Signup</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </>
        )}
        {username && (
          <>
            <li>
              <Link to="/todos">Todos</Link>
            </li>
            <li>{username}</li>
            <button onClick={handleLogoutUser}>Logout</button>
          </>
        )}
      </ul>
    </div>
  );
}
export default Navbar;
