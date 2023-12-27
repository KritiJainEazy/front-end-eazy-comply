import React from "react";
import Box from "../../atoms/box.atom";
import { MenuContainer, MenuItems } from "./styles.popup";
import { REQUEST_TYPES } from "../../../constants/navConfig";
import { useCsrfToken } from "../../../utils/useCsrfToken";
import {
  ERROR_CODES,
  REQUEST_MESSAGES,
} from "../../../constants/errorCodesMessages";
import { toast } from "react-toastify";
import { constantStrings } from "../../../constants/magicString";
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
            if (response?.status == ERROR_CODES?.NO_CONTENT) {
              toast.success(
                REQUEST_MESSAGES?.SUCCESSFULLY_DELETED?.replace(
                  "$",
                  constantStrings?.USERS + "\u0020" + selectedData?.toString()
                )
              );
            } else {
              toast.error(REQUEST_MESSAGES?.SOMETHING_WENT_WRONG);
            }
          },
          getResponseFlag: false,
          failureAction: (error) => {
            updateTableData({
              ok: false,
            });
            console.error(error);
            toast.error(
              error?.message || REQUEST_MESSAGES?.SOMETHING_WENT_WRONG
            );
          },
        });
      },
    },
    // {
    //   title: "Disable",
    //   action: () => {
    //     makeRequestWithCSRFToken({
    //       api: "/user/bulk-disable",
    //       requestType: REQUEST_TYPES?.DELETE,
    //       stringifiedData: selectedData,
    //       successAction: (response) => {
    //         updateTableData({
    //           ok: true,
    //           ids: selectedData,
    //         });
    //         console.log(response);
    //       },
    //       getResponseFlag: false,
    //       failureAction: (error) => {
    //         console.error(error);
    //         updateTableData({
    //           ok: false,
    //         });
    //       },
    //     });
    //   },
    // },
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
