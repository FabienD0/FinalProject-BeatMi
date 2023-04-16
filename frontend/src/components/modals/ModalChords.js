import styled from "styled-components";
import Colors from "../../utils/Colors";
import { arrayNoteNoNotation, chordTonalityData } from "../../utils/data";
import { useContext, useRef, useState } from "react";
import { PlayerContext } from "../context/PlayerContext";
import { Chord } from "tonal";

const Modal = ({ isModalChords, setIsModalChords, chordNumber, setChord }) => {
  const [refreshModalNote, setRefreshModalNote] = useState(false);
  const [currentNoteActive, setCurrentNoteActive] = useState("");
  const chordRef = useRef({
    note: "",
    tonality: "",
    isFlat: false,
  });

  const { setChordToPiano, playerChords, setChordName } =
    useContext(PlayerContext);

  /*Function to preview the chord and
    send the chord to context if
    the user press click on CONFIRM */
  const handlePress = (type) => {
    const chordReturn = `${chordRef.current.note}${chordRef.current.tonality}`;
    const chordPianoReturn = Chord.getChord(
      chordRef.current.tonality,
      chordRef.current.note + "3"
    ).notes;
    if (type === "confirm") {
      setChord((prevChord) => ({ ...prevChord, [chordNumber]: chordReturn }));
      setChordName((prevChord) => ({
        ...prevChord,
        [chordNumber]: chordReturn,
      }));
      setChordToPiano((prevChord) => ({
        ...prevChord,
        [chordNumber]: chordPianoReturn,
      }));
      chordRef.current.note = "";
      chordRef.current.tonality = "";
      chordRef.current.isFlat = false;
      setCurrentNoteActive("");
      setIsModalChords(false);
    } else if (type === "preview") {
      playerChords.triggerAttackRelease(chordPianoReturn, 2);
    }
  };

  //Function when press on CANCEL button
  const handleClose = () => {
    setChord((prevChord) => ({ ...prevChord, [chordNumber]: "" }));
    setChordName((prevChord) => ({ ...prevChord, [chordNumber]: "" }));
    setChordToPiano((prevChord) => ({ ...prevChord, [chordNumber]: "" }));
    chordRef.current.note = "";
    chordRef.current.tonality = "";
    chordRef.current.isFlat = false;
    setCurrentNoteActive("");
    setIsModalChords(false);
  };

  //Function to choose the root note
  const handleNote = (note) => {
    if (chordRef.current.isFlat) {
      setCurrentNoteActive(note);
      setRefreshModalNote(!refreshModalNote);
      chordRef.current.note = note + "b";
      handlePress("preview");
    } else {
      setCurrentNoteActive(note);
      setRefreshModalNote(!refreshModalNote);
      chordRef.current.note = note;
      handlePress("preview");
    }
  };

  return (
    <>
      <ContainerModal isModal={isModalChords}>
        <Title>Choose your chord</Title>
        <ContainerChordOptions>
          <ContainerNote>
            {arrayNoteNoNotation.map((note) => {
              return (
                <Note
                  key={note}
                  onClick={() => handleNote(note)}
                  active={currentNoteActive === note ? true : false}
                >
                  {chordRef.current.isFlat ? note + "b" : note}
                </Note>
              );
            })}
          </ContainerNote>
          <ContainerTonality>
            {chordTonalityData.map((tonality) => {
              return (
                <Note
                  key={tonality}
                  onClick={() => {
                    chordRef.current.tonality = tonality;
                    setRefreshModalNote(!refreshModalNote);
                    handlePress("preview");
                  }}
                  active={tonality === chordRef.current.tonality ? true : false}
                  disabled={chordRef.current.note.length !== 0 ? false : true}
                >
                  {tonality}
                </Note>
              );
            })}
          </ContainerTonality>
          <ContainerThirdRow>
            <ContainerNotation>
              <Note
                onClick={() => {
                  setRefreshModalNote(!refreshModalNote);
                  chordRef.current.isFlat = !chordRef.current.isFlat;
                  chordRef.current.note.length === 1
                    ? (chordRef.current.note = chordRef.current.note + "b")
                    : (chordRef.current.note = chordRef.current.note);
                }}
                active={chordRef.current.isFlat ? true : false}
              >
                <IconFlat src="/images/flat.png" />
              </Note>
            </ContainerNotation>
            <ContainerPreviewNote>
              {chordRef.current.note}
              {chordRef.current.tonality}
            </ContainerPreviewNote>
          </ContainerThirdRow>
        </ContainerChordOptions>
        <ContainerButton>
          <Button
            onClick={() => handlePress("confirm")}
            buttonColor="#0bdb62"
            disabled={chordRef.current.tonality.length === 0 && true}
          >
            Confirm
          </Button>
          <Button onClick={handleClose} buttonColor="#ed1b0c">
            Cancel
          </Button>
        </ContainerButton>
      </ContainerModal>
    </>
  );
};

