import { createContext, useState } from "react";
export const AppContext = createContext();

export default function MyContext({ children }) {
  const [userInfo, setUserInfo] = useState(
    JSON.parse(localStorage.getItem("userDetails")) || {}
  );
  return (
    <AppContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </AppContext.Provider>
  );
}
