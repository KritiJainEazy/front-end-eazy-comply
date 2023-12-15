const ERROR_MESSAGES = {
  firstNameCharacterExceeded: "length should not exceed 35 characters",
  lastNameCharacterExceeded: "length should not exceed 35 characters",
  nameCharacterExceeded: "length should not exceed 35 characters",
  fieldCanNotBEmpty: "field can not be empty",
  emailInvalid: "email invalid",
  fieldIsRequired: "field is required",
  passwordMinimumCharacter: "password should be atleast 5 characters long",
  passwordCharacterExceeded: "length should not exceed 20 characters",
};

export default ERROR_MESSAGES;

const MAX_CHARACTERS = {
  FIRST_NAME: 35,
  LAST_NAME: 35,
  NAME: 35,
  PASSWORD: 20,
  MAX_CHARACTERS: 999,
};

const MIN_CHARACTERS = {
  PASSWORD: 5,
  MIN_CHARACTERS: 0,
};

const textBoxValidationChecks = ({
  textboxInputValue = "",
  isRequired = false,
  isRequiredErrorMessage = "",
  characterExceededErrorMessage = "",
  maxCharacters = MAX_CHARACTERS?.MAX_CHARACTERS,
  minLengthErrorMessage = "",
  minCharacters = MIN_CHARACTERS?.MIN_CHARACTERS,
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
  if (textboxInputValue.trim().length < minCharacters) {
    return {
      isError: true,
      errorMessage: minLengthErrorMessage,
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

export const isPasswordValidCheck = (pwd = "") => {
  return textBoxValidationChecks({
    textboxInputValue: pwd,
    isRequired: true,
    isRequiredErrorMessage: ERROR_MESSAGES?.fieldIsRequired,
    minLengthErrorMessage: ERROR_MESSAGES?.passwordMinimumCharacter,
    minCharacters: MIN_CHARACTERS?.PASSWORD,
    characterExceededErrorMessage: ERROR_MESSAGES?.passwordCharacterExceeded,
    maxCharacters: MAX_CHARACTERS?.PASSWORD,
  });
};
