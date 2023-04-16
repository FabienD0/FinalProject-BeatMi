import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GeneralContext, URL } from "../components/context/GeneralContext";
import styled from "styled-components";
import Colors from "../utils/Colors";
import {
  TbMoodSmile,
  TbMoodNerd,
  TbMoodAngry,
  TbMoodNeutral,
  TbMoodSad2,
  TbMoodSick,
  TbMoodSuprised,
} from "react-icons/tb";
import { AiOutlineCheck } from "react-icons/ai";
import { PlayerContext } from "../components/context/PlayerContext";
const { v4: uuid } = require("uuid");

const SaveBeat = ({ isModalOpen, speed, setIsBeatSaved }) => {
  const {
    drumAndMelody,
    chordToPiano,
    octave,
    drumKit,
    melodyKit,
    chordName,
    steps,
  } = useContext(PlayerContext);
  const { user } = useContext(GeneralContext);
  const [moodNameHover, setMoodNameHover] = useState("");
  const [beatInfo, setBeatInfo] = useState({
    title: "",
    mood: "",
  });
  const [saveMessage, setSaveMessage] = useState("");

  const navigate = useNavigate();

  /* Save beat on the database */
  const handleSave = () => {
    const dataBeat = {
      _id: uuid(),
      speed: speed,
      drumAndMelody: drumAndMelody,
      chordToPiano: chordToPiano,
      octave: octave,
      drumKit: drumKit,
      melodyKit: melodyKit,
      chordName: chordName,
      title: beatInfo.title,
      mood: beatInfo.mood,
      steps: steps,
      artist: user.username,
      likedBy: [],
    };

    //Add beat to the database
    fetch(`${URL}/api/saveBeat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataBeat),
    })
      .then((res) => res.json())
      .then(() => {
        setSaveMessage("Beat Added");
        setIsBeatSaved(true);
      })
      .catch(() => navigate("/404"));
    //Add beat ID to the user profile
    fetch(`${URL}/api/addBeatUser`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ _id: user._id, beatId: dataBeat._id }),
    }).catch(() => navigate("/404"));
  };

  return (
    <Container isModalOpen={isModalOpen}>
      <H2>Save</H2>
      {saveMessage !== "" && (
        <ContainerMessage>
          <p>{saveMessage}</p>
        </ContainerMessage>
      )}
      {saveMessage === "" && (
        <ContainerAll>
          <ContainerLeft>
            <ContainerSection>
              <H3>Title</H3>
              <Input
                type="text"
                maxLength={25}
                autoComplete="off"
                value={beatInfo.title}
                onChange={(e) =>
                  setBeatInfo({ ...beatInfo, title: e.target.value })
                }
              ></Input>
            </ContainerSection>
            <ContainerSection>
              <H3>Mood</H3>
              <ContainerMood>
                <ButtonMood
                  onMouseEnter={() => setMoodNameHover("Happy")}
                  moodname={moodNameHover}
                  isactive={beatInfo.mood === "Happy"}
                  onClick={() => setBeatInfo({ ...beatInfo, mood: "Happy" })}
                >
                  <TbMoodSmile />
                  {beatInfo.mood === "Happy" && <Mood>{beatInfo.mood}</Mood>}
                </ButtonMood>
                <ButtonMood
                  onMouseEnter={() => setMoodNameHover("Sad")}
                  moodname={moodNameHover}
                  isactive={beatInfo.mood === "Sad"}
                  onClick={() => setBeatInfo({ ...beatInfo, mood: "Sad" })}
                >
                  <TbMoodSad2 />
                  {beatInfo.mood === "Sad" && <Mood>{beatInfo.mood}</Mood>}
                </ButtonMood>
                <ButtonMood
                  onMouseEnter={() => setMoodNameHover("Cool")}
                  moodname={moodNameHover}
                  isactive={beatInfo.mood === "Cool"}
                  onClick={() => setBeatInfo({ ...beatInfo, mood: "Cool" })}
                >
                  <TbMoodNerd />
                  {beatInfo.mood === "Cool" && <Mood>{beatInfo.mood}</Mood>}
                </ButtonMood>
                <ButtonMood
                  onMouseEnter={() => setMoodNameHover("Angry")}
                  moodname={moodNameHover}
                  isactive={beatInfo.mood === "Angry"}
                  onClick={() => setBeatInfo({ ...beatInfo, mood: "Angry" })}
                >
                  <TbMoodAngry />
                  {beatInfo.mood === "Angry" && <Mood>{beatInfo.mood}</Mood>}
                </ButtonMood>

                <ButtonMood
                  onMouseEnter={() => setMoodNameHover("Scary")}
                  moodname={moodNameHover}
                  isactive={beatInfo.mood === "Scary"}
                  onClick={() => setBeatInfo({ ...beatInfo, mood: "Scary" })}
                >
                  <TbMoodSick />
                  {beatInfo.mood === "Scary" && <Mood>{beatInfo.mood}</Mood>}
                </ButtonMood>
                <ButtonMood
                  onMouseEnter={() => setMoodNameHover("Bouncy")}
                  moodname={moodNameHover}
                  isactive={beatInfo.mood === "Bouncy"}
                  onClick={() => setBeatInfo({ ...beatInfo, mood: "Bouncy" })}
                >
                  <TbMoodSuprised />
                  {beatInfo.mood === "Bouncy" && <Mood>{beatInfo.mood}</Mood>}
                </ButtonMood>
                <ButtonMood
                  onMouseEnter={() => setMoodNameHover("None")}
                  moodname={moodNameHover}
                  isactive={beatInfo.mood === "None"}
                  onClick={() => setBeatInfo({ ...beatInfo, mood: "None" })}
                >
                  <TbMoodNeutral />
                  {beatInfo.mood === "None" && <Mood>{beatInfo.mood}</Mood>}
                </ButtonMood>
              </ContainerMood>
            </ContainerSection>
          </ContainerLeft>
          <ContainerRight>
            <ContainerButton>
              <Button
                disabled={beatInfo.title === "" || beatInfo.mood === ""}
                onClick={handleSave}
              >
                <AiOutlineCheck />
              </Button>
            </ContainerButton>
          </ContainerRight>
        </ContainerAll>
      )}
    </Container>
  );
};

export default SaveBeat;

const Container = styled.div`
  position: relative;
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

const ContainerMessage = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${Colors.gray};
  font-size: 2rem;
  font-weight: bold;
  color: #009546;
  text-shadow: 0px 4px 3px rgba(0, 0, 0, 0.4), 0px 8px 13px rgba(0, 0, 0, 0.1),
    0px 18px 23px rgba(0, 0, 0, 0.1);
`;

const H2 = styled.h2`
  color: ${Colors.yellow};
  font-size: 2rem;
  text-align: center;
  text-shadow: 0px 4px 3px rgba(0, 0, 0, 0.4), 0px 8px 13px rgba(0, 0, 0, 0.1),
    0px 18px 23px rgba(0, 0, 0, 0.1);
`;

const H3 = styled.h3`
  color: ${Colors.yellowDarker};
  font-size: 1rem;
  text-shadow: 0px 4px 3px rgba(0, 0, 0, 0.4), 0px 8px 13px rgba(0, 0, 0, 0.1),
    0px 18px 23px rgba(0, 0, 0, 0.1);
`;

const ContainerAll = styled.div`
  display: flex;
  gap: 1rem;
  height: 100%;
`;

const ContainerLeft = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  width: 90%;
`;

const ContainerRight = styled.div`
  width: 10%;
`;

const ContainerSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Input = styled.input`
  all: unset;
  padding: 1px 2px;
  border-radius: 14px;
  height: 1.2rem;
  width: 15rem;
  padding: 0.2rem 1rem;
  background: #232528;
  color: ${Colors.gray};
  box-shadow: inset 0 1px 0 0 #0d0e0f, inset 0 -1px 0 0 #3a3d42;
  -webkit-box-shadow: inset 0 1px 0 0 #0d0e0f, inset 0 -1px 0 0 #3a3d42;
  -webkit-transition: 0.2s;
  transition: opacity 0.2s;

  &:focus {
    outline: none;
    outline: 0.5px solid ${Colors.gray};
    transition: border-color 0.3s ease-in-out;
  }
`;

const ContainerMood = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
`;

const ButtonMood = styled.button`
  all: unset;
  position: relative;
  color: ${(props) => (props.isactive ? Colors.yellow : Colors.gray)};
  font-size: 2.5rem;

  :hover {
    cursor: pointer;
    color: ${Colors.yellow};
    ::after {
      content: "${(props) => props.moodname}";
      position: absolute;
      font-size: 1rem;
      bottom: -10px;
      left: 50%;
      font-size: 0.7rem;
      transform: translate(-50%, 0);
    }
  }
`;

const Mood = styled.p`
  position: absolute;
  font-size: 1rem;
  bottom: -10px;
  left: 50%;
  font-size: 0.7rem;
  transform: translate(-50%, 0);
`;

const ContainerButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const Button = styled.button`
  all: unset;
  cursor: pointer;
  border-radius: 50%;
  text-align: center;
  color: ${Colors.gray};
  font-size: 1rem;
  padding: 0.5rem;
  transition: all 0.2s ease-in-out;
  border: 1px solid #0bdb62;

  :hover {
    opacity: 0.8;
    border: 1px solid transparent;
    background-color: #0bdb62;
    color: black;
  }

  :disabled {
    opacity: 0.3;
    cursor: default;

    :hover {
      background-color: inherit;
      border: 1px solid #0bdb62;
      color: ${Colors.gray};
    }
  }
`;
