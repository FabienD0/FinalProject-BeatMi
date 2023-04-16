import { useContext, useState } from "react";
import styled from "styled-components";
import Colors from "../utils/Colors";
import { AiOutlineArrowRight } from "react-icons/ai";
import { GeneralContext, URL } from "../components/context/GeneralContext";
import { useParams } from "react-router-dom";
import CommentCard from "./CommentCard";
import { useEffect } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
const { v4: uuid } = require("uuid");

const CommentBeat = ({ isModalOpen }) => {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [isRefresh, setIsRefresh] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { user, allBeats } = useContext(GeneralContext);
  const { id } = useParams();

  /* Get all comments of a beat */
  useEffect(() => {
    setIsLoading(true);
    fetch(`${URL}/api/getBeat/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (!data.beat.comments) {
          setIsLoading(false);
        } else {
          setComments(data.beat.comments);
          setIsLoading(false);
        }
      })
      .catch((err) => console.log(err));
  }, [isRefresh]);

  /* Function to comment a beat */
  const handleSendComment = (e) => {
    if (user) {
      setIsLoading(true);
      e.preventDefault();
      setComment("");
      fetch(`${URL}/api/addCommentBeat`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          commentId: uuid(),
          userId: user._id,
          beatId: id,
          comment: comment,
        }),
      })
        .then((data) => {
          setIsRefresh(!isRefresh);
          setIsLoading(false);
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <Container isModalOpen={isModalOpen}>
      <H2>Comments</H2>
      {user && (
        <ContainerInput>
          <Input
            type="text"
            maxLength={100}
            autoComplete="off"
            placeholder="What are you thinking?"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></Input>
          <button
            style={{ all: "unset" }}
            type="submit"
            onClick={(e) => handleSendComment(e)}
          >
            <SendIcon />
          </button>
        </ContainerInput>
      )}
      <ContainerAllComments>
        {isLoading && <LoadingIcon />}
        {!isLoading && comments.length === 0 && (
          <p style={{ opacity: "0.8" }}>Be the First to Comment</p>
        )}
        {!isLoading &&
          comments.length !== 0 &&
          comments.map((commentUser) => (
            <CommentCard
              comment={commentUser.comment}
              userId={commentUser.byUser}
              key={commentUser.commentId}
              commentId={commentUser.commentId}
              setIsRefresh={setIsRefresh}
            />
          ))}
      </ContainerAllComments>
    </Container>
  );
};

export default CommentBeat;

const Container = styled.div`
  position: relative;
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
const ContainerInput = styled.form`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Input = styled.input`
  all: unset;
  padding: 1px 2px;
  border-radius: 14px;
  height: 1.2rem;
  width: 90%;
  padding: 0.2rem 1rem;
  background: #232528;
  color: ${Colors.gray};
  box-shadow: inset 0 1px 0 0 #0d0e0f, inset 0 -1px 0 0 #3a3d42;
  -webkit-box-shadow: inset 0 1px 0 0 #0d0e0f, inset 0 -1px 0 0 #3a3d42;
  -webkit-transition: 0.2s;
  transition: opacity 0.2s;

  &:focus {
    outline: none;
    outline: 0.5px solid ${Colors.gray};
    transition: border-color 0.3s ease-in-out;
  }
`;

const SendIcon = styled(AiOutlineArrowRight)`
  color: ${Colors.gray};
  font-size: 2rem;
  transition: all 500ms;

  :hover {
    cursor: pointer;
    opacity: 0.8;
    color: ${Colors.yellow};
    animation: move 1s infinite;
  }
  @keyframes move {
    from {
      transform: translateX(0px);
    }
    to {
      transform: translateX(5px);
    }
  }
`;

const ContainerAllComments = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 1rem;
  padding: 0rem 0.4rem;
  height: 100%;
  color: ${Colors.gray};
  overflow: auto;

  &::-webkit-scrollbar {
    -webkit-appearance: none;
    -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
    padding: 1px 2px;
    border-radius: 14px;
    height: 1.2rem;
    width: 1rem;
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

const LoadingIcon = styled(AiOutlineLoading3Quarters)`
  font-size: 2rem;
  width: 100%;
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
