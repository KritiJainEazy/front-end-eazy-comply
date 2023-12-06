import styled from "@emotion/styled";
import Box from "../../atoms/box.atom";

export const DropdownBoxContainer = styled(Box)``;
export const DropdownContainer = styled(Box)`
  border: ${(props) => props?.border || "2px solid #e5e7eb"};
  border-radius: ${(props) => props.borderRadius || "5px"};
  overflow: hidden;
`;

export const DropdownTitle = styled(Box)`
  width: 100%;
  height: 100%;
  color: rgb(0, 0, 0, 0.4);
  padding: ${(props) => props.padding || "3px"};
  font-weight: 600;
  font-size: 0.9rem;
  letter-spacing: 0.4px;
  line-height: 1.5rem;
`;
export const DropdownFieldBox = styled(Box)`
  width: 100%;
  padding: ${(props) => props?.padding || "8px 10px"};
  overflow: hidden;
  background-color: ${(props) => props?.backgroundColor || "#F8F8F8"};
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  color: rgb(112, 112, 112);
  line-height: 1.5rem;
  font-size: 0.9rem;
`;
export const DropdownMenuContainer = styled(Box)`
  width: 100%;
  height: ${(props) => props?.height || "100%"};
`;

export const DropdownArrow = styled("img")`
  src: ${(props) => props?.src};
  height: ${(props) => props?.height || "0.25rem"};
`;
export const DropdownMenuItem = styled(Box)`
  box-sizing: content-box;
  display: flex;
  align-items: center;
  height: 1.5rem;
  padding: ${(props) => props?.padding || "8px 10px"};
  cursor: pointer;
  line-height: 1.5rem;
  font-size: 0.9rem;
  background-color: ${(props) =>
    props?.isSelected ? "rgb(66, 105, 215)" : "#F8F8F8"};
  color: ${(props) => (props?.isSelected ? "#fafafa" : "rgb(112, 112, 112)")};
  transition: all 0.3s ease-out;
  &:hover {
    color: ${(props) => props?.hoverColor || "#fafafa"};
    background-color: ${(props) => props?.hoverBgColor || "rgb(66, 105, 215)"};
  }
`;

export const DropdownErrorMessage = styled(Box)`
  color: red;
  line-height: 10px;
  padding: 3px;
`;
