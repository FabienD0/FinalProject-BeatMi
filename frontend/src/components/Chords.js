import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import Colors from "../utils/Colors";
import Modal from "./modals/ModalChords";
import { PlayerContext } from "./context/PlayerContext";
import { BiShuffle } from "react-icons/bi";
import { chordShuffle } from "../utils/chordShuffle";
import { Chord, transpose, Scale } from "tonal";

const Chords = ({ currentChordTriggered }) => {
  //Context
  const {
    isModalChords,
    setIsModalChords,
    clearInstrument,
    setClearInstrument,
    setChordToPiano,
    chordName,
    setChordName,
  } = useContext(PlayerContext);

  //State
  const [chordNumber, setChordNumber] = useState();
  const [chord, setChord] = useState(chordName);
  //Handle Modal
  const handleModal = (number) => {
    setChordNumber(number);
    setIsModalChords(true);
  };

  /* Reset Melody Pad */
  useEffect(() => {
    if (clearInstrument.refresh && clearInstrument.instrument === "chords") {
      setChord({
        one: "",
        two: "",
        three: "",
        four: "",
      });
      setClearInstrument({
        instrument: "",
        refresh: false,
      });
    }
  }, [clearInstrument]);

  /* Add 4 random chords that fit together */
  const handleShuffleChord = () => {
    const randomNumberChord = Math.floor(Math.random() * chordShuffle.length);
    const randomNumberTonality = Math.floor(Math.random() * 7 - 1 + 1) + 1;
    const originalScale = chordShuffle[randomNumberChord].scale;
    let tonality = "1M";

    if (originalScale === "c major") {
      tonality = randomNumberTonality + "M";
    } else if (originalScale === "a minor") {
      tonality = randomNumberTonality + "m";
    }

    const returnChordPiano = {
      one: chordShuffle[randomNumberChord].one.map((note) =>
        transpose(note, tonality)
      ),
      two: chordShuffle[randomNumberChord].two.map((note) =>
        transpose(note, tonality)
      ),
      three: chordShuffle[randomNumberChord].three.map((note) =>
        transpose(note, tonality)
      ),
      four: chordShuffle[randomNumberChord].four.map((note) =>
        transpose(note, tonality)
      ),
    };

    const returnChordName = {
      one: Chord.detect(returnChordPiano.one)[0],
      two: Chord.detect(returnChordPiano.two)[0],
      three: Chord.detect(returnChordPiano.three)[0],
      four: Chord.detect(returnChordPiano.four)[0],
    };
    setChordToPiano(returnChordPiano);
    setChord(returnChordName);
    setChordName(returnChordName);
  };

  return (
    <Container>
      <Modal
        isModalChords={isModalChords}
        setIsModalChords={setIsModalChords}
        chordNumber={chordNumber}
        setChord={setChord}
      />
      <ContainerButton>
        <ShuffleIcon onClick={handleShuffleChord} />
        <ChordButton
          currentChordTriggered={currentChordTriggered === "one"}
          onClick={() => handleModal("one")}
        >
          {currentChordTriggered === "one" && <DotChord />}
          {chord.one}
        </ChordButton>
        <ChordButton
          currentChordTriggered={currentChordTriggered === "two"}
          onClick={() => handleModal("two")}
        >
          {currentChordTriggered === "two" && <DotChord />}

          {chord.two}
        </ChordButton>
        <ChordButton
          currentChordTriggered={currentChordTriggered === "three"}
          onClick={() => handleModal("three")}
        >
          {currentChordTriggered === "three" && <DotChord />}

          {chord.three}
        </ChordButton>
        <ChordButton
          currentChordTriggered={currentChordTriggered === "four"}
          onClick={() => handleModal("four")}
        >
          {currentChordTriggered === "four" && <DotChord />}

          {chord.four}
        </ChordButton>
      </ContainerButton>
    </Container>
  );
};

export default Chords;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  min-height: 4rem;
  width: 80vw;

  @media (max-width: 700px) {
    margin-left: 5rem;
    overflow: auto;
  }
`;

const ContainerButton = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  min-height: 4rem;
  width: 80vw;

  @media (max-width: 700px) {
    width: 30rem;
  }
`;

const ChordButton = styled.button`
  all: unset;
  position: relative;
  background-color: ${Colors.primary200};
  width: 15rem;
  margin: 0rem 1rem;
  color: ${(props) =>
    props.currentChordTriggered ? Colors.yellowDarker : Colors.yellow};
  text-shadow: -3px 2px 2px rgba(238, 238, 238, 0.17);
  text-align: center;
  font-size: 42px;
  font-weight: bold;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25),
    -2px -2px 4px rgba(238, 238, 238, 0.25);
  border-radius: 30px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  :hover {
    opacity: 0.8;
  }

  @media (max-width: 700px) {
    font-size: 20px;
  }
`;

const DotChord = styled.div`
  position: absolute;
  height: 0.7rem;
  width: 0.7rem;
  background-color: ${Colors.yellowDarker};
  border-radius: 50%;
  top: -22px;
  left: 50%;
  transform: translateX(-50%);
  animation: bounceChord 0.5s alternate infinite;

  @keyframes bounceChord {
    from {
      transform: translate3d(0, 0, 0);
    }
    to {
      transform: translate3d(0, 4px, 0);
    }
  }
`;

const ShuffleIcon = styled(BiShuffle)`
  position: absolute;
  width: 3rem;
  height: auto;
  left: -3vw;
  color: ${Colors.gray};

  :hover {
    opacity: 0.6;
    cursor: pointer;
  }

  @media (max-width: 1276px) {
    left: 50%;
    transform: translateX(-50%);
    top: -25px;
    width: 2rem;
    height: auto;
  }
  @media (max-width: 700px) {
    left: 50%;
    transform: translateX(-50%);
    top: 18px;
    width: 1.5rem;
    height: auto;
  }
`;
