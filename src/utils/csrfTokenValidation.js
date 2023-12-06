const jwtToken = () => {
  return 10; //random value for now
};

const getCSRFToken = () => {
  const decodedJWTToken = jwt_decode(jwtToken());
  return decodedJWTToken?.csrfToken;
};

const postDataWithCSRFToken = async (data, api, errorMessage) => {
  const csrfToken = getCSRFToken();

  try {
    const response = await fetch(api, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "CSRF-Token": csrfToken,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(errorMessage);
    }
  } catch (error) {
    console.error(error, `request to ${api} failed`);
  }
};
