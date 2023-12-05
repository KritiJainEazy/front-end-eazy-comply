import {
  emailValidationCheck,
  fieldRequiredCheck,
} from "../../../../validationChecks/validationChecks";
import { ERROR_MESSAGE } from "../../../../validationChecks/validationChecks";

export const emailIdVaildation = (email) => {
  if (email?.length) {
    return emailValidationCheck(email);
  } else {
    return { isError: true, errorMessage: ERROR_MESSAGE?.FIELD_REQUIRED };
  }
};

export const passwordValidation = (password) => {
  return fieldRequiredCheck(password);
};
