import React, { useState, useReducer, useEffect } from "react";
import { Button } from "../../../molecules/Button";
import { useNavigate } from "react-router-dom";
import { NAV_CONFIG, REQUEST_TYPES } from "../../../../constants/navConfig";
import LoginPageImage from "../../../../assets/landing-page-image.png";
import BackgroundVector from "../../../../assets/background-vector.png";
import EasyComplyLogo from "../../../../assets/easyComply.png";
import GoBack from "../../../../assets/goBack.png";
import {
  LeftContainer,
  LoginPageContainer,
  RightContainer,
  LoginCard,
  LoginCardHeaderContainer,
  LoginCardHeader,
  LoginCardSubHeader,
  LoginCardBodyContainer,
  LoginCardButtonContainer,
  LeftContainerHeader,
  LeftContainerSubHeader,
  LeftContainerCard,
  LoginCardContainer,
  BottomContainer,
  BottomContainerText,
  BackgroundVectorContainer,
  LogoContainer,
  LoginCardGoBackContainer,
  LoginCardGoBackContainerText,
} from "./styles.login-page";
import {
  LOGIN_CARD_VALUES,
  LOGIN_FORM_RESPONSE,
  initialLoginformResponse,
  initialRequestPasswordFormResponse,
  LOGIN_PAGE_LEFT_CONTAINER_VALUES,
  LOGIN_FORM_ACTIONS,
  MAIN_LOGIN_PAGE_VALUES,
  FORGOT_PASSWORD_PAGE_VALUES,
  initialLoginFormResponseValid,
  REQUEST_PASSWORD_FORM_ACTIONS,
  initialRequestPasswordFormResponseValid,
} from "./loginPageConstants";
import {
  emailIdVaildation,
  passwordValidation,
} from "./loginPageValidationCheck";
import { LoginTextBox } from "../../../molecules/LoginTextBox";
import { LoginPageCard } from "../../../molecules/LoginPageCard";
import { fieldRequiredCheck } from "../../../../validationChecks/validationChecks";
import { useCsrfToken } from "../../../../utils/useCsrfToken";
import { ERROR_CODES } from "../../../../constants/errorCodesMessages";
import { constantStrings } from "../../../../constants/magicString";

