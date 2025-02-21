import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { getUsers } from "../api-requests";
import { UserContext } from "../contexts/User";

export default function NavBar() {
  const { user, setUser } = useContext(UserContext);

  const [users, setUsers] = useState([]);
  const [value, setValue] = useState("");
  const [avatar, setAvatar] = useState("");
  const [isLoggedIn, setIsLoggedin] = useState(false);

  useEffect(() => {
    getUsers().then((users) => {
      setUsers(users);
    });
  }, []);

  function handleLogin(e) {
    e.preventDefault();
    setUser(value);
    setIsLoggedin(true);
    for (let ele of users) {
      if (ele.username === value) {
        setAvatar(ele.avatar_url);
      }
    }
  }

  function handleChange(e) {
    setValue(e.target.value);
  }

  function handleLogout() {
    setUser(undefined);
    setIsLoggedin(false);
    setValue("");
    setAvatar("");
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
      <Link className="navbar-items" to="/">
        Home
      </Link>
      |
      <form className="navbar-items" onSubmit={handleLogin}>
        <label>
          Users:
          <select
            value={value || "none"}
            id="user-dropdown"
            onChange={handleChange}
          >
            <option value="none" disabled>
              select user
            </option>
            {mappedUsers}
          </select>
        </label>
        {!isLoggedIn && !value && (
          <button type="submit" disabled>
            Log in
          </button>
        )}
        {!isLoggedIn && value && <button type="submit">Log in</button>}
        {user && isLoggedIn && <button onClick={handleLogout}>Log out</button>}
        {user && isLoggedIn && (
          <p className="navbar-items">Logged in as: {user}</p>
        )}
      </form>
      {avatar && (
        <img
          id="avatar"
          className="navbar-items"
          src={avatar}
          alt="avatar"
        ></img>
      )}
    </nav>
  );
}
