import { createContext, useState } from "react";

const UserContext = createContext({
  user: null,  
  setUser: (user) => {},
  isAdmin: () => {},
});

export function UserContextProvider(props) {
  const [user, setUser] = useState();

  const context = {
    user: user,    
    setUser: handleSetUser,
  };

  function handleSetUser(user) {
    setUser((prev) => {
      return user;
    });
  }

  function handleIsAdmin() {
    if (user.role === "ADMIN") return true;
    return false;
  }

  return (
    <UserContext.Provider value={context}>
      {props.children}
    </UserContext.Provider>
  );
}

export default UserContext;
