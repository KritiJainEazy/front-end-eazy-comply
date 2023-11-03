import Box from "../../atoms/box.atom";
import styled from "styled-components";

export const TableBoxContainer = styled(Box)`
  width: 100%;
  padding: 32px 40px;
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
