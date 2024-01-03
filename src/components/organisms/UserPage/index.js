import React, { useEffect, useReducer, useState } from "react";
import { MainPage } from "../MainPage";
import { Table } from "../../molecules/Table";
import {
  userTableHeader,
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
  ADVANCED_SEARCH_MENU_OPTIONS,
  STATUS_DROPDOWN,
  USER_TYPE_DROPWDOWN,
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
import { AdvancedSearchModal } from "../../molecules/AdvancedSearchModal";

export const UserPage = () => {
  // const entriesPerPage = 3;
  // const [pageNumber, setPageNumber] = useState(1);
  const [isClearButtonDisabled, setIsClearButtonDisabled] = useState(true);
  const [isApplyFilterDisabled, setIsApplyFilterDisabled] = useState(true);

  const initialAdvancedSearchResponse = {
    firstName: "",
    lastName: "",
    name: "",
    email: "",
    userType: "",
    recordStatus: "",
  };

  const ACTIONS = {
    UPDATE_FIRST_NAME: "updateFirstName",
    UPDATE_LAST_NAME: "updateLastName",
    UPDATE_NAME: "updateName",
    UPDATE_EMAIL: "updateEmail",
    UPDATE_USER_TYPE: "updateUserType",
    UPDATE_RECORD_STATUS: "updateRecordStatus",
    RESEST_STATE: "reset",
  };

  const advancedSearchFormReducer = (state, action) => {
    switch (action?.type) {
      case ACTIONS?.UPDATE_FIRST_NAME:
        return { ...state, firstName: action?.payload?.value?.trim() };
      case ACTIONS?.UPDATE_LAST_NAME:
        return { ...state, lastName: action?.payload?.value?.trim() };
      case ACTIONS?.UPDATE_NAME:
        return { ...state, name: action?.payload?.value?.trim() };
      case ACTIONS?.UPDATE_EMAIL:
        return { ...state, email: action?.payload?.value?.trim() };
      case ACTIONS?.UPDATE_USER_TYPE:
        return { ...state, userType: action?.payload?.value };
      case ACTIONS?.UPDATE_RECORD_STATUS:
        return { ...state, recordStatus: action?.payload?.value };
      case ACTIONS?.RESEST_STATE:
        return initialAdvancedSearchResponse;
    }
  };
  const [advancedFormResponseState, advancedFormResponseDispatch] = useReducer(
    advancedSearchFormReducer,
    initialAdvancedSearchResponse
  );

  useEffect(() => {
    console.log(advancedFormResponseState, "advancedFormResponseState");
    if (
      JSON.stringify(advancedFormResponseState) ==
      JSON.stringify(initialAdvancedSearchResponse)
    ) {
      setIsApplyFilterDisabled(true);
      setIsClearButtonDisabled(true);
    } else {
      setIsApplyFilterDisabled(false);
      setIsClearButtonDisabled(false);
    }
  }, [advancedFormResponseState]);

  const OFFSET_SIZE_FOR_REQUEST = 150;
  const initialSearchSortParam = {
    term: "",
    sort: {},
  };
  const initialAscendingHeaders = [];
  for (let header in userTableHeader) {
    if (userTableHeader[header]?.isSortable) {
      initialSearchSortParam.sort[userTableHeader[header]] =
        userTableHeader[header]?.sortType;
      if (
        userTableHeader[header]?.sortType ==
        constantStrings?.ASCENDING_SORT_FLAG
      ) {
        initialAscendingHeaders?.push(userTableHeader[header]?.value);
      }
    }
  }

  const [ascendingDataHeaders, setAscendingDataHeaders] = useState(
    initialAscendingHeaders
  );

  useEffect(() => {
    console.log(
      ascendingDataHeaders,

      "ascendingDataHeaders only   let's check the issue with this"
    );
  }, [ascendingDataHeaders]);

  const [dataSelected, setDataSelected] = useState([]);
  const [requestParams, setRequestParams] = useState(initialSearchSortParam);
  const [userTableData, setUserTableData] = useState([]);
  const [totalElements, setTotalElements] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { makeRequestWithCSRFToken } = useCsrfToken();

  const navigate = useNavigate();

  useEffect(() => {
    let requestParamArray = { sort: {} };
    const ascendignDataUserHeaders = [];
    for (let header in userTableHeader) {
      if (userTableHeader[header]?.isSortable) {
        const headerName = userTableHeader[header]?.value;
        const headerSortType = userTableHeader[header]?.sortType;
        requestParamArray = {
          ...requestParamArray,
          sort: { ...requestParamArray?.sort, [headerName]: headerSortType },
        };
        setRequestParams(requestParamArray);
        ascendignDataUserHeaders?.push(userTableHeader[header]?.value);
      }
    }
    console.log(ascendignDataUserHeaders, "ascendingDataHeaders chal ja");

    setIsLoading(true);
    handleSearchSortRequest(requestParamArray);
    // makeRequestWithCSRFToken({
    //   api: "/user/",
    //   requestType: REQUEST_TYPES?.GET,
    //   expectedResponseCode: ERROR_CODES?.OK,
    //   successAction: (response) => {
    //     if (response?.status == ERROR_CODES?.OK) {
    //       toast.success(
    //         REQUEST_MESSAGES?.SUCCESSFUL_FETCH?.replace(
    //           "$",
    //           constantStrings?.USERS
    //         )
    //       );
    //     }
    //     console.log(response);
    //     setIsLoading(false);
    //   },
    //   getResponseFlag: sessionStorage
    //     ?.getItem("authorities")
    //     ?.includes(AUTHORITIES?.READUSER),
    //   authority: AUTHORITIES?.READUSER,
    //   getResponse: (response) => {
    //     console.log(response);
    //     setUserTableData(response?.result?.content);
    //     setAscendingDataHeaders(ascendingDataHeaders);
    //     setIsLoading(false);
    //   },
    //   failureAction: (error) => {
    //     console.error(error);

    //     toast.error(error?.message);

    //     setIsLoading(false);
    //   },
    // });
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
          setTotalElements(totalElements - 1);
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
    setTotalElements(totalElements - response?.length);
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

    requestParamArray?.push({ size: OFFSET_SIZE_FOR_REQUEST });

    console.log(
      requestParamArray,
      "requestParamArray let's check the issue with this"
    );

    makeRequestWithCSRFToken({
      api: api,
      requestType: REQUEST_TYPES?.GET,
      params: requestParamArray,
      // pageNumber: pageNumber,
      // offset: entriesPerPage,
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
        setTotalElements(response?.result?.totalElements);
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
  const handleSortHeader = ({ headerName = "" }) => {
    const updatedSortFlag =
      requestParams?.sort[headerName] == constantStrings?.ASCENDING_SORT_FLAG
        ? constantStrings?.DESCENDING_SORT_FLAG
        : constantStrings?.ASCENDING_SORT_FLAG;

    console.log(
      {
        headerName: headerName,
        updatedSortFlag: updatedSortFlag,
        prevSortFlag: requestParams?.sort[headerName],
      },
      "let's check the issue with this"
    );
    if (ascendingDataHeaders?.includes(headerName)) {
      console.log("entered if let's check the issue with this");
      setAscendingDataHeaders(
        ascendingDataHeaders?.filter((header) => {
          return header != headerName;
        })
      );
    } else {
      console.log("entered else let's check the issue with this");
      setAscendingDataHeaders([...ascendingDataHeaders, headerName]);
    }

    // handleSearchSortRequest({
    //   ...requestParams,
    //   sort: { ...requestParams?.sort, [headerName]: updatedSortFlag },
    //   //   sort: { [headerName]: updatedSortFlag },
    // });
    const sortHeadersOrderObject = Object.assign(
      { [headerName]: "" },
      { ...requestParams?.sort, [headerName]: updatedSortFlag }
    );

    setRequestParams({
      ...requestParams,
      sort: sortHeadersOrderObject,
    });
    console.log(
      {
        sortHeadersOrderObject: sortHeadersOrderObject,
        requestSentParam: {
          ...requestParams,
          sort: sortHeadersOrderObject,
        },
      },
      "let's check the issue with this"
    );

    handleSearchSortRequest({
      ...requestParams,
      sort: sortHeadersOrderObject,
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
  const isActionMenuVisible = userTableActionMenu.some((actionItem) => {
    return actionItem?.isVisible === true;
  });
  const userPageMainComponent = (
    <Table
      isActionMenuVisible={isActionMenuVisible}
      isMultiSelectCheckBoxVisible={sessionStorage
        ?.getItem("authorities")
        ?.includes(AUTHORITIES?.DELETEUSER)}
      tableHeaderData={userTableHeader}
      tableDataReceived={userTableData}
      actionMenuHeaderTitle="userActionMenu"
      activeStatusHeaderTitle="recordStatus"
      actionMenuItems={userTableActionMenu}
      getMultipleSelectedArray={getSelectedData}
      primaryKey="id"
      ascendingHeaders={ascendingDataHeaders}
      handleUpdateTableData={handleUpdateTableData}
      handleSort={handleSortHeader}
      totalRecords={totalElements}
      updateTableData={() => void 0}
    />
  );

  const advancedSearchMenuItems = [
    {
      type: ADVANCED_SEARCH_MENU_OPTIONS?.TEXT,
      header: "First Name",
      value: "firstName",
      textboxProps: {
        validationCheck: () => void 0,
        onPayloadChange: (firstNamePayload) => {
          advancedFormResponseDispatch({
            type: ACTIONS?.UPDATE_FIRST_NAME,
            payload: firstNamePayload,
          });
        },
      },
      onChangeFunction: "",
    },
    {
      type: ADVANCED_SEARCH_MENU_OPTIONS?.TEXT,
      header: "Last Name",
      value: "lastName",
      textboxProps: {
        validationCheck: () => void 0,
        onPayloadChange: (lastNamePayload) => {
          advancedFormResponseDispatch({
            type: ACTIONS?.UPDATE_LAST_NAME,
            payload: lastNamePayload,
          });
        },
      },
      onChangeFunction: "",
    },
    {
      type: ADVANCED_SEARCH_MENU_OPTIONS?.TEXT,
      header: "User Name",
      value: "name",
      textboxProps: {
        validationCheck: () => void 0,
        onPayloadChange: (namePayload) => {
          advancedFormResponseDispatch({
            type: ACTIONS?.UPDATE_NAME,
            payload: namePayload,
          });
        },
      },
      onChangeFunction: "",
    },
    {
      type: ADVANCED_SEARCH_MENU_OPTIONS?.TEXT,
      header: "Email",
      value: "email",
      textboxProps: {
        validationCheck: () => void 0,
        onPayloadChange: (emailPayload) => {
          advancedFormResponseDispatch({
            type: ACTIONS?.UPDATE_EMAIL,
            payload: emailPayload,
          });
        },
      },
      onChangeFunction: "",
    },
    {
      type: ADVANCED_SEARCH_MENU_OPTIONS?.DROPDOWN,
      header: "Status",
      value: "recordStatus",
      dropdownProps: {
        width: "100%",
        onItemSelect: (statusPayload) => {
          advancedFormResponseDispatch({
            type: ACTIONS?.UPDATE_RECORD_STATUS,
            payload: statusPayload,
          });
        },
        dropdownItems: STATUS_DROPDOWN,
      },
      onChangeFunction: "",
    },
    {
      type: ADVANCED_SEARCH_MENU_OPTIONS?.DROPDOWN,
      header: "User Type",
      value: "userType",
      dropdownProps: {
        width: "100%",
        onItemSelect: (userTypePayload) => {
          advancedFormResponseDispatch({
            type: ACTIONS?.UPDATE_USER_TYPE,
            payload: userTypePayload,
          });
        },
        dropdownItems: USER_TYPE_DROPWDOWN,
      },
      onChangeFunction: "",
    },
    // {
    //   type: ADVANCED_SEARCH_MENU_OPTIONS?.DATE,
    //   header: "Created between",
    //   value: "createdOn",
    //   textboxProps: {
    //     validationCheck: () => void 0,
    //     onPayloadChange: () => void 0,
    //   },
    //   onChangeFunction: "",
    // },
  ];

  const handleApplyFilterButtonClick = () => {};
  const handleClearButtonClick = () => {
    advancedFormResponseDispatch({
      type: ACTIONS?.RESEST_STATE,
    });
  };

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
    showAdvancedSearch: true,
    handleAdvancedSearch: () => void 0,
    advancedSearchMenuItems: advancedSearchMenuItems,
    isClearButtonDisabled: isClearButtonDisabled,
    isApplyFilterDisabled: isApplyFilterDisabled,
    handleApplyFilterButtonClick: handleApplyFilterButtonClick,
    handleClearButtonClick: handleClearButtonClick,
    advancedSearchValues: advancedFormResponseState,
  };
  if (!isLoading) {
    return <MainPage {...userPageProps} />;
  }
};

//localhost:8080/base-api/v1/user/search?term=Kriti&sort=name,asc&sort=userType,desc
