import React, { useState } from "react";
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
import { AdvancedSearchModal } from "../../molecules/AdvancedSearchModal";
import { constantStrings } from "../../../constants/magicString";

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
  showAdvancedSearch = false,
  SearchbarAcion = () => void 0,
  searchBoxPlaceholder = "",
  advancedSearchMenuItems = [],
  isClearButtonDisabled = true,
  isApplyFilterDisabled = true,
  handleClearButtonClick = () => void 0,
  handleApplyFilterButtonClick = () => void 0,
  advancedSearchValues = {},
}) => {
  const [isAdvancedSearchOpen, setIsAdvancedSearchOpen] = useState(false);
  const handleAdvancedSearchClick = (e) => {
    e.stopPropagation();
    setIsAdvancedSearchOpen(!isAdvancedSearchOpen);
  };
  return (
    <MainPageBodyContainer>
      <HeaderContainer>
        <Header>
          <HeaderTitle>{headerTitle}</HeaderTitle>
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
              <Box
                ml="1.25rem"
                height="3.5rem"
                onClick={handleAdvancedSearchClick}
                position="relative"
              >
                <img height="100%" src={AdvancedSearchBoxIcon} />
                {isAdvancedSearchOpen && (
                  <AdvancedSearchModal
                    advancedSearchMenu={advancedSearchMenuItems}
                    clearButtonText={constantStrings?.CLEAR}
                    applyFilterText={constantStrings?.APPLY_FILTER}
                    handleCloseModal={() => setIsAdvancedSearchOpen(false)}
                    handleClearButtonClick={() => handleClearButtonClick()}
                    handleApplyFilterButtonClick={() => {
                      handleApplyFilterButtonClick();
                      setIsAdvancedSearchOpen(false);
                    }}
                    isClearButtonDisabled={isClearButtonDisabled}
                    isApplyFilterDisabled={isApplyFilterDisabled}
                    advancedSearchValues={advancedSearchValues}
                  />
                )}
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
