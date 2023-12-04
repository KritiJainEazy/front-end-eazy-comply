import styled from "@emotion/styled";
import Box from "../../atoms/box.atom";

export const ButtonContainer = styled("button")`
  all: unset;
  box-sizing: border-box;
  height: ${(props) => props?.height || "max-content"};
  width: ${(props) => props?.width || "max-content"};
  border-radius: ${(props) => props?.borderRadius || "5px"};
  background-color: ${(props) => props?.bgColor || "rgb(66, 105, 215)"};
  color: ${(props) => props?.color || "#fafafa"};
  padding: ${(props) => props?.padding || "7px"};
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  opacity: ${(props) => (props.disabled ? "0.6" : "1")};
  margin: ${(props) => props.margin};
  font-size: ${(props) => props.fontSize || "18px"};
  font-weight: ${(props) => props.fontWeight || "400"};
  display: flex;
  justify-content: ${(props) => props.justifyContent};
  align-items: center;
  &:hover {
    background-color: ${(props) => props?.hoverBgColor || "rgb(37 99 235)"};
    color: ${(props) => props?.hoverColor || "#fafafa"};
  }
  box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px,
    rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.1) 0px 4px 6px -4px;
`;

export const ButtonIconContainer = styled("img")`
  height: ${(props) => props?.height || "100%"};
  width: ${(props) => props?.width || "100%"};
  src: ${(props) => props?.src};
  alt: ${(props) => props?.alt};
  margin-right: ${(props) => props?.mr || "5px"};
`;
