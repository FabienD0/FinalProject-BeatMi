import styled from "styled-components";
import Colors from "../../utils/Colors";
import { AiFillCloseCircle } from "react-icons/ai";
import SaveBeat from "../../transportBarComponent/SaveBeat";
import CommentBeat from "../../transportBarComponent/CommentBeat";

const ModalTransportBar = ({
  isModalOpen,
  setIsModalOpen,
  speed,
  modalCategory,
  setModalCategory,
  setIsBeatSaved,
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
      {modalCategory === "save" && (
        <SaveBeat
          isModalOpen={isModalOpen}
          speed={speed}
          setIsBeatSaved={setIsBeatSaved}
        />
      )}
      {modalCategory === "comment" && <CommentBeat isModalOpen={isModalOpen} />}
    </Container>
  );
};

export default ModalTransportBar;

const Container = styled.div`
  position: absolute;
  transform: ${(props) => (props.isModalOpen ? "scaleY(1)" : "scaleY(0)")};
  background-color: ${Colors.primary200};
  width: 100%;
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
  z-index: 99;

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
