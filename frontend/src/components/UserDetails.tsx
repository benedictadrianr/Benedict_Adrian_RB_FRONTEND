import { useUsersContext } from "../hooks/useUserContext";
import trashCan from "../assets/trash-can.png";

interface UserDetailsProps {
  user: {
    _id: string;
    username: string;
    email: string;
  };
}

const UserDetails: React.FC<UserDetailsProps> = ({ user }) => {
  const { dispatch } = useUsersContext();

  const handleClick = async () => {
    const response = await fetch(
      "http://localhost:4000/api/users/" + user._id,
      {
        method: "DELETE",
      }
    );
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_USER", payload: json });
    }
  };

  return (
    <div className="flex flex-row bg-[rgb(217,217,217)] h-[15%] items-center mb-4 last:mb-0 shadow-md rounded-md">
      <p className="border-black border-r-2 w-[10%] h-full flex justify-center items-center p-1 flex-wrap">
        {user.username}
      </p>
      <p className="border-black border-r-2 w-[25%] h-full flex justify-center items-center">
        {user.email}
      </p>
      <p className="w-[60%] px-4 h-full flex justify-start items-center">
        Additional Information
      </p>
      <div className="flex justify-center items-center cursor-pointer h-full">
        <img src={trashCan} className="h-[40%]" onClick={handleClick}></img>
      </div>
    </div>
  );
};

export default UserDetails;
