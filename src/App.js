import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { PageLayout } from "./components/organisms/PageLayout";
import { NAV_CONFIG } from "./constants/navConfig";
import { NotFoundPage } from "./components/pages/FrameworkPages/NotFoundPage";
import { UserPage } from "./components/organisms/UserPage";
import { AddUser } from "./components/organisms/AddUser";
import { UsersIndexPage } from "./components/pages/FrameworkPages/UsersIndexPage";
import { LoginPage } from "./components/pages/FrameworkPages/LoginPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { EditUser } from "./components/organisms/EditUser";
import { ProtectedRoute } from "./components/organisms/ProtectedRoute";
import { constantStrings } from "./constants/magicString";
export const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <Navigate replace to={NAV_CONFIG?.NAV_LOGIN_LANDING_PAGE} />
            }
          />

          <Route
            path={NAV_CONFIG?.NAV_LOGIN_LANDING_PAGE}
            element={
              sessionStorage?.getItem(constantStrings?.TOKEN) ? (
                <Navigate replace to={NAV_CONFIG?.NAV_USER_PAGE} />
              ) : (
                <LoginPage />
              )
            }
          />
          <Route
            path="/*"
            element={
              sessionStorage?.getItem(constantStrings?.TOKEN) ? (
                <PageLayout>
                  <Routes>
                    <Route
                      path={NAV_CONFIG?.NAV_USER_PAGE}
                      element={<UsersIndexPage />}
                    >
                      <Route index element={<UserPage />} />
                      <Route
                        path={NAV_CONFIG?.NAV_ADD_USER}
                        element={<AddUser />}
                      />
                      <Route
                        path={NAV_CONFIG?.NAV_EDIT_USER}
                        element={<EditUser />}
                      />
                    </Route>
                  </Routes>
                </PageLayout>
              ) : (
                <Navigate replace to={NAV_CONFIG?.NAV_LOGIN_LANDING_PAGE} />
              )
            }
          ></Route>

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </Router>
    </>
  );
};
