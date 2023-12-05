export const LOGIN_CARD_VALUES = {
  REMEMBER_ME: "Remember me",
  FORGOT_PASSWORD: "Forgot Password?",
  GO_BACK: "Go Back",

  LOGIN_BODY_MAIN_EMAIL: "Work email ID",
  LOGIN_BODY_MAIN_PASSWORD: "Password",

  FORGOT_PASSWORD_BODY_MAIN_USERNAME: "Username",
  FORGOT_PASSWORD_BODY_MAIN_EMAIL: "Work email ID",
};

export const MAIN_LOGIN_PAGE_VALUES = {
  HEADER: "Welcome",
  SUBHEADER: "Enter your account details to continue.",
  // TEXTFIELD_ONE_PLACEHOLDER: "Work email ID",
  // TEXTFIELD_TWO_PLACEHOLDER: "Password",
  BUTTON: "Sign in",
  // HANDLE_BUTTON_CLICK: handleLoginClick,
};

// const handleRequestPasswordClick = () => {
//   console.log("Request Password");
// };
export const FORGOT_PASSWORD_PAGE_VALUES = {
  HEADER: "Forgot Password",
  SUBHEADER: "Enter your email ID/Username to request password",
  // TEXTFIELD_ONE_PLACEHOLDER: "Username",
  // TEXTFIELD_TWO_PLACEHOLDER: "Work email ID",
  BUTTON: "Request Password",
  // HANDLE_BUTTON_CLICK: handleRequestPasswordClick,
};

export const LOGIN_FORM_RESPONSE = {
  HEADER: "",
  SUBHEADER: "",
  // TEXTFIELD_ONE_PLACEHOLDER: "",
  // TEXTFIELD_TWO_PLACEHOLDER: "",
  BUTTON: "",
  RESPONSE_FORM: {},
  HANDLE_BUTTON_CLICK: () => {},
};

export const initialLoginformResponse = {
  emailId: "",
  password: "",
};

export const initialRequestPasswordFormResponse = {
  userName: "",
  workEmailId: "",
};

export const initialLoginFormResponseValid = {
  isEmailValid: false,
  isPasswordValid: false,
};

export const initialRequestPasswordFormResponseValid = {
  isUsernameValid: false,
  isEmailIdValid: false,
};

export const LOGIN_PAGE_LEFT_CONTAINER_VALUES = {
  HEADER_PART_1: "Compliance made",
  HEADER_PART_2: "\u0020Easy",
  SUBHEADER:
    "Lorem ipsum dolor sit amet consectetur. Malesuada fermentum sed feugiat amet fermentum.",
};

export const LOGIN_FORM_ACTIONS = {
  UPDATE_EMAIL: "updateEmail",
  UPDATE_PASSWORD: "updatePassword",
  RESET_LOGIN_FORM: "resetLoginForm",
};

export const REQUEST_PASSWORD_FORM_ACTIONS = {
  UPDATE_USERNAME: "updateUsername",
  UPDATE_WORK_EMAIL_ID: "updateWorkEmailId",
  RESET_REQUEST_PASSWORD_FORM: "resetRequestPAsswordForm",
};

// const handleLoginClick = () => {
//   console.log("Sign in");
//   // navigate(NAV_CONFIG?.NAV_USER_PAGE);
// };
