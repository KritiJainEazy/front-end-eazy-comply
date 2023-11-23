import styled from "@emotion/styled";
import Box from "../../atoms/box.atom";

export const PageLayoutContainer = styled(Box)`
  width: 100%;
  height: 100vh;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
`;

export const NavBarPageLayoutContainer = styled(Box)`
  height: 3.5rem;
`;

export const MainBodyContainer = styled(Box)`
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  width: 100%;
  height: calc(100% - 3.5rem);
  display: flex;
`;

export const MainPageContainer = styled(Box)`
  height: 100%;
  flex-grow: 1;
  overflow-y: auto;
`;
