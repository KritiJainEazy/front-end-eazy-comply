import React from "react";
import { MainPage } from "../MainPage";
import { NAV_CONFIG } from "../../../constants/navConfig";
import { Textbox } from "../../molecules/TextBox";
import { CreateForm } from "../../molecules/CreateForm";
import { ToastContainer } from "react-toastify";
import { EditUserForm } from "../../molecules/EditUserForm";

export const EditUser = () => {
  const editUserPageMainComponent = <EditUserForm />;

  const editUserPageProps = {
    headerTitle: "Edit User",
    mainPageContent: editUserPageMainComponent,
  };

  return (
    <>
      <MainPage {...editUserPageProps} />
    </>
  );
};
