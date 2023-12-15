// import styled from "styled-components";
// import Box from "../../atoms/box.atom";

// export const ToggleButtonContainer = styled(Box)`
//   height: 1.75rem;
//   width: 3rem;
//   border-radius: ${(props) => props?.borderRadius || "1.75rem"};
//   display: flex;
//   padding: 0.125rem;
//   cursor: pointer;
//   background-color: ${(props) => (props?.isActive ? "green" : "red")};
//   align-items: center;
//   transition: all 0.2s ease-in-out;
//   position: relative;
// `;

// export const ToggleButtonSlider = styled(Box)`
//   height: 1.5rem;
//   width: 1.5rem;
//   border-radius: 50%;
//   transition: all 0.3s ease-in-out;
//   position: absolute;
//   left: ${(props) => (props?.isActive ? "1.375rem" : "0.125rem")};
//   background-color: ${(props) => props?.backgroundColor || "#fff"};
// `;
//  padding: ${(props) =>
//     `calc((${props?.height} - ${props?.sliderRadius}) / 2})`};

import styled from "styled-components";
import Box from "../../atoms/box.atom";

export const ToggleButtonContainer = styled(Box)`
  height: ${(props) => props?.height};
  width: ${(props) => props?.width};
  border-radius: ${(props) => props?.height};
  display: flex;
  padding: ${(props) => props?.padding};
  cursor: pointer;
  background-color: ${(props) =>
    props?.isActive ? "rgb(4,170,109)" : "rgb(253,69,72)"};
  align-items: center;
  transition: all 0.2s ease-in-out;
  position: relative;
`;

export const ToggleButtonSlider = styled(Box)`
  height: ${(props) => props?.sliderRadius};
  width: ${(props) => props?.sliderRadius};
  border-radius: 50%;
  transition: all 0.3s ease-in-out;
  position: absolute;
  left: ${(props) =>
    props?.isActive
      ? `calc(${props?.translateLength} - ${props?.sliderRadius} - ${props?.padding})`
      : props?.padding};
  background-color: ${(props) => props?.backgroundColor || "#fff"};
`;
