import styled from "styled-components";
import Colors from "../../utils/Colors";
import { pop, rap, rock, hard } from "../../utils/drumKit";

const ButtonDrumKit = ({ setDrumKit, drumKit, isPlaying }) => {
  return (
    <ContainerDivision>
      <Button
        onClick={() => setDrumKit(pop)}
        disabled={isPlaying}
        isActive={drumKit[1] === "Pop"}
      >
        Pop
      </Button>
      <Button
        onClick={() => setDrumKit(rap)}
        disabled={isPlaying}
        isActive={drumKit[1] === "Rap"}
      >
        Rap
      </Button>
      <Button
        onClick={() => setDrumKit(rock)}
        disabled={isPlaying}
        isActive={drumKit[1] === "Rock"}
      >
        Rock
      </Button>
      <Button
        onClick={() => setDrumKit(hard)}
        disabled={isPlaying}
        isActive={drumKit[1] === "Hard"}
      >
        Hard
      </Button>
    </ContainerDivision>
  );
};

export default ButtonDrumKit;

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
