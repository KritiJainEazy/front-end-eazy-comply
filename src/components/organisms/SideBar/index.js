import React, { useState } from "react";
import "./styles.sidebar.js";
import { menuItems } from "./sideBarConstants.js";
import {
  SideBarContainer,
  MenuListContainer,
  MenuListItem,
  MenuListItemLogoContainer,
  MenuListItemLogo,
  MenuListItemTitle,
  CollapseButtonImageContainer,
  UserInfoContainer,
  UserName,
  UserEmail,
  CollapseButtonContainer,
  MenuListItemLeftContainer,
  MenuListItemArrow,
  SubMenuListItem,
  SubMenuListContainer,
  MenuListItemContainer,
  SubMenuTitle,
} from "./styles.sidebar.js";

import CollapseButton from "../../../assets/backButton.png";
import ExpandButton from "../../../assets/expandButton.png";
import UpArrow from "../../../assets/up-arrow-coloured.png";
import DownArrow from "../../../assets/down-arrow-coloured.png";
import { MultifoldDropdown } from "../../molecules/MultifoldDropdown/index.js";

export const SideBar = () => {
  const [selectedMenuItemIndex, setSelectedMenuItemIndex] = useState("-1");
  const [selectedSubMenuItemIndex, setSelectedSubMenuItemIndex] =
    useState("-1");
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSidebarMenuItemClick = (menuIndex) => {
    if (menuIndex == selectedMenuItemIndex) {
      setSelectedMenuItemIndex("-1");
    } else {
      setSelectedMenuItemIndex(menuIndex);
    }
  };

  const handleSubMenuItemClick = (subMenuAction, subMenuIndex) => {
    setSelectedSubMenuItemIndex(subMenuIndex);
    subMenuAction();
  };

  const handleSidebarCollapseButton = () => {
    setIsExpanded(!isExpanded);
  };
  return (
    <SideBarContainer width={isExpanded ? "17.5%" : "4.5%"}>
      <CollapseButtonContainer>
        <CollapseButtonImageContainer
          onClick={handleSidebarCollapseButton}
          height={"30px"}
          width="30px"
          src={isExpanded ? CollapseButton : ExpandButton}
        />
      </CollapseButtonContainer>

      <MenuListContainer>
        {menuItems?.map((menuItem, menuIndex) => {
          return (
            <MenuListItemContainer key={`sidebar_menu_item_${menuIndex}`}>
              <MenuListItem
                onClick={() => handleSidebarMenuItemClick(menuIndex)}
                selected={menuIndex == selectedMenuItemIndex}
              >
                <MenuListItemLeftContainer>
                  <MenuListItemLogoContainer>
                    <MenuListItemLogo src={menuItem?.logo} />
                  </MenuListItemLogoContainer>
                  <MenuListItemTitle
                    display={isExpanded ? "flex" : "none"}
                    opacity={isExpanded ? "1" : "0"}
                  >
                    {menuItem?.title}
                  </MenuListItemTitle>
                </MenuListItemLeftContainer>
                <MenuListItemArrow
                  display={isExpanded ? "block" : "none"}
                  src={selectedMenuItemIndex == menuIndex ? UpArrow : DownArrow}
                />
              </MenuListItem>
              {isExpanded && (
                <SubMenuListContainer
                  display={
                    selectedMenuItemIndex == menuIndex ? "block" : "none"
                  }
                >
                  {menuItem?.subMenu?.map((subMenuItem, subMenuItemIndex) => {
                    return (
                      <SubMenuListItem
                        key={`sidebar_subMenu_item_${menuIndex}_${subMenuItemIndex}`}
                        onClick={() => {
                          handleSubMenuItemClick(
                            subMenuItem?.subMenuAction,
                            subMenuItemIndex
                          );
                        }}
                        backgroundColor={
                          subMenuItemIndex == selectedSubMenuItemIndex
                            ? "rgb(229 231 235)"
                            : "transparent"
                        }
                      >
                        <SubMenuTitle>{subMenuItem?.subMenuTitle}</SubMenuTitle>
                      </SubMenuListItem>
                    );
                  })}
                </SubMenuListContainer>
              )}
            </MenuListItemContainer>
          );
        })}
        {/* {<MultifoldDropdown dropdownItems={menuItems} />} */}
      </MenuListContainer>
    </SideBarContainer>
  );
};
