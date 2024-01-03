import styled from "styled-components";
import Box from "../../atoms/box.atom";

export const MenuContainer = styled(Box)`
  width: 10rem;
  height: max-content;
  overflow: hidden;
  border-radius: 0.4rem;
  border: 1px solid rgb(243, 244, 246);
  background-color: #fff;
  display: ${(props) => props?.display};
  position: absolute;
  right: 0;
  top: 2rem;
  box-shadow: 0px 0px 5px 2px #767676;
`;

export const MenuItems = styled(Box)`
  cursor: pointer;
  width: 100%;
  height: 2.5rem;
  color: #767676;
  display: flex;
  border-bottom: 1px solid rgb(229, 231, 235);
  justify-content: center;
  align-items: center;
`;
