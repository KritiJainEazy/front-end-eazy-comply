import styled from "@emotion/styled";
import Box from "../../atoms/box.atom";

export const TextboxContainer = styled(Box)`
  width: ${(props) => props?.width || "100%"};
  height: ${(props) => props.height || "100%"};
  padding: ${(props) => props.padding || "0 0 1rem 0"};
`;

export const TextboxTitle = styled(Box)`
  width: 100%;
  height: 100%;
  color: rgb(0, 0, 0, 0.4);
  padding: ${(props) => props.padding || "3px"};
  font-weight: 900;
  font-size: 0.9rem;
  letter-spacing: 0.4px;
  line-height: 1.5rem;
`;

export const TextboxInputField = styled.input`
  ref: ${(props) => props?.ref};
  width: 100%;
  line-height: 1.5rem;
  font-size: 0.9rem;
  padding: ${(props) => props?.padding || "8px 10px"};
  border: ${(props) => props?.border || "2px solid #e5e7eb"};
  border-radius: ${(props) => props.borderRadius || "5px"};
  background-color: ${(props) => props?.backgroundColor || "#F8F8F8"};
  &:focus {
    outline: none;
    border: ${(props) => props?.focusBorder || "3px solid rgba(66 105 215)"};
    outline: 2px solid transparent;
    outline-offset: 2px;
  }
`;

export const TextBoxErrorMessage = styled(Box)`
  color: red;
  line-height: 10px;
  padding: 3px;
`;
