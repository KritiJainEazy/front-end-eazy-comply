export const emailValidationCheck = (email) => {
  const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  const isEmailValid = !regex.test(email) ? true : false;

  return {
    isError: isEmailValid,
    errorMessage: "email invalid",
  };
};
