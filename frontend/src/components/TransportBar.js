import styled from "styled-components";
import Colors from "../utils/Colors";
import { GiSaveArrow } from "react-icons/gi";
import { FaPlay, FaStop } from "react-icons/fa";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import { BiCommentDetail } from "react-icons/bi";
import { useContext, useEffect, useState } from "react";
import ModalTransportBar from "./modals/ModalTransportBar";
import { useNavigate, useParams } from "react-router-dom";
import { GeneralContext, URL } from "./context/GeneralContext";
import { addLike, removeLike } from "../utils/function";

const TransportBar = ({
  setIsPlaying,
  setCurrentStep,
  setCurrentStepPiano,
  setCurrentChordTriggered,
  isPlaying,
  speed,
  setCurrentPage,
  allBeats,
}) => {
  const { user, setRefreshUser } = useContext(GeneralContext);
  const { id } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalCategory, setModalCategory] = useState("");
  const [isBeatSaved, setIsBeatSaved] = useState(false);
  const [isBeatLiked, setIsBeatLiked] = useState(() => {
    const [beatLikedFilter] =
      user?.beatLiked?.filter((beat) => beat === id) ?? [];
    return beatLikedFilter ? true : false;
  });

  const navigate = useNavigate();

  /*Block the save button if it's a beat from the database*/
  useEffect(() => {
    if (id) {
      setIsBeatSaved(true);
    }
  }, [id]);

  /* Function to handle the CLICK on the ICON with the modal */
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

  /* Function to handle the SAVE button */
  const handleSave = () => {
    if (user) {
      handleModal("save");
    } else {
      navigate("/login");
    }
  };

  /* Function to handle the LIKE button */
  const handleLike = () => {
    if (user && allBeats) {
      const [beatFiltered] = allBeats.filter((beat) => beat._id === id);

      if (id && !isBeatLiked) {
        setIsBeatLiked(true);
        addLike(beatFiltered._id, user._id, URL, setRefreshUser);
      } else if (id && isBeatLiked) {
        setIsBeatLiked(false);
        removeLike(beatFiltered._id, user._id, URL, setRefreshUser);
      } else {
        return;
      }
    } else {
      return;
    }
  };

  //Function to handle the PLAY Button
  const handleClickPlay = () => {
    if (isPlaying) {
      setIsPlaying(false);
      setCurrentStep(0);
      setCurrentStepPiano(0);
      setCurrentChordTriggered("");
      setCurrentPage(1);
    } else {
      setIsPlaying(true);
    }
  };

  return (
    <Container isModalOpen={isModalOpen}>
      <ModalTransportBar
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        speed={speed}
        modalCategory={modalCategory}
        setModalCategory={setModalCategory}
        setIsBeatSaved={setIsBeatSaved}
      />
      <ContainerSaveButton
        onClick={handleSave}
        modalCategory={modalCategory}
        disabled={isBeatSaved}
      >
        <SaveIcon />
      </ContainerSaveButton>
      <ContainerPlayButton onClick={handleClickPlay} isPlaying={isPlaying}>
        {!isPlaying && <PlayIcon />}
        {isPlaying && <StopIcon />}
      </ContainerPlayButton>
      <ContainerCommentButton
        disabled={!id || !user}
        modalCategory={modalCategory}
        onClick={() => handleModal("comment")}
      >
        <IconComment modal={isModalOpen.toString()} />
      </ContainerCommentButton>
      <ContainerButtonLike
        onClick={handleLike}
        isliked={isBeatLiked}
        disabled={!id || !user}
      >
        {!isBeatLiked && <FavoriteIcon />}
        {isBeatLiked && <FavoriteIconFull />}
      </ContainerButtonLike>
    </Container>
  );
};

export default TransportBar;

const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-around;
  background-color: ${Colors.primary200};
  width: 35vw;
  height: 5rem;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: ${(props) =>
    props.isModalOpen ? "0px 0px 30px 30px" : "30px"};
  z-index: 5;
  transition: all 500ms ease-in-out;
`;

const SaveIcon = styled(GiSaveArrow)`
  color: #c0d1ed;
`;

const ContainerButtonLike = styled.button`
  all: unset;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 5rem;
  height: 3rem;
  border-radius: 20px;
  background: #393e46;
  box-shadow: ${(props) =>
    props.isliked
      ? "inset 5px 5px 10px #202327, inset -5px -5px 10px #525965"
      : "5px 5px 15px #202327, -5px -5px 5px #525965"};
  font-size: 1.5rem;

  :hover {
    font-size: 1.7rem;
    cursor: pointer;
  }

  :active {
    box-shadow: inset 5px 5px 10px #202327, inset -5px -5px 10px #525965;
  }

  :disabled {
    opacity: 0.4;
  }
`;
const StopIcon = styled(FaStop)`
  color: #ed1b0c;
`;

const ContainerPlayButton = styled.button`
  all: unset;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 5rem;
  height: 3rem;
  border-radius: 20px;
  background: #393e46;
  font-size: 1.5rem;
  box-shadow: ${(props) =>
    props.isPlaying
      ? "inset 5px 5px 10px #202327, inset -5px -5px 10px #525965"
      : "8px 8px 18px #202327, -5px -5px 5px #525965"};

  :hover {
    cursor: pointer;
    font-size: ${(props) => (props.isPlaying ? "1.5rem" : "1.7rem")};
  }

  :active {
    box-shadow: inset 5px 5px 10px #202327, inset -5px -5px 10px #525965;
  }
`;

const PlayIcon = styled(FaPlay)`
  color: #0bdb62;
`;
const FavoriteIcon = styled(MdFavoriteBorder)`
  color: #edb1a8;
`;

const FavoriteIconFull = styled(MdFavorite)`
  color: #edb1a8;
`;

const IconComment = styled(BiCommentDetail)`
  color: #5b87c8;
`;

const ContainerSaveButton = styled.button`
  all: unset;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 5rem;
  height: 3rem;
  border-radius: 20px;
  background: #393e46;
  font-size: 1.5rem;
  box-shadow: ${(props) =>
    props.modalCategory === "save"
      ? "inset 5px 5px 10px #202327, inset -5px -5px 10px #525965"
      : "8px 8px 18px #202327, -5px -5px 5px #525965"};

  :hover {
    cursor: pointer;
    font-size: ${(props) => (props.isModalOpen ? "1.5rem" : "1.7rem")};
  }

  :active {
    box-shadow: inset 5px 5px 10px #202327, inset -5px -5px 10px #525965;
    opacity: 0.6;
  }

  :disabled {
    opacity: 0.4;
    :hover {
      cursor: default;
      font-size: 1.5rem;
    }
  }
`;

const ContainerCommentButton = styled.button`
  all: unset;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 5rem;
  height: 3rem;
  border-radius: 20px;
  background: #393e46;
  font-size: 1.5rem;
  box-shadow: ${(props) =>
    props.modalCategory === "comment"
      ? "inset 5px 5px 10px #202327, inset -5px -5px 10px #525965"
      : "8px 8px 18px #202327, -5px -5px 5px #525965"};

  :hover {
    cursor: pointer;
    font-size: ${(props) => (props.modal ? "1.5rem" : "1.7rem")};
  }

  :active {
    box-shadow: inset 5px 5px 10px #202327, inset -5px -5px 10px #525965;
    opacity: 0.6;
  }

  :disabled {
    opacity: 0.4;
  }
`;
