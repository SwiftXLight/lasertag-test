export interface IToast {
  id: string;
  title: string;
  type: "success" | "error" | "warning" | "info";
  timeout?: number;
}

export interface IToastContext {
  toasts: IToast[];
  pushToast: Function;
}