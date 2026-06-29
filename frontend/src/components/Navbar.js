import {
  FaBell,
  FaUserCircle,
} from "react-icons/fa";

import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user } = useAuth();

  return (
    <header className="navbar">
      <div>
        <h2>
          Network Security Dashboard
        </h2>
      </div>

      <div className="navbar-right">

        <button className="icon-btn">
          <FaBell />
        </button>

        <div className="user-info">
          <FaUserCircle />

          <div>
            <h4>
              {user?.name}
            </h4>

            <small>
              {user?.role}
            </small>
          </div>
        </div>

      </div>
    </header>
  );
};

export default Navbar;