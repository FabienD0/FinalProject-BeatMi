import styled from "styled-components";
import Colors from "../utils/Colors";

const Piano = () => {
  const handleMouseUp = (e) => {
    e.currentTarget.classList.remove("active");
  };

  const handleMouseDown = (e) => {
    e.stopPropagation();
    e.currentTarget.classList.add("active");
  };

  return (
    <Container>
      <ContainerTop>
        <Title>Piano</Title>
      </ContainerTop>
      <ContainerBottom>
        <ContainerPiano>
          <WhiteKey
            onMouseUp={(e) => handleMouseUp(e)}
            onMouseDown={(e) => handleMouseDown(e)}
            backgroundColor={"#f399b0"}
          >
            <BlackKey
              onMouseUp={(e) => handleMouseUp(e)}
              onMouseDown={(e) => handleMouseDown(e)}
            ></BlackKey>
          </WhiteKey>
          <WhiteKey
            onMouseUp={(e) => handleMouseUp(e)}
            onMouseDown={(e) => handleMouseDown(e)}
            backgroundColor={"#15c6fc"}
          >
            <BlackKey
              onMouseUp={(e) => handleMouseUp(e)}
              onMouseDown={(e) => handleMouseDown(e)}
            ></BlackKey>
          </WhiteKey>
          <WhiteKey
            onMouseUp={(e) => handleMouseUp(e)}
            onMouseDown={(e) => handleMouseDown(e)}
            backgroundColor={"#fdd001"}
          ></WhiteKey>
          <WhiteKey
            onMouseUp={(e) => handleMouseUp(e)}
            onMouseDown={(e) => handleMouseDown(e)}
            backgroundColor={"#becb01"}
          >
            <BlackKey
              onMouseUp={(e) => handleMouseUp(e)}
              onMouseDown={(e) => handleMouseDown(e)}
            ></BlackKey>
          </WhiteKey>
          <WhiteKey
            onMouseUp={(e) => handleMouseUp(e)}
            onMouseDown={(e) => handleMouseDown(e)}
            backgroundColor={"#0055d6"}
          >
            <BlackKey
              onMouseUp={(e) => handleMouseUp(e)}
              onMouseDown={(e) => handleMouseDown(e)}
            ></BlackKey>
          </WhiteKey>
          <WhiteKey
            onMouseUp={(e) => handleMouseUp(e)}
            onMouseDown={(e) => handleMouseDown(e)}
            backgroundColor={"#c30302"}
          >
            <BlackKey
              onMouseUp={(e) => handleMouseUp(e)}
              onMouseDown={(e) => handleMouseDown(e)}
            ></BlackKey>
          </WhiteKey>
          <WhiteKey
            onMouseUp={(e) => handleMouseUp(e)}
            onMouseDown={(e) => handleMouseDown(e)}
            backgroundColor={"#f19800"}
          ></WhiteKey>
          {/* <WhiteKey
            onMouseUp={(e) => handleMouseUp(e)}
            onMouseDown={(e) => handleMouseDown(e)}
            backgroundColor={"#008980"}
          ></WhiteKey> */}
          <WhiteKey
            onMouseUp={(e) => handleMouseUp(e)}
            onMouseDown={(e) => handleMouseDown(e)}
            backgroundColor={"#f399b0"}
          >
            <BlackKey
              onMouseUp={(e) => handleMouseUp(e)}
              onMouseDown={(e) => handleMouseDown(e)}
            ></BlackKey>
          </WhiteKey>
          <WhiteKey
            onMouseUp={(e) => handleMouseUp(e)}
            onMouseDown={(e) => handleMouseDown(e)}
            backgroundColor={"#15c6fc"}
          >
            <BlackKey
              onMouseUp={(e) => handleMouseUp(e)}
              onMouseDown={(e) => handleMouseDown(e)}
            ></BlackKey>
          </WhiteKey>
          <WhiteKey
            onMouseUp={(e) => handleMouseUp(e)}
            onMouseDown={(e) => handleMouseDown(e)}
            backgroundColor={"#fdd001"}
          ></WhiteKey>
          <WhiteKey
            onMouseUp={(e) => handleMouseUp(e)}
            onMouseDown={(e) => handleMouseDown(e)}
            backgroundColor={"#becb01"}
          >
            <BlackKey
              onMouseUp={(e) => handleMouseUp(e)}
              onMouseDown={(e) => handleMouseDown(e)}
            ></BlackKey>
          </WhiteKey>
          <WhiteKey
            onMouseUp={(e) => handleMouseUp(e)}
            onMouseDown={(e) => handleMouseDown(e)}
            backgroundColor={"#0055d6"}
          >
            <BlackKey
              onMouseUp={(e) => handleMouseUp(e)}
              onMouseDown={(e) => handleMouseDown(e)}
            ></BlackKey>
          </WhiteKey>
          <WhiteKey
            onMouseUp={(e) => handleMouseUp(e)}
            onMouseDown={(e) => handleMouseDown(e)}
            backgroundColor={"#c30302"}
          >
            <BlackKey
              onMouseUp={(e) => handleMouseUp(e)}
              onMouseDown={(e) => handleMouseDown(e)}
            ></BlackKey>
          </WhiteKey>
          <WhiteKey
            onMouseUp={(e) => handleMouseUp(e)}
            onMouseDown={(e) => handleMouseDown(e)}
            backgroundColor={"#f19800"}
          ></WhiteKey>
        </ContainerPiano>
      </ContainerBottom>
    </Container>
  );
};

