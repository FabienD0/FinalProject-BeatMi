import { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Colors, { handleColor } from "../utils/Colors";
import { arrayNote } from "../utils/data";
import { convertFlatNote, convertPadNumberToNote } from "../utils/function";
import { PlayerContext } from "./context/PlayerContext";

const Melody = ({ steps, currentPage }) => {
  const {
    playerMelody,
    melodyNotes,
    drumAndMelody,
    setDrumAndMelody,
    scale,
    octave,
    clearInstrument,
    setClearInstrument,
  } = useContext(PlayerContext);

  const [sequence, setSequence] = useState(drumAndMelody.melody);
  const [refreshMelodyNote, setRefreshMelodyNote] = useState(false);

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

  /* Convert Flat note to Melody pad note */
  useEffect(() => {
    if (scale) {
      const flatNote = scale.filter((note) => note.charAt(1) === "b");
      if (flatNote.length !== 0) {
        flatNote.forEach((note) => {
          scale[scale.indexOf(note)] = convertFlatNote(note);
          setRefreshMelodyNote(!refreshMelodyNote);
        });
      }
    }
  }, [scale]);

  /* When Click on note PAD, play the note */
  const handleClickInstrument = (note) => {
    let noteRender;
    if (note.charAt(1) === "#") {
      noteRender = melodyNotes.filter((noteArray) => noteArray.includes(note));
    } else if (note.charAt(1) !== "#") {
      noteRender = melodyNotes.filter((noteArray) =>
        noteArray.includes("#") ? "" : note.charAt(0) === noteArray.charAt(0)
      );
    }
    playerMelody.triggerAttackRelease(noteRender, "16n");
  };

  /* Press on a GRID to activate */
  const toggleStep = (line, step, e) => {
    //Choose the velocity based on wich mouse button
    let velocity;
    switch (true) {
      case e.button === 0:
        velocity = 1;
        break;
      case e.button === 1:
        velocity = 0.5;
        break;
      case e.button === 2:
        velocity = 0.25;
        break;
    }
    //play the note on click
    const previewNote = convertPadNumberToNote(line) + octave;
    if (!sequence[line][step].activated) {
      playerMelody.triggerAttackRelease(
        previewNote,
        "16n",
        undefined,
        velocity
      );
    }
    step = step + (currentPage - 1) * 16;
    const sequenceCopy = [...sequence];
    const { triggered, activated } = sequenceCopy[line][step];
    sequenceCopy[line][step] = {
      triggered,
      activated: !activated,
      velocity: velocity,
      instrument: "melody",
    };
    setSequence(sequenceCopy);
    setDrumAndMelody({
      ...drumAndMelody,
      melody: sequenceCopy,
    });
  };

  /* Reset Melody Pad */
  useEffect(() => {
    if (clearInstrument.refresh && clearInstrument.instrument === "melody") {
      setSequence(drumAndMelody.melody);
      setClearInstrument({
        instrument: "",
        refresh: false,
      });
    }
  }, [clearInstrument]);

  /* Update when add steps */
  useEffect(() => {
    setSequence(drumAndMelody.melody);
  }, [drumAndMelody]);

  return (
    <Container>
      <ContainerInstrument>
        {arrayNote.map((note) => {
          if (note.length === 2) {
            return (
              <Instrument
                key={note}
                onClick={() => handleClickInstrument(note)}
              >
                {note.charAt(0)}
                <span style={{ fontSize: 12 }}>{note.charAt(1)}</span>
              </Instrument>
            );
          } else {
            return (
              <Instrument
                key={note}
                onClick={() => handleClickInstrument(note)}
              >
                {note}
              </Instrument>
            );
          }
        })}
      </ContainerInstrument>
      <ContainerGrid steps={steps}>
        {currentSteps.map((line, i) =>
          line.map((time, j) => (
            <Grid
              key={i + j}
              activated={currentSteps[i][j]["activated"]}
              triggered={currentSteps[i][j]["triggered"]}
              onClick={(e) => {
                toggleStep(i, j, e);
              }}
              onAuxClick={(e) => {
                toggleStep(i, j, e);
              }}
              onContextMenu={(e) => {
                e.preventDefault();
              }}
              colorPad={() =>
                handleColor(
                  4,
                  currentSteps[i][j].triggered,
                  i,
                  currentSteps[i][j].velocity
                )
              }
              scaleHelper={scale.includes(convertPadNumberToNote(i))}
            />
          ))
        )}
      </ContainerGrid>
    </Container>
  );
};

export default Melody;

const Container = styled.div`
  position: relative;
  display: flex;
  background-color: ${Colors.primary200};
  min-height: 20rem;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 30px;
  width: 80vw;
  padding: 1rem;
  overflow-x: auto;
`;

const ContainerInstrument = styled.div`
  display: flex;
  flex-direction: column;
`;

const Instrument = styled.button`
  all: unset;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  font-weight: bold;
  width: 4rem;
  height: 1.3rem;
  margin: 3px;
  margin-right: 1rem;
  background-color: ${Colors.yellow};
  cursor: pointer;
`;

const ContainerGrid = styled.div`
  display: grid;
  /* grid-template-columns: ${(props) => `repeat(${props.steps}, 1fr)`}; */
  grid-template-columns: repeat(16, 1fr);
  grid-template-rows: repeat(12, 1fr);

  width: 100%;
`;

const Grid = styled.button`
  all: unset;
  border-radius: 7px;
  width: 3.5vw;
  background: ${(props) => (props.activated ? props.colorPad : Colors.gray)};
  transform: ${(props) => (props.triggered ? "scaleX(1.1)" : "")};
  margin: 4px;
  opacity: ${(props) => (props.scaleHelper ? "1" : "0.1")};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

  :hover {
    opacity: 0.5;
  }
  cursor: pointer;
`;
