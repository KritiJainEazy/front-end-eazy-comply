import React from "react";
import {
  MainPageBodyContainer,
  HeaderContainer,
  Header,
  HeaderTitle,
  BackButton,
  MainBodyContainer,
} from "./styles.mainpage";
import { Button } from "../../molecules/Button";
import Box from "../../atoms/box.atom";
import { SearchBox } from "../../molecules/SearchBox";

export const MainPage = ({
  headerTitle = "",
  handleHeaderButton = () => void 0,
  headerButtonTitle = "",
  headerButtonIcon = "",
  iconHeight = "",
  showHeaderButton = false,
  mainPageContent = <></>,
  showSearchBar = false,
  SearchbarAcion = () => void 0,
  searchBoxPlaceholder = "",
}) => {
  return (
    <MainPageBodyContainer>
      <HeaderContainer>
        <Header>
          <HeaderTitle>
            {/* <BackButton src={BackButtonIcon}></BackButton> */}
            {headerTitle}
          </HeaderTitle>
          <Box display="flex">
            {showSearchBar && (
              <SearchBox
                width="28em"
                height="2.75em"
                searchAction={(searchedText) => SearchbarAcion(searchedText)}
                placeholder={searchBoxPlaceholder}
              />
            )}
            {showHeaderButton && (
              <Button
                margin="0 0 0 2.5em"
                height="2.75rem"
                width="9rem"
                buttonTitle={headerButtonTitle}
                handleButtonClick={handleHeaderButton}
                padding={"0.5rem 1.5rem"}
                buttonIcon={headerButtonIcon}
                iconHeight={iconHeight}
              />
            )}
          </Box>
        </Header>
      </HeaderContainer>

      <MainBodyContainer>{mainPageContent}</MainBodyContainer>
    </MainPageBodyContainer>
  );
};
