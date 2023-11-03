import styled from "@emotion/styled";
import Box from "../../atoms/box.atom";

export const MultiFoldDropDownContainer = styled(Box)`
  width: ${(props) => props.width || "100%"};
  height: ${(props) => props.height || "100%"};
  margin-top: 10px;
  padding: 0px 4px;
`;

export const MultiFoldDropDownTitle = styled(Box)``;

export const MultiFoldDropDownLogo = styled("img")`
  max-height: 100%;
`;

export const MultiFoldDropDownListItems = styled(Box)``;

export const MenuListItemLogoContainer = styled(Box)`
height: 100%;
padding: 1px;
margin: 1px;
display: flex;
justify-content: center;
align-items: center;  
}`;

export const MenuListItemLogo = styled("img")`
  max-height: 100%;
  src: ${(props) => props?.src};
`;

export const MenuListItemArrow = styled("img")`
  max-height: 100%;
  src: ${(props) => props?.src};
`;

export const MenuListItemLeftContainer = styled(Box)`
  display: flex;
  height: 100%;
`;
export const MenuListItemTitle = styled(Box)`
padding: 1px;
margin: 1px;  
}`;

export const MenuListItem = styled(Box)`
width: 100%;
height: 2em;
padding: 2px;
margin: 4px 0px;
display: flex;
align-items: center;
justify-content: space-between;
padding-left: 1em;
border-radius: 7px;
color: ${(props) => (props.selected ? "#FAFAFA" : "#767676")};
background-color: ${(props) => (props.selected ? "#436AD6" : "#FAFAFA")};
cursor: pointer;
&:hover{
    background-color: #436AD6;
    color: #FAFAFA;
}
transition: all 0.5s ease-out;
}`;

export const SubMenuListItem = styled(Box)`
    
`;
