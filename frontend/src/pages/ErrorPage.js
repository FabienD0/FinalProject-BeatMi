import { ImWarning } from "react-icons/im";
import styled from "styled-components";
import Colors from "../utils/Colors";

const ErrorPage = () => {
  return (
    <Wrapper>
      <ErrorWrapper>
        <Number>404</Number>
        <StyledImWarning />
      </ErrorWrapper>
      <div>
        <h2>An unknown error has occurred.</h2>
        <p>
          Please try refreshing the page, or try again later if the problem
          persists.
        </p>
      </div>
    </Wrapper>
  );
};

export default ErrorPage;

const StyledImWarning = styled(ImWarning)`
  font-size: 160px;
  margin-bottom: 50px;
`;

const Number = styled.h1`
  font-size: 200px;
`;
const ErrorWrapper = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-around;
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  line-height: 35px;
  height: 60vh;
  color: ${Colors.gray};
  justify-content: space-around;
  background-color: ${Colors.primary200};
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  padding: 100px;
`;
