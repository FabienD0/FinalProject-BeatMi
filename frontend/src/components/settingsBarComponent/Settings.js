import { useContext } from "react";
import styled from "styled-components";
import Colors from "../../utils/Colors";
import { PlayerContext } from "../context/PlayerContext";
import ButtonDrumKit from "./ButtonDrumKit";
import ButtonMelodyKit from "./ButtonMelodyKit";

const Settings = ({ isModalOpen }) => {
  const {
    resetInstrument,
    isPlaying,
    setDrumKit,
    drumKit,
    melodyKit,
    setMelodyKit,
  } = useContext(PlayerContext);

  return (
    <Container isModalOpen={isModalOpen}>
      <H2>Settings</H2>

      <ContainerAll>
        <ContainerTitle>
          <Title>Drum Kit</Title>
        </ContainerTitle>
        <ButtonDrumKit
          isPlaying={isPlaying}
          setDrumKit={setDrumKit}
          drumKit={drumKit}
        />
      </ContainerAll>
      <ContainerAll>
        <ContainerTitle>
          <Title>Instrument</Title>
        </ContainerTitle>
        <ContainerDivision>
          <ButtonMelodyKit
            isPlaying={isPlaying}
            setMelodyKit={setMelodyKit}
            melodyKit={melodyKit}
          />
        </ContainerDivision>
      </ContainerAll>
      <ContainerAll>
        <ContainerTitle>
          <Title>Clear</Title>
        </ContainerTitle>
        <ContainerDivision>
          <ButtonClear
            onClick={() => resetInstrument("drums")}
            disabled={isPlaying}
          >
            Drum
          </ButtonClear>
          <ButtonClear
            onClick={() => resetInstrument("melody")}
            disabled={isPlaying}
          >
            Melody
          </ButtonClear>
          <ButtonClear
            onClick={() => resetInstrument("chords")}
            disabled={isPlaying}
          >
            Chords
          </ButtonClear>
        </ContainerDivision>
      </ContainerAll>
    </Container>
  );
};

export default Settings;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  padding: 1rem 0;
  border-bottom: ${(props) =>
    props.isModalOpen ? "1px solid" + Colors.gray : ""};
  border-top: ${(props) =>
    props.isModalOpen ? "1px solid" + Colors.gray : ""};
  height: 100%;
  opacity: ${(props) => (props.isModalOpen ? "1" : "0")};
  transition: all 100ms ease-in-out;
`;

const H2 = styled.h2`
  color: ${Colors.yellow};
  font-size: 2rem;
  text-align: center;
  text-shadow: 0px 4px 3px rgba(0, 0, 0, 0.4), 0px 8px 13px rgba(0, 0, 0, 0.1),
    0px 18px 23px rgba(0, 0, 0, 0.1);
`;

const ContainerTitle = styled.div`
  width: 25%;
`;

const ContainerAll = styled.div`
  display: flex;
  width: 100%;
`;

const Title = styled.p`
  color: ${Colors.gray};
  font-weight: bold;
  font-size: 1.5rem;
`;

const ContainerDivision = styled.div`
  display: flex;
  gap: 1rem;
  width: 75%;
  height: 30px;
`;

const ButtonClear = styled.button`
  all: unset;
  width: 4rem;
  text-align: center;
  height: fit-content;
  padding: 0.4rem;
  background-color: ${Colors.yellowDarker};
  border: 2px solid transparent;
  border-radius: 20px;
  color: ${Colors.primary100};
  letter-spacing: 0.1rem;
  transition: all 300ms ease-in-out;

  :hover {
    border: 2px solid ${Colors.gray};
    cursor: pointer;
  }

  :disabled {
    opacity: 0.3;
    cursor: default;
  }
`;
