import React, { useState } from "react";
import { ToggleButtonContainer, ToggleButtonSlider } from "./styles.toggle";

// const TOGGLE_CONSTANTS = {
//   ACTIVE: "active",
//   INACTIVE: "inactive",
// };
export const ToggleButton = ({
  initialState = false,
  width = "3rem",
  height = "1.75rem",
  sliderRadius = "1.5rem",
  padding = "0.125rem",
  onToggleClick = () => void 0,
}) => {
  const [isToggleActive, setIsToggleActive] = useState(initialState);

  const toggleClickHandler = (e) => {
    onToggleClick(!isToggleActive);
    setIsToggleActive(!isToggleActive);
  };
  console.log((height - sliderRadius) / 2);
  return (
    <ToggleButtonContainer
      width={width}
      height={height}
      padding={padding}
      isActive={isToggleActive}
      onClick={toggleClickHandler}
    >
      <ToggleButtonSlider
        padding={padding}
        translateLength={width}
        sliderRadius={sliderRadius}
        isActive={isToggleActive}
      />
    </ToggleButtonContainer>
  );
};
