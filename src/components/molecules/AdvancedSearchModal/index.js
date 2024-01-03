import React, { useEffect, useRef, useState } from "react";
import {
  AdvancedSearchModalContainer,
  AdvancedSearchModalBody,
  ModalBodyMenuTile,
  ModalBodyMenuHeader,
  ModalBodyMenuComponent,
  ModalButtonContainer,
  ModalButton,
} from "./styles.advanced-search";
import {
  ADVANCED_SEARCH_MENU_OPTIONS,
  constantStrings,
} from "../../../constants/magicString";
import { Textbox } from "../TextBox";
import Dropdown from "../Dropdown";
import Box from "../../atoms/box.atom";
import { Button } from "../Button";

export const AdvancedSearchModal = ({
  advancedSearchMenu = [],
  clearButtonText = "",
  applyFilterText = "",
  handleCloseModal = () => void 0,
  handleClearButtonClick = () => void 0,
  handleApplyFilterButtonClick = () => void 0,
  isClearButtonDisabled = true,
  isApplyFilterDisabled = true,
  advancedSearchValues = {},
}) => {
  const advancedSearchModalRef = useRef(null);

  console.log(advancedSearchValues, "advancedSearchValues");
  // const [isClearButtonDisabled, setIsClearButtonDisabled] = useState(true);
  // const [isApplyFilterDisabled, setIsApplyFilterDisabled] = useState(true);

  const handleOnModalClick = (e) => {
    e.stopPropagation();
    console.log(e?.target.ref);
  };

  useEffect(() => {
    console.log("Am I rendering??", advancedSearchMenu);
    const handleOutsideModalClick = () => {
      console.log("I am clicking outside modal");
      handleCloseModal();
    };

    document.addEventListener("click", handleOutsideModalClick);

    return () => {
      document.removeEventListener("click", handleOutsideModalClick);
    };
  }, []);

  return (
    <AdvancedSearchModalContainer onClick={handleOnModalClick}>
      <AdvancedSearchModalBody>
        {advancedSearchMenu?.map((advancedSearchItem) => {
          console.log(
            advancedSearchValues[advancedSearchItem?.value],
            "advancedSearchValues"
          );
          switch (advancedSearchItem?.type) {
            case ADVANCED_SEARCH_MENU_OPTIONS?.TEXT:
              return (
                <ModalBodyMenuTile>
                  <ModalBodyMenuHeader>
                    {advancedSearchItem?.header}
                  </ModalBodyMenuHeader>
                  <ModalBodyMenuComponent>
                    <Textbox
                      // {...advancedSearchItem?.textboxProps}
                      onPayloadChange={(payload) => {
                        advancedSearchItem?.textboxProps?.onPayloadChange(
                          payload
                        );
                      }}
                      value={advancedSearchValues[advancedSearchItem?.value]}
                    />
                  </ModalBodyMenuComponent>
                </ModalBodyMenuTile>
              );

            case ADVANCED_SEARCH_MENU_OPTIONS?.DROPDOWN:
              console.log(advancedSearchItem, "advancedFormResponseState");
              const toShowValue =
                advancedSearchItem?.dropdownProps?.dropdownItems?.find(
                  (item) => {
                    if (
                      item?.value ===
                      advancedSearchValues[advancedSearchItem?.value]
                    ) {
                      return item;
                    }
                  }
                )?.title;
              return (
                <ModalBodyMenuTile>
                  <ModalBodyMenuHeader>
                    {advancedSearchItem?.header}
                  </ModalBodyMenuHeader>
                  <ModalBodyMenuComponent>
                    <Dropdown
                      //   {...advancedSearchItem?.dropdownProps}
                      width={advancedSearchItem?.dropdownProps?.width}
                      onItemSelect={
                        advancedSearchItem?.dropdownProps?.onItemSelect
                      }
                      dropdownItems={
                        advancedSearchItem?.dropdownProps?.dropdownItems
                      }
                      dropdownFieldBoxHeader={toShowValue}
                    />
                  </ModalBodyMenuComponent>
                </ModalBodyMenuTile>
              );
            case ADVANCED_SEARCH_MENU_OPTIONS?.DATE:
              return (
                <ModalBodyMenuTile>
                  <ModalBodyMenuHeader>
                    {advancedSearchItem?.header}
                  </ModalBodyMenuHeader>
                  <ModalBodyMenuComponent>
                    <Textbox type="date" />
                    <Textbox type="date" />
                  </ModalBodyMenuComponent>
                </ModalBodyMenuTile>
              );
            default:
              return (
                <ModalBodyMenuTile>
                  <ModalBodyMenuHeader>
                    {advancedSearchItem?.header}
                  </ModalBodyMenuHeader>
                  <ModalBodyMenuComponent>
                    <Textbox />
                  </ModalBodyMenuComponent>
                </ModalBodyMenuTile>
              );
          }
        })}

        <ModalButtonContainer>
          <ModalButton>
            <Button
              buttonTitle={clearButtonText}
              disabled={isClearButtonDisabled}
              width="8rem"
              height="3rem"
              fontSize="1rem"
              handleButtonClick={handleClearButtonClick}
            />

            <Button
              buttonTitle={applyFilterText}
              disabled={isApplyFilterDisabled}
              width="8rem"
              height="3rem"
              fontSize="1rem"
              handleButtonClick={handleApplyFilterButtonClick}
            />
          </ModalButton>
        </ModalButtonContainer>
      </AdvancedSearchModalBody>
    </AdvancedSearchModalContainer>
  );
};
