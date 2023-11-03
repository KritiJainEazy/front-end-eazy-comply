import React, { useEffect, useRef } from "react";
import Box from "../../atoms/box.atom";
import {
  ProfileMenuContainer,
  ProfileMenuContentContainer,
  ProfileTopContainer,
  ProfileBottomContainer,
  UserName,
  UserEmail,
  ProfileMenuActionTile,
  ProfileMenuActionTileLogo,
  ProfileMenuActionTileTitle,
} from "./styles.profileMenu";
import { profileActionMenu, userEmail, userName } from "./profileData";

export const ProfileMenu = ({
  showProfileMenu = false,
  setShowProfileMenu = () => void 0,
}) => {
  console.log("profile modal state", showProfileMenu);
  const profileMenuRef = useRef();
  console.log(profileMenuRef);

  const handleCloseModal = () => {
    setShowProfileMenu(false);
    document.removeEventListener("click", handleOutsideClick);
  };

  useEffect(() => {
    console.log("I have rendered");
  }, [profileMenuRef]);
  const handleOutsideClick = (e) => {
    console.log(
      { ref: profileMenuRef, target: e.target, kj: profileMenuRef?.current },
      "ihlkiulgtudydysdkjfhoi;hoiV"
    );
    if (!profileMenuRef?.current?.contains(e.target)) {
      handleCloseModal();
    }
  };

  document.addEventListener("click", handleOutsideClick);

  return (
    <ProfileMenuContainer ref={profileMenuRef}>
      <ProfileMenuContentContainer>
        <ProfileTopContainer>
          <UserName>{userName}</UserName>
          <UserEmail>{userEmail}</UserEmail>
        </ProfileTopContainer>
        <ProfileBottomContainer>
          {profileActionMenu?.map((profileAction, index) => {
            return (
              <ProfileMenuActionTile
                key={`profile_menu_index_${index}`}
                onClick={profileAction?.profileMenuAction}
              >
                <ProfileMenuActionTileLogo src={profileAction?.logo} />
                <ProfileMenuActionTileTitle>
                  {profileAction?.title}
                </ProfileMenuActionTileTitle>
              </ProfileMenuActionTile>
            );
          })}
        </ProfileBottomContainer>
      </ProfileMenuContentContainer>
    </ProfileMenuContainer>
  );
};

/*
import React, { useRef } from "react";
import Box from "../../atoms/box.atom";
import {
  ProfileMenuContainer,
  ProfileMenuContentContainer,
  ProfileTopContainer,
  ProfileBottomContainer,
  UserName,
  UserEmail,
  ProfileMenuActionTile,
  ProfileMenuActionTileLogo,
  ProfileMenuActionTileTitle,
} from "./styles.profileMenu";
import { profileActionMenu, userEmail, userName } from "./profileData";

export const ProfileMenu = ({
  showProfileMenu = false,
  setShowProfileMenu = () => void 0,
}) => {
  console.log("profile modal state", showProfileMenu);
  const profileMenuRef = useRef();

  const handleCloseModal = () => {
    setShowProfileMenu(false);
  };

  document.onclick = (e) => {
    console.log({ ref: profileMenuRef, target: e.target });
    if (!profileMenuRef?.current?.contains(e.target)) {
      handleCloseModal();
    }
  };

  return (
    <ProfileMenuContainer ref={profileMenuRef}>
      <ProfileMenuContentContainer>
        <ProfileTopContainer>
          <UserName>{userName}</UserName>
          <UserEmail>{userEmail}</UserEmail>
        </ProfileTopContainer>
        <ProfileBottomContainer>
          {profileActionMenu?.map((profileAction, index) => {
            return (
              <ProfileMenuActionTile
                key={`profile_menu_index_${index}`}
                onClick={profileAction?.profileMenuAction}
              >
                <ProfileMenuActionTileLogo src={profileAction?.logo} />
                <ProfileMenuActionTileTitle>
                  {profileAction?.title}
                </ProfileMenuActionTileTitle>
              </ProfileMenuActionTile>
            );
          })}
        </ProfileBottomContainer>
      </ProfileMenuContentContainer>
    </ProfileMenuContainer>
  );
};
*/
