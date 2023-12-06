import React, { useReducer, useState } from "react";
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
  isUsernameValidCheck,
} from "./validationCheck";
import { useCsrfToken } from "../../../utils/useCsrfToken";
import { NAV_CONFIG, REQUEST_TYPES } from "../../../constants/navConfig";

export const CreateForm = ({
  formFields = {},
  formSubmitButtonTitle = "Add User",
  //  handleFormSubmitButton = () => void 0,
  fieldRequired = {},
  response = {},
}) => {
  const { makeRequestWithCSRFToken } = useCsrfToken();
  const res = {
    userType: {
      value: "",
      isValid: true,
      isRequired: true,
    },
    firstName: {
      value: "",
      isValid: true,
      isRequired: true,
    },
    lastName: {
      value: "",
      isValid: true,
      isRequired: true,
    },
    userName: {
      value: "",
      isValid: true,
      isRequired: true,
    },
    email: {
      value: "",
      isValid: true,
      isRequired: true,
    },
    contact: {
      value: "",
      isValid: true,
      isRequired: true,
    },
  };
  const FIELD_NAMES = {
    USER_TYPE: "userType",
    FIRST_NAME: "firstName",
    LAST_NAME: "lastName",
    USERNAME: "userName",
    EMAIL: "email",
    CONTACT: "contact",
  };

  const responseToBeSubmitted = {
    userType: "",
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    contact: "",
  };

  const [responseFieldValid, setResponseFieldValid] = useState({
    isUserTypeValid: false,
    isFirstNameValid: false,
    isLastNameValid: false,
    isUserNameValid: false,
    isEmailValid: false,
    isContactValid: false,
  });

  const ACTIONS = {
    UPDATE_FIRST_NAME: "updateFirstName",
    UPDATE_LAST_NAME: "updateLastName",
    UPDATE_USERNAME: "updateUserName",
    UPDATE_EMAIL: "updateEmail",
    UPDATE_CONTACT: "updateContact",
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
      case ACTIONS?.UPDATE_USERNAME:
        setResponseFieldValid({
          ...responseFieldValid,
          isUserNameValid: !action?.payload?.isError,
        });
        return { ...state, userName: action?.payload?.value };
      case ACTIONS?.UPDATE_EMAIL:
        setResponseFieldValid({
          ...responseFieldValid,
          isEmailValid: !action?.payload?.isError,
        });
        return { ...state, email: action?.payload?.value };
      case ACTIONS?.UPDATE_CONTACT:
        setResponseFieldValid({
          ...responseFieldValid,
          isContactValid: !action?.payload?.isError,
        });
        return { ...state, contact: action?.payload?.value };
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
    responseToBeSubmitted
  );

  const handleFormSubmitButton = () => {
    console.log(formResponseState);
    makeRequestWithCSRFToken(
      `${NAV_CONFIG?.NAV_USER_PAGE}${NAV_CONFIG?.NAV_ADD_USER}`,
      REQUEST_TYPES?.POST,
      formResponseState
    );
  };
  const checkDisabled = () => {
    if (
      responseFieldValid?.isContactValid &&
      responseFieldValid?.isEmailValid &&
      responseFieldValid?.isFirstNameValid &&
      responseFieldValid?.isLastNameValid &&
      responseFieldValid?.isUserTypeValid &&
      responseFieldValid?.isUserNameValid
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
          textBoxTitle={formConstants?.title?.userName}
          placeholder={formConstants?.placeholder?.userName}
          validationCheck={isUsernameValidCheck}
          isRequired={true}
          onPayloadChange={(usernamePayload) => {
            formResponseDispatch({
              type: ACTIONS?.UPDATE_USERNAME,
              payload: usernamePayload,
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
            width="40%"
            textBoxTitle={formConstants?.title?.contact}
            placeholder={formConstants?.placeholder?.contact}
            isError={false}
            onPayloadChange={(contactPayload) => {
              formResponseDispatch({
                type: ACTIONS?.UPDATE_CONTACT,
                payload: contactPayload,
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
