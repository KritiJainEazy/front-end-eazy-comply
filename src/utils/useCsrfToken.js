import React, { useState } from "react";
import { BASE_END_POINT, REQUEST_TYPES } from "../constants/navConfig";

export const useCsrfToken = () => {
  const [csrfToken, setCsrfToken] = useState("");

  const postLoginCredentials = async (apiEndPoint, loginCredentials = {}) => {
    const urlToSendRequest = `http://localhost:8080${BASE_END_POINT}${apiEndPoint}`;

    const dataToSend = JSON.stringify(loginCredentials);
    console.log(
      "checking the flow 2",
      apiEndPoint,
      loginCredentials,
      dataToSend,
      `${BASE_END_POINT}${apiEndPoint}`
    );

    try {
      console.log("checking the flow 3");
      const response = await fetch(
        "http://localhost:8080/base-api/v1/user-login",
        {
          method: "POST",
          mode: "cors",
          credentials: "same-origin",
          headers: {
            "Content-Type": "application/json",
          },
          body: dataToSend,
        }
      );

      if (!response.ok) {
        console.log("checking the flow 4");
        console.log(response);
        throw new Error(
          `Request to ${apiEndPoint} failed with status ${response.status}`
        );
      }
      setCsrfToken(await response.json()?.token);
      return await response.json();
    } catch (error) {
      console.error(`Request to ${apiEndPoint} failed:`, error);
      throw error;
    }
  };
  const makeRequestWithCSRFToken = async (
    api,
    requestType = "GET",
    data = null
  ) => {
    console.log(api, requestType, data, "isfdl");
    const requestBody = {
      // mode: "cors",
      method: requestType,
      headers: {
        "Content-Type": "application/json",
        "CSRF-Token": csrfToken,
      },
    };

    if (data) {
      requestBody.body = JSON.stringify(data);
    }

    try {
      const response = await fetch(`${BASE_END_POINT}${api}`, requestBody);

      if (!response.ok) {
        throw new Error(
          `Request to ${api} failed with status ${response.status}`
        );
      }

      return await response.json();
    } catch (error) {
      console.error(`Request to ${api} failed:`, error);
      throw error;
    }
  };

  const testPostFuncion = async (requestBody = {}) => {
    const dataToSend = JSON.stringify(requestBody);
    // const urlToSendRequest = `http://localhost:8080${BASE_END_POINT}${apiEndPoint}`;
    try {
      const response = await fetch(
        `http://localhost:8080/base-api/v1/user-login`,
        {
          method: "POST",
          mode: "cors",
          credentials: "same-origin",
          headers: {
            "Content-Type": "application/json",
          },
          body: dataToSend,
        }
      );

      if (!response.ok) {
        console.log("checking the flow 4");
        throw new Error(`Request failed with status ${response.status}`);
      }
      setCsrfToken(await response.json()?.token);
      return await response.json();
    } catch (error) {
      console.error(`Request to failed:`, error);
      throw error;
    }
  };

  return {
    postLoginCredentials,
    makeRequestWithCSRFToken,
    csrfToken,
    testPostFuncion,
  };
};

/*

{
    "name": "KritiJain17122000",
    "firstName": "Kriti",
    "lastName": "Jain",
    "email":"kriti1712@gmail.com",
    "pwd": "Kriti17",
    "userType":"Admin"
}

{"email": "satya@gmail.com",
"firstName": "Satya",
"lastName": "Suman",
"name": "Satyawrat",
"pwd": "Satya123",
"userType": "Admin"
USE-12Dec2023062201963
ROL-10Dec2023070330145
PER-10Dec2023070330145
}
*/
