import React, { useEffect, useState } from "react";
import { MainPage } from "../MainPage";
import { Table } from "../../molecules/Table";
import {
  uesrTableHeader,
  userTableAppendData,
} from "../../../mockData/mockdata";
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
import { useCsrfToken } from "../../../utils/useCsrfToken";
import { REQUEST_TYPES } from "../../../constants/navConfig";
import {
  AUTHORITIES,
  ERROR_CODES,
} from "../../../constants/errorCodesMessages";
export const UserPage = () => {
  const [dataSelected, setDataSelected] = useState([]);
  const [userTableData, setUserTableData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { makeRequestWithCSRFToken } = useCsrfToken();

  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    const response = makeRequestWithCSRFToken({
      api: "/user/",
      requestType: REQUEST_TYPES?.GET,
      successAction: (response) => {
        console.log(response);
        setIsLoading(false);
      },
      getResponseFlag: sessionStorage
        ?.getItem("authorities")
        ?.includes(AUTHORITIES?.READUSER),
      authority: AUTHORITIES?.READUSER,
      getResponse: (response) => {
        console.log(response);
        setUserTableData(response?.content);
        setIsLoading(false);
      },
      failureAction: (error) => {
        console.error(error);
        setIsLoading(false);
      },
    });
  }, []);
  // useEffect(() => {
  //   console.log(userTableData);
  // }, [userTableData]);

  const handleHeaderButton = () => {
    navigate(NAV_CONFIG?.NAV_ADD_USER);
  };

  const getSelectedData = (data = []) => {
    setDataSelected(data);
  };

  const handleExportButton = () => {
    console.log(dataSelected, "dataSelectedfs");
    jsonToCSV(constantStrings?.USER_PAGE_EXPORT_FILENAME, userTableData);
  };
  const handleDisableClick = (userData) => {
    makeRequestWithCSRFToken({
      api: "/user/disable",
      requestType: REQUEST_TYPES?.DELETE,
      id: userData?.id,
      successAction: (response) => {
        console.log(
          {
            response: response,
            status: response?.status,
          },
          "successAction"
        );
        if (response?.status == ERROR_CODES?.OK) {
          console.log("in if success");
          setUserTableData(
            userTableData?.filter((user) => {
              return userData?.id != user?.id;
            })
          );
          alert(`Successfully disabled user id - ${userData?.id}`);
        }
      },
      getResponseFlag: false,
      failureAction: (error) => {
        console.error(error);
        alert(`Couldn't disable user id = ${userData?.id}`);
      },
    });
  };

  const handleEditClick = (userData) => {
    localStorage.setItem("editableData", JSON.stringify(userData));
    navigate(NAV_CONFIG?.NAV_EDIT_USER);
    console.log("Edit", ERROR_CODES?.NO_CONTENT);
  };
  const handleDeleteClick = (userData) => {
    console.log("Delete", userData);
    makeRequestWithCSRFToken({
      api: NAV_CONFIG?.NAV_USER_PAGE,
      requestType: REQUEST_TYPES?.DELETE,
      id: userData?.id,
      successAction: (response) => {
        console.log(
          {
            response: response,
            status: response?.status,
            error_code: ERROR_CODES?.NO_CONTENT,
          },
          "successAction"
        );
        if (response?.status == ERROR_CODES?.NO_CONTENT) {
          console.log("in if success");
          const newArray = userTableData?.filter((userData) => {
            return userData?.id != userTableData?.id;
          });
          console.log(newArray, "newArray");
          setUserTableData(
            userTableData?.filter((user) => {
              return userData?.id != user?.id;
            })
          );
          alert(`Successfully deleted user id - ${userData?.id}`);
        }
      },
      getResponseFlag: false,
      authority: AUTHORITIES?.DELETEUSER,
      failureAction: (error) => {
        console.error(error);
        alert(`Couldn't delete user id = ${userData?.id}`);
      },
    });
  };
  const handleUpdateTableData = (response) => {
    setUserTableData(
      userTableData.filter((tableItem, index) => {
        return !response.includes(tableItem["id"]);
      })
    );
  };
  const userTableActionMenu = [
    {
      src: EditIcon,
      handler: (data) => handleEditClick(data),
      isVisible: sessionStorage
        ?.getItem("authorities")
        ?.includes(AUTHORITIES?.UPDATEUSER),
    },
    {
      src: DeleteIcon,
      handler: (data) => handleDeleteClick(data),
      isVisible: sessionStorage
        ?.getItem("authorities")
        ?.includes(AUTHORITIES?.DELETEUSER),
    },
  ];
  const userPageMainComponent = (
    <Table
      tableHeaderData={uesrTableHeader}
      tableData={userTableData}
      actionMenuHeaderTitle="userActionMenu"
      activeStatusHeaderTitle="recordStatus"
      actionMenuItems={userTableActionMenu}
      getMultipleSelectedArray={getSelectedData}
      primaryKey="id"
      handleToggleClick={handleDisableClick}
      handleUpdateTableData={handleUpdateTableData}
    />
  );

  const userPageProps = {
    headerTitle: constantStrings?.USER_PAGE_HEADER_TITLE,
    handleHeaderButton: handleHeaderButton,
    showHeaderButton: sessionStorage
      ?.getItem("authorities")
      ?.includes(AUTHORITIES?.CREATEUSER),
    headerButtonTitle: constantStrings?.USER_PAGE_HEADER_BUTTON_TITLE,
    headerButtonIcon: AddIcon,
    headerButtonIconHeight: "16px",
    handleExportButton: handleExportButton,
    showExportButton: userTableData?.length ? true : false,
    exportButtonTitle: constantStrings?.EXPORT,
    exportButtonIcon: ExportIcon,
    exportButtonIconHeight: "16px",
    mainPageContent: userPageMainComponent,
    showSearchBar: true,
    SearchbarAcion: (text) => {
      makeRequestWithCSRFToken({
        api: "/user/search",
        requestType: REQUEST_TYPES?.GET,
        params: [{ term: text }],
        successAction: (response) => {
          console.log(response);
        },
        getResponseFlag: sessionStorage
          ?.getItem("authorities")
          ?.includes(AUTHORITIES?.READUSER),
        authority: AUTHORITIES?.READUSER,
        getResponse: (response) => {
          console.log(response);
          setUserTableData(response?.content);
          setIsLoading(false);
        },
        failureAction: (error) => {
          console.error(error);
          setIsLoading(false);
        },
      });
    },
    searchBoxPlaceholder: placeholderStrings?.SEARCH_BAR_USER_PAGE,
  };
  if (!isLoading) {
    return <MainPage {...userPageProps} />;
  }
};
