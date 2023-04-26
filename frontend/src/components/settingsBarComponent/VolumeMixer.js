import { useContext, useRef, useState } from "react";
import styled from "styled-components";
import Colors from "../../utils/Colors";
import { PlayerContext } from "../context/PlayerContext";
import { BsFillVolumeMuteFill } from "react-icons/bs";

const VolumeMixer = ({ isModalOpen }) => {
  const volumesRef = useRef({
    playerDrum: 0,
    playerMelody: 0,
    playerChords: 0,
  });

  const { playerDrum, playerMelody, playerChords, isPlaying } =
    useContext(PlayerContext);
  const [volumeMemory, setVolumeMemory] = useState({
    playerDrum: 0,
    playerMelody: 0,
    playerChords: 0,
  });
  const [isRefresh, setIsRefresh] = useState(false);

  /*Function to change the volume of the instrument*/
  const handleVolume = (e, instrument, player) => {
    volumesRef.current[instrument] = parseInt(e.target.value);
    player.volume.value = volumesRef.current[instrument];
    setIsRefresh(!isRefresh);
  };

  /*Function to reset default volume*/
  const handleReset = (e, player) => {
    e.preventDefault();
    player.volume.value = 0;
    setIsRefresh(!isRefresh);
  };

  /*Function to mute an instrument (don't loose the previous volume value)*/
  const handleMute = (instrument, player) => {
    if (player.volume.value === -200) {
      player.volume.value = volumeMemory[instrument];
    } else {
      setVolumeMemory((prev) => ({
        ...prev,
        [instrument]: player.volume.value,
      }));
      player.volume.value = -200;
    }
    setIsRefresh(!isRefresh);
  };

  return (
    <Container isModalOpen={isModalOpen}>
      <H2>Volumes</H2>
      <ContainerAllSlider>
        <ContainerSlider>
          <H3>Drum</H3>
          <ContainerInput>
            <ParentAbsoluteIcon>
              <Slider
                type="range"
                min="-10"
                max="5"
                step={1}
                value={playerDrum.volume.value}
                onChange={(e) => handleVolume(e, "playerDrum", playerDrum)}
                onContextMenu={(e) => handleReset(e, playerDrum)}
              />
              <ContainerIcon>
                <ButtonMuteIcon
                  onClick={() => handleMute("playerDrum", playerDrum)}
                  disabled={!isPlaying}
                  isMuted={playerDrum.volume.value === -200 ? true : false}
                >
                  <BsFillVolumeMuteFill />
                </ButtonMuteIcon>
              </ContainerIcon>
            </ParentAbsoluteIcon>
          </ContainerInput>
        </ContainerSlider>
        <ContainerSlider>
          <H3>Melody</H3>
          <ContainerInput>
            <ParentAbsoluteIcon>
              <Slider
                type="range"
                min="-10"
                max="5"
                step={1}
                value={playerMelody.volume.value}
                onChange={(e) => handleVolume(e, "playerMelody", playerMelody)}
                onContextMenu={(e) => handleReset(e, playerMelody)}
              />
              <ContainerIcon>
                <ButtonMuteIcon
                  disabled={!isPlaying}
                  onClick={() => handleMute("playerMelody", playerMelody)}
                  isMuted={playerMelody.volume.value === -200 ? true : false}
                >
                  <BsFillVolumeMuteFill />
                </ButtonMuteIcon>
              </ContainerIcon>
            </ParentAbsoluteIcon>
          </ContainerInput>
        </ContainerSlider>
        <ContainerSlider>
          <H3>Chords</H3>
          <ContainerInput>
            <ParentAbsoluteIcon>
              <Slider
                type="range"
                min="-10"
                max="5"
                step={1}
                value={playerChords.volume.value}
                onChange={(e) => handleVolume(e, "playerChords", playerChords)}
                onContextMenu={(e) => handleReset(e, playerChords)}
              />
              <ContainerIcon>
                <ButtonMuteIcon
                  onClick={() => handleMute("playerChords", playerChords)}
                  disabled={!isPlaying}
                  isMuted={playerChords.volume.value === -200 ? true : false}
                >
                  <BsFillVolumeMuteFill />
                </ButtonMuteIcon>
              </ContainerIcon>
            </ParentAbsoluteIcon>
          </ContainerInput>
        </ContainerSlider>
      </ContainerAllSlider>
    </Container>
  );
};
export default VolumeMixer;

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

const ContainerAllSlider = styled.div`
  display: flex;
  height: 100%;
`;

const ContainerSlider = styled.div`
  width: 33%;
  height: auto;
`;

const ContainerInput = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const ParentAbsoluteIcon = styled.div`
  position: absolute;
`;

const ContainerIcon = styled.div`
  position: absolute;
  height: 3rem;
  width: 1.5rem;
  bottom: -55px;
  right: 10px;
`;

const H3 = styled.h3`
  color: ${Colors.yellowDarker};
  font-size: 1rem;
  text-align: center;
  text-shadow: 0px 4px 3px rgba(0, 0, 0, 0.4), 0px 8px 13px rgba(0, 0, 0, 0.1),
    0px 18px 23px rgba(0, 0, 0, 0.1);
`;

const Slider = styled.input`
  -webkit-appearance: none;
  -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
  padding: 1px 2px;
  border-radius: 14px;
  height: 1.2rem;
  width: 6rem;
  background: #232528;
  box-shadow: inset 0 1px 0 0 #0d0e0f, inset 0 -1px 0 0 #3a3d42;
  -webkit-box-shadow: inset 0 1px 0 0 #0d0e0f, inset 0 -1px 0 0 #3a3d42;
  -webkit-transition: 0.2s;
  transition: opacity 0.2s;

  ::-moz-range-track {
    border: inherit;
    background: transparent;
  }

  ::-ms-track {
    border: inherit;
    color: transparent;
    background: transparent;
  }

  ::-ms-fill-lower {
    background: transparent;
  }
  ::-ms-fill-upper {
    background: transparent;
  }

  ::-ms-tooltip {
    display: none;
  }

  ::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 2rem;
    height: 1.2rem;
    border: none;
    border-radius: 12px;
    background: -webkit-linear-gradient(top, #529de1 0, #245e8f 100%);
    background: linear-gradient(to bottom, #529de1 0, #245e8f 100%);
  }

  writing-mode: bt-lr;
  transform: rotate(-90deg);
`;

const ButtonMuteIcon = styled.button`
  all: unset;
  font-size: 1.5rem;
  color: ${(props) => (props.isMuted ? "#fb6a5f" : Colors.gray)};
  transition: all 0.3s;

  :hover {
    color: #fb6a5f;
    cursor: pointer;
  }

  :disabled {
    opacity: 0.3;
    :hover {
      color: ${Colors.gray};
      cursor: default;
    }
  }
`;
