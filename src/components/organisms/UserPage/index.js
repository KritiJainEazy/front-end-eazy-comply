import React from "react";
import { MainPage } from "../MainPage";
import { Table } from "../../molecules/Table";
import { uesrTableHeader, userTableData } from "../../../mockData/mockdata";
import { ActionMenu } from "../../molecules/ActionMenu";
import EditIcon from "../../../assets/edit-icon.png";
import DeleteIcon from "../../../assets/delete-icon.png";
import AddIcon from "../../../assets/addIcon.png";
import { GetAssetAddress } from "../../../assets";
import { NAV_CONFIG } from "../../../constants/navConfig";
import { useNavigate } from "react-router-dom";
import {
  constantStrings,
  placeholderStrings,
} from "../../../constants/magicString";

export const UserPage = () => {
  const navigate = useNavigate();
  const handleHeaderButton = () => {
    navigate(NAV_CONFIG?.NAV_ADD_USER);
  };
  const handleEditClick = () => {
    console.log("Edit");
  };
  const handleDeleteClick = () => {
    console.log("Delete");
  };
  const userTableActionMenu = [
    {
      src: EditIcon,
      handler: handleEditClick,
    },
    {
      src: DeleteIcon,
      handler: handleDeleteClick,
    },
  ];
  const userTableActionMenuContent = (
    <ActionMenu actionMenuItems={userTableActionMenu} />
  );
  const userPageMainComponent = (
    <Table
      tableHeaderData={uesrTableHeader}
      tableData={userTableData}
      actionMenuHeaderTitle="userActionMenu"
      activeStatusHeaderTitle="userStatus"
      actionMenuContent={userTableActionMenuContent}
      primaryKey="userId"
    />
  );

  const userPageProps = {
    headerTitle: constantStrings?.USER_PAGE_HEADER_TITLE,
    handleHeaderButton: handleHeaderButton,
    showHeaderButton: true,
    headerButtonTitle: constantStrings?.USER_PAGE_HEADER_BUTTON_TITLE,
    headerButtonIcon: AddIcon,
    mainPageContent: userPageMainComponent,
    iconHeight: "16px",
    showSearchBar: true,
    searchBoxPlaceholder: placeholderStrings?.SEARCH_BAR_USER_PAGE,
    SearchbarAcion: (text) => {
      setTimeout(() => {
        console.log("userpage search", text);
      }, 300);
    },
  };

  return <MainPage {...userPageProps} />;
};
