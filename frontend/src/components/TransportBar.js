import styled from "styled-components";
import Colors from "../utils/Colors";
import { GiSaveArrow } from "react-icons/gi";
import { FaPlay, FaStop } from "react-icons/fa";
import { BiCommentDetail } from "react-icons/bi";
import {
  AiOutlineLoading3Quarters,
  AiOutlineCheckCircle,
} from "react-icons/ai";
import { MdFavoriteBorder, MdFavorite, MdEditSquare } from "react-icons/md";
import { useContext, useEffect, useState } from "react";
import ModalTransportBar from "./modals/ModalTransportBar";
import { useNavigate, useParams } from "react-router-dom";
import { GeneralContext, URL } from "./context/GeneralContext";
import { addLike, removeLike } from "../utils/function";
import { PlayerContext } from "../components/context/PlayerContext";
import ModalLogged from "./modals/ModalLogged";

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
  const {
    drumAndMelody,
    chordToPiano,
    octave,
    drumKit,
    melodyKit,
    chordName,
    steps,
  } = useContext(PlayerContext);
  const { user, setRefreshUser, cookieValue, loadingState } =
    useContext(GeneralContext);
  const { id } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loggedModal, setLoggedModal] = useState("");
  const [modalCategory, setModalCategory] = useState("");
  const [isBeatSaved, setIsBeatSaved] = useState(false);
  const [beatModifyStatus, setBeatModifyStatus] = useState("");
  const [isBeatModify, setIsBeatModify] = useState(false);
  const [isBeatLiked, setIsBeatLiked] = useState(() => {
    const [beatLikedFilter] =
      user?.beatLiked?.filter((beat) => beat === id) ?? [];
    return beatLikedFilter ? true : false;
  });

  const navigate = useNavigate();

  /*Block the save button if it's a beat from the database*/
  useEffect(() => {
    if (id && loadingState === "success") {
      setIsBeatSaved(true);
      const [beatModifyFilter] = allBeats.filter((beat) => beat._id === id);
      if (beatModifyFilter.isEdit) {
        setIsBeatModify(true);
      }
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

  /* Function to Handle the Play Button */
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

  /* Function to Modify the Beat */
  const handleModifyBeat = () => {
    setBeatModifyStatus("loading");
    const newDataBeat = {
      speed: speed,
      drumAndMelody: drumAndMelody,
      chordToPiano: chordToPiano,
      octave: octave,
      drumKit: drumKit,
      melodyKit: melodyKit,
      chordName: chordName,
      steps: steps,
      isEdit: false,
    };

    fetch(`${URL}/api/modifyBeat/${id}`, {
      method: "PATCH",
      headers: {
        Authorization: cookieValue,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ newDataBeat: newDataBeat }),
    })
      .then((res) => res.json())
      .then((data) => {
        setBeatModifyStatus("completed");
      })
      .catch((err) => console.log(err));
  };

  /* Function when mouse HOVER a Button when not Logged */
  const mouseEnterButton = (status, button) => {
    if (!user && !id) {
      if (status === "enter") {
        setLoggedModal(button);
      } else if (status === "leave") {
        setLoggedModal("");
      }
    } else {
      return;
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
      {/* Save */}
      {!isBeatModify && (
        <div
          style={{ position: "relative" }}
          onMouseEnter={() => mouseEnterButton("enter", "save")}
          onMouseLeave={() => mouseEnterButton("leave", "")}
        >
          {loggedModal === "save" && <ModalLogged isLogged={loggedModal} />}
          <ContainerSaveButton
            onClick={handleSave}
            modalCategory={modalCategory}
            disabled={isBeatSaved || !user}
          >
            <SaveIcon />
          </ContainerSaveButton>
        </div>
      )}
      {/* Modify */}
      {isBeatModify && (
        <ContainerModifyButton
          onClick={handleModifyBeat}
          disabled={beatModifyStatus === "completed"}
        >
          {beatModifyStatus === "" && <IconModify />}
          {beatModifyStatus === "loading" && <LoadingIcon />}
          {beatModifyStatus === "completed" && <IconCheckGood />}
        </ContainerModifyButton>
      )}
      {/* Play */}
      <ContainerPlayButton onClick={handleClickPlay} isPlaying={isPlaying}>
        {!isPlaying && <PlayIcon />}
        {isPlaying && <StopIcon />}
      </ContainerPlayButton>
      {/* Comment */}
      <div
        style={{ position: "relative" }}
        onMouseEnter={() => mouseEnterButton("enter", "comments")}
        onMouseLeave={() => mouseEnterButton("leave", "")}
      >
        {loggedModal === "comments" && <ModalLogged isLogged={loggedModal} />}
        <ContainerCommentButton
          disabled={!id || !user}
          modalCategory={modalCategory}
          onClick={() => handleModal("comment")}
        >
          <IconComment modal={isModalOpen.toString()} />
        </ContainerCommentButton>
      </div>
      {/* Like */}
      <div
        style={{ position: "relative" }}
        onMouseEnter={() => mouseEnterButton("enter", "like")}
        onMouseLeave={() => mouseEnterButton("leave", "")}
      >
        {loggedModal === "like" && <ModalLogged isLogged={loggedModal} />}
        <ContainerButtonLike
          onClick={handleLike}
          isliked={isBeatLiked}
          disabled={!id || !user}
        >
          {!isBeatLiked && <FavoriteIcon />}
          {isBeatLiked && <FavoriteIconFull />}
        </ContainerButtonLike>
      </div>
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

  @media (max-width: 700px) {
    width: 100%;
  }
`;

const ContainerButtonLike = styled.button`
  all: unset;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 5vw;

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
  @media (max-width: 700px) {
    width: 12vw;
    height: 2.5rem;
  }
`;

const ContainerPlayButton = styled.button`
  all: unset;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 5vw;
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

  @media (max-width: 700px) {
    width: 12vw;
    height: 2.5rem;
  }
`;

const ContainerSaveButton = styled.button`
  all: unset;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 5vw;

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

  @media (max-width: 700px) {
    width: 12vw;
    height: 2.5rem;
  }
`;

const ContainerCommentButton = styled.button`
  all: unset;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 5vw;

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

  @media (max-width: 700px) {
    width: 12vw;
    height: 2.5rem;
  }
`;

const ContainerModifyButton = styled.button`
  all: unset;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 5vw;
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

  @media (max-width: 700px) {
    width: 12vw;
    height: 2.5rem;
  }
`;

const PlayIcon = styled(FaPlay)`
  color: #0bdb62;
  width: 1.6vw;
  height: auto;

  @media (max-width: 700px) {
    width: 3vw;
    height: auto;
  }
`;

const StopIcon = styled(FaStop)`
  color: #ed1b0c;
  width: 1.6vw;
  height: auto;
  @media (max-width: 700px) {
    width: 3vw;
    height: auto;
  }
`;
const FavoriteIcon = styled(MdFavoriteBorder)`
  color: #edb1a8;
  width: 1.6vw;
  height: auto;
  @media (max-width: 700px) {
    width: 3vw;
    height: auto;
  }
`;

const FavoriteIconFull = styled(MdFavorite)`
  color: #edb1a8;
  width: 1.6vw;
  height: auto;
  @media (max-width: 700px) {
    width: 3vw;
    height: auto;
  }
`;

const IconComment = styled(BiCommentDetail)`
  color: #5b87c8;
  width: 1.6vw;
  height: auto;
  @media (max-width: 700px) {
    width: 3vw;
    height: auto;
  }
`;

const IconCheckGood = styled(AiOutlineCheckCircle)`
  color: #0bdb62;
  width: 1.6vw;
  height: auto;
  @media (max-width: 700px) {
    width: 3vw;
    height: auto;
  }
`;

const SaveIcon = styled(GiSaveArrow)`
  color: #c0d1ed;
  width: 1.6vw;
  height: auto;
  @media (max-width: 700px) {
    width: 3vw;
    height: auto;
  }
`;

const IconModify = styled(MdEditSquare)`
  color: #c0d1ed;
  width: 1.6vw;
  height: auto;
  @media (max-width: 700px) {
    width: 3vw;
    height: auto;
  }
`;

const LoadingIcon = styled(AiOutlineLoading3Quarters)`
  color: ${Colors.gray};
  animation: rotation 1.5s infinite linear;

  @keyframes rotation {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;
