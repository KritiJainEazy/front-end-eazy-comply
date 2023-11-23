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

  const [allSelected, setAllSelected] = useState(false);
  const [selectedIndexArray, setSelectedIndexArray] = useState([]);
  const [entriesPerPage, setEntriesPerPage] = useState(15);
  const [pageNumber, setPageNumber] = useState([1, 2, 3, 4, 5]);
  const [numberOfPages, setNumberOfPages] = useState(
    tableData?.length / entriesPerPage
  );

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

          {tableData.map((dataItem, dataIndex) => {
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
        <PageNavigationButton />
        <PageNumberContainer></PageNumberContainer>
        <PageNumberContainer></PageNumberContainer>
        <PageNumberContainer></PageNumberContainer>
        <PageNavigationButton />
      </PaginationContainer>
    </TableBoxContainer>
  );
};
