import React, { useContext, useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_USER, UPDATE_USER } from "../graphql/mutations";
import { GET_USERS } from "../graphql/queries";
import { ToastContext } from "./Toast";
import { User } from "@/types/user";

export const UserForm = ({
  user,
  onClose,
}: {
  user?: User;
  onClose: () => void;
}) => {
  const { pushToast } = useContext(ToastContext);
  const [firstName, setFirstName] = useState(user?.first_name || "");
  const [lastName, setLastName] = useState(user?.last_name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [address, setAddress] = useState(user?.address || "");

  const [addUser] = useMutation(ADD_USER, {
    refetchQueries: [{ query: GET_USERS }],
  });

  const [updateUser] = useMutation(UPDATE_USER, {
    refetchQueries: [{ query: GET_USERS }],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (user) {
        await updateUser({
          variables: {
            id: user.id,
            first_name: firstName,
            last_name: lastName || null,
            email: email || null,
            address: address || null,
          },
        });
        pushToast("User updated successfully", "success");
      } else {
        await addUser({
          variables: {
            first_name: firstName,
            last_name: lastName || null,
            email: email || null,
            address: address || null,
          },
        });
        pushToast("User added successfully", "success");
      }
      onClose();
    } catch (error: any) {
      pushToast(`Error: ${error.message}`, "error", 2000);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-6">
      <input
        type="text"
        placeholder="First Name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        className="border p-2 rounded w-full"
        required
      />
      <input
        type="text"
        placeholder="Last Name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        className="border p-2 rounded w-full"
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 rounded w-full"
      />
      <input
        type="text"
        placeholder="Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        className="border p-2 rounded w-full"
      />
      <div className="flex gap-2">
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {user ? "Update" : "Add"} User
        </button>
        <button
          type="button"
          onClick={onClose}
          className="text-gray-600 px-4 py-2"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};
