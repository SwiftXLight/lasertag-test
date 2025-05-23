import React, { useContext, useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_USERS } from "../graphql/queries";
import { DELETE_USER } from "../graphql/mutations";
import { ToastContext } from "./Toast";
import { User } from "@/types/user";

// Hook to get window width (with SSR safe check)
function useWindowWidth() {
  const [width, setWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1280
  );

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return width;
}

export const UserList = ({ onEdit }: { onEdit: (user: User) => void }) => {
  const { pushToast } = useContext(ToastContext);
  const [page, setPage] = useState(1);

  // Calculate columns based on Tailwind breakpoints
  const width = useWindowWidth();

  let columns = 1;
  if (width >= 1280) columns = 6;
  else if (width >= 1024) columns = 4;
  else if (width >= 768) columns = 3;
  else if (width >= 640) columns = 2;

  const rows = 5; // number of rows per page
  const PAGE_SIZE = columns * rows;

  // Reset to page 1 when page size changes (e.g. on resize)
  useEffect(() => {
    setPage(1);
  }, [PAGE_SIZE]);

  const { data, loading, error } = useQuery(GET_USERS, {
    variables: { limit: PAGE_SIZE, offset: (page - 1) * PAGE_SIZE },
    fetchPolicy: "cache-and-network",
  });

  const [deleteUser] = useMutation(DELETE_USER, {
    refetchQueries: [
      {
        query: GET_USERS,
        variables: { limit: PAGE_SIZE, offset: (page - 1) * PAGE_SIZE },
      },
    ],
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

  const users: User[] = data?.user || [];
  const hasNextPage = users.length === PAGE_SIZE;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">User List</h2>
      <div
        className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 items-stretch`}
      >
        {users.map((u) => (
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

      {/* Pagination controls */}
      <div className="mt-6 flex justify-center items-center gap-4">
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
          className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
        >
          Previous
        </button>

        <span>Page {page}</span>

        <button
          onClick={() => hasNextPage && setPage((p) => p + 1)}
          disabled={!hasNextPage}
          className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};
