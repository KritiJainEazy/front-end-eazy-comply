import { React, useRef, useState } from "react";
import Box from "../../atoms/box.atom";
import {
  DropdownBoxContainer,
  DropdownMenuContainer,
  DropdownMenuItem,
  DropdownTitle,
  DropdownFieldBox,
  DropdownArrow,
  DropdownContainer,
  DropdownErrorMessage,
} from "./styles.dropdown";
import DownArrow from "../../../assets/down-arrow-solid.png";
import { SearchBox } from "../SearchBox";
import { constantStrings } from "../../../constants/magicString";

const Dropdown = ({
  width = "",
  height = "",
  dropdownItems = [],
  title = "",
  multiSelect = false,
  maxSelect = "",
  dropdownFieldBoxHeader = "Select",
  isRequired = false,
  onItemSelect = () => void 0,
  isRequiredErrorMessage,
  border = "none",
}) => {
  const ELIGIBLE_SEARCH_LIMIT = 1;
  const dropdownRef = useRef(null);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(dropdownFieldBoxHeader);
  const [isValidationError, setIsValidationError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("is required");
  const [dropdownItemsToShow, setDropDownItemsToShow] = useState(dropdownItems);

  const isSearchable = dropdownItems?.length > ELIGIBLE_SEARCH_LIMIT;

  const handleDropdownOpen = () => {
    setDropdownOpen(true);
  };
  const handleDropdownClose = (isItemSelected = false) => {
    setDropdownOpen(false);
    setDropDownItemsToShow(dropdownItems);

    if (isItemSelected) {
      setIsValidationError(false);
      return;
    }
    if (isRequired && selectedValue == dropdownFieldBoxHeader) {
      setIsValidationError(true);
      onItemSelect({ value: "", isError: true });
    } else {
      setIsValidationError(false);
      onItemSelect({ value: "", isError: false });
    }
  };
  const handleDropdownClick = () => {
    if (isDropdownOpen) {
      handleDropdownClose();
    } else {
      handleDropdownOpen();
    }
  };

  const handleItemSelect = (selectedValue) => {
    onItemSelect({
      value: selectedValue?.value,
      title: selectedValue?.title,
      isError: false,
    });
    setSelectedValue(selectedValue?.title);
    //  handleSelect(selectedValue?.value);
    handleDropdownClose(true);
  };

  const handleSearch = (searchedItem) => {
    const newDropdown = dropdownItems?.filter((item) => {
      return item?.title?.toLowerCase()?.includes(searchedItem?.toLowerCase());
    });
    setDropDownItemsToShow(newDropdown);

    console.log(dropdownItemsToShow, dropdownItems, "dropdownItemsshjdf");
  };

  return (
    <DropdownBoxContainer width={width} height={height} ref={dropdownRef}>
      {title && <DropdownTitle>{title}</DropdownTitle>}
      <DropdownContainer border={border}>
        <DropdownFieldBox onClick={handleDropdownClick}>
          {selectedValue}
          <DropdownArrow src={DownArrow} />
        </DropdownFieldBox>
        {isDropdownOpen && (
          <DropdownMenuContainer>
            {isSearchable && (
              <SearchBox
                width="100%"
                height="1.8rem"
                inputFieldHeight="1.3rem"
                searchAction={(searchedItem) => {
                  handleSearch(searchedItem);
                }}
                placeholder="Search"
                searchWhileTyping={true}
              />
            )}
            {dropdownItemsToShow?.length ? (
              <>
                {dropdownItemsToShow?.map((dropdownItem, index) => {
                  return (
                    <DropdownMenuItem
                      key={`dropdownKey_${index}`}
                      onClick={() => handleItemSelect(dropdownItem)}
                      isSelected={selectedValue == dropdownItem?.title}
                    >
                      {dropdownItem?.title}
                    </DropdownMenuItem>
                  );
                })}
              </>
            ) : (
              <DropdownMenuItem>
                {constantStrings?.NO_FIELD_FOUND}
              </DropdownMenuItem>
            )}
            {/* {dropdownItemsToShow?.map((dropdownItem, index) => {
              return (
                <DropdownMenuItem
                  key={`dropdownKey_${index}`}
                  onClick={() => handleItemSelect(dropdownItem)}
                  isSelected={selectedValue == dropdownItem?.title}
                >
                  {dropdownItem?.title}
                </DropdownMenuItem>
              );
            })} */}
          </DropdownMenuContainer>
        )}
      </DropdownContainer>
      {isValidationError && (
        <DropdownErrorMessage>{errorMessage}</DropdownErrorMessage>
      )}
    </DropdownBoxContainer>
  );
};

export default Dropdown;
