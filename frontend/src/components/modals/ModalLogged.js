import styled from "styled-components";
import Colors from "../../utils/Colors";

const ModalLogged = ({ isLogged }) => {
  return (
    <Container modal={isLogged}>
      <ContainerTooltip>
        <Tooltip>
          <p style={{ color: Colors.gray }}>Must be Logged</p>
        </Tooltip>
      </ContainerTooltip>
    </Container>
  );
};

export default ModalLogged;

const Container = styled.div`
  position: absolute;
  top: -5.3rem;
  left: 50%;
  transform: translateX(-50%);
  width: 10rem;
  height: 4rem;

  @media (max-width: 1276px) {
    top: 33%;
    left: 20px;
    transform: translateY(-50%);
  }
  @media (max-width: 750px) {
    display: none;
  }
`;

const ContainerTooltip = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 100%;
  height: 100%;
`;

const Tooltip = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;
  height: 100%;
  background-color: rgba(34, 40, 49, 0.9);
  border: 3px solid ${Colors.yellowDarker};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

  ::after {
    content: " ";
    border-style: solid;
    border-width: 12px 12.5px 0 12.5px;
    border-color: ${Colors.yellowDarker} transparent transparent transparent;
    top: 4.2rem;
    left: 50%;
    transform: translate(-50%, -50%);
    position: absolute;
  }
`;
