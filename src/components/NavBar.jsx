import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getUsers } from "../api-requests";

export default function NavBar() {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState("");

  useEffect(() => {
    getUsers().then((users) => {
      setUsers(users);
    });
  }, []);

  function handleLogin(e) {
    setUser(e.target.value);
  }

  const mappedUsers = users.map((user) => {
    return (
      <option key={user.username} value={user.username}>
        {user.username}
      </option>
    );
  });

  return (
    <nav id="navbar">
      <Link reloadDocument to="/">
        Home
      </Link>
      |
      <form action="">
        <label>
          Users:
          <select
            name="users"
            id="user-dropdown"
            defaultValue="none"
            onChange={(e) => {
              handleLogin(e);
            }}
          >
            <option value="none" disabled>
              select user
            </option>
            {mappedUsers}
          </select>
        </label>
        <button type="submit">Log in</button>
        {user && <p>Logged in as: {user}</p>}
      </form>
    </nav>
  );
}

function UserSelectDropdown() {}
