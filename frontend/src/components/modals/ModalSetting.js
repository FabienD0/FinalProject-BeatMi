import styled from "styled-components";
import Colors from "../../utils/Colors";
import MusicalSettings from "../settingsBarComponent/MusicalSettings";
import VolumeMixer from "../settingsBarComponent/VolumeMixer";
import Settings from "../settingsBarComponent/Settings";
import { AiFillCloseCircle } from "react-icons/ai";

const ModalSetting = ({
  isModalOpen,
  setIsModalOpen,
  modalCategory,
  setModalCategory,
  speed,
  setSpeed,
  setSteps,
}) => {
  return (
    <Container isModalOpen={isModalOpen}>
      <IconButton isModalOpen={isModalOpen}>
        <CloseIcon
          onClick={() => {
            setIsModalOpen(false);
            setModalCategory("");
          }}
        />
      </IconButton>
      {modalCategory === "musicSettings" && (
        <MusicalSettings
          isModalOpen={isModalOpen}
          speed={speed}
          setSpeed={setSpeed}
        />
      )}
      {modalCategory === "mixer" && <VolumeMixer isModalOpen={isModalOpen} />}
      {modalCategory === "settings" && <Settings isModalOpen={isModalOpen} />}
    </Container>
  );
};

export default ModalSetting;

const Container = styled.div`
  position: absolute;
  transform: ${(props) => (props.isModalOpen ? "scaleY(1)" : "scaleY(0)")};
  background-color: ${Colors.primary200};
  width: 100%;
  height: 15rem;
  height: ${(props) => (props.isModalOpen ? "15rem" : "4.7rem")};
  padding: 1rem;
  border-radius: 30px 30px 0px 0px;
  top: ${(props) => (props.isModalOpen ? "-240px" : "40px")};
  left: 0;
  transition: all 500ms ease-in-out;
  z-index: -10;
`;

const IconButton = styled.button`
  all: unset;
  position: absolute;
  top: 30px;
  right: 25px;
  transform: ${(props) => (props.isModalOpen ? "scaleY(1)" : "scaleY(0)")};

  transition: all 200ms ease-in-out;
  :hover {
    opacity: 0.5;
    cursor: pointer;
  }
`;

const CloseIcon = styled(AiFillCloseCircle)`
  color: ${Colors.gray};
  font-size: 1.5rem;
`;
