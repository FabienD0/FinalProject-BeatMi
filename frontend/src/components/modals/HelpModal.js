import styled from "styled-components";
import { BiHelpCircle } from "react-icons/bi";
import { BiShuffle } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";
import Colors from "../../utils/Colors";
import { useState } from "react";

const HelpModal = () => {
  const [modalHelp, setModalHelp] = useState(false);

  return (
    <Container modal={modalHelp}>
      <ContainerTooltip>
        <HelpIcon
          onMouseEnter={() => setModalHelp(true)}
          onMouseLeave={() => setModalHelp(false)}
        />
        {modalHelp && (
          <Tooltip>
            <ContainerLine>
              <Title>Left-Click</Title>
              <Description>Velocity on Pad 100%</Description>
            </ContainerLine>
            <ContainerLine>
              <Title>Middle-Click</Title>
              <Description>Velocity on Pad 50%</Description>
            </ContainerLine>
            <ContainerLine>
              <Title>Right-Click</Title>
              <Description>Velocity on Pad 25%</Description>
            </ContainerLine>
            <ContainerLine>
              <Title>
                <ShuffleIcon />
              </Title>
              <Description>
                Generate 4 Random Chords that fit Together
              </Description>
            </ContainerLine>
            <ContainerLine>
              <ChordButton />
              <Description>Make your own Chords</Description>
            </ContainerLine>
            <ContainerLine>
              <PlusIcon />
              <Description>Add Steps to the Sequencer</Description>
            </ContainerLine>
          </Tooltip>
        )}
      </ContainerTooltip>
    </Container>
  );
};

export default HelpModal;

const Container = styled.div`
  position: absolute;
  top: 32.5%;
  left: -3.5%;
  transform: translateY(-50%);
  width: ${(props) => (props.modal ? "35rem" : "")};
  height: 20rem;
  z-index: 24;
`;

const ContainerTooltip = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 100%;
  height: 100%;
`;

const HelpIcon = styled(BiHelpCircle)`
  color: ${Colors.gray};
  font-size: 2rem;
  opacity: 0.4;

  :hover {
    opacity: 1;
    cursor: help;
  }
`;

const Tooltip = styled.div`
  position: relative;
  border: 1px solid blue;
  width: 90%;
  height: 100%;
  background-color: rgba(34, 40, 49, 0.9);
  border: 3px solid ${Colors.yellowDarker};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  padding: 2rem;

  ::after {
    content: " ";
    border-style: solid;
    border-width: 12px 12.5px 0 12.5px;
    border-color: ${Colors.yellowDarker} transparent transparent transparent;
    top: 48%;
    transform: translateY(-50%);
    left: -1.2rem;
    transform: rotate(90deg);
    position: absolute;
  }
`;

const ContainerLine = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 1rem 0;
`;

const Title = styled.p`
  color: ${Colors.yellow};
  font-size: 1.3rem;
  font-weight: bold;
  text-shadow: 0px 4px 3px rgba(0, 0, 0, 0.4), 0px 8px 13px rgba(0, 0, 0, 0.1),
    0px 18px 23px rgba(0, 0, 0, 0.1);
`;

const Description = styled.p`
  color: ${Colors.gray};
`;

const ShuffleIcon = styled(BiShuffle)`
  font-size: 2rem;
`;

const ChordButton = styled.div`
  background-color: ${Colors.primary200};
  width: 8rem;
  height: 2rem;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25),
    -2px -2px 4px rgba(238, 238, 238, 0.25);
  border-radius: 30px;
`;

const PlusIcon = styled(AiOutlinePlus)`
  width: 1.5rem;
  height: 1.5rem;
  padding: 0.3rem;
  border-radius: 50%;
  background-color: ${Colors.primary200};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  color: ${Colors.gray};
  font-size: 1rem;
`;
