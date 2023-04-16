import styled from "styled-components";
import Colors from "../utils/Colors";
import ModalSetting from "./modals/ModalSetting";
import { AiOutlineSetting } from "react-icons/ai";
import { useState } from "react";
import { BsMusicNoteBeamed } from "react-icons/bs";
import { RxMixerVertical } from "react-icons/rx";

const Settings = ({ setSpeed, speed }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalCategory, setModalCategory] = useState("");

  //Function to handle the CLICK on the ICON with the modal
  const handleModal = (category) => {
    if (modalCategory === category) {
      if (isModalOpen) {
        setIsModalOpen(false);
        setModalCategory("");
      }
    } else {
      setIsModalOpen(true);
      setModalCategory(category);
    }
  };

  return (
    <Container isModalOpen={isModalOpen}>
      <ModalSetting
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        modalCategory={modalCategory}
        setModalCategory={setModalCategory}
        speed={speed}
        setSpeed={setSpeed}
      />
      <ContainerAll>
        <ButtonMusicIcon
          modalCategory={modalCategory}
          isModalOpen={isModalOpen}
          onClick={() => handleModal("musicSettings")}
        >
          <MusicIcon />
        </ButtonMusicIcon>
      </ContainerAll>
      <ContainerAll>
        <ButtonVolumeIcon
          modalCategory={modalCategory}
          isModalOpen={isModalOpen}
          onClick={() => handleModal("mixer")}
        >
          <VolumeIcon />
        </ButtonVolumeIcon>
      </ContainerAll>
      <ContainerAll>
        <ButtonSettingsIcon
          modalCategory={modalCategory}
          isModalOpen={isModalOpen}
          onClick={() => handleModal("settings")}
        >
          <SettingsIcon />
        </ButtonSettingsIcon>
      </ContainerAll>
    </Container>
  );
};

export default Settings;

const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: space-evenly;
  background-color: ${Colors.primary200};
  width: 35vw;
  height: 5rem;
  padding: 1rem;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: ${(props) =>
    props.isModalOpen ? "0px 0px 30px 30px" : "30px"};
  z-index: 5;
  transition: all 500ms ease-in-out;
`;

const ContainerAll = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
`;

const ContainerDivision = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 30px;
`;

const MusicIcon = styled(BsMusicNoteBeamed)`
  font-size: 3rem;
  transition: all 300ms ease-in-out;

  :hover {
    opacity: 0.7;
    cursor: pointer;
    color: #8e6eb2;
  }
`;

const ButtonMusicIcon = styled.button`
  all: unset;
  color: ${(props) =>
    props.modalCategory === "musicSettings" && props.isModalOpen
      ? "#8e6eb2"
      : "#c0d1ed"};
`;

const VolumeIcon = styled(RxMixerVertical)`
  font-size: 3rem;
  transition: all 300ms ease-in-out;

  :hover {
    opacity: 0.7;
    cursor: pointer;
    color: #70afdf;
  }
`;

const ButtonVolumeIcon = styled.button`
  all: unset;

  color: ${(props) =>
    props.modalCategory === "mixer" && props.isModalOpen
      ? "#70afdf"
      : "#c0d1ed"};
`;

const SettingsIcon = styled(AiOutlineSetting)`
  font-size: 3rem;
  transition: all 300ms ease-in-out;
  :hover {
    opacity: 0.7;
    cursor: pointer;
    color: #fbf987;
  }
`;

const ButtonSettingsIcon = styled.button`
  all: unset;

  color: ${(props) =>
    props.modalCategory === "settings" && props.isModalOpen
      ? "#fbf987"
      : "#c0d1ed"};
`;

const ContainerTitle = styled.div`
  display: flex;
  margin: 5px;
`;

const Title = styled.p`
  color: ${Colors.gray};
  font-weight: bold;
  font-size: 1.5rem;
`;

const Slider = styled.input``;
