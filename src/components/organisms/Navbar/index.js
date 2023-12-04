import React, { useState } from "react";
import {
  LogoContainer,
  NavbarContainer,
  LeftContainer,
  RightContainer,
  LogoNameContainer,
} from "./styles.navbar";
import EasyComplyLogo from "../../../assets/easyComply.png";
import NotificationIcon from "../../../assets/notification.png";
import ProfileIcon from "../../../assets/profile-user.png";
import { companyName } from "../../../mockData/mockdata";
import Box from "../../atoms/box.atom";
import { ProfileMenu } from "../ProfileMenu";

export const Navbar = () => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  console.log("navbar state", showProfileMenu);
  const handleProfileClick = (e) => {
    e.stopPropagation();
    setShowProfileMenu(!showProfileMenu);
  };
  return (
    <NavbarContainer>
      <LeftContainer>
        <LogoContainer>
          <img height="100%" src={EasyComplyLogo} />
        </LogoContainer>
        <LogoNameContainer>{companyName}</LogoNameContainer>
      </LeftContainer>
      <RightContainer>
        <Box mr="30px" height="50%">
          <img src={NotificationIcon} height="100%" margin="20px" />
        </Box>
        <Box mr="30px" height="50%">
          <img
            src={ProfileIcon}
            height="100%"
            margin="20px"
            onClick={handleProfileClick}
          />
          {showProfileMenu && (
            <ProfileMenu
              showProfileMenu={showProfileMenu}
              setShowProfileMenu={(showProfileMenuState) =>
                setShowProfileMenu(showProfileMenuState)
              }
            />
          )}
        </Box>
      </RightContainer>
    </NavbarContainer>
  );
};
