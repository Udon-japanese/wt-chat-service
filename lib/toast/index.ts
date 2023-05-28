import { toast, Slide } from "react-toastify";
import { ToastFn } from "@/@types/Toast";

export const errorToast: ToastFn = (message) => {
  toast.error(message, {
  position: "top-center",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "colored",
  transition: Slide,
});
}

export const successToast: ToastFn = (message) => {
  toast.success(message, {
  position: "top-center",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "colored",
  transition: Slide,
});
}

export const warningToast: ToastFn = (message) => {
  toast.warn(message, {
  position: "top-center",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "colored",
  transition: Slide,
});
}