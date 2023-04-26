import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Chords from "../components/Chords";
import { PlayerContext } from "../components/context/PlayerContext";
import Drums from "../components/Drums";
import Melody from "../components/Melody";
import Settings from "../components/Settings";
import TransportBar from "../components/TransportBar";
import HelpModal from "../components/modals/HelpModal";
import Colors from "../utils/Colors";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import {
  initialCellStateDrum,
  initialCellStateMelody,
} from "../utils/initialStates";
import { GeneralContext } from "../components/context/GeneralContext";

const BeatMaker = ({ allBeats }) => {
  //Context
  const {
    playerMelody,
    playerDrum,
    playerChords,
    melodyNotes,
    drumNotes,
    drumAndMelody,
    chordToPiano,
    clearInstrument,
    isPlaying,
    setIsPlaying,
    setDrumAndMelody,
    setChordToPiano,
    setChordName,
    setDrumKit,
    setMelodyKit,
    setOctave,
    resetInstrument,
    steps,
    setSteps,
  } = useContext(PlayerContext);

  const { loadingState } = useContext(GeneralContext);
  //State
  const [currentStep, setCurrentStep] = useState(0);
  const [currentStepPiano, setCurrentStepPiano] = useState(0);
  const [currentChordTriggered, setCurrentChordTriggered] = useState("");
  const [sequence, setSequence] = useState([
    ...drumAndMelody.drum,
    ...drumAndMelody.melody,
  ]);
  const [speed, setSpeed] = useState(100);
  const [isLoading, setIsLoading] = useState(true);
  /*How many times the loop run ?*/
  const [currentPage, setCurrentPage] = useState(1);
  const stepsPiano = 64;

  const { id } = useParams();
  const navigate = useNavigate();

  /* Function to add STEPS to the Drum & Melody */
  const addSteps = () => {
    setIsLoading(true);
    setSteps((prev) => prev + 16);

    //Drum
    const sequenceDrumAddSteps = drumAndMelody.drum.map((row) => {
      const newRow = [...row];
      for (let i = 0; i < 16; i++) {
        newRow.push(initialCellStateDrum);
      }
      return newRow;
    });

    //Melody
    const sequenceMelodyAddSteps = drumAndMelody.melody.map((row) => {
      const newRow = [...row];
      for (let i = 0; i < 16; i++) {
        newRow.push(initialCellStateMelody);
      }
      return newRow;
    });
    const drumAndMelodyUpdate = {
      drum: sequenceDrumAddSteps,
      melody: sequenceMelodyAddSteps,
    };
    setDrumAndMelody(drumAndMelodyUpdate);
    const sequenceCopy = [
      ...drumAndMelodyUpdate.drum,
      ...drumAndMelodyUpdate.melody,
    ];
    setSequence(sequenceCopy);
    setIsLoading(false);
  };

  /*Load a beat already made*/
  useEffect(() => {
    if (id && loadingState === "success") {
      const [getBeatPreset] = allBeats.filter((beat) => beat._id === id);
      const sequenceCopy = [
        ...getBeatPreset.drumAndMelody.drum,
        ...getBeatPreset.drumAndMelody.melody,
      ];
      setDrumAndMelody(getBeatPreset.drumAndMelody);
      setChordToPiano(getBeatPreset.chordToPiano);
      setChordName(getBeatPreset.chordName);
      setSequence(sequenceCopy);
      setDrumKit(getBeatPreset.drumKit);
      setMelodyKit(getBeatPreset.melodyKit);
      setSpeed(getBeatPreset.speed);
      setOctave(getBeatPreset.octave);
      setSteps(getBeatPreset.steps || 16);
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  }, [id, allBeats]);

  /*Clean Track when you start*/
  useEffect(() => {
    if (!id) {
      resetInstrument("drums");
      resetInstrument("melody");
      resetInstrument("chords");
    }
    setIsPlaying(false);
  }, []);

  /*The sequencer move and read each cell 
  /*The first loop is used to analyze which part of the instrument
  /*The second loop is for each steps(grid) of that instrument*/
  const nextStep = (time) => {
    for (let i = 0; i < sequence.length; i++) {
      for (let y = 0; y < sequence[i].length; y++) {
        const { triggered, activated, velocity, instrument } = sequence[i][y];
        sequence[i][y] = {
          activated,
          triggered: y === time,
          velocity,
          instrument: sequence[i][y].instrument,
        };
        if (triggered && activated && instrument === "drum") {
          playerDrum.triggerAttackRelease(drumNotes[i], 2, undefined, velocity);
        } else if (triggered && activated && instrument === "melody") {
          playerMelody.triggerAttackRelease(
            melodyNotes[i - 4],
            "16n",
            undefined,
            velocity
          );
        }
      }
    }
    setSequence(sequence);
  };

  /*Refresh for clear settings*/
  useEffect(() => {
    if (clearInstrument.refresh) {
      setSequence([...drumAndMelody.drum, ...drumAndMelody.melody]);
    }
  }, [clearInstrument]);

  /* Sequencer for PIANO chords */
  const nextStepChords = (time) => {
    if (time === 0 && chordToPiano.one !== "") {
      playerChords.triggerAttackRelease(chordToPiano.one, 2.5);
      setCurrentChordTriggered("one");
    } else if (time === 16 && chordToPiano.two !== "") {
      playerChords.triggerAttackRelease(chordToPiano.two, 2.5);
      setCurrentChordTriggered("two");
    } else if (time === 32 && chordToPiano.three !== "") {
      playerChords.triggerAttackRelease(chordToPiano.three, 2.5);
      setCurrentChordTriggered("three");
    } else if (time === 48 && chordToPiano.four !== "") {
      playerChords.triggerAttackRelease(chordToPiano.four, 2.5);
      setCurrentChordTriggered("four");
    }
  };

  /*This is the LOOP section */
  useEffect(() => {
    const timer = setTimeout(() => {
      if (isPlaying) {
        setCurrentStep((currentStep + 1) % steps);
        setCurrentStepPiano((currentStepPiano + 1) % stepsPiano);
        nextStep(currentStep);
        nextStepChords(currentStepPiano);
        if (currentStep === 0) {
          setCurrentPage(1);
        } else {
          setCurrentPage(Math.ceil(currentStep / 16));
        }
      }
    }, (60 * 1000) / speed / 4);

    return () => {
      clearTimeout(timer);
    };
  }, [currentStep, isPlaying, steps]);

  /* Loading State */
  if (isLoading) {
    return <h1>Loading..</h1>;
  }

  return (
    <Container>
      <HelpModal />
      <Drums steps={steps} currentPage={currentPage} />
      <Melody steps={steps} currentPage={currentPage} />
      <Chords currentChordTriggered={currentChordTriggered} />
      <ContainerBottom>
        <Settings setSpeed={setSpeed} speed={speed} setSteps={setSteps} />
        <ContainerPaginationSteps>
          <ContainerButtonPagination>
            {steps >= 32 && (
              <ButtonPagination
                page={currentPage === 1}
                onClick={() => setCurrentPage(1)}
              >
                1
              </ButtonPagination>
            )}
            {steps >= 32 && (
              <ButtonPagination
                page={currentPage === 2}
                onClick={() => setCurrentPage(2)}
              >
                2
              </ButtonPagination>
            )}
            {steps >= 48 && (
              <ButtonPagination
                page={currentPage === 3}
                onClick={() => setCurrentPage(3)}
              >
                3
              </ButtonPagination>
            )}
            {steps >= 64 && (
              <ButtonPagination
                page={currentPage === 4}
                onClick={() => setCurrentPage(4)}
              >
                4
              </ButtonPagination>
            )}
          </ContainerButtonPagination>
          <ButtonAddSteps onClick={addSteps} disabled={steps >= 64}>
            <AiOutlinePlus />
          </ButtonAddSteps>
        </ContainerPaginationSteps>
        <TransportBar
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          setCurrentStep={setCurrentStep}
          setCurrentStepPiano={setCurrentStepPiano}
          setCurrentChordTriggered={setCurrentChordTriggered}
          speed={speed}
          setCurrentPage={setCurrentPage}
          allBeats={allBeats}
        />
      </ContainerBottom>
    </Container>
  );
};

export default BeatMaker;

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  height: 100%;
`;

const ContainerBottom = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 80vw;
  @media (max-width: 700px) {
    margin-left: 5rem;
    justify-content: center;
  }
`;

const ContainerButtonPagination = styled.div`
  position: absolute;
  display: flex;
  gap: 1rem;
  top: -45px;
`;

const ContainerPaginationSteps = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 10vw;
`;

const ButtonAddSteps = styled.button`
  all: unset;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background-color: ${Colors.primary200};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  color: ${Colors.gray};
  font-size: 2rem;
  transition: all 300ms;

  :hover {
    cursor: pointer;
    color: ${Colors.yellow};
  }

  :disabled {
    opacity: 0.3;
    cursor: default;
  }

  @media (max-width: 700px) {
    display: none;
  }
`;

const ButtonPagination = styled.button`
  all: unset;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  font-size: 2rem;
  width: 1.5rem;
  height: 1.5rem;
  font-size: 1rem;
  border-radius: 50%;
  background-color: ${Colors.primary200};
  background-color: ${(props) =>
    props.page ? Colors.yellowDarker : Colors.primary200};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  color: ${(props) => (props.page ? "" : Colors.gray)};
  top: -45px;

  transition: all 300ms;

  @media (max-width: 700px) {
    display: none;
  }

  :hover {
    cursor: pointer;
    color: ${(props) => (props.page ? "" : Colors.yellow)};
  }

  :first-child {
    left: 0%;
  }
  :nth-child(2) {
    left: 33%;
  }
  :nth-child(3) {
    left: 66%;
  }
  :last-child {
    left: 100%;
  }
`;
