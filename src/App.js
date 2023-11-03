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
// UsersIndexPage";

export const App = () => {
  return (
    // basename="/eazy-compliance-and-audits"
    <Router>
      <PageLayout>
        <Routes>
          <Route path="/" element={<Navigate to="/user" />} />

          <Route path={NAV_CONFIG?.NAV_USER_PAGE} element={<UsersIndexPage />}>
            <Route index element={<UserPage />} />
            <Route path={NAV_CONFIG?.NAV_ADD_USER} element={<AddUser />} />
          </Route>
          <Route index element={<UserPage />} />
          {/* <Route path="contact" element={<Contact />} />*/}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </PageLayout>
    </Router>
  );
};
