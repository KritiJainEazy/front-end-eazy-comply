import React, { useState } from "react";
import { BASE_END_POINT, REQUEST_TYPES } from "../constants/navConfig";

export const useCsrfToken = () => {
  const [csrfToken, setCsrfToken] = useState("");

  const postLoginCredentials = async (apiEndPoint, loginCredentials = {}) => {
    console.log(
      "checking the flow 2",
      apiEndPoint,
      loginCredentials,
      `${BASE_END_POINT}${apiEndPoint}`
    );
    try {
      const response = await fetch(`${BASE_END_POINT}${apiEndPoint}`, {
        method: REQUEST_TYPES?.POST,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginCredentials),
      });

      if (!response.ok) {
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

  return { postLoginCredentials, makeRequestWithCSRFToken, csrfToken };
};
