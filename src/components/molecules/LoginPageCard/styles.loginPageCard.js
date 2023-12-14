import styled from "styled-components";
import Box from "../../atoms/box.atom";

export const LoginCard = styled(Box)`
  width: 25.5rem;
  border: ${(props) =>
    props?.isError ? "1px solid red" : "1px solid rgba(0, 0, 0, 0.15)"};
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

export const LoginCardErrorContainer = styled(Box)`
  width: 100%;
  float: right;
  margin-top: 1.5rem;
  text-align: right;
  font-weight: 500;
  font-size: 0.875rem;
  word-wrap: break-word;
  color: ${(props) => "red"};
`;