export default Piano;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
`;

const ContainerTop = styled.div`
  text-align: center;
  width: 100%;
`;

const ContainerBottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  flex: 1;
`;

const Title = styled.p`
  color: ${Colors.gray};
  text-shadow: 0px 4px 3px rgba(0, 0, 0, 0.4), 0px 8px 13px rgba(0, 0, 0, 0.1),
    0px 18px 23px rgba(0, 0, 0, 0.1);
  transition: all 1s;
  font-size: 5rem;

  :hover {
    color: ${Colors.yellow};
    cursor: default;
  }
`;

const ContainerPiano = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 5rem;
  border-top-left-radius: 50px;
  border-top-right-radius: 50px;
  height: 35rem;
  width: 60rem;
  width: 95%;

  background: linear-gradient(
    45deg,
    hsla(0, 0%, 0%, 1) 0%,
    hsla(0, 0%, 23%, 1) 50%,
    hsla(0, 0%, 0%, 1) 100%
  );

  background: -moz-linear-gradient(
    45deg,
    hsla(0, 0%, 0%, 1) 0%,
    hsla(0, 0%, 23%, 1) 50%,
    hsla(0, 0%, 0%, 1) 100%
  );

  background: -webkit-linear-gradient(
    45deg,
    hsla(0, 0%, 0%, 1) 0%,
    hsla(0, 0%, 23%, 1) 50%,
    hsla(0, 0%, 0%, 1) 100%
  );

  -webkit-box-shadow: 2px 3px 15px -6px rgba(238, 238, 238, 0.77);
  box-shadow: 2px 3px 15px -6px rgba(238, 238, 238, 0.77);
`;

const WhiteKey = styled.div`
  position: relative;
  height: 90%;
  border: 2px solid black;
  width: calc(55% / 8);

  background: -webkit-linear-gradient(-30deg, #f8f8f8, #fff);
  background: -moz-linear-gradient(-30deg, #f8f8f8, #fff);
  background: -o-linear-gradient(-30deg, #f8f8f8, #fff);
  background: linear-gradient(-30deg, #f8f8f8, #fff);
  box-shadow: inset 0 1px 0px rgba(255, 255, 255, 1),
    inset 0 -1px 0px rgba(255, 255, 255, 1),
    inset 1px 0px 0px rgba(255, 255, 255, 1),
    inset -1px 0px 0px rgba(255, 255, 255, 1), 0 4px 3px rgba(0, 0, 0, 0.7),
    inset 0 -1px 0px rgba(255, 255, 255, 1),
    inset 1px 0px 0px rgba(255, 255, 255, 1),
    inset -1px -1px 15px rgba(0, 0, 0, 0.5), -3px 4px 6px rgba(0, 0, 0, 0.5);

  &.active {
    background: ${(props) => props.backgroundColor};
    box-shadow: inset 0 1px 0px rgba(255, 255, 255, 1),
      inset 0 -1px 0px rgba(255, 255, 255, 1),
      inset 1px 0px 0px rgba(255, 255, 255, 1),
      inset -1px 0px 0px rgba(255, 255, 255, 1), 0 4px 3px rgba(0, 0, 0, 0.7),
      inset 0 -1px 0px rgba(255, 255, 255, 1),
      inset 1px 0px 0px rgba(255, 255, 255, 1),
      inset -1px -1px 15px rgba(0, 0, 0, 1), -3px 4px 6px rgba(0, 0, 0, 0.5);
  }

  :hover {
    cursor: pointer;
  }
`;

const BlackKey = styled.div`
  position: absolute;
  height: 50%;
  background-color: black;
  width: calc(100% / 2);
  right: -25%;
  z-index: 12;

  box-shadow: inset 0px -1px 2px rgba(255, 255, 255, 0.4),
    0 2px 3px rgba(0, 0, 0, 0.4);
  background: -webkit-linear-gradient(-20deg, #222, #000, #222);
  background: -moz-linear-gradient(-20deg, #222, #000, #222);
  background: -o-linear-gradient(-20deg, #222, #000, #222);
  background: linear-gradient(-20deg, #222, #000, #222);
  border-width: 1px 3px 8px;
  border-style: solid;
  border-color: #666 #222 #111 #555;

  &.active {
    border-bottom-width: 3px;
    top: 0;
  }

  :hover {
    cursor: pointer;
  }
`;
