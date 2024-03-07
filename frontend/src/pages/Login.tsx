import login_image from "../assets/login_image.png";
import { Routes, Route } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import AdminLoginForm from "../components/AdminLoginForm";
import NoPage from "./NoPage";

export default function Login() {
  return (
    <div className="h-screen w-screen flex flex-row bg-[#F8FAFC]">
      <Routes>
        <Route index element={<LoginForm />} />
        <Route path="/admin" element={<AdminLoginForm />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
      <div className="flex justify-center items-center w-[40%] h-full">
        <img src={login_image} alt="login-image" className="h-[85%]" />
      </div>
    </div>
  );
}
