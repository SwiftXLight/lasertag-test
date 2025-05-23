import React, { useContext } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_USERS } from "../graphql/queries";
import { DELETE_USER } from "../graphql/mutations";
import { ToastContext } from "./Toast";
import { User } from "@/types/user";

export const UserList = ({ onEdit }: { onEdit: (user: User) => void }) => {
  const { pushToast } = useContext(ToastContext);
  const { data, loading, error } = useQuery(GET_USERS);
  const [deleteUser] = useMutation(DELETE_USER, {
    refetchQueries: [{ query: GET_USERS }],
  });

  if (loading) return <p>Loading users...</p>;
  if (error) return <p>Error loading users: {error.message}</p>;

  const handleDelete = async (id: string) => {
    try {
      await deleteUser({ variables: { id } });
      pushToast("User deleted successfully", "success");
    } catch (error: any) {
      pushToast(`Error deleting user: ${error.message}`, "error", 2000);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">User List</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 items-stretch">
        {data.user.map((u: any) => (
          <div
            key={u.id}
            className="p-4 border rounded shadow-md flex flex-col justify-between box-border h-full"
          >
            <div className="flex flex-col flex-grow">
              <div className="font-semibold text-lg break-words whitespace-normal">
                {u.first_name} {u.last_name || ""}
              </div>
              <div className="text-sm text-gray-600 break-words whitespace-normal">
                {u.email || "No email"}
              </div>
              <div className="text-sm text-gray-600 break-words whitespace-normal">
                {u.address || "No address"}
              </div>
            </div>
            <div className="mt-4 flex justify-between gap-2">
              <button
                onClick={() => onEdit(u)}
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-sm transition"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(u.id)}
                className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm transition"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
