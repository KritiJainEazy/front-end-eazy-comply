import styled from "@emotion/styled";
import Box from "../../atoms/box.atom";

export const ActionMenuContainer = styled(Box)`
  width: 100%;
  height: 50%;
  padding: 3px;
  display: flex;
  justify-content: space-evenly;
`;

export const ActionMenuIcons = styled("img")`
  height: 16px;
  cursor: pointer;
  margin-right: auto;
`;
