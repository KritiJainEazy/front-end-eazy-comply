import React, { useEffect, useRef, useState } from "react";
import { BASE_END_POINT, REQUEST_TYPES } from "../constants/navConfig";
import axios from "axios";
import { ERROR_CODES } from "../constants/errorCodesMessages";
import { toast } from "react-toastify";
import { constantStrings } from "../constants/magicString";

export const useCsrfToken = () => {
  const [csrfToken, setCsrfToken] = useState("");
  const [userEmailId, setUserEmailId] = useState("");
  const [authorities, setAuthorities] = useState([]);
  // const toastId = useRef(null);

  const postLoginCredentialsRequest = async ({
    loginCredentails = {},
    successfulLoginAction = () => void 0,
    failedLoginAction = () => void 0,
  }) => {
    try {
      const url = "http://localhost:8080/base-api/v1/user-login";
      const requestBody = {
        method: REQUEST_TYPES?.GET,
        headers: {
          Authorization:
            "Basic\u0020" +
            btoa(loginCredentails?.username + ":" + loginCredentails?.password),
          "Content-Type": "application/json",
        },
      };

      const fetchResponse = await fetch(url, requestBody);

      console.log(fetchResponse, "for fetch testing");
      if (!fetchResponse?.ok) {
        throw new Error(`Invalid credentials`);
      }

      const headers = fetchResponse.headers;
      const headersObj = {};
      for (const [key, value] of headers.entries()) {
        headersObj[key] = value;
      }

      const token = headersObj["authorization"];
      console.log(token, "for fetch testing");
      sessionStorage.setItem("token", token);
      setCsrfToken(token);

      await fetchResponse?.json()?.then((result) => {
        sessionStorage?.setItem("authorities", result?.authorities);
        sessionStorage?.setItem("userEmailId", result?.userName);
        // setAuthorities(result?.authorities);
        // setUserEmailId(result?.userName);
        alert(result?.userName + " " + result?.message);
        console.log(result, "for fetch testing");
        successfulLoginAction(fetchResponse);
      });
    } catch (error) {
      console.log(error);
      failedLoginAction(error?.message);
      alert(error);
    }
  };

  const makeRequestWithCSRFToken = async ({
    api = "",
    requestType = "GET",
    data = null,
    stringifiedData = null,
    params = [],
    id = "",
    getResponseFlag = false,
    authority = "",
    getResponse = () => void 0,
    successAction = () => void 0,
    failureAction = () => void 0,
    successMessage = constantStrings?.DEFAULT_SUCCESS_MESSAGE,
    failureMessage = constantStrings?.DEFAULT_FAILURE_MESSAGE,
  }) => {
    // const toastId = toast.loading(constantStrings?.PLEASE_WAIT);

    const token = sessionStorage.getItem("token");
    // const toastId = toast.loading(constantStrings?.PLEASE_WAIT);
    const requestBody = {
      method: requestType,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    if (data) {
      requestBody.body = JSON.stringify(data);
    }
    if (stringifiedData) {
      requestBody.body = stringifiedData;
    }

    let url = `${BASE_END_POINT}${api}`;
    if (params?.length) {
      for (let i in params) {
        url = url + "?";
        console.log(
          params[i],
          params[i].key,
          params[i].value,
          Object.keys(params[i]),
          Object.values(params[i])
        );
        url = url + Object.keys(params[i]) + "=" + Object.values(params[i]);
      }
      console.log(url, requestBody);
    }
    if (id) {
      url = url + `/${id}`;
    }

    fetch(url, requestBody)
      ?.then((response) => {
        successAction(response);
        toast.success(successMessage);
        // toast.update(toastId, {
        //   render: successMessage,
        //   type: constantStrings?.SUCCESS_TOAST_STATUS,
        //   isLoading: false,
        // });
        if (getResponseFlag) {
          response?.json()?.then((result) => {
            getResponse(result);
          });
        } else {
          alert(`Doesn't have ${authority} authority`);
        }
      })
      ?.catch((error) => {
        toast.error(failureMessage);
        // toast.update(toastId, {
        //   render: failureMessage,
        //   type: constantStrings?.ERROR_TOAST_STATUS,
        //   isLoading: false,
        // });
        failureAction(error);
        return error;
      });

    // toast.promise(fetchRequest, {
    //   loading: constantStrings?.PLEASE_WAIT,
    //   success: successMessage,
    //   error: failureMessage,
    // });
  };

  return {
    postLoginCredentialsRequest,
    makeRequestWithCSRFToken,
    csrfToken,
    setCsrfToken,
  };
};
