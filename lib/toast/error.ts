import { toast, Slide } from "react-toastify";

export function errorToast(errorMassage: string | JSX.Element) {
  toast.error(errorMassage, {
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
