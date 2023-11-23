import styled from "@emotion/styled";
import Box from "../../atoms/box.atom";

export const NavbarContainer = styled(Box)`
  width: 100%;
  max-width: 100%;
  height: 3.5rem;
  display: flex;
  justify-content: space-between;
  padding: 0px;
  margin: 0;
  border-bottom: 2px solid #e5e7eb;
  position: fixed;
  top: 0;
  z-index: 1;
`;

export const LeftContainer = styled(Box)`
  display: flex;
  padding: 4px;
`;

export const RightContainer = styled(Box)`
  height: 100%;
  display: flex;
  align-items: center;
  padding: 4px;
  position: relative;
`;

export const LogoContainer = styled(Box)`
  display: flex;
  padding: 4px;
`;

export const LogoNameContainer = styled(Box)`
  height: 100%;
  display: flex;
  align-items: center;
  padding: 4px;
  font-weight: 700;
  font-size: 1.5em;
`;
