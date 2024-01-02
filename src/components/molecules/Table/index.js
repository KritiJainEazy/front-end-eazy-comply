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
import SortAscendingIcon from "../../../assets/sort-asc-icon.png";
import SortDescendingIcon from "../../../assets/sort-desc-icon.png";
import MenuIcon from "../../../assets/menu.png";
import { PopupMenu } from "../PopupMenu";

export const Table = ({
  tableHeaderData = [],
  totalRecords = "",
  tableDataReceived = [],
  isActionMenuVisible = false,
  actionMenuHeaderTitle = "",
  activeStatusHeaderTitle = "",
  actionMenuItems = [],
  primaryKey = "",
  isMultiSelectCheckBoxVisible = true,
  getMultipleSelectedArray = () => void 0,
  handleUpdateTableData = () => void 0,
  handleSort = () => void 0,
  ascendingHeaders = [],
  getMoreData = () => void 0,
  updateTableData = () => void 0,
}) => {
  const PALLETE_BUTTON_STATES = {
    POINTER: "pointer",
    LOADING: "progress",
    DISABLED: "not-allowed",
  };
  const FIRST_PAGE = 1;
  const MAX_PAGES_PER_PALLETE = 3;
  const entriesPerPageDropdownItems = [
    {
      title: "2 per page",
      value: 2,
      action: "",
    },
    {
      title: "5 per page",
      value: 5,
      action: "",
    },
    {
      title: "10 per page",
      value: 10,
      action: "",
    },
    {
      title: "20 per page",
      value: 20,
      action: "",
    },
    {
      title: "50 per page",
      value: 50,
      action: "",
    },
  ];
  const entriesPerPageDropdownTitle = "Select number of entries per page";

  const [isBulkMenuOpen, setIsBulkMenuOpen] = useState(false);
  const [tableData, setTableData] = useState(tableDataReceived);
  const [tableDataToBeShown, setTableDataToBeShown] = useState([]);
  const [entriesPerPage, setEntriesPerPage] = useState(2);
  const [currentPage, setCurrrentPage] = useState(FIRST_PAGE);
  const [totalPages, setTotalPages] = useState(
    Math.ceil(totalRecords / entriesPerPage)
  );
  const [currentPageNumbersPalette, setCurrentPageNumbersPalette] = useState(
    []
  );
  const [forwardPalletButtonState, setForwardPalletButtonState] = useState(
    PALLETE_BUTTON_STATES?.POINTER
  );
  const [isBackPalleteButtonDisabled, setIsBackPalleteButtonDisabled] =
    useState(true);
  const [isMoveToFirstPageButtonDisabled, setIsMoveToFirstPageButtonDisabled] =
    useState(true);
  const [isMoveToLastPageButtonState, setIsMoveToLastPageButtonState] =
    useState(PALLETE_BUTTON_STATES?.POINTER);
  const [allSelected, setAllSelected] = useState(false);
  const [selectedIndexArray, setSelectedIndexArray] = useState([]);

  const setTableDataToShow = (currPage = currentPage) => {
    const recordsDisplayedSoFar = (currPage - 1) * entriesPerPage;
    const firstIndexOfPage = recordsDisplayedSoFar;
    const lastIndexOfPage =
      totalRecords - recordsDisplayedSoFar > entriesPerPage
        ? firstIndexOfPage + entriesPerPage - 1
        : totalRecords - 1;
    const currentTableData = [];
    for (let i = firstIndexOfPage; i <= lastIndexOfPage; i++) {
      currentTableData?.push(tableData[i]);
    }

    setTableDataToBeShown(currentTableData);
  };

  const setPagePalette = () => {
    const firstPageInPalette = FIRST_PAGE;

    const pagesLeftToBeDisplayed = totalPages;

    const paletteSize =
      pagesLeftToBeDisplayed < MAX_PAGES_PER_PALLETE
        ? pagesLeftToBeDisplayed
        : MAX_PAGES_PER_PALLETE;

    const newPageNumberPallete = [];
    for (let i = 0; i < paletteSize; i++) {
      newPageNumberPallete.push(i + firstPageInPalette);
    }
    setCurrentPageNumbersPalette(newPageNumberPallete);
    setCurrrentPage(newPageNumberPallete[0]);
    setTableDataToShow(newPageNumberPallete[0]);
  };
  const checkForwardButtonDisabled = () => {};

  const getData = () => {
    const lastPage =
      currentPageNumbersPalette[currentPageNumbersPalette.length - 1];

    const numberOfEntriesDisplayedSoFar = lastPage * entriesPerPage;

    const numberOfEntriesLeftToBeDisplayed =
      tableData?.length - numberOfEntriesDisplayedSoFar;

    // if (isMoreDataAvailable) {
    //   if (
    //     numberOfEntriesLeftToBeDisplayed <
    //     entriesPerPage * MAX_PAGES_PER_PALLETE
    //   ) {
    //     getMoreData();
    //   }
    // }
  };

  const handleBackPalleteSelect = () => {
    if (!isBackPalleteButtonDisabled) {
      const firstPage = currentPageNumbersPalette[0];

      if (currentPageNumbersPalette?.includes(currentPage - 1)) {
        setCurrrentPage(currentPage - 1);
      } else {
        const newPageNumberPallete = currentPageNumbersPalette;
        newPageNumberPallete?.unshift(firstPage - 1);
        newPageNumberPallete?.pop();
        setCurrentPageNumbersPalette(newPageNumberPallete);
        setCurrrentPage(currentPage - 1);
      }
    }
  };

  const handleForwardPalleteSelect = () => {
    if (forwardPalletButtonState != PALLETE_BUTTON_STATES?.DISABLED) {
      const lastPage =
        currentPageNumbersPalette[currentPageNumbersPalette?.length - 1];

      if (currentPageNumbersPalette?.includes(currentPage + 1)) {
        setCurrrentPage(currentPage + 1);
      } else {
        const newPageNumberPallete = currentPageNumbersPalette;
        newPageNumberPallete?.push(lastPage + 1);
        newPageNumberPallete?.shift();

        setCurrentPageNumbersPalette(newPageNumberPallete);
        setCurrrentPage(currentPage + 1);
      }
    }
  };

  const handleMoveToFirstPage = () => {
    if (!isMoveToFirstPageButtonDisabled) {
      setPagePalette();
    }
  };

  const handleMoveToLastPage = () => {
    if (isMoveToLastPageButtonState == PALLETE_BUTTON_STATES?.POINTER) {
      const newPageNumberPallete = [];
      const newCurrentPage = totalPages;
      newPageNumberPallete?.push(totalPages);

      for (let i = 1; i < MAX_PAGES_PER_PALLETE && totalPages - i > 0; i++) {
        newPageNumberPallete?.unshift(totalPages - i);
      }

      setCurrentPageNumbersPalette(newPageNumberPallete);
      setCurrrentPage(newPageNumberPallete[newPageNumberPallete?.length - 1]);
    }
  };

  const handlePageSelect = (pageNumber) => {
    setCurrrentPage(pageNumber);
  };

  const checkAllSelected = () => {
    if (tableData?.length) {
      // const firstIndex = entriesPerPage * (currentPage - 1);
      const isAllSelected = tableData.every((dataItem, dataIndex) => {
        return selectedIndexArray.includes(dataIndex);
      });

      return isAllSelected;
    }
  };

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

  const handleCheckboxSelect = (dataItemId) => {
    // const tableDataIndex = entriesPerPage * (currentPage - 1) + dataIndex; //index as in tableData
    if (selectedIndexArray?.includes(dataItemId)) {
      setSelectedIndexArray(
        selectedIndexArray?.filter((selectedIndex) => {
          return selectedIndex != dataItemId;
        })
      );
    } else {
      setSelectedIndexArray([...selectedIndexArray, dataItemId]);
    }
  };

  const handleBulkMenuAction = () => {
    setIsBulkMenuOpen(!isBulkMenuOpen);
  };

  const getDataFromSelectedIndex = () => {
    const multiSelectArray = [];
    selectedIndexArray?.map((selectedItemIndex) => {
      multiSelectArray?.push(tableData[selectedItemIndex][primaryKey]);
    });
    return JSON.stringify(multiSelectArray);
  };

  useEffect(() => {
    setTableDataToShow(currentPage);
    if (currentPage == totalPages) {
      setIsMoveToLastPageButtonState(PALLETE_BUTTON_STATES?.DISABLED);
      setForwardPalletButtonState(PALLETE_BUTTON_STATES?.DISABLED);
    } else {
      setIsMoveToLastPageButtonState(PALLETE_BUTTON_STATES?.POINTER);
      setForwardPalletButtonState(PALLETE_BUTTON_STATES?.POINTER);
    }
    if (currentPage == FIRST_PAGE) {
      setIsBackPalleteButtonDisabled(true);
      setIsMoveToFirstPageButtonDisabled(true);
    } else {
      setIsBackPalleteButtonDisabled(false);
      setIsMoveToFirstPageButtonDisabled(false);
    }
  }, [currentPage]);

  useEffect(() => {
    setAllSelected(checkAllSelected());
  }, [selectedIndexArray]);

  useEffect(() => {
    setPagePalette();
  }, [totalPages]);

  useEffect(() => {
    const newTotalPages = Math.ceil(tableData?.length / entriesPerPage);
    if (newTotalPages == totalPages) {
      setTableDataToShow();
    } else {
      setTotalPages(Math.ceil(tableData?.length / entriesPerPage));
    }
  }, [tableData]);
  useEffect(() => {
    setTableData(tableDataReceived);
  }, [tableDataReceived]);

  useEffect(() => {
    setPagePalette();
  }, []);

  useEffect(() => {
    setTotalPages(Math.ceil(totalRecords / entriesPerPage));
  }, [entriesPerPage]);
  return (
    <TableBoxContainer>
      {tableDataToBeShown?.length ? (
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
              {isMultiSelectCheckBoxVisible && (
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
                    if (isActionMenuVisible) {
                      return (
                        <>
                          <TableHeaderData
                            width={headerItem?.width}
                            key={`headerItem_${index}`}
                            onClick={handleBulkMenuAction}
                            cursor="pointer"
                            position="relative"
                          >
                            <img
                              src={MenuIcon}
                              height="15rem"
                              cursor="pointer"
                            />
                          </TableHeaderData>
                        </>
                      );
                    } else {
                      return;
                    }

                  default:
                    return (
                      <TableHeaderData
                        width={headerItem?.width}
                        key={`headerItem_${index}`}
                      >
                        <Box
                          display="flex"
                          alignItems="center"
                          onClick={() =>
                            handleSort({ headerName: headerItem?.value })
                          }
                        >
                          <Box mr="0.5rem"> {headerItem?.title}</Box>
                          {headerItem?.isSortable && (
                            <img
                              height="100%"
                              src={
                                ascendingHeaders?.includes(headerItem?.value)
                                  ? SortAscendingIcon
                                  : SortDescendingIcon
                              }
                            />
                          )}
                        </Box>
                      </TableHeaderData>
                    );
                }
              })}
            </TableHeaderContainer>

            {tableDataToBeShown.map((dataItem, dataIndex) => {
              return (
                <TableRowContainer key={`dataItemRowCheckBox_${dataIndex}`}>
                  {isMultiSelectCheckBoxVisible && (
                    <TableRowData key={`rowItemCheckBox${dataIndex}`}>
                      <CheckBoxInput
                        type={"checkbox"}
                        onChange={() =>
                          handleCheckboxSelect(dataItem[primaryKey])
                        }
                        checked={
                          selectedIndexArray?.includes(dataIndex) ? true : false
                        }
                      />
                    </TableRowData>
                  )}

                  {tableHeaderData.map((headerData, dataHeaderIndex) => {
                    switch (headerData?.value) {
                      case actionMenuHeaderTitle:
                        if (isActionMenuVisible) {
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
                        } else {
                          return;
                        }
                      case activeStatusHeaderTitle:
                        return (
                          <TableRowData
                            key={`dataHeaderIndex_${dataHeaderIndex}`}
                            display="flex"
                          >
                            <ActiveStatus
                              status={dataItem[headerData?.value]}
                              mr="0.5rem"
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

      <PaginationContainer>
        <PageButtonContainer>
          <PageNavigationButton
            buttonState={
              isMoveToFirstPageButtonDisabled
                ? PALLETE_BUTTON_STATES?.DISABLED
                : PALLETE_BUTTON_STATES?.POINTER
            }
            onClick={handleMoveToFirstPage}
          >
            {"<<"}
          </PageNavigationButton>
          <PageNavigationButton
            buttonState={
              isBackPalleteButtonDisabled
                ? PALLETE_BUTTON_STATES?.DISABLED
                : PALLETE_BUTTON_STATES?.POINTER
            }
            onClick={handleBackPalleteSelect}
          >
            {"<"}
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
            {">"}
          </PageNavigationButton>
          <PageNavigationButton
            buttonState={isMoveToLastPageButtonState}
            onClick={handleMoveToLastPage}
          >
            {">>"}
          </PageNavigationButton>
        </PageButtonContainer>
        <Dropdown
          dropdownItems={entriesPerPageDropdownItems}
          title={entriesPerPageDropdownTitle}
          dropdownFieldBoxHeader={entriesPerPage + "\u0020 per page"}
          onItemSelect={(selectedItem) => {
            setEntriesPerPage(selectedItem?.value);
          }}
        />
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
