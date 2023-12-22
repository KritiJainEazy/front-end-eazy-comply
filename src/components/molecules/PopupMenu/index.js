import React from "react";
import Box from "../../atoms/box.atom";
import { MenuContainer, MenuItems } from "./styles.popup";
import { REQUEST_TYPES } from "../../../constants/navConfig";
import { useCsrfToken } from "../../../utils/useCsrfToken";
export const PopupMenu = ({
  position = "absolute",
  display = "none",
  selectedData = [],
  updateTableData = () => {},
}) => {
  const { makeRequestWithCSRFToken } = useCsrfToken();
  const popupMenuItems = [
    {
      title: "Delete",
      action: () => {
        makeRequestWithCSRFToken({
          api: "/user/bulk-delete",
          requestType: REQUEST_TYPES?.DELETE,
          stringifiedData: selectedData,
          successAction: (response) => {
            updateTableData({
              ok: true,
              ids: selectedData,
            });
            console.log(response);
            alert("success");
          },
          getResponseFlag: false,
          failureAction: (error) => {
            updateTableData({
              ok: false,
            });
            console.error(error);
            alert("error");
          },
        });
      },
    },
    {
      title: "Disable",
      action: () => {
        makeRequestWithCSRFToken({
          api: "/user/bulk-disable",
          requestType: REQUEST_TYPES?.DELETE,
          stringifiedData: selectedData,
          successAction: (response) => {
            updateTableData({
              ok: true,
              ids: selectedData,
            });
            console.log(response);
            alert("success");
          },
          getResponseFlag: false,
          failureAction: (error) => {
            console.error(error);
            updateTableData({
              ok: false,
            });
            alert("error");
          },
        });
      },
    },
  ];
  return (
    <MenuContainer display={display}>
      {popupMenuItems?.map((menuItem) => {
        return (
          <MenuItems
            key={`popupItem${menuItem?.title}`}
            onClick={menuItem?.action}
          >
            {menuItem?.title}
          </MenuItems>
        );
      })}
    </MenuContainer>
  );
};
