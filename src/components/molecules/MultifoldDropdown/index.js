import React, { useState } from "react";
import {
  MultiFoldDropDownContainer,
  MenuListItem,
  MenuListItemLeftContainer,
  MenuListItemLogoContainer,
  MenuListItemLogo,
  MenuListItemTitle,
  MenuListItemArrow,
  SubMenuListItem,
} from "./styles.multifold";
import UpArrow from "../../../assets/up-arrow.png";
import DownArrow from "../../../assets/down-arrow.png";

export const MultifoldDropdown = ({ width, height, dropdownItems = [] }) => {
  const [isOpen, setIsOpen] = useState("-1");

  return (
    <MultiFoldDropDownContainer>
      {/* {dropdownItems?.map((menuItem, index) => {
        return (
          <>
            <MenuListItem
              key={`sidebar_menu_item_${index}`}
              onClick={() => handleSidebarMenuItemClick(index)}
              selected={index == selectedMenuItemIndex}
            >
              <MenuListItemLeftContainer>
                <MenuListItemLogoContainer>
                  <MenuListItemLogo src={menuItem?.logo} />
                </MenuListItemLogoContainer>
                <MenuListItemTitle display={isExpanded ? "block" : "none"}>
                  {menuItem?.title}
                </MenuListItemTitle>
              </MenuListItemLeftContainer>
              <MenuListItemArrow src={isOpen ? UpArrow : DownArrow} />
            </MenuListItem>
            {menuItem?.subMenuAction?.map((subMenuItem, index) => {
              return <></>;
            })}
            <SubMenuListItem></SubMenuListItem>
          </>
        );
      })} */}
    </MultiFoldDropDownContainer>
  );
};
