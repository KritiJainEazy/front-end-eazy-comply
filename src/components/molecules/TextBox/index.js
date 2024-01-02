import React, { useState } from "react";
import {
  TextboxContainer,
  TextboxTitle,
  TextboxInputField,
  TextBoxErrorMessage,
} from "./styles.textbox";
import ERROR_MESSAGES from "../CreateForm/validationCheck";

export const Textbox = ({
  width = "100%",
  height = "100%",
  display = "block",
  textBoxTitle = "",
  placeholder = "",
  border = "none",
  padding = "",
  focusBorder = "",
  validationCheck = () => void 0,
  isRequired = false,
  onPayloadChange = () => void 0,
  type = "text",
  value = "",
  readOnly = false,
}) => {
  const [isValidationError, setIsValidationError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [inputValue, setInputValue] = useState(value);

  const handleRequiredInputField = (e) => {
    if (e?.target?.value?.trim()?.length == 0) {
      setIsValidationError(true);
      setErrorMessage(ERROR_MESSAGES?.fieldIsRequired);
    }
  };

  const handleInputChange = (e) => {
    setInputValue(e?.target?.value);
    const validationResponse = validationCheck(e?.target?.value);
    setIsValidationError(validationResponse?.isError);
    setErrorMessage(validationResponse?.errorMessage);
    onPayloadChange({
      value: e?.target?.value,
      isError: validationResponse?.isError,
    });
  };
  return (
    <TextboxContainer
      width={width}
      height={height}
      display={display}
      padding={padding}
      border={border}
    >
      {textBoxTitle && <TextboxTitle>{textBoxTitle}</TextboxTitle>}

      <TextboxInputField
        type={type}
        placeholder={placeholder}
        border={border}
        focusBorder={focusBorder}
        onChange={handleInputChange}
        onBlur={isRequired ? handleRequiredInputField : () => void 0}
        value={inputValue}
        readOnly={readOnly}
      ></TextboxInputField>
      {isValidationError && (
        <TextBoxErrorMessage>{errorMessage}</TextBoxErrorMessage>
      )}
    </TextboxContainer>
  );
};
