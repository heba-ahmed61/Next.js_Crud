'use client';

import { signOut, useSession } from 'next-auth/react';
import './Header.css';

const Header = () => {
  // const { data: session } = useSession(); // Get session data

  return (
    <>
      <div className="blogs_header">
        <div className="blogs_header_layout"></div>
      </div>
      <div className="user-data">
        {/* <h3>
          {session
            ? `UserName: ${session.user.name}`
            : 'Please login to access Posts'}
        </h3>

        {session && (
          <button onClick={() => signOut()} style={{ cursor: 'pointer' }}>
            Sign Out
          </button>
        )} */}
      </div>
    </>
  );
};

export default Header;
