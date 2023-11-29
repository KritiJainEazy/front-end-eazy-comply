import React, { useEffect, useState } from "react";
import {
  TableBodyContainer,
  TableRowContainer,
  TableHeaderContainer,
  TableHeaderData,
  TableRowData,
  TableContainer,
  ActionMenu,
  ActionMenuIcons,
  TableBoxContainer,
  CheckBoxInput,
  PaginationContainer,
  PageNavigationButton,
  PageNumberContainer,
  PageButtonContainer,
} from "./styles.table";
import Box from "../../atoms/box.atom";

import { constantStrings } from "../../../constants/magicString";
import { ActiveStatus } from "../ActiveStatus";
import Dropdown from "../Dropdown";
import { userTableAppendData } from "../../../mockData/mockdata";

export const Table = ({
  tableHeaderData = [],
  tableData = [],
  //isMoreDataAvailable = false,
  actionMenuHeaderTitle = "",
  activeStatusHeaderTitle = "",
  actionMenuContent = <ActionMenu actionMenuItems={[]} />,
  primaryKey = "",
  multiSelectCheckBox = true,
  //getMoreData = () => void 0,
}) => {
  const entriesPerPageDropdownItems = [
    {
      title: "10 per page",
      value: "10",
      action: "",
    },
    {
      title: "20 per page",
      value: "20",
      action: "",
    },
    {
      title: "50 per page",
      value: "50",
      action: "",
    },
    // {
    //   title: "100 per page",
    //   value: "100",
    //   action: "",
    // },
  ];
  const entriesPerPageDropdownTitle = "Select number of entries per page";
  console.log(tableData?.length, "hisfdoi");

  const noDataString = "No data available";

  const checkForwardPaletteData = () => {};

  // temporary code to append data upto a certain point and a fake function for the time being
  const [tempDataAppend, setTempDataAppend] = useState(0);
  const MAX_APPENDS = 2;

  const MAX_PAGES_PER_PALLETE = 3;

  const PALLETE_BUTTON_STATES = {
    POINTER: "pointer",
    LOADING: "progress",
    DISABLED: "not-allowed",
  };
  const [isMoreDataAvailable, setIsMoreData] = useState(true);

  const [allSelected, setAllSelected] = useState(false); //checkbox
  const [selectedIndexArray, setSelectedIndexArray] = useState([]); //checkbox

  const [entriesPerPage, setEntriesPerPage] = useState(48); //pagination
  const [currentPageNumbersPalette, setCurrentPageNumbersPalette] = useState(
    []
  ); //pagination
  const [currentPage, setCurrrentPage] = useState(1); //pagination
  const [tableDataToBeShown, setTableDataToBeShown] = useState([]); //pagination
  const [forwardPalletButtonState, setForwardPalletButtonState] = useState(
    PALLETE_BUTTON_STATES?.POINTER
  );

  const [isBackPalleteButtonDisabled, setIsBackPalleteButtonDisabled] =
    useState(true);

  const initializePagePallete = () => {
    const newPageNumberPallete = [];
    let tableDataLength = tableData?.length;
    for (let i = 0; i < MAX_PAGES_PER_PALLETE && tableDataLength > 0; i++) {
      // if (tableDataLength / entriesPerPage > 0) {
      tableDataLength = tableDataLength - entriesPerPage;
      newPageNumberPallete.push(i + 1);
      //}
    }
    setCurrentPageNumbersPalette(newPageNumberPallete);
  };
  const getMoreData = () => {
    setForwardPalletButtonState(PALLETE_BUTTON_STATES?.LOADING);
    // const awaitFlag = setTimeout(() => {
    //   console.log("Just wasting time to get api call effect");
    //   return true;
    // }, 2000);
    // if (awaitFlag) {
    //   console.log("await flag waited");
    // }
    console.log("entering append data getMoreData");
    if (tempDataAppend <= MAX_APPENDS - 1) {
      tableData.push(...userTableAppendData);
      setTempDataAppend(tempDataAppend + 1);
      console.log("appending more data");
    }

    if (tempDataAppend > MAX_APPENDS - 1) {
      setIsMoreData(false);
    }
    setForwardPalletButtonState(PALLETE_BUTTON_STATES?.POINTER);
  };
  const getData = () => {
    const lastPage =
      currentPageNumbersPalette[currentPageNumbersPalette.length - 1];
    console.log(lastPage, "lastPage");

    const numberOfEntriesDisplayedSoFar = lastPage * entriesPerPage;
    console.log(numberOfEntriesDisplayedSoFar, "numberOfEntriesDisplayedSoFar");

    const numberOfEntriesLeftToBeDisplayed =
      tableData?.length - numberOfEntriesDisplayedSoFar;
    console.log(
      numberOfEntriesLeftToBeDisplayed,
      "numberOfEntriesLeftToBeDisplayed"
    );

    if (isMoreDataAvailable) {
      if (
        numberOfEntriesLeftToBeDisplayed <
        entriesPerPage * MAX_PAGES_PER_PALLETE
      ) {
        getMoreData();
      }
    }
  };

  useEffect(() => {
    initializePagePallete();
    getData();
  }, []);

  useEffect(() => {
    if (!isMoreDataAvailable) {
      const maxPageNumber = Math.ceil(tableData?.length / entriesPerPage);

      if (
        currentPageNumbersPalette[currentPageNumbersPalette?.length - 1] ==
        maxPageNumber
      ) {
        setForwardPalletButtonState(PALLETE_BUTTON_STATES?.DISABLED);
      } else {
        setForwardPalletButtonState(PALLETE_BUTTON_STATES?.POINTER);
      }
    }
  }, [currentPageNumbersPalette]);

  const handleMultiSelectAction = () => {
    const multiSelectArray = [];
    selectedIndexArray?.map((selectedItemIndex) => {
      multiSelectArray?.push(tableData[selectedItemIndex]);
    });
    console.log(multiSelectArray, selectedIndexArray);
  };

  const handleBackPalleteSelect = () => {
    const firstPage = currentPageNumbersPalette[0];
    if (firstPage != 1) {
      setIsBackPalleteButtonDisabled(false);
      const newPageNumberPallet = [];
      for (let i = 0; i < MAX_PAGES_PER_PALLETE; i++) {
        newPageNumberPallet.push(firstPage - MAX_PAGES_PER_PALLETE + i);
      }
      setCurrentPageNumbersPalette(newPageNumberPallet);
      setCurrrentPage(newPageNumberPallet[0]);
      if (newPageNumberPallet[0] == 1) {
        setIsBackPalleteButtonDisabled(true);
      }
    } else {
      setIsBackPalleteButtonDisabled(true);
    }

    console.log(firstPage);
  };

  const handleForwardPalleteSelect = () => {
    if (forwardPalletButtonState != PALLETE_BUTTON_STATES?.DISABLED) {
      setIsBackPalleteButtonDisabled(false);

      const lastPage =
        currentPageNumbersPalette[currentPageNumbersPalette.length - 1];
      console.log(lastPage, "lastPage");

      const numberOfEntriesDisplayedSoFar = lastPage * entriesPerPage;
      console.log(
        numberOfEntriesDisplayedSoFar,
        "numberOfEntriesDisplayedSoFar"
      );

      // to remove
      let numberOfEntriesLeftToBeDisplayed =
        tableData?.length - numberOfEntriesDisplayedSoFar;
      console.log(
        numberOfEntriesLeftToBeDisplayed,
        "numberOfEntriesLeftToBeDisplayed"
      );

      getData();

      numberOfEntriesLeftToBeDisplayed =
        tableData?.length - numberOfEntriesDisplayedSoFar;
      if (numberOfEntriesLeftToBeDisplayed > 0) {
        const newPageNumberPallet = [];

        for (
          let i = 0;
          numberOfEntriesLeftToBeDisplayed > 0 && i < MAX_PAGES_PER_PALLETE;
          i++
        ) {
          newPageNumberPallet.push(lastPage + 1 + i);
          numberOfEntriesLeftToBeDisplayed =
            numberOfEntriesLeftToBeDisplayed - entriesPerPage;
        }
        setCurrentPageNumbersPalette(newPageNumberPallet);
        setCurrrentPage(lastPage + 1);
      }
    }
  };

  const handlePageSelect = (pageNumber) => {
    setCurrrentPage(pageNumber);
  };

  const handleMultiSelect = () => {
    if (allSelected) {
      setSelectedIndexArray([]);
    } else {
      const allSelectedNewArray = [];
      const firstIndex = entriesPerPage * (currentPage - 1);
      const createAllNewSelectedArray = () => {
        for (let entry = 0; entry < entriesPerPage; entry++) {
          //allSelectedNewArray?.push((pageNumber - 1) * entriesPerPage + entry);
          allSelectedNewArray?.push(entry + firstIndex);
        }
      };
      createAllNewSelectedArray();
      setSelectedIndexArray(allSelectedNewArray);
      console.log(allSelectedNewArray, "isfk");
    }
    setAllSelected(!allSelected);
  };
  const handleCheckboxSelect = (dataIndex) => {
    if (selectedIndexArray?.includes(dataIndex)) {
      setSelectedIndexArray(
        selectedIndexArray?.filter((selectedIndexElement) => {
          return selectedIndexElement != dataIndex;
        })
      );
    } else {
      setSelectedIndexArray([...selectedIndexArray, dataIndex]);
    }
  };

  //re-rendering pagedata
  useEffect(() => {
    const pageData = [];
    const startingIndexForPage = (currentPage - 1) * entriesPerPage;
    for (let i = 0; i < entriesPerPage; i++) {
      if (!tableData[startingIndexForPage + i]) {
        break;
      }
      pageData?.push(tableData[startingIndexForPage + i]);
    }
    setTableDataToBeShown(pageData);

    setAllSelected(false);
    setSelectedIndexArray([]);
  }, [currentPage]);

  useEffect(() => {
    if (selectedIndexArray?.length == entriesPerPage) {
      setAllSelected(true);
    }
  }, [selectedIndexArray]);

  useEffect(() => {
    setCurrrentPage(1);
    //  setCurrentPageNumbersPalette([1, 2, 3]);
  }, [entriesPerPage]);
  return (
    <TableBoxContainer>
      <TableContainer>
        <TableBodyContainer>
          <TableHeaderContainer>
            {multiSelectCheckBox && (
              <TableHeaderData width="4%" key={`headerItemCheckBox`}>
                {/* <CheckBoxInput
                  onChange={handleMultiSelect}
                  checked={allSelected}
                /> */}
                <CheckBoxInput
                  type={"checkbox"}
                  onChange={handleMultiSelect}
                  checked={allSelected}
                />
              </TableHeaderData>
            )}
            {tableHeaderData.map((headerItem, index) => {
              return (
                <TableHeaderData
                  width={headerItem?.width}
                  key={`headerItem_${index}`}
                >
                  {headerItem?.title}
                </TableHeaderData>
              );
            })}
          </TableHeaderContainer>

          {tableDataToBeShown.map((dataItem, dataIndex) => {
            return (
              <TableRowContainer key={`dataItemRowCheckBox_${dataIndex}`}>
                {multiSelectCheckBox && (
                  <TableRowData key={`rowItemCheckBox${dataIndex}`}>
                    {/* <CheckBoxInput
                      onChange={() => handleCheckboxSelect(dataIndex)}
                    /> */}
                    <CheckBoxInput
                      type={"checkbox"}
                      onChange={() => handleCheckboxSelect(dataIndex)}
                      checked={
                        selectedIndexArray?.includes(dataIndex) ? true : false
                      }
                    />
                  </TableRowData>
                )}
                {/* {tableHeaderData.map((headerData, dataHeaderIndex) => {
                  if (isActionMenu) {
                    if (
                      headerData?.value != constantStrings?.TABLE_ACTION_MENU
                    ) {
                      return (
                        <TableRowData
                          key={`dataHeaderIndex_${dataHeaderIndex}`}
                          color={headerData?.value == primaryKey ? 0.6 : 0.4}
                        >
                          {dataItem[headerData?.value]}
                        </TableRowData>
                      );
                    } else {
                      return (
                        <TableRowData
                          key={`dataHeaderIndex_${dataHeaderIndex}`}
                        >
                          {actionMenuContent}
                        </TableRowData>
                      );
                    }
                  }
                  return (
                    <TableRowData key={`dataHeaderIndex_${dataHeaderIndex}`}>
                      {dataItem[headerData?.value]}
                    </TableRowData>
                  );
                })} */}
                {tableHeaderData.map((headerData, dataHeaderIndex) => {
                  switch (headerData?.value) {
                    case actionMenuHeaderTitle:
                      return (
                        <TableRowData
                          key={`dataHeaderIndex_${dataHeaderIndex}`}
                        >
                          {actionMenuContent}
                        </TableRowData>
                      );
                    case activeStatusHeaderTitle:
                      return (
                        <TableRowData
                          key={`dataHeaderIndex_${dataHeaderIndex}`}
                          display="flex"
                        >
                          <Box display="flex">
                            <ActiveStatus
                              status={dataItem[headerData?.value]}
                              mr="10px"
                            />
                            {dataItem[headerData?.value]}
                          </Box>
                        </TableRowData>
                      );
                    case primaryKey:
                      return (
                        <TableRowData
                          key={`dataHeaderIndex_${dataHeaderIndex}`}
                          color={"0.6"}
                        >
                          {dataItem[headerData?.value]}
                        </TableRowData>
                      );
                    default:
                      return (
                        <TableRowData
                          key={`dataHeaderIndex_${dataHeaderIndex}`}
                        >
                          {dataItem[headerData?.value]}
                        </TableRowData>
                      );
                  }
                })}
              </TableRowContainer>
            );
          })}
        </TableBodyContainer>
      </TableContainer>
      <PaginationContainer>
        <PageButtonContainer>
          <PageNavigationButton
            buttonState={
              isBackPalleteButtonDisabled
                ? PALLETE_BUTTON_STATES?.DISABLED
                : PALLETE_BUTTON_STATES?.POINTER
            }
            onClick={handleBackPalleteSelect}
          >
            {"<<"}
          </PageNavigationButton>

          {currentPageNumbersPalette?.map((currentPageNumber, index) => {
            return (
              <PageNumberContainer
                isSelected={currentPage == currentPageNumber}
                key={`${currentPageNumber}+${index}`}
                onClick={() => handlePageSelect(currentPageNumber)}
              >
                {currentPageNumber}
              </PageNumberContainer>
            );
          })}
          <PageNavigationButton
            buttonState={forwardPalletButtonState}
            onClick={handleForwardPalleteSelect}
          >
            {">>"}
          </PageNavigationButton>
        </PageButtonContainer>
        <Dropdown
          dropdownItems={entriesPerPageDropdownItems}
          title={entriesPerPageDropdownTitle}
          dropdownFieldBoxHeader={entriesPerPage + "per page"}
          onItemSelect={(selectedItem) =>
            setEntriesPerPage(selectedItem?.value)
          }
        />
        <btn onClick={handleMultiSelectAction}>click me</btn>
      </PaginationContainer>
    </TableBoxContainer>
  );
};

/*
Backend request - 
Backend response - {
  1. TableData to be displayed (assuming to be 500 entires per call for now)
  2. If more data is available flag (if it returns an array of less than 105 entries or if there are only 105 and not 106)
  3. Atleast 300 entries required per call, because laoding in between would be a hassle.


The default values of usestate hooks are displayed on top of the function, can be changed later
Request to be sent if search params or sorting param changes, or when more data is required.
Meanwhile, not giving user the liberty to change no. of entries per page and keeping it default for now. 
}
*/

/*

  Handled multiselect problem when changing to other page



  to do- 
  make a list of all the selected items, regardless of multiselect

*/
