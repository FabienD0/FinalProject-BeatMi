import styled from "styled-components";
import Colors from "../../utils/Colors";
import {
  organ,
  guitar,
  synth,
  smooth,
  sleepPan,
  eightys,
} from "../../utils/synthKit";

const ButtonMelodyKit = ({ setMelodyKit, melodyKit, isPlaying }) => {
  return (
    <ContainerDivision>
      <Button
        onClick={() => setMelodyKit(organ)}
        disabled={isPlaying}
        isActive={melodyKit.instrument === "Organ"}
      >
        Organ
      </Button>
      <Button
        onClick={() => setMelodyKit(guitar)}
        disabled={isPlaying}
        isActive={melodyKit.instrument === "Guitar"}
      >
        Guitar
      </Button>
      <Button
        onClick={() => setMelodyKit(synth)}
        disabled={isPlaying}
        isActive={melodyKit.instrument === "Synth"}
      >
        Synth
      </Button>
      <Button
        onClick={() => setMelodyKit(smooth)}
        disabled={isPlaying}
        isActive={melodyKit.instrument === "Smooth"}
      >
        Smooth
      </Button>
      <Button
        onClick={() => setMelodyKit(sleepPan)}
        disabled={isPlaying}
        isActive={melodyKit.instrument === "Pan"}
      >
        Pan
      </Button>
      <Button
        onClick={() => setMelodyKit(eightys)}
        disabled={isPlaying}
        isActive={melodyKit.instrument === "80's"}
      >
        80's
      </Button>
    </ContainerDivision>
  );
};

export default ButtonMelodyKit;

const ContainerDivision = styled.div`
  display: flex;
  gap: 1rem;
  width: 75%;
  height: 30px;
`;

const Button = styled.button`
  all: unset;
  width: 4rem;
  text-align: center;
  height: fit-content;
  padding: 0.4rem;
  background-color: ${(props) =>
    props.isActive ? Colors.yellow : "transparent"};
  border: 1px solid ${Colors.yellowDarker};
  border-radius: 20px;
  color: ${(props) => (props.isActive ? Colors.primary100 : Colors.gray)};

  letter-spacing: 0.1rem;
  transition: all 200ms ease-in-out;

  :hover {
    border: 1px solid transparent;
    background-color: #ed1b0c;
    background-color: ${Colors.yellow};
    color: ${Colors.primary100};

    cursor: pointer;
  }

  :disabled {
    opacity: 0.3;
    cursor: default;
  }
`;
