import React, { useEffect, useRef, useState } from "react";
import { BASE_END_POINT, REQUEST_TYPES } from "../constants/navConfig";
import axios from "axios";
import { ERROR_CODES } from "../constants/errorCodesMessages";
import { constantStrings } from "../constants/magicString";
import { UserDetailsContext } from "../App";
import { toast } from "react-toastify";
import { TOAST_TYPE } from "../constants/errorCodesMessages";
import { REQUEST_MESSAGES } from "../constants/errorCodesMessages";

export const useCsrfToken = () => {
  const [csrfToken, setCsrfToken] = useState("");
  const [userEmailId, setUserEmailId] = useState("");
  const [authorities, setAuthorities] = useState([]);

  const postLoginCredentialsRequest = async ({
    loginCredentails = {},
    successfulLoginAction = () => void 0,
    failedLoginAction = () => void 0,
  }) => {
    // const toastId = toast.loading(constantStrings?.PLEASE_WAIT);
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
      await fetchResponse?.json()?.then((result) => {
        sessionStorage?.setItem("authorities", result?.authorities);
        sessionStorage?.setItem("userEmailId", result?.userName);
        //  alert(result?.userName + " " + result?.message);
        // toast.update(toastId, {
        //   render: result?.userName + " " + result?.message,
        //   type: TOAST_TYPE?.SUCCESS_TOAST_STATUS,
        //   isLoading: false,
        // });

        toast.success(result?.userName + " " + result?.message);
        console.log(result, "for fetch testing");
        successfulLoginAction(fetchResponse);
      });
    } catch (error) {
      console.log(error);
      failedLoginAction(error?.message);
      //  alert(error);
      // toast.update(toastId, {
      //   render: error,
      //   type: TOAST_TYPE?.ERROR_TOAST_STATUS,
      //   isLoading: false,
      // });
      toast.error(error);
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
    expectedResponseCode = "",
    getResponse = () => void 0,
    successAction = () => void 0,
    failureAction = () => void 0,
    successMessage = constantStrings?.DEFAULT_SUCCESS_MESSAGE,
    failureMessage = constantStrings?.DEFAULT_FAILURE_MESSAGE,
  }) => {
    console.log(params);
    const token = sessionStorage.getItem("token");
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
      params?.map((param, index) => {
        console.log("consoling param", {
          param: param,
          key: Object.keys(param),
          value: Object.values(param),
        });
        const urlSuffix = index == 0 ? "?" : "&";
        url = url + urlSuffix;
        url = url + Object.keys(param) + "=" + Object.values(param);
      });
      console.log(url, requestBody, "ohh please for love of god");
    }
    if (id) {
      url = url + `/${id}`;
    }

    fetch(url, requestBody)
      ?.then((response) => {
        console.log("csrf checker, in then", response);
        successAction(response);
        if (!getResponseFlag) {
          console.log("csrf checker, in !getresponseflag");
          // if (response?.status == expectedResponseCode) {
          //   console.log("csrf checker, in !getresponseflag if block");
          //   // toast.success(successMessage);
          // } else {
          //   console.log("csrf checker, in !getresponseflag else block");
          //   //  toast.error(response?.message || failureMessage);
          // }
        }
        if (getResponseFlag) {
          response?.json()?.then((result) => {
            console.log(result, "csrf checker, in result");
            getResponse({ result: result, status: response?.status });
          });
        }
      })
      ?.catch((error) => {
        console.log("csrf checker, in catch", error);
        //    toast.error(error);

        failureAction(error);
        return error;
      });
  };

  return {
    postLoginCredentialsRequest,
    makeRequestWithCSRFToken,
    csrfToken,
    setCsrfToken,
  };
};

// if (response?.status == expectedResponseCode) {
//   toast.update(toastId?.current, {
//     render: successMessage,
//     type: TOAST_TYPE?.SUCCESS_TOAST_STATUS,
//     isLoading: false,
//   });
// } else {
//   toast.update(toastId?.current, {
//     render: result?.message,
//     type: TOAST_TYPE?.ERROR_TOAST_STATUS,
//     isLoading: false,
//   });
// }
