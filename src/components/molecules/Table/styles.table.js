import Box from "../../atoms/box.atom";
import styled from "styled-components";

export const TableBoxContainer = styled(Box)`
  width: 100%;
  padding: 32px 40px;
  overflow-y: auto;
`;
export const TableContainer = styled("table")`
  width: 100%;
  height: 100%;
  margin: 10px auto;
  border-collapse: collapse;
  border-radius: 5px;
  overflow: hidden;
`;

export const TableBodyContainer = styled("tbody")`
  width: 100%;
  border: 1px solid #e5e7eb;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
`;

export const TableHeaderContainer = styled("tr")`
  height: 3vw;
  width: 100%;
  background-color: #4269d7;
  color: #fafafa;
  line-height: 1.5rem;
  font-size: 1em;
  padding: 0px 0.5rem;
  border-radius: inherit;
`;

export const TableHeaderData = styled("th")`
  margin: 2px;
  padding: 1px 8px;
  text-align: left;
`;

export const TableRowContainer = styled("tr")`
  height: 3vw;
  line-height: 24px;
  border-bottom: 1px solid rgb(229, 231, 235);
`;
export const TableRowData = styled("td")`
  font-size: 0.875em;
  max-height: 50px;
  text-align: center;
  vertical-align: middle;
  color: rgba(0, 0, 0, ${(props) => props.color || "0.4"});
  text-align: left;
  padding: 1px 8px;
`;

export const ActionMenu = styled(Box)`
  width: 100%;
  height: 50%;
  padding: 3px;
  display: flex;
  justify-content: space-evenly;
`;

export const ActionMenuIcons = styled("img")`
  height: 20px;
  justify-content: space-evenly;
  cursor: pointer;
`;

// export const CheckBoxInput = styled.input.attrs({ type: "checkbox" })`
//   width: ${(props) => props?.width || "15px"};
//   height: ${(props) => props?.height || "15px"};
//   border-color: transparent;
// `;

export const CheckBoxInput = styled.input`
  width: ${(props) => props?.width || "15px"};
  height: ${(props) => props?.height || "15px"};
  border-color: transparent;
`;

export const PaginationContainer = styled(Box)`
  width: 100%;
  height: 2.8rem;
  margin-top: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

// export const PageNavigationButton = styled("img")`
//   src: ${(props) => props?.src};
//   alt: ${(props) => props?.alt};
//   width: ${(props) => props?.width};
//   height: ${(props) => props?.height};
// `;

export const PageNavigationButton = styled(Box)`
  height: 100%;
  display: flex;
  align-items: center;
  color: rgb(107, 114, 128);
  padding: 0px 16px;
  border: 1px solid rgb(209, 213, 219);
  cursor: pointer;
`;

export const PageNumberContainer = styled(Box)`
  height: 100%;
  display: flex;
  align-items: center;
  color: ${(props) =>
    props?.isSelected ? "rgb(28,100,242)" : "rgb(107, 114, 128)"};
    background-color: ${(props) =>
      props?.isSelected ? "rgb(235,245,255)" : "rgb(255,255,255)"};
  padding: 0px 16px;
  border: ${(props) =>
    props?.isSelected
      ? "1px solid rgb(164, 202, 254)"
      : "1px solid rgb(209, 213, 219)"};
      cursor: pointer;
`;

export const PageButtonContainer = styled(Box)`
  height: 100%;
  width: max-content;
  border: 1px solid rgb(209, 213, 219);
  border-radius: 10px;
  overflow: hidden;
  display: flex;
  align-items: center;
`;
