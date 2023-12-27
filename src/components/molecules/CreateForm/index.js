import React, { useReducer, useRef, useState } from "react";
import { FormContainer } from "./styles.create-form";
import { Textbox } from "../TextBox";
import { Button } from "../Button";
import Box from "../../atoms/box.atom";
import { formConstants } from "./createFormConstants";
import Dropdown from "../Dropdown";
import { userTypeDropDownMockData } from "../../../mockData/mockdata";
import AddIcon from "../../../assets/addIcon.png";
import {
  isEmailValidCheck,
  isFirstNameValidCheck,
  isLastNameValidCheck,
  isNameValidCheck,
  isPasswordValidCheck,
} from "./validationCheck";
import { useCsrfToken } from "../../../utils/useCsrfToken";
import { NAV_CONFIG, REQUEST_TYPES } from "../../../constants/navConfig";
import { useNavigate } from "react-router-dom";
import {
  AUTHORITIES,
  ERROR_CODES,
  TOAST_TYPE,
} from "../../../constants/errorCodesMessages";
import { ToggleButton } from "../ToggleButton";
import { constantStrings } from "../../../constants/magicString";
import { REQUEST_MESSAGES } from "../../../constants/errorCodesMessages";
import { toast } from "react-toastify";

export const CreateForm = ({
  formFields = {},
  formSubmitButtonTitle = "Add User",
  //  handleFormSubmitButton = () => void 0,
  fieldRequired = {},
  response = {},
}) => {
  const [isRequestInProgress, setIsRequestInProgress] = useState(false);
  const { makeRequestWithCSRFToken } = useCsrfToken();
  const navigate = useNavigate();
  const toastId = useRef(null);

  const initialFormResponse = {
    name: "",
    firstName: "",
    lastName: "",
    email: "",
    pwd: "",
    userType: "",
  };

  const [responseFieldValid, setResponseFieldValid] = useState({
    isUserTypeValid: false,
    isFirstNameValid: false,
    isLastNameValid: false,
    isNameValid: false,
    isEmailValid: false,
    isPasswordValid: false,
  });

  const ACTIONS = {
    UPDATE_FIRST_NAME: "updateFirstName",
    UPDATE_LAST_NAME: "updateLastName",
    UPDATE_NAME: "updateName",
    UPDATE_EMAIL: "updateEmail",
    UPDATE_PASSWORD: "updatePassword",
    UPDATE_USER_TYPE: "updateUserType",
  };

  const formResponseReducer = (state, action) => {
    switch (action?.type) {
      case ACTIONS?.UPDATE_FIRST_NAME:
        setResponseFieldValid({
          ...responseFieldValid,
          isFirstNameValid: !action?.payload?.isError,
        });
        return { ...state, firstName: action?.payload?.value };
      case ACTIONS?.UPDATE_LAST_NAME:
        setResponseFieldValid({
          ...responseFieldValid,
          isLastNameValid: !action?.payload?.isError,
        });
        return { ...state, lastName: action?.payload?.value };
      case ACTIONS?.UPDATE_NAME:
        setResponseFieldValid({
          ...responseFieldValid,
          isNameValid: !action?.payload?.isError,
        });
        return { ...state, name: action?.payload?.value };
      case ACTIONS?.UPDATE_EMAIL:
        setResponseFieldValid({
          ...responseFieldValid,
          isEmailValid: !action?.payload?.isError,
        });
        return { ...state, email: action?.payload?.value };
      case ACTIONS?.UPDATE_PASSWORD:
        setResponseFieldValid({
          ...responseFieldValid,
          isPasswordValid: !action?.payload?.isError,
        });
        return { ...state, pwd: action?.payload?.value };
      case ACTIONS?.UPDATE_USER_TYPE:
        setResponseFieldValid({
          ...responseFieldValid,
          isUserTypeValid: !action?.payload?.isError,
        });
        return { ...state, userType: action?.payload?.title };
    }
  };

  const [formResponseState, formResponseDispatch] = useReducer(
    formResponseReducer,
    initialFormResponse
  );

  const handleFormSubmitButton = () => {
    setIsRequestInProgress(false);
    console.log(JSON.stringify(formResponseState));
    makeRequestWithCSRFToken({
      api: "/register",
      requestType: REQUEST_TYPES?.POST,
      data: formResponseState,
      getResponseFlag: true,
      authority: AUTHORITIES?.CREATEUSER,
      expectedResponseCode: ERROR_CODES?.CREATED,
      successMessage: REQUEST_MESSAGES?.SUCCESSFULLY_CREATED,
      failureMessage: REQUEST_MESSAGES?.SOMETHING_WENT_WRONG,
      getResponse: (response) => {
        console.log(response);
        if (response?.status == ERROR_CODES?.CREATED) {
          toast.success(response?.result?.message);
        } else {
          toast.error(response?.result?.message);
        }
      },
      successAction: (response) => {
        console.log(response, "inside .then");

        if (response?.status != ERROR_CODES?.CREATED) {
          console.log("inside .then if error block");
        } else {
          console.log("inside .then if ok block");
          navigate(NAV_CONFIG?.NAV_USER_PAGE);
        }
      },
      failureAction: (error) => {
        toast.error(error?.message);
        console.log("inside .catch block createform", error);
      },
    });
  };
  const checkDisabled = () => {
    if (
      responseFieldValid?.isPasswordValid &&
      responseFieldValid?.isEmailValid &&
      responseFieldValid?.isFirstNameValid &&
      responseFieldValid?.isLastNameValid &&
      responseFieldValid?.isUserTypeValid &&
      responseFieldValid?.isNameValid
    ) {
      return false;
    }
    return true;
  };
  return (
    <FormContainer>
      <Box width="100%" mb="1em">
        <Dropdown
          isRequired={true}
          title={formConstants?.title?.selectUserType}
          dropdownItems={userTypeDropDownMockData}
          onItemSelect={(userTypePayload) => {
            formResponseDispatch({
              type: ACTIONS?.UPDATE_USER_TYPE,
              payload: userTypePayload,
            });
          }}
        />
      </Box>
      {/* Personal Information */}
      <Box width="100%">
        <Box display="flex" justifyContent="space-between">
          <Textbox
            width="40%"
            textBoxTitle={formConstants?.title?.firstName}
            placeholder={formConstants?.placeholder?.firstName}
            validationCheck={isFirstNameValidCheck}
            isRequired={true}
            onPayloadChange={(firstNamePayload) => {
              formResponseDispatch({
                type: ACTIONS?.UPDATE_FIRST_NAME,
                payload: firstNamePayload,
              });
            }}
          />
          <Textbox
            width="40%"
            textBoxTitle={formConstants?.title?.lastName}
            placeholder={formConstants?.placeholder?.lastName}
            validationCheck={isLastNameValidCheck}
            isRequired={true}
            onPayloadChange={(lastNamePayload) => {
              formResponseDispatch({
                type: ACTIONS?.UPDATE_LAST_NAME,
                payload: lastNamePayload,
              });
            }}
          />
        </Box>
        <Textbox
          textBoxTitle={formConstants?.title?.name}
          placeholder={formConstants?.placeholder?.name}
          validationCheck={isNameValidCheck}
          isRequired={true}
          onPayloadChange={(namePayload) => {
            formResponseDispatch({
              type: ACTIONS?.UPDATE_NAME,
              payload: namePayload,
            });
          }}
        />
        <Box display="flex" justifyContent="space-between">
          <Textbox
            width="40%"
            textBoxTitle={formConstants?.title?.email}
            placeholder={formConstants?.placeholder?.email}
            validationCheck={isEmailValidCheck}
            isRequired={true}
            onPayloadChange={(emailPayload) => {
              formResponseDispatch({
                type: ACTIONS?.UPDATE_EMAIL,
                payload: emailPayload,
              });
            }}
          />
          <Textbox
            type="password"
            width="40%"
            textBoxTitle={formConstants?.title?.password}
            placeholder={formConstants?.placeholder?.password}
            validationCheck={isPasswordValidCheck}
            isRequired={true}
            onPayloadChange={(passwordPayload) => {
              formResponseDispatch({
                type: ACTIONS?.UPDATE_PASSWORD,
                payload: passwordPayload,
              });
            }}
          />
        </Box>
      </Box>
      <Box width="100%" display="flex" justifyContent="center" mt="20px">
        <Button
          margin="0 0 0 2.5rem"
          height="2.75rem"
          width="9rem"
          buttonTitle={formSubmitButtonTitle}
          handleButtonClick={handleFormSubmitButton}
          padding={"0.5rem 1.5rem"}
          buttonIcon={AddIcon}
          iconHeight={"16px"}
          disabled={checkDisabled()}
        />
      </Box>
    </FormContainer>
  );
};
