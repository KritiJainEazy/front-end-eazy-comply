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

export const Table = ({
  tableHeaderData = [],
  tableData = [],
  actionMenuHeaderTitle = "",
  activeStatusHeaderTitle = "",
  actionMenuContent = <ActionMenu actionMenuItems={[]} />,
  primaryKey = "",
  multiSelectCheckBox = true,
  getData = () => void 0,
}) => {
  console.log(tableData?.length, "hisfdoi");

  const noDataString = "No data available";

  const [allSelected, setAllSelected] = useState(false);
  const [selectedIndexArray, setSelectedIndexArray] = useState([]);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPageNumbersPalette, setCurrentPageNumbersPalette] = useState([
    1, 2, 3,
  ]);
  const [currentPage, setCurrrentPage] = useState(1);
  const [tableDataToBeShown, setTableDataToBeShown] = useState([]);
  const [numberOfPages, setNumberOfPages] = useState(
    tableData?.length / entriesPerPage
  );
  const [isForwardPalleteButtonDisabled, setIsForwardPalleteButtonDisabled] =
    useState(false);

  const [isBackPalleteButtonDisabled, setIsBackPalleteButtonDisabled] =
    useState(false);
  const handleBackPaleteSelect = () => {};
  const handleForwardPaleteSelect = () => {};
  const handlePageSelect = (pageNumber) => {
    setCurrrentPage(pageNumber);
  };

  const handleMultiSelect = () => {
    if (allSelected) {
      setSelectedIndexArray([]);
    } else {
      const allSelectedNewArray = [];
      const createAllNewSelectedArray = () => {
        for (let entry = 0; entry < entriesPerPage; entry++) {
          //allSelectedNewArray?.push((pageNumber - 1) * entriesPerPage + entry);
          allSelectedNewArray?.push(entry);
        }
      };
      createAllNewSelectedArray();
      setSelectedIndexArray(allSelectedNewArray);
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

  useEffect(() => {
    const pageData = [];
    const startingIndexForPage = (currentPage - 1) * entriesPerPage;
    for (let i = 0; i < entriesPerPage; i++) {
      pageData?.push(tableData[startingIndexForPage + i]);
    }
    setTableDataToBeShown(pageData);
  }, [currentPage]);
  useEffect(() => {
    if (selectedIndexArray?.length == entriesPerPage) {
      setAllSelected(true);
    }
  }, [selectedIndexArray]);
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
            isDisabled={false}
            onClick={handleBackPaleteSelect}
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
            isDisabled={false}
            onClick={handleForwardPaleteSelect}
          >
            {">"}
          </PageNavigationButton>
        </PageButtonContainer>
      </PaginationContainer>
    </TableBoxContainer>
  );
};

/*
Backend request - 
Backend response - {
  1. TableData to be displayed (assuming to be 100 entires per call for now)
  2. If more data is available flag (if it returns an array of less than 100 entries or if there are only 100 and not 101)



The default values of usestate hooks are displayed on top of the function, can be changed later
Request to be sent if search params or sorting param changes, or when more data is required.
Meanwhile, not giving user the liberty to change no. of entries per page and keeping it default for now. 
}
*/
