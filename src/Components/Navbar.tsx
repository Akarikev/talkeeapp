import React from "react";
import { Link } from "react-router-dom";
import { auth } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "../Pages/css/navbar.css";
import { signOut } from "firebase/auth";

function Navbar() {
  const navBar = `color: red`;

  const linkStyle = {
    textDecoration: "none",
    color: "white",
    border: "1px solid blue",
    padding: "11px",
    borderRadius: "1px",
    borderTop: "none",
    borderLeft: "none",
    borderRight: "none",
  };

  const [user] = useAuthState(auth);
  const signUserOut = async () => {
    await signOut(auth);
  };
  return (
    <div className="navbar">
      <div className="header">
        <div className="Links">
          <Link to="/" style={linkStyle}>
            Home
          </Link>
          {!user ? (
            <Link to="/login" style={linkStyle}>
              Login
            </Link>
          ) : (
            <Link to="/createtalk">Create talk</Link>
          )}
        </div>

        <div className="displayData">
          {user && (
            <>
              <p>{user?.displayName}</p>
              <img src={user?.photoURL || ""} width="30" height="30" />
              <button onClick={signUserOut}>Log out</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;