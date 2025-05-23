import React from "react";
import { UserList } from "./components/UserList";
import { UserForm } from "./components/UserForm";

function App() {
  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">User Manager</h1>
      <UserForm />
      <div className="mt-6">
        <UserList />
      </div>
    </div>
  );
}

export default App;
