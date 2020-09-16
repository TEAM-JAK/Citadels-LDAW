import React, {useEffect, useState} from 'react';

import {withFirebase} from '../Firebase';

function AdminPage(props) {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    setLoading(true);

    props.firebase.users().on('value', (snapshot) => {
      const usersObject = snapshot.val();

      const usersList = Object.keys(usersObject).map((key) => ({
        ...usersObject[key],
        uid: key,
      }));

      setUsers(usersList);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    props.firebase.users().off();
  }, []);

  return (
    <div>
      <h1>Admin</h1>

      {loading && <div>Loading ...</div>}

      <UserList users={users} />
    </div>
  );
}

const UserList = ({users}) => (
  <ul>
    {users.map((user) => (
      <li key={user.uid}>
        <span>
          <strong>ID:</strong> {user.uid}
        </span>
        <span>
          <strong>E-Mail:</strong> {user.email}
        </span>
        <span>
          <strong>Username:</strong> {user.username}
        </span>
      </li>
    ))}
  </ul>
);

export default withFirebase(AdminPage);
