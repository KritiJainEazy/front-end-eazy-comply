import React, { useEffect, useState } from "react";
import { BASE_END_POINT, REQUEST_TYPES } from "../constants/navConfig";
import axios from "axios";

export const useCsrfToken = () => {
  const [csrfToken, setCsrfToken] = useState("");
  let preciousToken = "";

  useEffect(() => {
    console.log(csrfToken, "csrfToken");
  }, [csrfToken]);

  const postLoginCredentialsXMLhttpRequest = (loginCredentails) => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("GET", "http://localhost:8080/base-api/v1/user-login", true);
      xhr.setRequestHeader(
        "Authorization",
        "Basic " +
          btoa(loginCredentails?.username + ":" + loginCredentails?.password)
      );
      xhr.send();
      const headersObj = {};
      xhr.onerror = (error) => {
        console.error(error);
        reject({
          error: error,
          value: true,
          message: "Couldn't make a request, try afer some time.",
        });
      };
      xhr.onreadystatechange = () => {
        if (xhr.readyState === xhr.HEADERS_RECEIVED) {
          const headers = xhr.getAllResponseHeaders();
          const headersArrayString = headers.trim().split(/[\r\n]+/);

          headersArrayString?.map((headerString) => {
            const headerParts = headerString?.split(":");
            const key = headerParts[0].trim();
            const value = headerParts[1].trim();
            headersObj[key] = value;
          });

          const token = headersObj["authorization"];
          sessionStorage.setItem("token", headersObj["authorization"]);

          resolve({
            status: xhr.status,
            statusText: xhr.statusText,
            token: headersObj["authorization"],
            message: "Invalid credentials!",
          });
        }
      };
    });
  };
  const makeRequestWithCSRFToken = async ({
    api = "",
    requestType = "GET",
    data = null,
  }) => {
    const token = sessionStorage.getItem("token");
    const requestBody = {
      // mode: "cors",
      method: requestType,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    if (data) {
      requestBody.body = JSON.stringify(data);
    }

    try {
      const response = await fetch(`${BASE_END_POINT}${api}`, requestBody);
      console.log(response, "checking response in csrf");
      if (!response.ok) {
        console.error(response, "in if block");
        throw new Error(
          `Request to ${api} failed with status ${response.status}`
        );
      }
      return await response;
    } catch (error) {
      console.error(`in catch block`, error);
      // throw error;
      return error;
    }
  };

  return {
    postLoginCredentialsXMLhttpRequest,
    makeRequestWithCSRFToken,
    csrfToken,
    setCsrfToken,
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
