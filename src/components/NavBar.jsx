import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { getUsers } from "../api-requests";
import { UserContext } from "../contexts/User";

export default function NavBar() {
  const { user, setUser } = useContext(UserContext);

  const [users, setUsers] = useState([]);
  const [value, setValue] = useState("");
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    getUsers().then((users) => {
      setUsers(users);
    });
  }, []);

  function handleLogin(e) {
    e.preventDefault();
    setUser(value);
    console.log(value, "value");
    console.log(users, "users");
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
            value={value}
            id="user-dropdown"
            // defaultValue="none"
            onChange={handleChange}
          >
            <option value="none" disabled>
              select user
            </option>
            {mappedUsers}
          </select>
        </label>
        <button type="submit">Log in</button>
        {user && <button onClick={handleLogout}>Log out</button>}
        {user && <p>Logged in as: {user}</p>}
      </form>
      {avatar && <img src={avatar}></img>}
    </nav>
  );
}
