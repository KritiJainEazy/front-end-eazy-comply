import React from "react";
import Box from "../../atoms/box.atom";
import { ButtonContainer, ButtonIconContainer } from "./styles.button";
import { fontSize } from "styled-system";

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
  fontSize = "",
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
      justifyContent={buttonIcon ? "space-around" : "center"}
      fontSize={fontSize}
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
