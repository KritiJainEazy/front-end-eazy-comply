import { emailValidationCheck } from "../../../../validationChecks/validationChecks";
import ERROR_MESSAGES from "../../../molecules/CreateForm/validationCheck";

import {
  MIN_CHARACTERS,
  MAX_CHARACTERS,
} from "../../../molecules/CreateForm/validationCheck";
import { ERROR_MESSAGE } from "../../../../validationChecks/validationChecks";
import { textBoxValidationChecks } from "../../../molecules/CreateForm/validationCheck";
export const emailIdVaildation = (email) => {
  if (email?.length) {
    return emailValidationCheck(email);
  } else {
    return { isError: true, errorMessage: ERROR_MESSAGE?.FIELD_REQUIRED };
  }
};

export const passwordValidation = (pwd) => {
  return textBoxValidationChecks({
    textboxInputValue: pwd,
    isRequired: true,
    isRequiredErrorMessage: ERROR_MESSAGES?.fieldIsRequired,
    minLengthErrorMessage: ERROR_MESSAGES?.passwordMinimumCharacter,
    minCharacters: MIN_CHARACTERS?.PASSWORD,
    characterExceededErrorMessage: ERROR_MESSAGES?.passwordCharacterExceeded,
    maxCharacters: MAX_CHARACTERS?.PASSWORD,
  });
  // if (password?.length) {
  //   return minCharacterCheck(password, MIN_CHARACTERS?.PASSWORD);
  // } else {
  //   return { isError: true, errorMessage: ERROR_MESSAGE?.FIELD_REQUIRED };
  // }
};
