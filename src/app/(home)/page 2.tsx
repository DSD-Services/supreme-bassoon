import HomePageComponent from "@/features/home/components/home-page-component";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Page() {
  return (
    <>
      <HomePageComponent />
      <ToastContainer />
    </>
  );
}
