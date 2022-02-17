import React, { useState, useContext } from "react";
import { Context } from "../../context";
import UserRoute from "../../components/routes/UserRoute";

const UserIndex = () => {
  const {
    state: { user },
  } = useContext(Context);

  return (
    <UserRoute>
      <div className="jumbotron">
        <pre>{JSON.stringify(user, null, 4)}</pre>
      </div>
    </UserRoute>
  );
};

export default UserIndex;
