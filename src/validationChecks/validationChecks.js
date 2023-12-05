export const ERROR_MESSAGE = {
  EMAIL_INVALID: "email invalid",
  FIELD_REQUIRED: "field required",
};

export const emailValidationCheck = (email) => {
  const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  const isEmailValid = !regex.test(email) ? true : false;

  return {
    isError: isEmailValid,
    errorMessage: ERROR_MESSAGE?.EMAIL_INVALID,
  };
};

export const fieldRequiredCheck = (text) => {
  if (text?.trim()?.length == 0) {
    return {
      isError: true,
      errorMessage: ERROR_MESSAGE?.FIELD_REQUIRED,
    };
  } else {
    return {
      isError: false,
    };
  }
};
