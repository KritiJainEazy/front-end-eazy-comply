import styled from "@emotion/styled";
import Box from "../../atoms/box.atom";

export const PageLayoutContainer = styled(Box)`
  width: 100%;
  height: 100vh;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
`;

export const MainBodyContainer = styled(Box)`
  margin-top: 3.5em;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  display: flex;
`;

export const MainPageContainer = styled(Box)`
  height: 100%;
  flex-grow: 1;
`;
