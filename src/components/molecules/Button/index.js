import React from "react";
import Box from "../../atoms/box.atom";
import { ButtonContainer, ButtonIconContainer } from "./styles.button";

export const Button = ({
  buttonTitle = "",
  disabled = false,
  type = "",
  width = "",
  height = "",
  bgColor = "",
  border = "",
  borderRadius = "5px",
  color = "",
  padding = "",
  margin = "",
  buttonIcon = "",
  iconHeight = "",
  handleButtonClick = () => void 0,
}) => {
  return (
    <ButtonContainer
      height={height}
      width={width}
      border={border}
      borderRadius={borderRadius}
      disabled={disabled}
      color={color}
      bgColor={bgColor}
      padding={padding}
      margin={margin}
      onClick={handleButtonClick}
      justifyContent={buttonIcon ? "space-between" : "center"}
    >
      {buttonIcon && (
        <ButtonIconContainer src={buttonIcon} height={iconHeight} />
      )}
      {buttonTitle}
    </ButtonContainer>
  );
};

//export const buttonTpes = {
//     PRIMARY: "Primary",
//     OUTLINE: "",

// }
