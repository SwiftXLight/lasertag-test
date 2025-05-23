import React, { useState } from "react";
import { UserList } from "./UserList";
import { UserForm } from "./UserForm";
import { User } from "@/types/user";

export const UserManager = () => {
  const [editingUser, setEditingUser] = useState<User | undefined>(undefined);
  const [showForm, setShowForm] = useState(false);

  const handleAdd = () => {
    setEditingUser(undefined);
    setShowForm(true);
  };

  const handleEdit = (user: any) => {
    setEditingUser(user);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingUser(undefined);
  };

  return (
    <div className="mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">User Manager</h1>
      <button
        className="mb-4 bg-green-600 text-white px-4 py-2 rounded"
        onClick={handleAdd}
      >
        + Add User
      </button>

      {showForm && <UserForm user={editingUser} onClose={handleCloseForm} />}

      <UserList onEdit={handleEdit} />
    </div>
  );
};
