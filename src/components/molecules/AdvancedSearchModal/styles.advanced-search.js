import styled from "@emotion/styled";
import Box from "../../atoms/box.atom";

export const AdvancedSearchModalContainer = styled(Box)`
  width: 30rem;
  height: max-content;
  flex-shrink: 0;
  border-radius: 0.625rem;
  border: 1px solid #bdbdbd;
  background-color: #fff;
  box-shadow: 0px 3px 5px 0px rgba(0, 0, 0, 0.14);
  position: absolute;
  top: 3.7rem;
  right: -1rem;
  z-index: 1;
  padding: 3rem 2rem;
`;

export const AdvancedSearchModalBody = styled(Box)``;

export const ModalBodyMenuTile = styled(Box)`
  height: 3rem;
  display: flex;
  margin-bottom: 2rem;
`;
export const ModalBodyMenuHeader = styled(Box)`
  height: 100%;
  width: 30%;
  display: flex;
  align-items: center;
  color: #1a1a1a;
  font-size: 1rem;
  font-weight: 600;
`;
export const ModalBodyMenuComponent = styled(Box)`
  height: 100%;
  width: 70%;
  display: flex;
`;
export const ModalButtonContainer = styled(Box)`
  display: flex;
  justify-content: flex-end;
`;

export const ModalButton = styled(Box)`
  width: 70%;
  display: flex;
  justify-content: space-around;
`;
