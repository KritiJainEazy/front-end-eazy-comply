import React, { useEffect, useRef, useState } from "react";
import { SearchBarIconContainer, SearchBoxContainer } from "./styles.searchbox";
import SearchbarIcon from "../../../assets/search-icon.png";
import { TextboxInputField } from "../TextBox/styles.textbox";

export const SearchBox = ({
  width = "100%",
  height = "",
  searchBarIconHeight = "",
  searchAction = () => {},
  placeholder = "Search",
}) => {
  const [searchedText, setSearchedText] = useState();
  const inputRef = useRef();

  const handleSearchAction = () => {
    searchAction(searchedText);
  };

  const handleOnFocusSearchBoxInput = () => {
    const inputTextboxElement = inputRef.current;
    inputTextboxElement.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        handleSearchAction();
      }
    });
  };

  const handleSearchBoxInput = (e) => {

    setSearchedText(e.target.value);
  };
  return (
    <SearchBoxContainer width={width} height={height}>
      <TextboxInputField
        placeholder={placeholder}
        border="none"
        focusBorder="none"
        onChange={handleSearchBoxInput}
        onFocus={handleOnFocusSearchBoxInput}
        ref={inputRef}
      ></TextboxInputField>
      <SearchBarIconContainer
        src={SearchbarIcon}
        onClick={handleSearchAction}
        height={searchBarIconHeight}
      />
    </SearchBoxContainer>
  );
};
