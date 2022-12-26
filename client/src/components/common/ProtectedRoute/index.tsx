import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAthentication } from "../../../userContext";

export const ProtectedRoute: React.FC<{
  element: JSX.Element;
  checkedRole?: string;
}> = ({ element, checkedRole }) => {
  const { role } = useAthentication();
  if (checkedRole && role !== checkedRole) {
    return <Navigate to={"/"} replace />;
  }
  return element;
};
