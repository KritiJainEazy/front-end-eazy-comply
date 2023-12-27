import React from "react";
import { constantStrings } from "../../../constants/magicString";
import { Navigate } from "react-router-dom";
import { NAV_CONFIG } from "../../../constants/navConfig";

export const ProtectedRoute = ({ children }) => {
  if (
    sessionStorage?.getItem(constantStrings?.TOKEN) &&
    sessionStorage?.getItem(constantStrings?.TOKEN) != null
  ) {
    return <>{children}</>;
  } else {
    <Navigate to={NAV_CONFIG?.NAV_LOGIN_LANDING_PAGE} replace />;
  }
};