export default Modal;

const ContainerModal = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${Colors.primary200};
  border: 1px solid ${Colors.gray};
  border-radius: 35px;
  width: 600px;
  height: 30rem;
  left: 50%;
  top: ${(props) => (props.isModal ? "50%" : "-200%")};
  transform: translate(-50%, -50%);
  padding: 1.5rem;
  box-shadow: 0px 4px 4px rgba(255, 255, 255, 0.25);
  z-index: 25;
  transition: all 0.4s ease-in-out;
`;

const ContainerChordOptions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  height: 80%;
  width: 100%;
`;

const Title = styled.p`
  font-size: 24px;
  font-weight: bold;
  color: ${Colors.gray};
  margin-bottom: 15px;
  border-bottom: 1px solid ${Colors.gray};
  padding-bottom: 10px;
  width: 60%;
  text-align: center;
`;

const ContainerNote = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 24px;
`;

const Note = styled.button`
  all: unset;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => (props.active ? Colors.yellow : Colors.gray)};
  width: 4rem;
  height: 4rem;
  margin: 5px 0px;
  font-weight: bold;
  border-radius: 50%;
  border-radius: 7px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
    rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  :hover {
    background-color: ${Colors.yellow};
    transform: translateY(-7px);
    box-shadow: 0px 5px 5px rgba(255, 255, 255, 0.2);
  }

  :disabled {
    opacity: 0.4;
    cursor: default;
  }
`;

const ContainerTonality = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ContainerThirdRow = styled.div`
  display: flex;
`;

const ContainerNotation = styled.div`
  display: flex;
  justify-content: space-around;
  font-size: 24px;
  width: 100%;
`;

const ContainerPreviewNote = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 4rem;
  font-weight: 900;
  color: ${Colors.gray};
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  width: 100%;
`;

const ContainerButton = styled.div`
  display: flex;
  margin: 10px 0px;
  justify-content: space-around;
  width: 85%;
`;

const Button = styled.button`
  all: unset;
  width: 100%;
  margin: 0rem 1rem;
  border-radius: 10px;
  text-align: center;
  height: 3rem;
  cursor: pointer;
  color: ${Colors.gray};
  font-size: 22px;
  border: ${(props) => "1px solid" + props.buttonColor};
  letter-spacing: 0.2rem;
  transition: all 0.2s ease-in-out;

  :hover {
    opacity: 0.8;
    border: 1px solid transparent;
    background-color: ${(props) => props.buttonColor};
    color: black;
    letter-spacing: 0.3rem;
  }

  :disabled {
    opacity: 0.3;
    cursor: default;

    :hover {
      background-color: inherit;
      border: ${(props) => "1px solid" + props.buttonColor};
      color: ${Colors.gray};
      letter-spacing: 0.2rem;
    }
  }
`;

const IconFlat = styled.img`
  width: 30%;
`;
