import React, { useEffect, useState } from "react";
import { MainPage } from "../MainPage";
import { Table } from "../../molecules/Table";
import {
  uesrTableHeader,
  userTableAppendData,
  userTableData,
} from "../../../mockData/mockdata";
import { ActionMenu } from "../../molecules/ActionMenu";
import EditIcon from "../../../assets/edit-icon.png";
import DeleteIcon from "../../../assets/delete-icon.png";
import AddIcon from "../../../assets/addIcon.png";
import ExportIcon from "../../../assets/export.png";
import { NAV_CONFIG } from "../../../constants/navConfig";
import { useNavigate } from "react-router-dom";
import {
  constantStrings,
  placeholderStrings,
} from "../../../constants/magicString";
import { jsonToCSV } from "../../../utils/jsonToCSV";

export const UserPage = () => {
  const [dataSelected, setDataSelected] = useState([]);

  const navigate = useNavigate();
  const handleHeaderButton = () => {
    navigate(NAV_CONFIG?.NAV_ADD_USER);
  };

  const getSelectedData = (data = []) => {
    setDataSelected(data);
  };

  const handleExportButton = () => {
    console.log(dataSelected, "dataSelectedfs");
    jsonToCSV(constantStrings?.USER_PAGE_EXPORT_FILENAME, dataSelected);
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
      getMultipleSelectedArray={getSelectedData}
      primaryKey="userId"
    />
  );

  const userPageProps = {
    headerTitle: constantStrings?.USER_PAGE_HEADER_TITLE,
    handleHeaderButton: handleHeaderButton,
    showHeaderButton: true,
    headerButtonTitle: constantStrings?.USER_PAGE_HEADER_BUTTON_TITLE,
    headerButtonIcon: AddIcon,
    headerButtonIconHeight: "16px",
    handleExportButton: handleExportButton,
    showExportButton: true,
    exportButtonTitle: constantStrings?.EXPORT,
    exportButtonIcon: ExportIcon,
    exportButtonIconHeight: "16px",
    mainPageContent: userPageMainComponent,
    showSearchBar: true,
    SearchbarAcion: (text) => {
      setTimeout(() => {
        console.log("userpage search", text);
      }, 300);
    },
    searchBoxPlaceholder: placeholderStrings?.SEARCH_BAR_USER_PAGE,
  };

  return <MainPage {...userPageProps} />;
};
