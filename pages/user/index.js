import React, { useState, useContext } from "react";
import { Context } from "../../context";
import UserRoute from "../../components/routes/UserRoute";

const UserIndex = () => {
  const {
    state: { user },
  } = useContext(Context);

  return (
    <UserRoute>
      <div className="jumbotron text-center">
        <h3 className="navTitle">Student Dashboard</h3>
      </div>
    </UserRoute>
  );
};

export default UserIndex;
