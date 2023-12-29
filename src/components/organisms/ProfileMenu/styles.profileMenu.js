import styled from "@emotion/styled";
import Box from "../../atoms/box.atom";

export const ProfileMenuContainer = styled(Box)`
  position: absolute;
  top: 80%;
  right: 10%;
  display: flex;
  align-items: center;
`;

export const ProfileMenuContentContainer = styled(Box)`
  width: 165px;
  box-sizing: border-box;
  background-color: white;
  border-radius: 5px;
  box-shadow: 5px 5px 10px #777;
  border: 1px solid #e5e7eb;
`;

export const ProfileTopContainer = styled(Box)`
  padding: 15px;
  border-bottom: 1.5px solid #e5e7eb;
`;

export const ProfileBottomContainer = styled(Box)`
  padding: 8px 0px;
  line-height: 24px;
`;

export const ProfileMenuActionTile = styled(Box)`
  width: 100%;
  display: flex;
  padding: 8px 16px;
  color: rgb(55, 65, 81);
  cursor: pointer;
  column-gap: 8px;
`;
export const ProfileMenuActionTileLogo = styled("img")`
  height: ${(props) => props?.height || "16px"};
  min-height: max-content;
  src: ${(props) => props?.src};
  alt: ${(props) => props?.alt};
`;
export const ProfileMenuActionTileTitle = styled(Box)``;

export const UserName = styled(Box)`
  width: 100%;
  line-height: 1.5rem;
  font-weight: 600;
  font-size: 1rem;
  font-family: sans-serif;
  color: rgb(17, 24, 39, 0.8);
`;

export const UserEmail = styled(Box)`
flex-wrap: wrap;
  width: 100%;
  line-height: 24px;
  color: #767676;
  font-weight: 400;
`;
