import { createContext, useReducer } from "react";

const UserInfoContext = createContext({ name: "", room: "" });
const UserInfoDispatchContext = createContext(null);

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_VAL":
      return { ...state, [action.payload.name]: action.payload.value };

    case "RESET":
      return { name: "", room: "" };
  }
};

let userInfo;
let userInfoDispatch;

const UserInfoProvider = ({ children }) => {
  [userInfo, userInfoDispatch] = useReducer(reducer, { name: "", room: "" });

  return (
    <UserInfoContext.Provider value={userInfo}>
      <UserInfoDispatchContext.Provider value={userInfoDispatch}>
        {children}
      </UserInfoDispatchContext.Provider>
    </UserInfoContext.Provider>
  );
};

export default UserInfoProvider;

export { userInfoDispatch, UserInfoContext, UserInfoDispatchContext };
