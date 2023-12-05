import styled from "styled-components";
import Box from "../../atoms/box.atom";

export const LoginTextBoxInput = styled.input`
  all: unset;
  width: 100%;
  height: 1.7rem;
  color: rgba(0, 0, 0, 0.75);
  line-height: 1rem;
  font-size: 1rem;
  font-weight: 400;
  border-bottom: 1px solid rgba(0, 0, 0, 0.3);
`;

export const LoginTextBoxContainer = styled(Box)`
  width: 100%;
  height: 2rem;
  margin: ${(props) => props?.margin};
  padding-bottom: 0.5rem;
`;

export const LoginTextBoxErrorMessage = styled(Box)`
margin-top: 0.2rem;
  color: red;
  height: 0.8rem;
  line-height: 0.8rem;
  font-size: 0.8rem;
  font-weight: 400;
`;

//1.7rem
