import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUsersContext } from "../hooks/useUserContext";

interface UserData {
  userType: string;
  username: string;
  password: string;
}

export default function LoginForm() {
  const { users, dispatch } = useUsersContext();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [messageStyle, setMessageStyle] = useState("");
  const [userType, setUserType] = useState("brand");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch("http://localhost:4000/api/users/");
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_USERS", payload: json });
      }
    };

    fetchUsers();
  }, []);

  const authenticateUser = (
    username: string,
    password: string,
    userType: string,
    users: UserData[]
  ) => {
    // Find the user with the provided username
    const user = users.find((user) => user.username === username);

    // If user is not found, return false
    if (!user) {
      return false;
    }

    // If the passwords match, return true
    if (user.userType === userType && user.password === password) {
      return true;
    }

    // If the passwords don't match, return false
    return false;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isAuthenticated = authenticateUser(
      username,
      password,
      userType,
      users
    );
    if (isAuthenticated) {
      if (userType === "brand" || userType === "store") {
        setMessage("Logged in!");
        navigate(`/dashboard/${userType}`);
      } else if (userType === "employee") {
        setMessage("Logged in!");
        navigate(`/dashboard/${username}`);
      }
    } else if (!isAuthenticated) {
      setMessage(
        "Username or Password is Incorrect! or User Type is Incorrect!"
      );
      setMessageStyle("text-red-500");
    }
  };

  return (
    <div className="flex justify-center items-center w-[60%] h-full flex-col">
      {/* FORM */}
      <form
        className="w-[50%] flex flex-col gap-4"
        action=""
        onSubmit={handleSubmit}>
        {/* TITLE */}
        <h1 className="text-3xl font-semibold">Welcome Back</h1>
        {/* USER TYPE  */}
        <div className="h-[5rem] bg-[#D9D9D9] flex items-center justify-evenly rounded-full relative">
          {/* CHOSER */}
          <div
            className={`bg-black absolute w-[32%] h-[80%] rounded-full transition-all ease-in-out ${
              userType == "brand"
                ? "left-1"
                : userType == "store"
                ? "left-1/2 -translate-x-1/2"
                : "left-[67%]"
            }`}></div>
          {/* BRAND USER */}
          <label
            htmlFor=""
            className="w-[32%] h-[80%] relative flex justify-center items-center shadow-inner rounded-full">
            <input
              type="radio"
              name="userType"
              value="brand"
              className="absolute w-full h-full opacity-0 cursor-pointer"
              id="brand"
              onChange={(e) => setUserType(e.target.value)}
            />
            <span
              className={`text-lg font-bold transition-all ease-in-out ${
                userType == "brand" ? "text-white" : "text-black"
              }`}>
              Brand
            </span>
          </label>
          {/* STORE USER */}
          <label
            htmlFor=""
            className="w-[32%] h-[80%] relative flex justify-center items-center shadow-inner rounded-full">
            <input
              type="radio"
              name="userType"
              value="store"
              className="absolute w-full h-full opacity-0 cursor-pointer"
              id="store"
              onChange={(e) => setUserType(e.target.value)}
            />
            <span
              className={`text-lg font-bold transition-all ease-in-out ${
                userType == "store" ? "text-white" : "text-black"
              }`}>
              Store
            </span>
          </label>
          {/* EMPLOYEE USER */}
          <label
            htmlFor=""
            className="w-[32%] h-[80%] relative flex justify-center items-center shadow-inner rounded-full">
            <input
              type="radio"
              name="userType"
              value="employee"
              className="absolute w-full h-full opacity-0 cursor-pointer"
              id="employee"
              onChange={(e) => setUserType(e.target.value)}
            />
            <span
              className={`text-lg font-bold transition-all ease-in-out ${
                userType == "employee" ? "text-white" : "text-black"
              }`}>
              Employee
            </span>
          </label>
        </div>
        {/* USERNAME INPUT */}
        <input
          type="text"
          name="userName"
          placeholder="Enter username"
          className="bg-[#E7F0FE] rounded-md h-[5rem] px-4 placeholder:text-[#111]"
          required
          onChange={(e) => setUsername(e.target.value)}
        />
        {/* PASSWORD INPUT */}
        <input
          type="password"
          name="password"
          placeholder="Enter password"
          className="bg-[#E7F0FE] rounded-md h-[5rem] px-4 placeholder:text-[#111]"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        {/* LOGIN BUTTON */}
        <button className="h-[20%] bg-[#111] rounded-md text-white hover:bg-neutral-800">
          Login
        </button>
        <span className={messageStyle}>{message}</span>
      </form>
      {/* ADMIN ALT LOGIN */}
      <p className="w-[50%] mt-4">
        Admin? Login{" "}
        <Link className="text-blue-500" to="/login/admin">
          here
        </Link>
      </p>
    </div>
  );
}
