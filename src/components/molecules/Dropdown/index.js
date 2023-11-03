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
import DownArrow from "../../../assets/down-arrow-coloured.png";

const Dropdown = ({
  width = "",
  height = "",
  //handleSelect = () => {},
  dropdownItems = [],
  title = "",
  multiSelect = false,
  maxSelect = "",
  dropdownFieldBoxHeader = "Select",
  isRequired = false,
  onItemSelect = () => void 0,
  isRequiredErrorMessage,
}) => {
  const dropdownRef = useRef(null);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(dropdownFieldBoxHeader);
  const [isValidationError, setIsValidationError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("is required");

  const handleDropdownOpen = () => {
    setDropdownOpen(true);
  };
  const handleDropdownClose = (isItemSelected = false) => {
    setDropdownOpen(false);

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
    onItemSelect({ value: selectedValue?.title, isError: false });
    setSelectedValue(selectedValue?.title);
    //  handleSelect(selectedValue?.value);
    handleDropdownClose(true);
  };

  return (
    <DropdownBoxContainer width={width} height={height} ref={dropdownRef}>
      {title && <DropdownTitle>{title}</DropdownTitle>}
      <DropdownContainer>
        <DropdownFieldBox onClick={handleDropdownClick}>
          {selectedValue}
          <DropdownArrow src={DownArrow} />
        </DropdownFieldBox>
        {isDropdownOpen && (
          <DropdownMenuContainer>
            {dropdownItems?.map((dropdownItem, index) => {
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
