import React, { useState } from "react";
import { UserManager } from "./components/UserManager";
import { IToast } from "./types/toast";
import { Toast, ToastContext } from "./components/Toast";

function App() {
  const [toasts, setToasts] = useState([] as IToast[]);

  function pushToast(
    message: string,
    type?: "success" | "error" | "info" | "warning",
    timeout?: number
  ) {
    const toast: IToast = {
      id: "" + +new Date(),
      title: message,
      type: type || "info",
      timeout: timeout || 5000,
    };
    setToasts([toast, ...toasts]);
  }

  return (
    <ToastContext.Provider value={{ toasts, pushToast }}>
      <div
        className={
          "pointer-events-none absolute right-4 top-24 z-[60] w-[300px]"
        }
      >
        <div className={"pointer-events-auto sticky right-0 top-24 w-full"}>
          {toasts.map((t) => (
            <Toast key={t.id} toast={t}></Toast>
          ))}
        </div>
      </div>
      <UserManager />
    </ToastContext.Provider>
  );
}

export default App;
