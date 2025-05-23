import React from "react";
import { useQuery } from "@apollo/client";
import { GET_USERS } from "../graphql/queries";

export const UserList = () => {
  const { data, loading, error } = useQuery(GET_USERS);

  if (loading) return <p>Loading users...</p>;
  if (error) return <p>Error loading users: {error.message}</p>;

  return (
    <div>
      <h2 className="text-xl font-bold">User List</h2>
      <ul className="mt-2 space-y-2">
        {data.user.map((u: any) => (
          <li key={u.id} className="p-3 border rounded shadow-sm">
            <div className="font-semibold">
              {u.first_name} {u.last_name || ""}
            </div>
            <div className="text-sm text-gray-600">{u.email || "No email"}</div>
            <div className="text-sm text-gray-600">
              {u.address || "No address"}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
