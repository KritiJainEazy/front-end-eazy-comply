const ERROR_MESSAGES = {
  firstNameCharacterExceeded: "length should not exceed 20 characters",
  lastNameCharacterExceeded: "length should not exceed 20 characters",
  nameCharacterExceeded: "length should not exceed 20 characters",
  fieldCanNotBEmpty: "field can not be empty",
  emailInvalid: "email invalid",
  fieldIsRequired: "field is required",
};

export const ERROR_CODES = {
  OK: 200,
};

export default ERROR_MESSAGES;

const MAX_CHARACTERS = {
  FIRST_NAME: 35,
  LAST_NAME: 35,
  NAME: 35,
  MAX_CHARACTERS: 999,
};

const textBoxValidationChecks = ({
  textboxInputValue = "",
  isRequired = false,
  isRequiredErrorMessage = "",
  characterExceededErrorMessage = "",
  maxCharacters = MAX_CHARACTERS?.MAX_CHARACTERS,
}) => {
  if (isRequired && textboxInputValue?.trim()?.length === 0) {
    return {
      isError: true,
      errorMessage: isRequiredErrorMessage,
    };
  }

  if (textboxInputValue.trim().length > maxCharacters) {
    return {
      isError: true,
      errorMessage: characterExceededErrorMessage,
    };
  }
  return {
    isError: false,
    errorMessage: "",
  };
};

export const isFirstNameValidCheck = (firstName = "") => {
  return textBoxValidationChecks({
    textboxInputValue: firstName,
    isRequired: true,
    isRequiredErrorMessage: ERROR_MESSAGES?.fieldIsRequired,
    characterExceededErrorMessage: ERROR_MESSAGES?.firstNameCharacterExceeded,
    maxCharacters: MAX_CHARACTERS?.FIRST_NAME,
  });
};

export const isLastNameValidCheck = (lastName = "") => {
  return textBoxValidationChecks({
    textboxInputValue: lastName,
    isRequired: true,
    isRequiredErrorMessage: ERROR_MESSAGES?.fieldIsRequired,
    characterExceededErrorMessage: ERROR_MESSAGES?.lastNameCharacterExceeded,
    maxCharacters: MAX_CHARACTERS?.LAST_NAME,
  });
};

export const isNameValidCheck = (name = "") => {
  return textBoxValidationChecks({
    textboxInputValue: name,
    isRequired: true,
    isRequiredErrorMessage: ERROR_MESSAGES?.fieldIsRequired,
    characterExceededErrorMessage: ERROR_MESSAGES?.nameCharacterExceeded,
    maxCharacters: MAX_CHARACTERS?.NAME,
  });
};

export const isEmailValidCheck = (email = "") => {
  const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  const isEmailValid = !regex.test(email) ? true : false;

  return {
    isError: isEmailValid,
    errorMessage: ERROR_MESSAGES?.emailInvalid,
  };
};
