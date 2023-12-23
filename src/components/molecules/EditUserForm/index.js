import React, { useReducer, useState } from "react";
import { FormContainer } from "../CreateForm/styles.create-form";
import { Textbox } from "../TextBox";
import { Button } from "../Button";
import Box from "../../atoms/box.atom";
import { formConstants } from "../CreateForm/createFormConstants";
import Dropdown from "../Dropdown";
import { userTypeDropDownMockData } from "../../../mockData/mockdata";
import AddIcon from "../../../assets/addIcon.png";
import {
  isEmailValidCheck,
  isFirstNameValidCheck,
  isLastNameValidCheck,
  isNameValidCheck,
  isPasswordValidCheck,
} from "../CreateForm/validationCheck";
import { useCsrfToken } from "../../../utils/useCsrfToken";
import { NAV_CONFIG, REQUEST_TYPES } from "../../../constants/navConfig";
import { useNavigate } from "react-router-dom";
import { ERROR_CODES } from "../../../constants/errorCodesMessages";

export const EditUserForm = ({
  formSubmitButtonTitle = "Edit User",
  userData = JSON.parse(localStorage.getItem("editableData")),
}) => {
  const initialFormResponse = {
    id: "USE-22Dec2023053133898",
    name: "random",
    firstName: "random",
    lastName: "fields",
    email: "random@gmail.com",
    userType: "User",
    recordStatus: 1,
    tenant: null,
    organization: null,
  };
  // const initialFormResponse = {
  //   name: "",
  //   firstName: "",
  //   lastName: "",
  //   email: "",
  //   pwd: "",
  //   userType: "",
  // };

  const { makeRequestWithCSRFToken } = useCsrfToken();
  const navigate = useNavigate();

  const [responseFieldValid, setResponseFieldValid] = useState({
    isUserTypeValid: true,
    isFirstNameValid: true,
    isLastNameValid: true,
    isNameValid: true,
    isEmailValid: true,
  });

  const ACTIONS = {
    UPDATE_FIRST_NAME: "updateFirstName",
    UPDATE_LAST_NAME: "updateLastName",
    UPDATE_NAME: "updateName",
    UPDATE_EMAIL: "updateEmail",
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
    userData
  );

  const handleFormSubmitButton = () => {
    console.log(JSON.stringify(formResponseState));

    const id = formResponseState?.id;
    delete formResponseState?.id;

    makeRequestWithCSRFToken({
      api: "/user",
      requestType: REQUEST_TYPES?.PUT,
      id: id,
      data: formResponseState,
      getResponseFlag: false,
      getResponse: (response) => {
        alert(response?.message);
      },
      successAction: (response) => {
        console.log(response, "inside .then edit user form");

        if (response?.status != ERROR_CODES?.OK) {
          alert("couldn't create one, don't have authorities");
          console.log("inside .then if error block edit user form");
        } else {
          alert("successfully edited");
          console.log("inside .then if ok block edit user form");
          navigate(NAV_CONFIG?.NAV_USER_PAGE);
        }
      },
      failureAction: (error) => {
        alert(error);
        console.log("inside .catch block createform", error);
      },
    });
  };
  const checkDisabled = () => {
    if (
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
      <Box width="100%">
        {/* immutable data */}
        <Box borderBottom="3px solid rgb(229, 231, 235)" pb="1rem">
          <Textbox
            value={userData?.id}
            readOnly={true}
            textBoxTitle={formConstants?.title?.id}
          />
        </Box>
        {/* mutable */}
        <Box pt="1.5rem">
          <Box display="flex" justifyContent="space-between">
            <Textbox
              value={userData?.firstName}
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
              value={userData?.lastName}
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
          <Box width="100%" mb="1rem">
            <Dropdown
              title={formConstants?.title?.selectUserType}
              dropdownItems={userTypeDropDownMockData}
              dropdownFieldBoxHeader={userData?.userType}
              onItemSelect={(userTypePayload) => {
                formResponseDispatch({
                  type: ACTIONS?.UPDATE_USER_TYPE,
                  payload: userTypePayload,
                });
              }}
            />
          </Box>

          <Box display="flex" justifyContent="space-between">
            <Textbox
              value={userData?.email}
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
              value={userData?.name}
              width="40%"
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
          </Box>
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
