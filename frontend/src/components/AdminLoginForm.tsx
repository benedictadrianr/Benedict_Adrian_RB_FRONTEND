import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function AdminLoginForm() {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [messageStyle, setMessageStyle] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const values = {
    username,
    password,
  };

  console.log(values);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    username == "admin" && password == "admin"
      ? (setMessage("User Valid"),
        setMessageStyle("text-green-500"),
        navigate("/dashboard/admin"))
      : (setMessage("User Invalid"), setMessageStyle("text-red-500"));
  };

  return (
    <div className="flex justify-center items-center w-[60%] flex-col h-full">
      <form className="w-[50%] flex flex-col gap-4" onSubmit={handleSubmit}>
        <h1 className="text-3xl font-semibold">Welcome Back</h1>
        <input
          type="text"
          name="userName"
          placeholder="Enter username"
          className="bg-[#E7F0FE] rounded-md h-[5rem] px-4 placeholder:text-[#111]"
          required
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setUsername(e.target.value)
          }
        />
        <input
          type="password"
          name="password"
          placeholder="Enter password"
          className="bg-[#E7F0FE] rounded-md h-[5rem] px-4 placeholder:text-[#111]"
          required
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
        />
        <button className="h-[20%] bg-[#111] rounded-md text-white hover:bg-neutral-800">
          Login
        </button>
        <span className={messageStyle}>{message}</span>
      </form>
      <p className="w-[50%] mt-4">
        Not admin? Login{" "}
        <Link className="text-blue-500" to="/login">
          here
        </Link>
      </p>
    </div>
  );
}
