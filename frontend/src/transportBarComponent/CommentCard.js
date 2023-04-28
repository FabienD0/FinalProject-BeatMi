import styled from "styled-components";
import Colors from "../utils/Colors";
import { useEffect } from "react";
import { GeneralContext, URL } from "../components/context/GeneralContext";
import { useState } from "react";
import { useContext } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { useParams } from "react-router-dom";
import { FcCancel } from "react-icons/fc";

const CommentCard = ({ comment, userId, commentId, setIsRefresh }) => {
  const [avatar, setAvatar] = useState("");
  const [username, setUsername] = useState("");
  const [isOwner, setIsOwner] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { user, cookieValue } = useContext(GeneralContext);
  const { id } = useParams();

  /* Get the user that commented */
  useEffect(() => {
    setIsLoading(true);
    fetch(`${URL}/api/getUserById/${userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ info: "username&avatar" }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 404) {
          setIsLoading(false);
          setUsername("User deleted");
          return;
        } else {
          setAvatar(data.avatar);
          setUsername(data.username);
          setIsLoading(false);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  /* Validate if this is the owner */
  useEffect(() => {
    if (user.beatCreated.includes(id)) {
      setIsOwner(true);
    } else {
      setIsOwner(false);
    }
  }, []);

  /* Function to delete a comment */
  const handleDeleteComment = () => {
    fetch(`${URL}/api/deleteCommentBeat/${commentId}`, {
      method: "DELETE",
      headers: {
        Authorization: cookieValue,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ beatId: id }),
    })
      .then((res) => {
        if (res.ok) {
          setIsRefresh((prev) => !prev);
        }
      })
      .catch((err) => console.log(err));
  };

  /* Loading State */
  if (isLoading) {
    return <p></p>;
  }

  return (
    <ContainerComments>
      {avatar && <ProfileAvatar src={avatar} />}
      {!avatar && <FcCancel />}
      <ContainerText>
        <ProfileName>{username}</ProfileName>
        <ProfileComment>{comment}</ProfileComment>
      </ContainerText>
      {isOwner && (
        <button style={{ all: "unset" }} onClick={handleDeleteComment}>
          <DeleteIcon />
        </button>
      )}
    </ContainerComments>
  );
};

export default CommentCard;

const ContainerComments = styled.div`
  all: unset;
  display: flex;
  align-items: center;
  padding: 1px 2px;
  border-radius: 14px;
  height: 100%;
  padding: 0.2rem 1rem;
  border: 1px solid ${Colors.yellowDarker};
  background: #232528;
  color: ${Colors.gray};
  box-shadow: inset 0 1px 0 0 #0d0e0f, inset 0 -1px 0 0 #3a3d42;
  -webkit-box-shadow: inset 0 1px 0 0 #0d0e0f, inset 0 -1px 0 0 #3a3d42;
  -webkit-transition: 0.2s;
  transition: opacity 0.2s;
`;

const ProfileAvatar = styled.img`
  width: 3rem;
`;

const ContainerText = styled.div`
  width: 100%;
  height: 100%;
  padding: 0rem 0.4rem;
`;

const ProfileName = styled.p`
  font-size: 0.8rem;
  font-style: italic;
  color: ${Colors.yellow};
`;

const ProfileComment = styled.p``;

const DeleteIcon = styled(AiFillCloseCircle)`
  font-size: 2rem;
  color: rgb(206, 42, 36);
  opacity: 0.5;

  :hover {
    opacity: 1;
    cursor: pointer;
  }
`;
