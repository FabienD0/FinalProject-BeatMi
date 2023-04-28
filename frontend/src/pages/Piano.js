import styled from "styled-components";
import Colors from "../utils/Colors";
import {
  NOTE_TO_KEY_SHARP,
  KEY_TO_NOTE,
  VALID_KEYS,
  pianoKey,
} from "../utils/data";
import { useState } from "react";
import { useContext } from "react";
import { PlayerContext } from "../components/context/PlayerContext";
import { useEffect } from "react";

const Piano = () => {
  const [screenDisplay, setScreenDisplay] = useState("C#");
  const [volume, setVolume] = useState(0);
  const { playerChords } = useContext(PlayerContext);

  const handleMouseUp = (e, typeKey) => {
    e.currentTarget.classList.remove("active");
  };

  /* Function when pressing a piano key */
  const handleMouseDown = (e, typeKey, index) => {
    e.stopPropagation();
    e.currentTarget.classList.add("active");

    let note = "";

    if (typeKey === "black") {
      note =
        pianoKey[parseInt(e.target.id)].key.charAt(0) +
        "#" +
        pianoKey[parseInt(e.target.id)].key.charAt(1);
    } else {
      note = e.target.id;
    }

    setScreenDisplay(note.replace(/[45]/g, ""));
    playerChords.triggerAttackRelease(note, 2.5);
  };

  /* Change Volume */
  useEffect(() => {
    if (playerChords) {
      playerChords.volume.value = volume;
    }
  }, [volume]);

  /* Handle Key Down to play the piano */
  const handleKeyDown = (e) => {
    if (e.repeat) return;
    if (VALID_KEYS.includes(e.key)) {
      const [filteredNote] = KEY_TO_NOTE.filter(
        (note) => e.key === Object.keys(note)[0]
      );
      const note = filteredNote[e.key];

      if (filteredNote.key === "black") {
        const [blackKey] = document.getElementsByClassName(
          note.replace("#", "")
        );
        blackKey.classList.add("active");
      } else {
        document.getElementById(note).classList.add("active");
      }

      setScreenDisplay(note.replace(/[45]/g, ""));
      playerChords.triggerAttackRelease(note, 2.5);
    }
  };

  /* Handle Key Up to remove the class */
  const handleKeyUp = (e) => {
    if (e.repeat) return;
    if (VALID_KEYS.includes(e.key)) {
      const [filteredNote] = KEY_TO_NOTE.filter(
        (note) => e.key === Object.keys(note)[0]
      );

      const note = filteredNote[e.key];

      if (filteredNote.key === "black") {
        const [blackKey] = document.getElementsByClassName(
          note.replace("#", "")
        );

        blackKey.classList.remove("active");
      } else {
        document.getElementById(note).classList.remove("active");
      }
    }
  };

  /* Add the Event Listener to click the key on keyboard */
  useEffect(() => {
    if (playerChords) {
      document.addEventListener("keydown", handleKeyDown);
      document.addEventListener("keyup", handleKeyUp);

      return () => {
        document.removeEventListener("keydown", handleKeyDown);
        document.removeEventListener("keyup", handleKeyUp);
      };
    }
  }, [playerChords]);

  /* Function to get the keyboard key from the sharp note */
  const getKeyboardKey = (index) => {
    return NOTE_TO_KEY_SHARP.map((note) => note[index]);
  };

  return (
    <Container>
      <ContainerTitle>
        <Title>Piano</Title>
      </ContainerTitle>
      <ContainerBottom>
        <ContainerPiano>
          <ContainerTop>
            <ContainerScreen>{screenDisplay}</ContainerScreen>
            <ContainerSlider>
              <ContainerVolumeBar>
                <VolumeBar
                  color={volume > -5 ? "#01d205" : "transparent"}
                  border={volume > -5 ? "transparent" : "1px solid #01d205"}
                  height={"40%"}
                />
                <VolumeBar
                  color={volume > -3 ? "#6adc12" : "transparent"}
                  border={volume > -3 ? "transparent" : "1px solid #6adc12"}
                  height={"50%"}
                />
                <VolumeBar
                  color={volume > -1 ? "#87e40d" : "transparent"}
                  border={volume > -1 ? "transparent" : "1px solid #87e40d"}
                  height={"60%"}
                />
                <VolumeBar
                  color={volume >= 0 ? "#e4f84b" : "transparent"}
                  border={volume >= 0 ? "transparent" : "1px solid #e4f84b"}
                  height={"70%"}
                />
                <VolumeBar
                  color={volume > 2 ? "#fbe750" : "transparent"}
                  border={volume > 2 ? "transparent" : "1px solid #fbe750"}
                  height={"80%"}
                />
                <VolumeBar
                  color={volume > 3 ? "#fdac5b" : "transparent"}
                  border={volume > 3 ? "transparent" : "1px solid #fdac5b"}
                  height={"90%"}
                />
                <VolumeBar
                  color={volume >= 5 ? "#ff615e" : "transparent"}
                  border={volume >= 5 ? "transparent" : "1px solid #ff615e"}
                  height={"100%"}
                />
              </ContainerVolumeBar>
              <Slider
                type="range"
                min="-5"
                max="5"
                step={1}
                value={volume}
                onChange={(e) => setVolume(e.target.value)}
              />
            </ContainerSlider>
          </ContainerTop>
          {pianoKey.map((key, index) => (
            <WhiteKey
              key={index}
              id={key.key}
              // onMouseUp={(e) => handleMouseUp(e)}
              onPointerUp={(e) => handleMouseUp(e)}
              // onMouseDown={(e) => handleMouseDown(e, "white", index)}
              onPointerDown={(e) => handleMouseDown(e, "white", index)}
              backgroundColor={key.color}
            >
              {index % 7 !== 2 && index % 7 !== 6 && (
                <BlackKey
                  id={index}
                  className={key.key}
                  // onMouseUp={(e) => handleMouseUp(e, "black", index)}
                  onPointerUp={(e) => handleMouseUp(e, "black", index)}
                  // onMouseDown={(e) => handleMouseDown(e, "black", index)}
                  onPointerDown={(e) => handleMouseDown(e, "black", index)}
                >
                  <p>{getKeyboardKey(index)}</p>
                </BlackKey>
              )}
              <p>{key.keyboard}</p>
            </WhiteKey>
          ))}
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
  background-color: #222831;

  @media (max-width: 1266px) {
    align-items: center;
    overflow: auto;
  }
`;

const ContainerTitle = styled.div`
  text-align: center;
  width: 100%;
`;

const ContainerBottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  flex: 1;

  @media (max-width: 1266px) {
    width: 100%;
    overflow: auto;
  }

  &::-webkit-scrollbar {
    -webkit-appearance: none;
    -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
    padding: 1px 2px;
    border-radius: 14px;
    height: 1.2rem;
    width: 1.5rem;
    background: #232528;
    box-shadow: inset 0 1px 0 0 #0d0e0f, inset 0 -1px 0 0 #3a3d42;
    -webkit-box-shadow: inset 0 1px 0 0 #0d0e0f, inset 0 -1px 0 0 #3a3d42;
    -webkit-transition: 0.2s;
    transition: opacity 0.2s;
  }

  &::-webkit-scrollbar-thumb {
    -webkit-appearance: none;
    border: none;
    border-radius: 12px;
    background: -webkit-linear-gradient(top, #529de1 0, #245e8f 100%);
    background: linear-gradient(to bottom, #529de1 0, #245e8f 100%);
  }
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
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 5rem;
  border-top-left-radius: 50px;
  border-top-right-radius: 50px;
  height: 35rem;
  width: 95%;
  font-family: "Electrolize", sans-serif;

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

  @media (max-width: 1210px) {
    width: 58rem;
  }
  @media (max-width: 900px) {
    height: 20rem;
    margin-left: 10rem;
  }
  @media (max-width: 426px) {
    margin-left: 15rem;
  }
`;

const ContainerTop = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 10px;
  gap: 5rem;
  width: 100%;
`;

const ContainerScreen = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: black;
  color: rgba(85, 255, 0, 0.7);
  margin-left: 17%;
  font-size: 3rem;
  width: 15rem;
  height: 5rem;
  border: 2px solid rgba(255, 255, 255, 0.4);
`;

const ContainerSlider = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 10%;
  height: 5rem;
`;

const ContainerVolumeBar = styled.div`
  position: absolute;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  height: 2.3rem;
  width: 100%;
  top: 0;
`;

const VolumeBar = styled.span`
  background-color: ${(props) => props.color};
  border: ${(props) => props.border};
  height: ${(props) => props.height};
  margin: 0 0.2rem;
  width: calc(100% / 7);
  border-radius: 2px;
  transition: all 0.1s;

  @media (max-width: 600px) {
    display: none;
  }
`;

const Slider = styled.input`
  -webkit-appearance: none;
  position: relative;
  width: 100%;
  height: 2px;
  opacity: 0.7;
  outline: none;
  -webkit-transition: 0.2s;
  transition: opacity 0.2s;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 20px;
    border-radius: 5px;
    height: 40px;
    height: 30px;
    background: white;
    cursor: pointer;
  }

  &::-moz-range-thumb {
    width: 20px;
    border-radius: 2px;
    height: 20px;
    background: #4caf50;
    cursor: pointer;
  }

  &::after {
    position: absolute;
    content: "Volume";
    color: ${Colors.gray};
    font-weight: bold;
    letter-spacing: 0.1rem;
    font-size: 1rem;
    bottom: -25px;
    left: 50%;
    transform: translateX(-50%);
  }

  @media (max-width: 600px) {
    display: none;
  }
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

  p {
    display: flex;
    align-items: flex-end;
    justify-content: center;
    font-size: 1.5rem;
    text-align: center;
    height: 100%;
    pointer-events: none;
    padding: 1rem;
    user-select: none;
  }

  @media (max-width: 600px) {
    /* height: 20rem; */
    width: 2rem;
    /* margin-left: 10rem; */

    p {
      display: none;
    }
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

  p {
    color: white;
    font-size: 1rem;
  }

  :hover {
    cursor: pointer;
  }
`;
