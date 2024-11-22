import { toast } from "react-toastify";

export const popupError = (msg: unknown) => {
  if (msg instanceof Error) {
    toast.error(msg.message);
  }
};

export const toastErr = (msg: string) => {
  toast.error(msg);
};

export const toastWarn = (msg: string) => {
  toast.warn(msg);
};

export const toastInfo = (msg: string) => {
  toast.info(msg);
};

export const toastSucc = (msg: string) => {
  toast.success(msg);
};