export const LoginPage = () => {
  const navigate = useNavigate();
  const [rememberMeActive, setRememberMeActive] = useState(false);
  const [requestError, setRequestError] = useState(null);

  // useEffect(() => {
  //   console.log(requestError);
  // }, [requestError]);
  const { postLoginCredentialsRequest, setCsrfToken } = useCsrfToken();

  const [isForgotPasswordPanel, setIsForgotPasswordPanel] = useState(false);

  const [loginCardValues, setLoginCardValues] = useState(LOGIN_FORM_RESPONSE);

  const [loginFormResponseStateValid, setLoginFormResponseStateValid] =
    useState(initialLoginFormResponseValid);

  const loginFormResponseReducer = (state, action) => {
    switch (action?.type) {
      case LOGIN_FORM_ACTIONS?.UPDATE_EMAIL:
        setLoginFormResponseStateValid({
          ...loginFormResponseStateValid,
          isEmailValid: !action?.payload?.isError,
        });

        return { ...state, username: action?.payload?.value };
      case LOGIN_FORM_ACTIONS?.UPDATE_PASSWORD:
        setLoginFormResponseStateValid({
          ...loginFormResponseStateValid,
          isPasswordValid: !action?.payload?.isError,
        });
        return { ...state, password: action?.payload?.value };
      case LOGIN_FORM_ACTIONS?.RESET_LOGIN_FORM:
        setLoginFormResponseStateValid(initialLoginFormResponseValid);

        return { ...state, ...initialLoginformResponse };
    }
  };
  const [loginFormResponseState, loginFormResponseDispatch] = useReducer(
    loginFormResponseReducer,
    initialLoginformResponse
  );

  const [
    requestPasswordFormResponseStateValid,
    setRequestPasswordFormResponseStateValid,
  ] = useState(initialRequestPasswordFormResponseValid);

  const requestPasswordFormResponseReducer = (state, action) => {
    switch (action?.type) {
      case REQUEST_PASSWORD_FORM_ACTIONS?.UPDATE_USERNAME:
        setRequestPasswordFormResponseStateValid({
          ...requestPasswordFormResponseStateValid,
          isUsernameValid: !action?.payload?.isError,
        });
        return { ...state, userName: action?.payload?.value };
      case REQUEST_PASSWORD_FORM_ACTIONS?.UPDATE_WORK_EMAIL_ID:
        setRequestPasswordFormResponseStateValid({
          ...requestPasswordFormResponseStateValid,
          isEmailIdValid: !action?.payload?.isError,
        });
        return { ...state, workEmailId: action?.payload?.value };
      case REQUEST_PASSWORD_FORM_ACTIONS?.RESET_REQUEST_PASSWORD_FORM:
        setRequestPasswordFormResponseStateValid(
          initialRequestPasswordFormResponseValid
        );
        return { ...state, ...initialRequestPasswordFormResponse };
    }
  };
  const [
    requestPasswordFormResponseState,
    requestPasswordFormResponseDispatch,
  ] = useReducer(
    requestPasswordFormResponseReducer,
    initialRequestPasswordFormResponse
  );

  const handleLoginClick = () => {
    console.log(loginFormResponseState, "checking the flow 1");
    postLoginCredentialsRequest({
      loginCredentails: loginFormResponseState,
      successfulLoginAction: (response) => {
        console.log(response, "in successful login");
        setRequestError(null);
      //  navigate(NAV_CONFIG?.NAV_USER_PAGE);
        setTimeout(() => {
          navigate(NAV_CONFIG?.NAV_USER_PAGE);
        }, 3000);
      },
      failedLoginAction: (errorMessage) => {
        console.error("failedAction", errorMessage);
        setRequestError({ value: true, message: errorMessage });
      },
    });
  };

  const handleRequestPasswordClick = () => {
    console.log(requestPasswordFormResponseState, "Request Password");
  };

  const checkLoginButtonDisabled = () => {
    if (
      loginFormResponseStateValid?.isEmailValid &&
      loginFormResponseStateValid?.isPasswordValid
    ) {
      return false;
    } else {
      return true;
    }
  };

  const checkRequestPasswordButtonDisabled = () => {
    if (
      requestPasswordFormResponseStateValid?.isUsernameValid &&
      requestPasswordFormResponseStateValid?.isEmailIdValid
    ) {
      return false;
    } else {
      return true;
    }
  };

  const handleRememberMeCheckbox = () => {
    setRememberMeActive(!rememberMeActive);
  };
  const handleForgotPasswordClick = () => {
    setIsForgotPasswordPanel(true);
    loginFormResponseDispatch({
      type: LOGIN_FORM_ACTIONS?.RESET_LOGIN_FORM,
    });
    requestPasswordFormResponseDispatch({
      type: REQUEST_PASSWORD_FORM_ACTIONS?.RESET_REQUEST_PASSWORD_FORM,
    });
    setLoginCardValues(FORGOT_PASSWORD_PAGE_VALUES);
  };

  const handleGoBackClick = () => {
    setIsForgotPasswordPanel(false);
    loginFormResponseDispatch({
      type: LOGIN_FORM_ACTIONS?.RESET_LOGIN_FORM,
    });
    requestPasswordFormResponseDispatch({
      type: REQUEST_PASSWORD_FORM_ACTIONS?.RESET_REQUEST_PASSWORD_FORM,
    });
    setLoginCardValues(MAIN_LOGIN_PAGE_VALUES);
  };

  const loginBodyMainPageContainer = (
    <>
      <LoginTextBox
        type={"text"}
        margin="0 0 1.3rem 0"
        placeholder={LOGIN_CARD_VALUES?.LOGIN_BODY_MAIN_EMAIL}
        isRequired={true}
        handleIsRequired={(errorStatus) => {
          setLoginFormResponseStateValid({
            ...loginFormResponseStateValid,
            isEmailValid: !errorStatus,
          });
        }}
        validationCheck={emailIdVaildation}
        onChange={(payload) => {
          loginFormResponseDispatch({
            type: LOGIN_FORM_ACTIONS?.UPDATE_EMAIL,
            payload: payload,
          });
        }}
      />

      <LoginTextBox
        type={"password"}
        margin="0 0 1.3rem 0"
        placeholder={LOGIN_CARD_VALUES?.LOGIN_BODY_MAIN_PASSWORD}
        isRequired={true}
        handleIsRequired={(errorStatus) => {
          setLoginFormResponseStateValid({
            ...loginFormResponseStateValid,
            isPasswordValid: !errorStatus,
          });
        }}
        validationCheck={passwordValidation}
        onChange={(payload) => {
          loginFormResponseDispatch({
            type: LOGIN_FORM_ACTIONS?.UPDATE_PASSWORD,
            payload: payload,
          });
        }}
      />
    </>
  );

  const requestPasswordBodyMainPageContainer = (
    <>
      <LoginTextBox
        type={"text"}
        margin="0 0 1.3rem 0"
        placeholder={LOGIN_CARD_VALUES?.FORGOT_PASSWORD_BODY_MAIN_USERNAME}
        isRequired={true}
        validationCheck={fieldRequiredCheck}
        onChange={(payload) => {
          requestPasswordFormResponseDispatch({
            type: REQUEST_PASSWORD_FORM_ACTIONS?.UPDATE_USERNAME,
            payload: payload,
          });
        }}
      />
      <LoginTextBox
        type={"text"}
        margin="0 0 1.3rem 0"
        placeholder={LOGIN_CARD_VALUES?.FORGOT_PASSWORD_BODY_MAIN_EMAIL}
        isRequired={true}
        validationCheck={emailIdVaildation}
        onChange={(payload) => {
          requestPasswordFormResponseDispatch({
            type: REQUEST_PASSWORD_FORM_ACTIONS?.UPDATE_WORK_EMAIL_ID,
            payload: payload,
          });
        }}
      />
    </>
  );

  useEffect(() => {
    if (
      sessionStorage?.getItem(constantStrings?.TOKEN) &&
      sessionStorage?.getItem(constantStrings?.TOKEN) != null
    ) {
      navigate(NAV_CONFIG?.NAV_USER_PAGE);
    }
    setLoginCardValues({ ...loginCardValues, ...MAIN_LOGIN_PAGE_VALUES });
  }, []);

  return (
    <LoginPageContainer>
      <BackgroundVectorContainer>
        <img src={BackgroundVector} width="100%" />
      </BackgroundVectorContainer>
      <LeftContainer>
        <LogoContainer>
          <img src={EasyComplyLogo} width="100%" />
        </LogoContainer>
        <LeftContainerCard>
          <img src={LoginPageImage} width="100%" />

          <LeftContainerHeader>
            {LOGIN_PAGE_LEFT_CONTAINER_VALUES?.HEADER_PART_1}
            <span style={{ color: "rgba(66, 105, 215, 1)" }}>
              {LOGIN_PAGE_LEFT_CONTAINER_VALUES?.HEADER_PART_2}
            </span>
          </LeftContainerHeader>
          <LeftContainerSubHeader>
            {LOGIN_PAGE_LEFT_CONTAINER_VALUES?.SUBHEADER}
          </LeftContainerSubHeader>
        </LeftContainerCard>
      </LeftContainer>
      <RightContainer>
        {!isForgotPasswordPanel && (
          <LoginPageCard
            isError={requestError?.value}
            errorMessage={requestError?.message}
            showGoBackPanel={false}
            showBottomContainer={true}
            loginCardBodyContainer={loginBodyMainPageContainer}
            header={MAIN_LOGIN_PAGE_VALUES?.HEADER}
            subHeader={MAIN_LOGIN_PAGE_VALUES?.SUBHEADER}
            rememberMeText={LOGIN_CARD_VALUES?.REMEMBER_ME}
            forgotPasswordText={LOGIN_CARD_VALUES?.FORGOT_PASSWORD}
            buttonText={MAIN_LOGIN_PAGE_VALUES?.BUTTON}
            margin="2.25rem 0 0 0"
            handleRememberMeCheckbox={handleRememberMeCheckbox}
            handleForgotPasswordClick={handleForgotPasswordClick}
            handleFormSubmissionClick={handleLoginClick}
            checkButtonDisabled={checkLoginButtonDisabled}
          />
        )}
        {isForgotPasswordPanel && (
          <LoginPageCard
            showGoBackPanel={true}
            showBottomContainer={false}
            loginCardBodyContainer={requestPasswordBodyMainPageContainer}
            header={FORGOT_PASSWORD_PAGE_VALUES?.HEADER}
            subHeader={FORGOT_PASSWORD_PAGE_VALUES?.SUBHEADER}
            goBackText={LOGIN_CARD_VALUES?.GO_BACK}
            buttonText={FORGOT_PASSWORD_PAGE_VALUES?.BUTTON}
            margin="2.25rem 0 0 0"
            handleGoBackClick={handleGoBackClick}
            handleFormSubmissionClick={handleRequestPasswordClick}
            checkButtonDisabled={checkRequestPasswordButtonDisabled}
          />
        )}
      </RightContainer>
    </LoginPageContainer>
  );
};
