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
import AdvancedSearchBoxIcon from "../../../assets/advance filter.png";

export const MainPage = ({
  headerTitle = "",
  handleHeaderButton = () => void 0,
  showHeaderButton = false,
  headerButtonTitle = "",
  headerButtonIcon = "",
  headerButtonIconHeight = "",
  handleExportButton = () => void 0,
  showExportButton = false,
  exportButtonTitle = "",
  exportButtonIcon = "",
  exportButtonIconHeight = "",
  mainPageContent = <></>,
  showSearchBar = false,
  showAdvancedSearch = true,
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
                height="3.5em"
                searchAction={(searchedText) => SearchbarAcion(searchedText)}
                placeholder={searchBoxPlaceholder}
              />
            )}
            {showAdvancedSearch && (
              <Box ml="1.25rem" height = "3.5rem">
                <img height="100%" src={AdvancedSearchBoxIcon} />
              </Box>
            )}
            {showHeaderButton && (
              <Button
                margin="0 0 0 2.5em"
                height="3.5rem"
                width="9rem"
                buttonTitle={headerButtonTitle}
                handleButtonClick={handleHeaderButton}
                padding={"0.5rem 1.5rem"}
                buttonIcon={headerButtonIcon}
                iconHeight={headerButtonIconHeight}
              />
            )}
            {showExportButton && (
              <Button
                margin="0 0 0 2.5em"
                height="3.5rem"
                width="9rem"
                buttonTitle={exportButtonTitle}
                handleButtonClick={handleExportButton}
                padding={"0.5rem 1.5rem"}
                buttonIcon={exportButtonIcon}
                iconHeight={exportButtonIconHeight}
              />
            )}
          </Box>
        </Header>
      </HeaderContainer>

      <MainBodyContainer>{mainPageContent}</MainBodyContainer>
    </MainPageBodyContainer>
  );
};
