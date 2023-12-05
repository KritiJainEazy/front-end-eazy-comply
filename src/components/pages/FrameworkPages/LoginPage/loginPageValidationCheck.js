import { emailValidationCheck } from "../../../../validationChecks/validationChecks";

export const emailIdVaildation = (email) => {
  if (email?.length) {
    return emailValidationCheck(email);
  } else {
    return { isError: true, errorMessage: "field required" };
  }
};
