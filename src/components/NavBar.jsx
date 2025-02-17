import { useState } from "react";

export default function NavBar() {
  const [users, setUsers] = useState([]);

  return (
    <nav>
      <a href="/">Home</a> |
      <label>
        {" "}
        User:
        <select name="cars" id="cars">
          <option value="user1">user1</option>
          <option value="user2">user2</option>
          <option value="user3">user3</option>
        </select>{" "}
      </label>
    </nav>
  );
}

function UserSelectDropdown() {}
