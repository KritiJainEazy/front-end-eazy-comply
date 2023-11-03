import React, { useReducer, useState } from "react";
import { FormContainer } from "./styles.create-form";
import { Textbox } from "../TextBox";
import { Button } from "../Button";
import Box from "../../atoms/box.atom";
import { formConstants } from "./createFormConstants";
import Dropdown from "../Dropdown";
import { tenantDropdownMockdata } from "../../../mockData/mockdata";
import AddIcon from "../../../assets/addIcon.png";
import {
  isEmailValidCheck,
  isFirstNameValidCheck,
  isLastNameValidCheck,
  isUsernameValidCheck,
} from "./validationCheck";

export const CreateForm = ({
  formFields = {},
  formSubmitButtonTitle = "Add User",
  //  handleFormSubmitButton = () => void 0,
  fieldRequired = {},
  response = {},
}) => {
  const res = {
    tenantName: {
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
    TENANT_NAME: "tenantName",
    FIRST_NAME: "firstName",
    LAST_NAME: "lastName",
    USERNAME: "userName",
    EMAIL: "email",
    CONTACT: "contact",
  };

  const responseToBeSubmitted = {
    tenantName: "",
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    contact: "",
  };

  const [responseFieldValid, setResponseFieldValid] = useState({
    isTenantNameValid: false,
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
    UPDATE_TENANT_NAME: "updateTenantName",
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
      case ACTIONS?.UPDATE_TENANT_NAME:
        setResponseFieldValid({
          ...responseFieldValid,
          isTenantNameValid: !action?.payload?.isError,
        });
        return { ...state, tenantName: action?.payload?.value };
    }
  };

  const [formResponseState, formResponseDispatch] = useReducer(
    formResponseReducer,
    responseToBeSubmitted
  );

  const handleFormSubmitButton = () => {
    console.log(formResponseState);
  };
  const checkDisabled = () => {
    if (
      responseFieldValid?.isContactValid &&
      responseFieldValid?.isEmailValid &&
      responseFieldValid?.isFirstNameValid &&
      responseFieldValid?.isLastNameValid &&
      responseFieldValid?.isTenantNameValid &&
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
          title={formConstants?.title?.selectTenantName}
          dropdownItems={tenantDropdownMockdata}
          onItemSelect={(tenantNamePayload) => {
            formResponseDispatch({
              type: ACTIONS?.UPDATE_TENANT_NAME,
              payload: tenantNamePayload,
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
          margin="0 0 0 2.5em"
          height="28px"
          width="98px"
          buttonTitle={formSubmitButtonTitle}
          handleButtonClick={handleFormSubmitButton}
          padding={"8px 24px"}
          buttonIcon={AddIcon}
          iconHeight={"16px"}
          disabled={checkDisabled()}
        />
      </Box>
    </FormContainer>
  );
};
