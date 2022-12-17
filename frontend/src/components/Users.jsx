import { useDispatch, useSelector } from "react-redux";
import { fetchGetUsers } from "../state/slices/userSlice.js";

import { ListGroup } from "react-bootstrap";
import { useEffect } from "react";
import { usersSelectors } from "../state/slices/userSlice.js";

const Users = () => {
  const dispatch = useDispatch();
  const users = useSelector(usersSelectors.selectAll);

  useEffect(() => {
    dispatch(fetchGetUsers());
  }, [dispatch]);

  return (
    <ListGroup>
      {users.map(({ id, name }) => (
        <ListGroup.Item key={id}>{name}</ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default Users;
