"use client";

import { signOut, useSession } from "next-auth/react";
import "./header.css";

const Header = () => {
  const { data: session } = useSession(); // Get session data

  return (
    <>
      <div className="blogs_header">
        <div className="blogs_header_layout"></div>
      </div>
      <h3>{session ? `User: ${session.user.name}` : "Please login to access Posts"}</h3>
      {session && <button onClick={() => signOut()} style={{ cursor: "pointer" }}>Sign Out</button>}
    </>
  );
};

export default Header;
