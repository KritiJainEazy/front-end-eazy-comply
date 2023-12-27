import React, { useEffect, useState } from "react";
import { MainPage } from "../MainPage";
import { Table } from "../../molecules/Table";
import {
  uesrTableHeader,
  userTableAppendData,
} from "../../../mockData/mockdata";
import EditIcon from "../../../assets/edit-icon.png";
import DeleteIcon from "../../../assets/delete-icon.png";
import DisableIcon from "../../../assets/disable-icon.png";
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
  REQUEST_MESSAGES,
  STATUS,
} from "../../../constants/errorCodesMessages";
import { toast } from "react-toastify";
export const UserPage = () => {
  const initialSearchSortParam = {
    term: "",
    sort: {},
  };
  for (let header in uesrTableHeader) {
    if (header?.isSortable) {
      initialSearchSortParam.sort.header = constantStrings?.ASCENDING_SORT_FLAG;
    }
  }
  const [dataSelected, setDataSelected] = useState([]);
  const [requestParams, setRequestParams] = useState(initialSearchSortParam);
  const [userTableData, setUserTableData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { makeRequestWithCSRFToken } = useCsrfToken();

  const navigate = useNavigate();

  useEffect(() => {
    console.log(requestParams, "requestParam");
  }, [requestParams]);
  useEffect(() => {
    setIsLoading(true);
    makeRequestWithCSRFToken({
      api: "/user/",
      requestType: REQUEST_TYPES?.GET,
      expectedResponseCode: ERROR_CODES?.OK,
      successMessage: REQUEST_MESSAGES?.SUCCESSFUL_FETCH?.replace(
        "$",
        constantStrings?.USERS
      ),
      failureMessage: REQUEST_MESSAGES?.SOMETHING_WENT_WRONG,
      successAction: (response) => {
        if (response?.status == ERROR_CODES?.OK) {
          toast.success(
            REQUEST_MESSAGES?.SUCCESSFUL_FETCH?.replace(
              "$",
              constantStrings?.USERS
            )
          );
        }
        console.log(response);
        setIsLoading(false);
      },
      getResponseFlag: sessionStorage
        ?.getItem("authorities")
        ?.includes(AUTHORITIES?.READUSER),
      authority: AUTHORITIES?.READUSER,
      getResponse: (response) => {
        console.log(response);
        setUserTableData(response?.result?.content);
        setIsLoading(false);
      },
      failureAction: (error) => {
        console.error(error);

        toast.error(error?.message);

        setIsLoading(false);
      },
    });
  }, []);

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
      api: "/user/alter-status",
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
        const prevRecordStatus = userData?.recordStatus;
        const updatedRecordStatus =
          prevRecordStatus == STATUS?.ACTIVE
            ? STATUS?.INACTIVE
            : STATUS?.ACTIVE;
        if (response?.status == ERROR_CODES?.OK) {
          const updatedUserData = {
            ...userData,
            recordStatus: updatedRecordStatus,
          };
          console.log("in if success");
          setUserTableData(
            userTableData?.map((user) => {
              if (userData?.id == user?.id) {
                return updatedUserData;
              } else {
                return user;
              }
            })
          );
          if (updatedRecordStatus == STATUS?.ACTIVE) {
            toast.success(
              REQUEST_MESSAGES?.SUCCESSFULLY_ENABLED?.replace(
                "$",
                constantStrings?.USERS + `\u0020${userData?.id}`
              )
            );
          } else if (updatedRecordStatus == STATUS?.INACTIVE) {
            toast.success(
              REQUEST_MESSAGES?.SUCCESSFULLY_DISABLED?.replace(
                "$",
                constantStrings?.USERS + `\u0020${userData?.id}`
              )
            );
          }
        } else {
          toast.error(REQUEST_MESSAGES?.SOMETHING_WENT_WRONG);
        }
      },
      getResponseFlag: false,
      failureAction: (error) => {
        console.error(error);
        toast.error(error?.message);
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
          toast.success(
            REQUEST_MESSAGES?.SUCCESSFULLY_DELETED?.replace(
              "$",
              constantStrings?.USERS + `\u0020${userData?.id}`
            )
          );
        } else {
          toast.error(REQUEST_MESSAGES?.SOMETHING_WENT_WRONG);
        }
      },
      getResponseFlag: false,
      authority: AUTHORITIES?.DELETEUSER,
      failureAction: (error) => {
        toast.error(error?.message);
        console.error(error);
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
  const handleSearchSortRequest = (updatedRequestParam) => {
    let api = "/user/";
    const requestParamArray = [];
    if (updatedRequestParam?.term) {
      api = api + "search";
      requestParamArray?.push({ term: updatedRequestParam?.term });
    }

    for (const sortParam in updatedRequestParam?.sort) {
      requestParamArray?.push({
        sort: `${sortParam},${updatedRequestParam?.sort[sortParam]}`,
      });
    }

    console.log(requestParamArray, "requestParamArray");

    makeRequestWithCSRFToken({
      api: api,
      requestType: REQUEST_TYPES?.GET,
      params: requestParamArray,
      successAction: (response) => {
        console.log(response);
      },
      getResponseFlag: sessionStorage
        ?.getItem("authorities")
        ?.includes(AUTHORITIES?.READUSER),
      authority: AUTHORITIES?.READUSER,
      getResponse: (response) => {
        console.log(response);
        setUserTableData(response?.result?.content);
        setIsLoading(false);
      },
      failureAction: (error) => {
        console.error(error);
        setIsLoading(false);
      },
    });
  };
  const handleSearchBarAction = (text) => {
    setRequestParams({ ...requestParams, term: text });
    handleSearchSortRequest({ ...requestParams, term: text });
  };
  const handleSortHeader = ({ headerName: headerName }) => {
    const updatedSortFlag =
      requestParams?.sort[headerName] == constantStrings?.ASCENDING_SORT_FLAG
        ? constantStrings?.DESCENDING_SORT_FLAG
        : constantStrings?.ASCENDING_SORT_FLAG;
    setRequestParams({
      ...requestParams,
      sort: { ...requestParams?.sort, [headerName]: updatedSortFlag },
    });

    handleSearchSortRequest({
      ...requestParams,
      sort: { ...requestParams?.sort, [headerName]: updatedSortFlag },
    });
  };
  const userTableActionMenu = [
    {
      src: DisableIcon,
      handler: (data) => handleDisableClick(data),
      isVisible: sessionStorage
        ?.getItem("authorities")
        ?.includes(AUTHORITIES?.DELETEUSER),
    },
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
      handleSort={handleSortHeader}
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
    SearchbarAcion: (text) => handleSearchBarAction(text),
    searchBoxPlaceholder: placeholderStrings?.SEARCH_BAR_USER_PAGE,
  };
  if (!isLoading) {
    return <MainPage {...userPageProps} />;
  }
};

//localhost:8080/base-api/v1/user/search?term=Kriti&sort=name,asc&sort=userType,desc
