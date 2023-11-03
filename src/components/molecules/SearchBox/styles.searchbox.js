import styled from "@emotion/styled";
import Box from "../../atoms/box.atom";

export const SearchBoxContainer = styled(Box)`
  width: ${(props) => props?.width || "100%"};
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 7px;
  padding: 2px 8px;
  border: ${(props) => props?.border || "1.5px solid #cfd0d1"};
`;

export const SearchBarIconContainer = styled("img")`
  src: ${(props) => props?.src};
  max-height: 80%;
  height: ${(props) => props?.height || "45%"};
`;
