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
// UsersIndexPage";

export const App = () => {
  return (
    // basename="/eazy-compliance-and-audits"
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Navigate to={NAV_CONFIG?.NAV_LOGIN_LANDING_PAGE} />}
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
        </Route>
        {/* To be removed, below line */}
        <Route index element={<LoginPage />} />
        {/* <Route path="contact" element={<Contact />} />*/}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};
