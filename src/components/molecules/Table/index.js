import React, { useEffect, useState } from "react";
import {
  TableBodyContainer,
  TableRowContainer,
  TableHeaderContainer,
  TableHeaderData,
  TableRowData,
  TableContainer,
  ActionMenu,
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
import { ToggleButton } from "../ToggleButton";

export const Table = ({
  tableHeaderData = [],
  tableData = [],
  //isMoreDataAvailable = false,
  actionMenuHeaderTitle = "",
  activeStatusHeaderTitle = "",
  actionMenuContent = <ActionMenu actionMenuItems={[]} />,
  primaryKey = "",
  multiSelectCheckBox = true,
  getMultipleSelectedArray = () => void 0,
  handleToggleClick = () => void 0,
  //getMoreData = () => void 0,
}) => {
  //to change
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
    {
      title: "59 per page",
      value: "59",
      action: "",
    },

    // {
    //   title: "100 per page",
    //   value: "100",
    //   action: "",
    // },
  ];
  const entriesPerPageDropdownTitle = "Select number of entries per page";

  const noDataString = "No data available";

  // temporary code to append data upto a certain point and a fake function for the time being
  const [tempDataAppend, setTempDataAppend] = useState(0);
  const MAX_APPENDS = 2;

  let changeButtonAnswer = true;

  const MAX_PAGES_PER_PALLETE = 3;

  const PALLETE_BUTTON_STATES = {
    POINTER: "pointer",
    LOADING: "progress",
    DISABLED: "not-allowed",
  };
  const [isMoreDataAvailable, setIsMoreData] = useState(true);

  const [allSelected, setAllSelected] = useState(false);

  const [selectedIndexArray, setSelectedIndexArray] = useState([]);

  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPageNumbersPalette, setCurrentPageNumbersPalette] = useState(
    []
  );
  const [currentPage, setCurrrentPage] = useState(1);
  const [tableDataToBeShown, setTableDataToBeShown] = useState([]);
  const [forwardPalletButtonState, setForwardPalletButtonState] = useState(
    PALLETE_BUTTON_STATES?.POINTER
  );

  const [isBackPalleteButtonDisabled, setIsBackPalleteButtonDisabled] =
    useState(true);

  const initializePagePallete = () => {
    const newPageNumberPallete = [];
    let tableDataLength = tableData?.length;
    for (let i = 0; i < MAX_PAGES_PER_PALLETE && tableDataLength > 0; i++) {
      tableDataLength = tableDataLength - entriesPerPage;
      newPageNumberPallete.push(i + 1);
    }
    setCurrentPageNumbersPalette(newPageNumberPallete);
    setCurrrentPage(1);
  };
  const getMoreData = () => {
    setForwardPalletButtonState(PALLETE_BUTTON_STATES?.LOADING);
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
      // let numberOfEntriesLeftToBeDisplayed =
      //   tableData?.length - numberOfEntriesDisplayedSoFar;
      // console.log(
      //   numberOfEntriesLeftToBeDisplayed,
      //   "numberOfEntriesLeftToBeDisplayed"
      // );

      getData();

      let numberOfEntriesLeftToBeDisplayed =
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

  const checkAllSelected = () => {
    //      if(tableDataToBeShown?.length)     //not applicable on first render
    if (tableDataToBeShown?.length) {
      const firstIndex = entriesPerPage * (currentPage - 1);
      const isAllSelected = tableDataToBeShown.every((dataItem, dataIndex) => {
        console.log(
          selectedIndexArray.includes(firstIndex + dataIndex),
          "dataItem huahua"
        );
        return selectedIndexArray.includes(firstIndex + dataIndex);
      });
      console.log(isAllSelected, "huahua isAllSelected");
      console.log(selectedIndexArray, tableDataToBeShown, "huahua  hi there");

      return isAllSelected;
    }
  };

  const renderingPageData = () => {
    const pageData = [];
    const startingIndexForPage = (currentPage - 1) * entriesPerPage;
    for (let i = 0; i < entriesPerPage; i++) {
      if (!tableData[startingIndexForPage + i]) {
        break;
      }
      pageData?.push(tableData[startingIndexForPage + i]);
    }
    setTableDataToBeShown(pageData);
    setAllSelected(checkAllSelected());
  };

  const handleMultiSelect = () => {
    const firstIndex = entriesPerPage * (currentPage - 1);
    if (allSelected) {
      const currentIndices = [];
      for (let entry = 0; entry < entriesPerPage; entry++) {
        currentIndices?.push(firstIndex + entry);
      }

      setSelectedIndexArray(() => {
        return selectedIndexArray?.filter((selectedIndex) => {
          return !currentIndices?.includes(selectedIndex);
        });
      }, setAllSelected(false));
    } else {
      const allSelectedNewArray = [];
      for (let entry = 0; entry < entriesPerPage; entry++) {
        if (!selectedIndexArray?.includes(entry + firstIndex)) {
          allSelectedNewArray?.push(entry + firstIndex);
        }
      }
      setSelectedIndexArray(() => {
        return [...selectedIndexArray, ...allSelectedNewArray];
      }, setAllSelected(true));
    }
  };

  const handleCheckboxSelect = (dataIndex) => {
    const tableDataIndex = entriesPerPage * (currentPage - 1) + dataIndex; //index as in tableData
    if (selectedIndexArray?.includes(tableDataIndex)) {
      setSelectedIndexArray(
        selectedIndexArray?.filter((selectedIndex) => {
          return selectedIndex != tableDataIndex;
        })
      );
    } else {
      setSelectedIndexArray([...selectedIndexArray, tableDataIndex]);
    }
  };

  const getDataFromSelectedIndex = () => {
    const multiSelectArray = [];
    selectedIndexArray?.map((selectedItemIndex) => {
      multiSelectArray?.push(tableData[selectedItemIndex]);
    });
    return multiSelectArray;
  };
  const handleMultiSelectAction = () => {
    const multiSelectArray = getDataFromSelectedIndex();
    console.log(multiSelectArray, selectedIndexArray);
  };

  useEffect(() => {
    initializePagePallete();
    getData();
  }, []);

  //to be removed
  useEffect(() => {
    console.log(selectedIndexArray, "kajfhsgdn");

    getMultipleSelectedArray(getDataFromSelectedIndex());
  }, [selectedIndexArray]);

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

  useEffect(() => {
    renderingPageData();
  }, [currentPage]);

  useEffect(() => {
    setAllSelected(checkAllSelected());
  }, [selectedIndexArray]);

  useEffect(() => {
    initializePagePallete();
    renderingPageData();
  }, [entriesPerPage]);
  return (
    <TableBoxContainer>
      <TableContainer>
        <TableBodyContainer>
          <TableHeaderContainer>
            {multiSelectCheckBox && (
              <TableHeaderData width="4%" key={`headerItemCheckBox`}>
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
                    <CheckBoxInput
                      type={"checkbox"}
                      onChange={() => handleCheckboxSelect(dataIndex)}
                      checked={
                        selectedIndexArray?.includes(
                          dataIndex + entriesPerPage * (currentPage - 1)
                        )
                          ? true
                          : false
                      }
                    />
                  </TableRowData>
                )}

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
                          {/* <Box display="flex">
                            <ActiveStatus
                              status={dataItem[headerData?.value]}
                              mr="10px"
                            />
                            {dataItem[headerData?.value]}
                          </Box> */}
                          <ToggleButton
                            height="1rem"
                            width="2rem"
                            sliderRadius="0.5rem"
                            initialState={
                              dataItem[headerData?.value] == 1 ? true : false
                            }
                            onToggleClick={(e) => {
                              console.log(e);
                              handleToggleClick(e);
                            }}
                          />
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
          dropdownFieldBoxHeader={entriesPerPage + "\u0020 per page"}
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
