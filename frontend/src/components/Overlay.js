import styled from "styled-components";

const Overlay = ({ setIsModalChords, setIsModalAbout }) => {
  return (
    <Container
      onClick={() => {
        setIsModalAbout(false);
        setIsModalChords(false);
      }}
    ></Container>
  );
};

export default Overlay;

const Container = styled.button`
  all: unset;
  position: fixed;
  height: 100vh;
  width: 100vw;
  background-color: black;
  opacity: 0.6;
  z-index: 20;
`;
