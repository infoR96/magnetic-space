"use client";

import React from "react";

import UserList from "../components/data/UserList";
import RegisterForm from "../components/users/RegisterForm";

const CsvUploader: React.FC = () => {
 

  return (
    <div>
      <UserList />
      <RegisterForm />
    </div>
  );
};

export default CsvUploader;
