import React, { useEffect } from "react";

const LoginBodyMainPage = () => {
  useEffect(() => {
    console.log("LoginBodyMainPage mounted hahahah");

    return () => {
      console.log("LoginBodyMainPage unmounted hahahah");
    };
  }, []);

  return <>{/* Your Login Body Main Page content goes here */}</>;
};

export default LoginBodyMainPage;
