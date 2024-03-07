import React, { createContext, useReducer, ReactNode } from "react";

interface User {
  _id: string;
}

interface UsersState {
  users: User[] | null;
}

interface SetUsersAction {
  type: "SET_USERS";
  payload: User[];
}

interface CreateUserAction {
  type: "CREATE_USER";
  payload: User;
}

interface DeleteUserAction {
  type: "DELETE_USER";
  payload: { _id: string };
}

type UsersAction = SetUsersAction | CreateUserAction | DeleteUserAction;

interface UsersContextType extends UsersState {
  dispatch: React.Dispatch<UsersAction>;
}

export const UsersContext = createContext<UsersContextType | undefined>(
  undefined
);

export const usersReducer = (state: UsersState, action: UsersAction) => {
  switch (action.type) {
    case "SET_USERS":
      return {
        users: action.payload,
      };
    case "CREATE_USER":
      return {
        users: [action.payload, ...(state.users || [])],
      };
    case "DELETE_USER":
      return {
        users: (state.users || []).filter((u) => u._id !== action.payload._id),
      };
    default:
      return state;
  }
};

interface UsersContextProviderProps {
  children: ReactNode;
}

export const UsersContextProvider: React.FC<UsersContextProviderProps> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(usersReducer, { users: null });

  return (
    <UsersContext.Provider value={{ ...state, dispatch }}>
      {children}
    </UsersContext.Provider>
  );
};
