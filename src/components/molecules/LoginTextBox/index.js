import React, { useState } from "react";
import {
  LoginTextBoxContainer,
  LoginTextBoxInput,
  LoginTextBoxErrorMessage,
} from "./styles.loginTextbox";

import { ERROR_MESSAGE } from "../../../validationChecks/validationChecks";

export const LoginTextBox = ({
  type = "text",
  margin = "0 0 1.3rem 0",
  placeholder = "",
  isRequired = false,
  onChange = () => void 0,
  validationCheck = () => void 0,
}) => {
  const [isValidationError, setIsValidationError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleRequiredInputField = (e) => {
    if (e?.target?.value?.trim()?.length == 0) {
      setIsValidationError(true);
      setErrorMessage(ERROR_MESSAGE?.FIELD_REQUIRED);
    }
  };

  const handleInputChange = (e) => {
    const validationResponse = validationCheck(e?.target?.value);
    setIsValidationError(validationResponse?.isError);
    setErrorMessage(validationResponse?.errorMessage);
    onChange({
      value: e?.target?.value,
      isError: validationResponse?.isError,
    });
  };
  return (
    <LoginTextBoxContainer margin={margin}>
      <LoginTextBoxInput
        type={type}
        placeholder={placeholder}
        onChange={handleInputChange}
        onBlur={isRequired ? handleRequiredInputField : () => void 0}
      />
      {isValidationError && (
        <LoginTextBoxErrorMessage>{errorMessage}</LoginTextBoxErrorMessage>
      )}
    </LoginTextBoxContainer>
  );
};
