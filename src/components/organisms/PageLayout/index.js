import React from "react";
import { SideBar } from "../SideBar";
//import "./styles.pagelayout.css";
import {
  PageLayoutContainer,
  MainBodyContainer,
  MainPageContainer,
  NavBarPageLayoutContainer
} from "./styles.pagelayout";
import { Navbar } from "../Navbar";
import Box from "../../atoms/box.atom";

export const PageLayout = ({ children }) => {
  return (
    <PageLayoutContainer>
      <NavBarPageLayoutContainer>
        <Navbar />
      </NavBarPageLayoutContainer>

      <MainBodyContainer>
        <SideBar />
        <MainPageContainer>{children}</MainPageContainer>
      </MainBodyContainer>
    </PageLayoutContainer>
    // <Box width="100vw">
    //   <Box  width="100%" backgroundColor="red">
    //     {" hi1"}
    //   </Box>
    //   <Box display="flex">
    //     <Box  width="30%" backgroundColor="orange">
    //       {" hi2"}
    //     </Box>
    //     <Box p="10px" width="90%" backgroundColor="yellow">
    //       {" hi3"}
    //     </Box>
    //   </Box>
    // </Box>
  );
};
