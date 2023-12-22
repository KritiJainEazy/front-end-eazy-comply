import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { PageLayout } from "./components/organisms/PageLayout";
import { NAV_CONFIG } from "./constants/navConfig";
import { MainPage } from "./components/organisms/MainPage";
import { NotFoundPage } from "./components/pages/FrameworkPages/NotFoundPage";
import { UserPage } from "./components/organisms/UserPage";
import { AddUser } from "./components/organisms/AddUser";
import { UsersIndexPage } from "./components/pages/FrameworkPages/UsersIndexPage";
import { LoginPage } from "./components/pages/FrameworkPages/LoginPage";
import { ToastContainer } from "react-toastify";
import { EditUser } from "./components/organisms/EditUser";
// UsersIndexPage";

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
          ></Route>

          <Route
            path={NAV_CONFIG?.NAV_LOGIN_LANDING_PAGE}
            element={<LoginPage />}
          />
          <Route
            path={NAV_CONFIG?.NAV_USER_PAGE}
            element={
              <PageLayout>
                <UsersIndexPage />
              </PageLayout>
            }
          >
            <Route index element={<UserPage />} />
            <Route path={NAV_CONFIG?.NAV_ADD_USER} element={<AddUser />} />
            <Route path={NAV_CONFIG?.NAV_EDIT_USER} element={<EditUser />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
      {/* <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      /> */}
    </>
  );
};
