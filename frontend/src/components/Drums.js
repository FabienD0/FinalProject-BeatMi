import * as Tone from "tone";
import styled from "styled-components";
import Colors, { handleColor } from "../utils/Colors";
import { PlayerContext } from "./context/PlayerContext";
import { useContext, useEffect, useRef, useState } from "react";

const Drums = ({ steps, currentPage }) => {
  const {
    playerDrum,
    drumAndMelody,
    setDrumAndMelody,
    clearInstrument,
    setClearInstrument,
  } = useContext(PlayerContext);

  const [sequence, setSequence] = useState(drumAndMelody.drum);

  /* When Click on instrument PAD, play the sound */
  const handleClickInstrument = (note) => {
    playerDrum.triggerAttackRelease(note, 1);
  };

  /* Logic for displaying the current steps by pages */
  const indexOfLastPage = currentPage * 16;
  const indexOfFirstPage = indexOfLastPage - 16;
  const currentSteps = sequence.map((line) =>
    line.slice(indexOfFirstPage, indexOfLastPage)
  );

  /* Logic for displaying page numbers */
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(sequence[0].length / 16); i++) {
    pageNumbers.push(i);
  }

  /* Press on a GRID to activate */
  const toggleStep = (line, step) => {
    step = step + (currentPage - 1) * 16;
    const sequenceCopy = [...sequence];
    const { triggered, activated } = sequenceCopy[line][step];
    sequenceCopy[line][step] = {
      triggered,
      activated: !activated,
      instrument: "drum",
    };
    setSequence(sequenceCopy);
    setDrumAndMelody({
      ...drumAndMelody,
      drum: sequenceCopy,
    });
  };

  /* Reset Drum Pad */
  useEffect(() => {
    if (clearInstrument.refresh && clearInstrument.instrument === "drums") {
      setSequence(drumAndMelody.drum);
      setClearInstrument({
        instrument: "",
        refresh: false,
      });
    }
  }, [clearInstrument]);

  /* Update when add steps */
  useEffect(() => {
    setSequence(drumAndMelody.drum);
  }, [drumAndMelody]);

  return (
    <Container>
      <ContainerInstrument>
        <Instrument onClick={() => handleClickInstrument("A4")}>
          <Image src="/images/cymbal.png" alt="cymbal" />
        </Instrument>
        <Instrument onClick={() => handleClickInstrument("A3")}>
          <Image src="/images/hihat.png" alt="hihat" />
        </Instrument>
        <Instrument onClick={() => handleClickInstrument("A2")}>
          <Image src="/images/snare.png" alt="snare" />
        </Instrument>
        <Instrument onClick={() => handleClickInstrument("A1")}>
          <Image src="/images/kick.png" alt="kick" />
        </Instrument>
      </ContainerInstrument>
      <ContainerGrid steps={steps}>
        {currentSteps.map((line, i) =>
          line.map((time, j) => (
            <Grid
              index={j}
              key={i + j}
              activated={currentSteps[i][j]["activated"]}
              triggered={currentSteps[i][j]["triggered"]}
              onClick={() => {
                toggleStep(i, j);
              }}
              colorPad={() => handleColor(i, currentSteps[i][j].triggered)}
            ></Grid>
          ))
        )}
      </ContainerGrid>
    </Container>
  );
};

export default Drums;

const Container = styled.div`
  display: flex;
  background-color: ${Colors.primary200};
  min-height: 12rem;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 30px;
  width: 80vw;
  padding: 1.5rem;
  overflow-x: auto;
`;

const ContainerInstrument = styled.div`
  display: flex;
  flex-direction: column;
`;

const Instrument = styled.button`
  all: unset;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  width: 4rem;
  height: 3rem;
  margin: 3px;
  margin-right: 1rem;
  background-color: ${Colors.yellow};
  cursor: pointer;
`;

const ContainerGrid = styled.div`
  display: grid;
  /* grid-template-columns: ${(props) => `repeat(${props.steps}, 1fr)`}; */
  grid-template-columns: repeat(16, 1fr);
  grid-template-rows: repeat(4, 1fr);
  width: 100%;
`;

const Grid = styled.button`
  all: unset;
  position: relative;
  border-radius: 7px;
  width: 3.5vw;
  margin: 4px;
  background: ${(props) => (props.activated ? props.colorPad : Colors.gray)};
  transform: ${(props) => (props.triggered ? "scaleX(1.1)" : "")};
  cursor: pointer;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

  &:hover {
    opacity: 0.5;
  }

  :nth-child(${"4n+49"}) {
    position: relative;
    ::after {
      position: absolute;
      content: "";
      color: ${Colors.yellow};
      left: 50%;
      bottom: -25px;
      transform: translate(-50%, -50%);
      pointer-events: none;
      height: 0.7rem;
      width: 0.7rem;
      background-color: ${Colors.yellowDarker};
      border-radius: 50%;
    }
  }
`;

const Image = styled.img`
  width: 50px;
`;
