import React, { useEffect, useState } from "react";
import {
  TableBodyContainer,
  TableRowContainer,
  TableHeaderContainer,
  TableHeaderData,
  TableRowData,
  TableContainer,
  TableBoxContainer,
  CheckBoxInput,
  PaginationContainer,
  PageNavigationButton,
  PageNumberContainer,
  PageButtonContainer,
  ActionMenuContainer,
  ActionMenuIcons,
} from "./styles.table";
import Box from "../../atoms/box.atom";
import { Modal } from "../Modal";
import { constantStrings } from "../../../constants/magicString";
import { ActiveStatus } from "../ActiveStatus";
import Dropdown from "../Dropdown";
import { ToggleButton } from "../ToggleButton";
import MenuIcon from "../../../assets/menu.png";
import { PopupMenu } from "../PopupMenu";

export const Table = ({
  tableHeaderData = [],
  tableData = [],
  //isMoreDataAvailable = false,
  actionMenuHeaderTitle = "",
  activeStatusHeaderTitle = "",
  actionMenuItems = [],
  //actionMenuContent = <ActionMenu actionMenuItems={[]} />,
  primaryKey = "",
  multiSelectCheckBox = true,
  getMultipleSelectedArray = () => void 0,
  handleToggleClick = () => void 0,
  handleUpdateTableData = () => void 0,
  //getMoreData = () => void 0,
}) => {
  const [isBulkMenuOpen, setIsBulkMenuOpen] = useState(false);
  //  const [tableData, setTableData] = useState(tableDataReceived);
  //console.log(tableDataReceived, "this is what we got");

  //to change
  // const entriesPerPageDropdownItems = [
  //   {
  //     title: "10 per page",
  //     value: "10",
  //     action: "",
  //   },
  //   {
  //     title: "20 per page",
  //     value: "20",
  //     action: "",
  //   },
  //   {
  //     title: "50 per page",
  //     value: "50",
  //     action: "",
  //   },
  //   {
  //     title: "59 per page",
  //     value: "59",
  //     action: "",
  //   },

  //   // {
  //   //   title: "100 per page",
  //   //   value: "100",
  //   //   action: "",
  //   // },
  // ];
  // const entriesPerPageDropdownTitle = "Select number of entries per page";

  const noDataString = "No data available";

  // temporary code to append data upto a certain point and a fake function for the time being
  // const [tempDataAppend, setTempDataAppend] = useState(0);
  // const MAX_APPENDS = 2;

  // const MAX_PAGES_PER_PALLETE = 3;

  // const PALLETE_BUTTON_STATES = {
  //   POINTER: "pointer",
  //   LOADING: "progress",
  //   DISABLED: "not-allowed",
  // // };
  // const [isMoreDataAvailable, setIsMoreData] = useState(true);

  const [allSelected, setAllSelected] = useState(false);

  const [selectedIndexArray, setSelectedIndexArray] = useState([]);

  // const [entriesPerPage, setEntriesPerPage] = useState(10);
  // const [currentPageNumbersPalette, setCurrentPageNumbersPalette] = useState(
  //   []
  // );
  // const [currentPage, setCurrrentPage] = useState(1);
  // const [tableDataToBeShown, setTableDataToBeShown] = useState([]);
  // const [forwardPalletButtonState, setForwardPalletButtonState] = useState(
  //   PALLETE_BUTTON_STATES?.POINTER
  // );

  // const [isBackPalleteButtonDisabled, setIsBackPalleteButtonDisabled] =
  //   useState(true);

  // const initializePagePallete = () => {
  //   const newPageNumberPallete = [];
  //   let tableDataLength = tableData?.length;
  //   for (let i = 0; i < MAX_PAGES_PER_PALLETE && tableDataLength > 0; i++) {
  //     tableDataLength = tableDataLength - entriesPerPage;
  //     newPageNumberPallete.push(i + 1);
  //   }
  //   setCurrentPageNumbersPalette(newPageNumberPallete);
  //   setCurrrentPage(1);
  // };
  // const getMoreData = () => {
  //   setForwardPalletButtonState(PALLETE_BUTTON_STATES?.LOADING);
  //   if (tempDataAppend <= MAX_APPENDS - 1) {
  //     tableData.push(...userTableAppendData);
  //     setTempDataAppend(tempDataAppend + 1);
  //   }

  //   if (tempDataAppend > MAX_APPENDS - 1) {
  //     setIsMoreData(false);
  //   }
  //   setForwardPalletButtonState(PALLETE_BUTTON_STATES?.POINTER);
  // };
  // const getData = () => {
  //   const lastPage =
  //     currentPageNumbersPalette[currentPageNumbersPalette.length - 1];

  //   const numberOfEntriesDisplayedSoFar = lastPage * entriesPerPage;

  //   const numberOfEntriesLeftToBeDisplayed =
  //     tableData?.length - numberOfEntriesDisplayedSoFar;

  //   if (isMoreDataAvailable) {
  //     if (
  //       numberOfEntriesLeftToBeDisplayed <
  //       entriesPerPage * MAX_PAGES_PER_PALLETE
  //     ) {
  //       getMoreData();
  //     }
  //   }
  // };

  // const handleBackPalleteSelect = () => {
  //   const firstPage = currentPageNumbersPalette[0];
  //   if (firstPage != 1) {
  //     setIsBackPalleteButtonDisabled(false);
  //     const newPageNumberPallet = [];
  //     for (let i = 0; i < MAX_PAGES_PER_PALLETE; i++) {
  //       newPageNumberPallet.push(firstPage - MAX_PAGES_PER_PALLETE + i);
  //     }
  //     setCurrentPageNumbersPalette(newPageNumberPallet);
  //     setCurrrentPage(newPageNumberPallet[0]);
  //     if (newPageNumberPallet[0] == 1) {
  //       setIsBackPalleteButtonDisabled(true);
  //     }
  //   } else {
  //     setIsBackPalleteButtonDisabled(true);
  //   }
  // };

  // const handleForwardPalleteSelect = () => {
  //   if (forwardPalletButtonState != PALLETE_BUTTON_STATES?.DISABLED) {
  //     setIsBackPalleteButtonDisabled(false);

  //     const lastPage =
  //       currentPageNumbersPalette[currentPageNumbersPalette.length - 1];

  //     const numberOfEntriesDisplayedSoFar = lastPage * entriesPerPage;

  //     getData();

  //     let numberOfEntriesLeftToBeDisplayed =
  //       tableData?.length - numberOfEntriesDisplayedSoFar;
  //     if (numberOfEntriesLeftToBeDisplayed > 0) {
  //       const newPageNumberPallet = [];

  //       for (
  //         let i = 0;
  //         numberOfEntriesLeftToBeDisplayed > 0 && i < MAX_PAGES_PER_PALLETE;
  //         i++
  //       ) {
  //         newPageNumberPallet.push(lastPage + 1 + i);
  //         numberOfEntriesLeftToBeDisplayed =
  //           numberOfEntriesLeftToBeDisplayed - entriesPerPage;
  //       }
  //       setCurrentPageNumbersPalette(newPageNumberPallet);
  //       setCurrrentPage(lastPage + 1);
  //     }
  //   }
  // };

  // const handlePageSelect = (pageNumber) => {
  //   setCurrrentPage(pageNumber);
  // };

  const checkAllSelected = () => {
    //      if(tableDataToBeShown?.length)     //not applicable on first render
    if (tableData?.length) {
      // const firstIndex = entriesPerPage * (currentPage - 1);
      const isAllSelected = tableData.every((dataItem, dataIndex) => {
        return selectedIndexArray.includes(dataIndex);
      });

      return isAllSelected;
    }
  };

  // const renderingPageData = () => {
  //   const pageData = [];
  //   const startingIndexForPage = (currentPage - 1) * entriesPerPage;
  //   for (let i = 0; i < entriesPerPage; i++) {
  //     if (!tableData[startingIndexForPage + i]) {
  //       break;
  //     }
  //     pageData?.push(tableData[startingIndexForPage + i]);
  //   }
  //   setTableDataToBeShown(pageData);
  //   setAllSelected(checkAllSelected());
  // };

  const handleMultiSelect = () => {
    //  const firstIndex = entriesPerPage * (currentPage - 1);
    if (allSelected) {
      // const currentIndices = [];
      // for (let entry = 0; entry < entriesPerPage; entry++) {
      //   currentIndices?.push(firstIndex + entry);
      // }

      // setSelectedIndexArray(() => {
      //   return selectedIndexArray?.filter((selectedIndex) => {
      //     return !currentIndices?.includes(selectedIndex);
      //   });
      // }, setAllSelected(false));
      setAllSelected(false);
      setSelectedIndexArray([]);
    } else {
      // const allSelectedNewArray = [];
      // for (let entry = 0; entry < entriesPerPage; entry++) {
      //   if (!selectedIndexArray?.includes(entry + firstIndex)) {
      //     allSelectedNewArray?.push(entry + firstIndex);
      //   }
      // }
      // setSelectedIndexArray(() => {
      //   return [...selectedIndexArray, ...allSelectedNewArray];
      // }, setAllSelected(true));
      setAllSelected(true);
      const allSelectedNewArray = [];
      for (let entry = 0; entry < tableData?.length; entry++) {
        if (!selectedIndexArray?.includes(entry)) {
          allSelectedNewArray?.push(entry);
        }
      }
      setSelectedIndexArray(() => {
        return [...selectedIndexArray, ...allSelectedNewArray];
      });
    }
  };

  const handleCheckboxSelect = (dataIndex) => {
    // const tableDataIndex = entriesPerPage * (currentPage - 1) + dataIndex; //index as in tableData
    if (selectedIndexArray?.includes(dataIndex)) {
      setSelectedIndexArray(
        selectedIndexArray?.filter((selectedIndex) => {
          return selectedIndex != dataIndex;
        })
      );
    } else {
      setSelectedIndexArray([...selectedIndexArray, dataIndex]);
    }
  };

  const handleBulkMenuAction = () => {
    setIsBulkMenuOpen(!isBulkMenuOpen);
    console.log("bulk menu");
  };

  // const handleUpdateTableData = (response) => {
  //   if (response.ok) {
  //     setSelectedIndexArray([]);
  //     setTableData(
  //       tableData.filter((tableItem, index) => {
  //         return !response.ids.includes(tableItem[primaryKey]);
  //       })
  //     );
  //   }
  // };

  const getDataFromSelectedIndex = () => {
    const multiSelectArray = [];
    selectedIndexArray?.map((selectedItemIndex) => {
      multiSelectArray?.push(tableData[selectedItemIndex][primaryKey]);
    });
    return JSON.stringify(multiSelectArray);
  };
  // const handleMultiSelectAction = () => {
  //   const multiSelectArray = getDataFromSelectedIndex();
  //   console.log(multiSelectArray, selectedIndexArray);
  // };

  // useEffect(() => {
  //   initializePagePallete();
  //   getData();
  // }, []);

  //to be removed
  // useEffect(() => {
  //   getMultipleSelectedArray(getDataFromSelectedIndex());
  // }, [selectedIndexArray]);

  // useEffect(() => {
  //   if (!isMoreDataAvailable) {
  //     const maxPageNumber = Math.ceil(tableData?.length / entriesPerPage);

  //     if (
  //       currentPageNumbersPalette[currentPageNumbersPalette?.length - 1] ==
  //       maxPageNumber
  //     ) {
  //       setForwardPalletButtonState(PALLETE_BUTTON_STATES?.DISABLED);
  //     } else {
  //       setForwardPalletButtonState(PALLETE_BUTTON_STATES?.POINTER);
  //     }
  //   }
  // }, [currentPageNumbersPalette]);

  // useEffect(() => {
  //   renderingPageData();
  // }, [currentPage]);

  useEffect(() => {
    setAllSelected(checkAllSelected());
  }, [selectedIndexArray]);

  // useEffect(() => {
  //   initializePagePallete();
  //   renderingPageData();
  // }, [entriesPerPage]);
  return (
    <TableBoxContainer>
      {tableData?.length ? (
        <TableContainer>
          <PopupMenu
            display={isBulkMenuOpen ? "block" : "none"}
            selectedData={getDataFromSelectedIndex()}
            updateTableData={(response) => {
              if (response.ok) {
                setSelectedIndexArray([]);
                handleUpdateTableData(response.ids);
              }
            }}
          />
          <TableBodyContainer>
            <TableHeaderContainer>
              {multiSelectCheckBox && (
                <TableHeaderData width="2%" key={`headerItemCheckBox`}>
                  <CheckBoxInput
                    type={"checkbox"}
                    onChange={handleMultiSelect}
                    checked={allSelected}
                  />
                </TableHeaderData>
              )}
              {tableHeaderData.map((headerItem, index) => {
                switch (headerItem?.value) {
                  case actionMenuHeaderTitle:
                    return (
                      <>
                        <TableHeaderData
                          width={headerItem?.width}
                          key={`headerItem_${index}`}
                          onClick={handleBulkMenuAction}
                          cursor="pointer"
                          position="relative"
                        >
                          <img src={MenuIcon} height="15rem" cursor="pointer" />
                          {/* <Modal
                          position="absolute"
                          width="5rem"
                          height="5rem"
                          showModalTitle={false}
                          modalContent={<Box backgroundColor="red">hi</Box>}
                          showCloseButton={false}
                          backgroundFade={false}
                        /> */}
                        </TableHeaderData>
                      </>
                    );
                  default:
                    return (
                      <TableHeaderData
                        width={headerItem?.width}
                        key={`headerItem_${index}`}
                      >
                        {headerItem?.title}
                      </TableHeaderData>
                    );
                }
              })}
            </TableHeaderContainer>

            {tableData.map((dataItem, dataIndex) => {
              return (
                <TableRowContainer key={`dataItemRowCheckBox_${dataIndex}`}>
                  {multiSelectCheckBox && (
                    <TableRowData key={`rowItemCheckBox${dataIndex}`}>
                      <CheckBoxInput
                        type={"checkbox"}
                        onChange={() => handleCheckboxSelect(dataIndex)}
                        checked={
                          selectedIndexArray?.includes(dataIndex) ? true : false
                        }
                      />
                    </TableRowData>
                  )}

                  {tableHeaderData.map((headerData, dataHeaderIndex) => {
                    switch (headerData?.value) {
                      case actionMenuHeaderTitle:
                        return (
                          <>
                            <TableRowData
                              key={`dataHeaderIndex_${dataHeaderIndex}`}
                            >
                              <ActionMenuContainer>
                                {actionMenuItems.map(
                                  (actionMenuItem, index) => {
                                    if (actionMenuItem?.isVisible) {
                                      return (
                                        <ActionMenuIcons
                                          key={`action-menu-index-${index}`}
                                          src={actionMenuItem?.src}
                                          onClick={() =>
                                            actionMenuItem?.handler(dataItem)
                                          }
                                        />
                                      );
                                    }
                                  }
                                )}
                              </ActionMenuContainer>
                            </TableRowData>
                          </>
                        );
                      case activeStatusHeaderTitle:
                        return (
                          <TableRowData
                            key={`dataHeaderIndex_${dataHeaderIndex}`}
                            display="flex"
                          >
                            <ToggleButton
                              height="1rem"
                              width="2rem"
                              sliderRadius="0.5rem"
                              initialState={
                                dataItem[headerData?.value] == 1 ? true : false
                              }
                              onToggleClick={(e) => {
                                handleToggleClick(dataItem);
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
                            {dataItem[headerData?.value] || constantStrings?.NA}
                          </TableRowData>
                        );
                    }
                  })}
                </TableRowContainer>
              );
            })}
          </TableBodyContainer>
        </TableContainer>
      ) : (
        <Box> {constantStrings?.OOPS_NO_DATA}</Box>
      )}

      {/* <PaginationContainer>
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
      </PaginationContainer> */}
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
