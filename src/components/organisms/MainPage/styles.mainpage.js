import styled from "@emotion/styled";
import Box from "../../atoms/box.atom";

export const MainPageBodyContainer = styled(Box)`
  height: 100%;
  width: 100%;
  overflow-x: hidden;
`;

export const MainBodyContainer = styled(Box)`
  width: 100%;
  height: 79%;
  overflow-y: auto;
  ::-webkit-scrollbar {
    display: none;
  }
`;

export const HeaderContainer = styled(Box)`
  width: 100%;
  height: 21%;
`;

export const Header = styled(Box)`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 32px 40px;
  border-bottom: 1px solid #e5e7eb;
`;

export const HeaderTitle = styled(Box)`
  color: rgba(66, 105, 215, 0.8);
  font-weight: 700;
  font-family: sans-serif;
  font-size: 1.875rem;
  line-height: 2.25rem;
  display: flex;
  align-items: center;
  margin-left: 10px;
  text-transform: uppercase;
`;

export const BackButton = styled("img")`
  margin-right: 15px;
  height: 30px;
`;

// export const HeaderButton = styled(Box)`
//   height: 100%;
//   width: max-content;
//   background-color: #436ad6;
//   color: #fafafa;
//   padding: 7px;
//   border-radius: 5px;
//   cursor: pointer;
//   margin-right: 10px;
// `;
