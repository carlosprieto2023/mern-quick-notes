import { Link } from 'react-router-dom';
import * as userService from '../../utilities/users-service';

export default function NavBar({ user, setUser }) {
  // Add the following function
  function handleLogOut() {
    userService.logOut();
    // Update state will also cause a re-render
    setUser(null);
  }

  return (
    <div className="header">
      <span>Welcome, {user.name}</span>
      &nbsp;&nbsp;
      <Link to="" onClick={handleLogOut}>
        Log Out
      </Link>
    </div>
  );
}
