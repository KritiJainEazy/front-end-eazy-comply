{"data":"<!DOCTYPE html>\n<html lang=\"en\">\n  <head>\n    <meta charset=\"utf-8\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1, shrink-to-fit=no\">\n    <meta name=\"description\" content=\"\">\n    <meta name=\"author\" content=\"\">\n    <title>Please sign in</title>\n    <link href=\"https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/css/bootstrap.min.css\" rel=\"stylesheet\" integrity=\"sha384-/Y6pD6FV/Vv2HJnA6t+vslU6fwYXjCFtcEpHbNJ0lyAFsXTsjBbfaDjzALeQsN6M\" crossorigin=\"anonymous\">\n    <link href=\"https://getbootstrap.com/docs/4.0/examples/signin/signin.css\" rel=\"stylesheet\" crossorigin=\"anonymous\"/>\n  </head>\n  <body>\n     <div class=\"container\">\n      <form class=\"form-signin\" method=\"post\" action=\"/base-api/v1/login\">\n        <h2 class=\"form-signin-heading\">Please sign in</h2>\n        <p>\n          <label for=\"username\" class=\"sr-only\">Username</label>\n          <input type=\"text\" id=\"username\" name=\"username\" class=\"form-control\" placeholder=\"Username\" required autofocus>\n        </p>\n        <p>\n          <label for=\"password\" class=\"sr-only\">Password</label>\n          <input type=\"password\" id=\"password\" name=\"password\" class=\"form-control\" placeholder=\"Password\" required>\n        </p>\n<input name=\"_csrf\" type=\"hidden\" value=\"4ecb4635-fe7d-44c7-9e6a-2207a157a5fd\" />\n        <button class=\"btn btn-lg btn-primary btn-block\" type=\"submit\">Sign in</button>\n      </form>\n</div>\n</body></html>","status":200,"statusText":"","headers":{"cache-control":"no-cache, no-store, max-age=0, must-revalidate","content-length":"1418","content-type":"text/html;charset=UTF-8","expires":"0","pragma":"no-cache"},"config":{"transitional":{"silentJSONParsing":true,"forcedJSONParsing":true,"clarifyTimeoutError":false},"adapter":["xhr","http"],"transformRequest":[null],"transformResponse":[null],"timeout":0,"xsrfCookieName":"XSRF-TOKEN","xsrfHeaderName":"X-XSRF-TOKEN","maxContentLength":-1,"maxBodyLength":-1,"env":{},"headers":{"Accept":"application/json, text/plain, */*","Content-Type":"application/json"},"withCredentials":true,"method":"post","url":"http://localhost:8080/base-api/v1/user-login","data":"{\"username\":\"satya@gmail.com\",\"password\":\"Satya\"}"},"request":{}}



const obj1 = {
    "email": "satya@gmail.com",
    "firstName": "Satya",
    "lastName": "Suman",
    "name": "Satyawrat",
    "pwd": "Satya123",
    "userType": "Admin"
}

const obj2 = {
    "name":"Kriti1712",
    "firstName":"Kriti",
    "lastName":"Jain",
    "email":"kritijain1712@gmail.com",
    "pwd":"Kriti17",
    "userType":"Admin"
}

Kittu123



{
    "email": "kriti17122000@gmail.com",
    "firstName": "Kriti",
    "lastName": "Jain",
    "name": "Kriti17122000",
    "pwd": "Kriti123",
    "userType": "ADMIN"
}



WebSecurityConfigurerAdapter
WebSecurityConfigurerAdapter
The source of redirection lies within create-session="stateless". Just remove it from you http configuration element and you are able to login successful. create-session="stateless" prohibits the use of a server side session, which however is required for a form based login






<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

.switch input { 
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .slider {
  background-color: #2196F3;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196F3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}




PER-19Dec2023070330145
PER-18Dec2023070330145 - read
PER-16Dec2023070330225
PER-17Dec2023070330145




ROL-11Dec2023070330145 - A
ROL-19Dec2023070330145


USE-19Dec2023173927830 - A
USE-19Dec2023174305494




export const useCsrfToken = () => {
  const [csrfToken, setCsrfToken] = useState("");

  const postLoginCredentialsFetch = async (loginCredentials) => {
    try {
      const response = await fetch("http://localhost:8080/base-api/v1/user-login", {
        method: "GET",
        headers: {
          Authorization: `Basic ${btoa(loginCredentials?.username + ":" + loginCredentials?.password)}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const token = response.headers.get("authorization");
      setCsrfToken(token || ""); // Update token in state

      return {
        status: response.status,
        statusText: response.statusText,
        token: token || "",
        message: "Invalid credentials!",
      };
    } catch (error) {
      console.error("Request failed:", error);
      throw error;
    }
  };

  // ... rest of the code
};
