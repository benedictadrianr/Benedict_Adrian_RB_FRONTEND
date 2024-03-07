import { useState } from "react";
import { useUsersContext } from "../hooks/useUserContext";

interface addUserFormProps {
  addFormShow: boolean;
  setAddFormShow: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddUserForm: React.FC<addUserFormProps> = ({
  addFormShow,
  setAddFormShow,
}) => {
  const { dispatch } = useUsersContext();
  const [userType, setUserType] = useState("brand");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState<string[]>([]);

  const closeWindow = () => {
    setAddFormShow(false);
    setEmail("");
    setUsername("");
    setPassword("");
    setError(null);
    setEmptyFields([]);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const userData = {
      userType,
      email,
      username,
      password,
    };

    const response = await fetch("http://localhost:4000/api/users/", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    }
    if (response.ok) {
      setEmail("");
      setUsername("");
      setPassword("");
      setError(null);
      setEmptyFields([]);
      setAddFormShow(false);
      console.log("New User Added", json);
      dispatch({ type: "CREATE_USER", payload: json });
    }
  };

  return (
    <div className={`overflow-hidden ${addFormShow ? "" : "hidden"}`}>
      <div
        className="absolute top-0 left-0 w-screen h-screen bg-slate-600 opacity-75 flex justify-center items-center"
        onClick={closeWindow}></div>
      <form
        onSubmit={onSubmit}
        className="bg-[#f8fafc] w-1/2 max-w-[700px] h-[80%] max-h-[570px] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg flex justify-center items-center flex-col p-8 gap-4">
        <div
          className="absolute top-4 active:bg-red-700 right-4 w-6 h-6 rounded-full text-white bg-red-400 flex justify-center items-center cursor-pointer hover:bg-red-500 select-none"
          onClick={closeWindow}>
          X
        </div>
        <h1 className="text-3xl font-bold">Add a new User</h1>
        <div className="h-[5rem] w-full bg-[#D9D9D9] flex items-center justify-around rounded-full relative">
          {/* CHOSER */}
          <div
            className={`bg-black absolute w-[33%] h-[80%] rounded-full transition-all ease-in-out ${
              userType == "brand"
                ? "left-2"
                : userType == "store"
                ? "left-1/2 -translate-x-1/2"
                : "left-[66%]"
            }`}></div>
          {/* BRAND USER */}
          <label
            htmlFor=""
            className="w-[31%] h-[80%] relative flex justify-center items-center shadow-inner rounded-full">
            <input
              type="radio"
              name="userType"
              value="brand"
              className="absolute w-full h-full opacity-0 cursor-pointer"
              id="brand"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setUserType(e.target.value)
              }
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
            className="w-[31%] h-[80%] relative flex justify-center items-center rounded-full shadow-inner">
            <input
              type="radio"
              name="userType"
              value="store"
              className="absolute w-full h-full opacity-0 cursor-pointer"
              id="store"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setUserType(e.target.value)
              }
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
            className="w-[31%] h-[80%] relative flex justify-center items-center shadow-inner rounded-full">
            <input
              type="radio"
              name="userType"
              value="employee"
              className="absolute w-full h-full opacity-0 cursor-pointer"
              id="employee"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setUserType(e.target.value)
              }
            />
            <span
              className={`text-lg font-bold transition-all ease-in-out ${
                userType == "employee" ? "text-white" : "text-black"
              }`}>
              Employee
            </span>
          </label>
        </div>
        {/* EMAIL INPUT */}
        <div className="h-[5rem] flex flex-col w-full">
          <label htmlFor="email" className="font-bold">
            Email address<span className="text-[#FF0000]">*</span>
          </label>
          <input
            type="email"
            name="email"
            maxLength={23}
            value={email}
            placeholder="Enter email"
            className={`bg-[#E7F0FE] rounded-md h-full px-4 placeholder:text-[#111] shadow-inner ${
              emptyFields.includes("email") ? "border-red-500 border-2" : ""
            }`}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
            onClick={() => setError(null)}
          />
        </div>
        {/* USERNAME INPUT */}
        <div className="h-[5rem] flex flex-col w-full">
          <label htmlFor="username" className="font-bold">
            Username(max: 10 char)<span className="text-[#FF0000]">*</span>
          </label>
          <input
            type="text"
            name="username"
            maxLength={10}
            value={username}
            placeholder="Enter username"
            className={`bg-[#E7F0FE] rounded-md h-full px-4 placeholder:text-[#111] shadow-inner ${
              emptyFields.includes("username") ? "border-red-500 border-2" : ""
            }`}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setUsername(e.target.value)
            }
            onClick={() => setError(null)}
          />
        </div>
        {/* PASSWORD INPUT */}
        <div className="h-[5rem] flex flex-col w-full">
          <label htmlFor="password" className="font-bold">
            Password(6 - 12 char)<span className="text-[#ff0000]">*</span>
          </label>
          <input
            type="password"
            name="password"
            minLength={6}
            maxLength={12}
            value={password}
            placeholder="Enter password"
            className={`bg-[#E7F0FE] rounded-md h-full px-4 placeholder:text-[#111] shadow-inner ${
              emptyFields.includes("password") ? "border-red-500 border-2" : ""
            }`}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
            onClick={() => setError(null)}
          />
        </div>
        {/* SUBMIT BUTTON */}
        <button className="h-[10%] w-full min-h-14 bg-[#111] rounded-md text-white hover:bg-neutral-800">
          Submit
        </button>
      </form>
      <div
        className={`px-4 py-2 border-red-500 border-2 bg-red-300 absolute transition-all ${
          error ? "bottom-2 right-2" : "-bottom-16 right-2"
        } `}>
        Please fill in all the fields
      </div>
    </div>
  );
};

export default AddUserForm;
