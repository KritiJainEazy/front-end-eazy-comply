import React, { useRef, useState } from "react";
import {
  ModalContainer,
  ModalScreenContainer,
  ModalTitleContainer,
} from "./styles.modal";
import Box from "../../atoms/box.atom";

export const Modal = ({
  position = "absolute",
  width = "",
  height = "",
  showModalTitle = true,
  modalTitle = "",
  modalContent = <></>,
  showCloseButton = true,
  backgroundFade = true,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const modalContentRef = useRef();

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const handleClickOutsideModal = (e) => {
    if (modalContentRef.current === e.target) {
      handleCloseModal();
    }
  };

  return (
    <>
      {isModalOpen && (
        <ModalScreenContainer
          onClick={handleClickOutsideModal}
          backgroundFade={backgroundFade ? "0.4" : "0"}
        >
          <ModalContainer
            ref={modalContentRef}
            width={width}
            height={height}
            backgroundColor="yellow"
            position={position}
          >
            {showModalTitle && (
              <ModalTitleContainer>
                {modalTitle}
                {showCloseButton && (
                  <Box onClick={handleCloseModal} cursor="pointer">
                    {"X"}
                  </Box>
                )}
              </ModalTitleContainer>
            )}
            {modalContent}
          </ModalContainer>
        </ModalScreenContainer>
      )}
    </>
  );
};
