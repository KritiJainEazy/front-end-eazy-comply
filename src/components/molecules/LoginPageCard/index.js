import React, { useState } from "react";
import {
  LoginCard,
  LoginCardContainer,
  LoginCardGoBackContainer,
  LoginCardGoBackContainerText,
  LoginCardHeaderContainer,
  LoginCardBodyContainer,
  LoginCardHeader,
  LoginCardSubHeader,
  BottomContainer,
  BottomContainerText,
  LoginCardErrorContainer,
} from "./styles.loginPageCard";

import { Button } from "../Button";
import Box from "../../atoms/box.atom";
import { CheckBoxInput } from "../Table/styles.table";
import GoBack from "../../../assets/goBack.png";

export const LoginPageCard = ({
  isError = false,
  errorMessage = "",
  showGoBackPanel = false,
  showBottomContainer = false,
  loginCardBodyContainer = <></>,
  header = "",
  subHeader = "",
  goBackText = "",
  rememberMeText = "",
  forgotPasswordText = "",
  buttonText = "",
  margin = "",
  handleGoBackClick = () => void 0,
  handleRememberMeCheckbox = () => void 0,
  handleForgotPasswordClick = () => void 0,
  handleFormSubmissionClick = () => void 0,
  checkButtonDisabled = () => void 0,
}) => {
  const [rememberMeActive, setRememberMeActive] = useState(false);
  return (
    <LoginCard isError={isError}>
      <LoginCardContainer>
        {showGoBackPanel && (
          <LoginCardGoBackContainer onClick={handleGoBackClick}>
            <img src={GoBack} height="100%" />
            <LoginCardGoBackContainerText>
              {goBackText}
            </LoginCardGoBackContainerText>
          </LoginCardGoBackContainer>
        )}

        <LoginCardHeaderContainer>
          <LoginCardHeader>{header}</LoginCardHeader>
          <LoginCardSubHeader>{subHeader}</LoginCardSubHeader>
        </LoginCardHeaderContainer>

        <LoginCardBodyContainer>
          {loginCardBodyContainer}
        </LoginCardBodyContainer>

        {showBottomContainer && (
          <BottomContainer>
            <Box display="flex" alignItems="center">
              <CheckBoxInput
                type="checkbox"
                width="1.2rem"
                height="1.2rem"
                checked={rememberMeActive}
                onChange={handleRememberMeCheckbox}
              />
              <BottomContainerText color="rgba(0,0,0,0.75)" ml="8px">
                {rememberMeText}
              </BottomContainerText>
            </Box>
            <BottomContainerText
              onClick={handleForgotPasswordClick}
              color="rgba(66, 105, 215, 1)"
              cursor="pointer"
            >
              {forgotPasswordText}
            </BottomContainerText>
          </BottomContainer>
        )}

        <Button
          buttonTitle={buttonText}
          disabled={checkButtonDisabled()}
          width="100%"
          height="2.5rem"
          borderRadius=".5rem"
          handleButtonClick={handleFormSubmissionClick}
          margin={margin}
          //   margin={isForgotPasswordPanel ? "1.4rem 0 0 0" : "2.25rem 0 0 0"}
        />
        {isError && (
          <LoginCardErrorContainer>{errorMessage}</LoginCardErrorContainer>
        )}
      </LoginCardContainer>
    </LoginCard>
  );
};
