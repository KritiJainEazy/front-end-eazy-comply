import React from "react";
import { MainPage } from "../MainPage";
import { NAV_CONFIG } from "../../../constants/navConfig";
import { Textbox } from "../../molecules/TextBox";
import { CreateForm } from "../../molecules/CreateForm";

export const AddUser = () => {
  const addUserPageMainComponent = <CreateForm />;

  const addUserPageProps = {
    headerTitle: "Add User",
    mainPageContent: addUserPageMainComponent,
  };

  return (
    <>
      <MainPage {...addUserPageProps} />
    </>
  );
};
