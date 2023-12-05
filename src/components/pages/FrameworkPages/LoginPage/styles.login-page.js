import styled from "styled-components";
import Box from "../../../atoms/box.atom";

export const LoginPageContainer = styled(Box)`
  width: 100vw;
  height: 100vh;
  display: flex;
  position: relative;
  overflow: hidden;
`;
export const LogoContainer = styled(Box)`
  width: 7.5rem;
  position: absolute;
  left: 3.2rem;
  top: 3.5rem;
`;
export const BackgroundVectorContainer = styled(Box)`
  position: absolute;
  z-index: -1;
  left: -2rem;
  top: -5rem;
`;

export const LeftContainerCard = styled(Box)`
  width: 21.75rem;
  height: max-content;
`;

export const LeftContainer = styled(Box)`
  width: 55%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const RightContainer = styled(Box)`
  width: 45%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const LoginCard = styled(Box)`
  width: 25.5rem;
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 1.5rem;
  display: flex;
  justify-content: center;
  overflow: hidden;
  background-color: #fff;
`;

export const LoginCardContainer = styled(Box)`
  width: 100%;
  height: max-content;
  padding: 4.9rem 2.75rem;
`;

export const LoginCardGoBackContainer = styled(Box)`
  height: 0.93rem;
  width: max-content;
  display: flex;
  align-items: center;
  margin-bottom: 1.3rem;
  cursor: pointer;
`;

export const LoginCardGoBackContainerText = styled(Box)`
  height: 0.8rem;
  font-size: 0.8rem;
  line-height: 0.93rem;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.75);
  margin-left: 0.44rem;
`;

export const LoginCardHeaderContainer = styled(Box)`
  width: 100%;
  height: max-content;
`;

export const LoginCardHeader = styled(Box)`
  font-weight: 600;
  font-size: 1.5rem;
  line-height: 1.5rem;
  color: rgb(0, 0, 0, 1);
`;

export const LoginCardSubHeader = styled(Box)`
  margin-top: 0.65rem;
  font-weight: 400;
  font-size: 0.875rem;
  line-height: 1rem;
  color: rgb(0, 0, 0, 0.5);
`;

export const LoginCardBodyContainer = styled(Box)`
  width: 100%;
  height: 100%;
  margin-top: 3.375rem;
`;
export const LoginCardButtonContainer = styled(Box)`
  width: 100%;
  height: 100%;
`;

// export const LoginTextBox = styled.input`
//   all: unset;
//   width: 100%;
//   height: 1.7rem;
//   margin: ${(props) => props?.margin};
//   padding-bottom: 0.5rem;
//   color: rgba(0, 0, 0, 0.75);
//   line-height: 1rem;
//   font-size: 1rem;
//   font-weight: 400;
//   border-bottom: 1px solid rgba(0, 0, 0, 0.3);
// `;
export const LeftContainerHeader = styled(Box)`
  margin-top: 1.35rem;
  height: 1.5rem;
  text-align: center;
  font-weight: 600;
  font-size: 1.25rem;
  line-height: 1.5rem;
  color: rgba(0, 0, 0, 1);
`;

export const LeftContainerSubHeader = styled(Box)`
  margin-top: 0.7rem;
  height: 1.92rem;
  text-align: center;
  font-weight: 400;
  font-size: 0.8rem;
  line-height: 0.98rem;
  color: rgba(0, 0, 0, 0.5);
`;

export const BottomContainer = styled(Box)`
  width: 100%;
  height: 1.3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const BottomContainerText = styled(Box)`
  font-weight: 500;
  font-size: 0.875rem;
  line-height: 1rem;
  color: ${(props) => props?.color};
  cursor: ${(props) => props?.cursor};
`;

// loading
//
