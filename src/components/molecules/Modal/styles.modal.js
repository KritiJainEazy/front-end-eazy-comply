import styled from "@emotion/styled";
import Box from "../../atoms/box.atom";

export const ModalScreenContainer = styled(Box)`
  display: ${(props) => props?.display || "block"};
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, ${(props) => props?.backgroundFade});
  transition: display 1s;
`;

export const ModalContainer = styled(Box)`
  width: ${(props) => props?.width || "100%"};
  height: ${(props) => props?.height || "100%"};
  background-color: ${(props) => props?.backgroundColor || "#fff"};

  border: 1px solid rgb(229, 231, 235);
  border-radius: 0.4rem;
  padding: 5px;
  position: ${(props) => props?.position || "#absolute"};
  right: 56rem;
  top: 5rem;
`;

export const ModalTitleContainer = styled(Box)`
  width: ${(props) => props?.width};
  height: ${(props) => props?.height};
  display: flex;
  justify-content: space-between;
`;
