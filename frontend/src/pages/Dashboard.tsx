import { useUsersContext } from "../hooks/useUserContext";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UserDetails from "../components/UserDetails";
import AddUserForm from "../components/AddUserForm";

interface DashboardProps {
  param: string;
}

interface UserData {
  _id: string;
  email: string;
  userType: string;
  username: string;
  password: string;
}

const Dashboard: React.FC<DashboardProps> = ({ param }) => {
  const { users, dispatch } = useUsersContext();
  const [addFormShow, setAddFormShow] = useState(false);
  const [sidebar, setSidebar] = useState("home");
  const [position, setPosition] = useState("top-6");
  const { employeeNum } = useParams<{ employeeNum?: string }>();

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch("http://localhost:4000/api/users");
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_USERS", payload: json });
      }
    };

    fetchUsers();
  }, []);

  const paramConditional = () => {
    if (param === "Admin") {
      if (sidebar === "home") {
        setPosition("top-6");
      } else if (sidebar === "brand") {
        setPosition("top-[4.5rem]");
      } else if (sidebar === "store") {
        setPosition("top-[7.5rem]");
      } else {
        setPosition("top-[10.5rem]");
      }
    } else if (param === "Brand") {
      if (sidebar === "home") {
        setPosition("top-6");
      } else if (sidebar === "store") {
        setPosition("top-[4.5rem]");
      } else {
        setPosition("top-[7.5rem]");
      }
    } else if (param === "Store") {
      setPosition(sidebar === "home" ? "top-6" : "top-[4.5rem]");
    } else if (param === "Employee") {
      setPosition(sidebar === "home" ? "top-6" : "top-[4.5rem]");
    }
  };

  useEffect(() => {
    paramConditional();
  }, [param, sidebar]);

  function filterUser({
    users,
    param,
    employeeNum,
  }: {
    users: UserData[]; // Update with the actual type of users
    param: string;
    employeeNum?: string;
  }) {
    if (param === "Admin") {
      return users;
    } else if (param === "Brand") {
      return users.filter(
        (user) => user.userType === "store" || user.userType === "employee"
      );
    } else if (param === "Store") {
      return users.filter((user) => user.userType === "employee");
    } else if (param === "Employee") {
      return users.filter((user) => user.username === employeeNum);
    }
  }

  function sideBarFilter({
    filteredUser,
    sidebar,
  }: {
    filteredUser: UserData[]; // Update with the actual type of filteredUser
    sidebar: string;
  }) {
    if (sidebar === "home") {
      return filteredUser;
    } else if (sidebar === "brand") {
      return filteredUser.filter((user) => user.userType === "brand");
    } else if (sidebar === "store") {
      return filteredUser.filter((user) => user.userType === "store");
    } else if (sidebar === "employee") {
      return filteredUser.filter((user) => user.userType === "employee");
    }
  }

  const filteredUser = filterUser({ users: users || [], param, employeeNum });
  const sidebarFilter = sideBarFilter({
    filteredUser: filteredUser || [],
    sidebar,
  });

  return (
    <div className="w-screen h-screen overflow-hidden flex flex-row">
      <AddUserForm addFormShow={addFormShow} setAddFormShow={setAddFormShow} />
      <div className="bg-[#393940] w-[15%] h-full relative">
        <div
          className={`bg-white rounded-full w-24 h-8 absolute left-1/2 -translate-x-1/2 transition-all ease-in-out ${position}`}></div>
        <div className="flex flex-col items-center py-6 gap-4">
          <label
            className={`relative flex justify-center items-center shadow-inner rounded-full w-24 h-8 transition-all ease-in-out ${
              sidebar == "home" ? "text-black" : "text-white"
            }`}>
            <input
              type="radio"
              name="sidebar"
              value="home"
              className="absolute w-full h-full cursor-pointer opacity-0"
              onChange={(e) => setSidebar(e.target.value)}
            />
            Home
          </label>
          {param == "Brand" ? (
            ""
          ) : param == "Store" ? (
            ""
          ) : param == "Employee" ? (
            ""
          ) : (
            <label
              className={`relative flex justify-center items-center shadow-inner rounded-full w-24 h-8 transition-all ease-in-out ${
                sidebar == "brand" ? "text-black" : "text-white"
              }`}>
              <input
                type="radio"
                name="sidebar"
                value="brand"
                className="absolute w-full h-full cursor-pointer opacity-0"
                onChange={(e) => setSidebar(e.target.value)}
              />
              Brand
            </label>
          )}
          {param == "Store" ? (
            ""
          ) : param == "Employee" ? (
            ""
          ) : (
            <label
              className={`relative flex justify-center items-center shadow-inner rounded-full w-24 h-8 transition-all ease-in-out ${
                sidebar == "store" ? "text-black" : "text-white"
              }`}>
              <input
                type="radio"
                name="sidebar"
                value="store"
                className="absolute w-full h-full cursor-pointer opacity-0"
                onChange={(e) => setSidebar(e.target.value)}
              />
              Store
            </label>
          )}
          <label
            className={`relative flex justify-center items-center shadow-inner rounded-full w-24 h-8 transition-all ease-in-out ${
              sidebar == "employee" ? "text-black" : "text-white"
            }`}>
            <input
              type="radio"
              name="sidebar"
              value="employee"
              className="absolute w-full h-full cursor-pointer opacity-0"
              onChange={(e) => (setSidebar(e.target.value), paramConditional)}
            />
            Employee
          </label>
        </div>
      </div>
      <div className="w-[85%] p-8 h-full text-2xl flex flex-col justify-between">
        <div className="flex flex-row justify-between ">
          <h1>{param} Dashboard</h1>
          <button
            onClick={() => setAddFormShow(true)}
            className="rounded-lg bg-[#d9d9d9] py-2 px-8 shadow-2xl">
            Add
          </button>
        </div>
        <div className="h-[70%] p-4 overflow-scroll shadow-inner">
          {sidebarFilter &&
            sidebarFilter.map((user) => (
              <UserDetails key={user._id} param={param} user={user} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
