import * as React from "react";
import { useNavigate } from "react-router-dom";
type UserInfo = "ADMIN" | "VISITOR";
type UserContextType = {
  role?: UserInfo;
  authenticate?: (ok?: boolean, role?: UserInfo) => void;
};
const UserContext = React.createContext<UserContextType>({});
const checkIfRoleIsValid = (role?: UserInfo) => {
  return role === "ADMIN" || role === "VISITOR";
};

export const UserContextProvider: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  const navigate = useNavigate();
  const [role, setRole] = React.useState<UserInfo>();

  const authenticate = (ok?: boolean, role?: UserInfo) => {
    if (ok && checkIfRoleIsValid(role) && role) {
      setRole(role);
      navigate(role.toLocaleLowerCase());
    }
  };

  return (
    <UserContext.Provider value={{ role, authenticate }}>
      {children}
    </UserContext.Provider>
  );
};

export const useAthentication = () => {
  const { authenticate, role } = React.useContext(UserContext);

  const auth = React.useMemo(
    () => ({
      role,
      authenticate,
    }),
    [role]
  );
  return auth;
};
