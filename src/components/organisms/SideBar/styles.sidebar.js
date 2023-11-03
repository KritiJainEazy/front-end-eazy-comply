import styled from "@emotion/styled";
import Box from "../../atoms/box.atom";

export const SideBarContainer = styled(Box)`
  width: ${(props) => props.width || "20%"};
  display: flex;
  flex-direction: column;
  align-items: center;
  border-right: 2px solid #e5e7eb;
  transition: width 0.4s;
`;

export const CollapseButtonContainer = styled(Box)`
  position: relative;
  left: 50%;
  top: 5%;
  background-color: #fff;
  border-radius: 50%;
  box-shadow: 0 10px 15px -3px rgba(66, 105, 215, 0.5),
    0 4px 6px -4px rgba(66, 105, 215, 0.5);
  display: flex;
  cursor: pointer;
`;

export const CollapseButtonImageContainer = styled("img")`
  src: ${(props) => props?.src};
  height: ${(props) => props?.height};
  width: ${(props) => props?.width};
  transition: src 0.5s;
`;
export const UserInfoContainer = styled(Box)`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const MenuListContainer = styled(Box)`
width: 100%;
margin-top: 40px;
padding: 0px 8px;
}
`;
export const MenuListItemLogoContainer = styled(Box)`
height: 100%;
padding: 1px;
margin: 1px;
margin-right: 0.5em;
display: flex;
justify-content: center;
align-items: center;  
}`;

export const MenuListItemLogo = styled("img")`
  height: 1.25em;
  src: ${(props) => props?.src};
`;

export const MenuListItemArrow = styled("img")`
  height: 1em;
  max-height: 100%;
  src: ${(props) => props?.src};
  display: ${(props) => props?.display};
  transition: all 1.5s;
`;

export const MenuListItemLeftContainer = styled(Box)`
  display: flex;
  height: 100%;
`;
export const MenuListItemTitle = styled(Box)`
  align-items: center;
  line-height: 1.5em;
  padding: 1px;
  margin: 1px;  
  display: ${(props) => props?.display};
  opacity: ${(props) => props?.opacity};
  transition: opacity 15s ease-out;
  font-family: ProimaNova, sans-serif;
}`;

export const MenuListItem = styled(Box)`
width: 100%;
height: 2.5em;
padding: 8px;
margin-top: 8px;
display: flex;
align-items: center;
justify-content: space-between;
border-radius: 6px;
font-weight: 500;
color: ${(props) => (props.selected ? "#FAFAFA" : "rgb(118, 118, 118)")};
background-color: ${(props) => (props.selected ? "#436AD6" : "#FAFAFA")};
cursor: pointer;
&:hover{
    background-color: #436AD6;
    color: #FAFAFA;
}
}`;

export const SubMenuListContainer = styled(Box)`
  border-bottom: 1px solid #dcdfe3;
  padding-top: 4px;
`;

export const SubMenuListItem = styled(Box)`
  width: 100%;
  height: 100%;
  padding: 4px 0px;
  padding-left: 40px;
  background-color: ${(props) => props?.backgroundColor};
  cursor: pointer;
  &:hover {
    background-color: rgb(229 231 235);
  }
`;
export const MenuListItemContainer = styled(Box)``;

export const SubMenuTitle = styled(Box)`
  color: rgb(75, 85, 99);
  font-weight: 300;
  line-height: 24px;
`;
// export const MenuListItemLogo = styled(Box)`

// }`

// export const MenuListItemLogo = styled(Box)`

// }`

// .menuListItem :hover{
//     color: #fff;
//     background-color: #436AD6;
// }
