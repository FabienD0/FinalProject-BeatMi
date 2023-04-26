import { useContext, useState } from "react";
import styled from "styled-components";
import Colors from "../../utils/Colors";
import { MdFavoriteBorder } from "react-icons/md";
import { BiCommentDetail } from "react-icons/bi";
import { FaPlay, FaEdit } from "react-icons/fa";
import { AiFillDelete, AiOutlineLoading3Quarters } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import { GeneralContext, URL } from "../../components/context/GeneralContext";

const SmallCardTracks = ({ beatId, user, setRefreshUser, setRefreshBeats }) => {
  const { allBeats, cookieValue } = useContext(GeneralContext);
  const [isLoading, setIsLoading] = useState(false);

  const [getBeatById] = allBeats.filter((beat) => beat._id === beatId);

  /* Remove Beat  Function */
  const handleRemoveBeat = () => {
    setIsLoading(true);
    //Remove beat from beats database
    fetch(`${URL}/api/deleteBeat/${beatId}`, {
      method: "DELETE",
      headers: {
        Authorization: cookieValue,
        "Content-Type": "application/json",
      },
    }).catch((err) => console.log(err));
    //Remove beat from users database
    fetch(`${URL}/api/removeBeatUser`, {
      method: "PATCH",
      headers: {
        Authorization: cookieValue,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ _id: user._id, beatId: beatId }),
    }).catch((err) => console.log(err));
    //Remove beat from liked users
    fetch(`${URL}/api/removeLikeBeatAllUser`, {
      method: "PATCH",
      headers: {
        Authorization: cookieValue,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ beatId: [beatId] }),
    })
      .then((res) => res.json())
      .then((data) => {
        setRefreshUser((prev) => !prev);
        setRefreshBeats((prev) => !prev);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  };

  /* Modify Beat Function */
  const handleModifyBeat = () => {
    getBeatById.isEdit = !getBeatById.isEdit;
  };

  return (
    <Container>
      <ContainerInfo>
        <BeatName>{getBeatById.title}</BeatName>
        <ContainerInfoBeat>
          <ContainerInfoLikeComment>
            <MdFavoriteBorder />
            <p>{getBeatById.likedBy.length}</p>
          </ContainerInfoLikeComment>
          <ContainerInfoLikeComment>
            <BiCommentDetail />
            <p>{getBeatById.comments.length}</p>
          </ContainerInfoLikeComment>
        </ContainerInfoBeat>
        <ContainerIcon>
          <NavLink
            style={{ all: "unset" }}
            onClick={handleModifyBeat}
            to={`/beatmaker/${beatId}`}
          >
            <Edit />
          </NavLink>
          <NavLink style={{ all: "unset" }} to={`/beatmaker/${beatId}`}>
            <Play />
          </NavLink>
          <button
            style={{ all: "unset" }}
            onClick={handleRemoveBeat}
            disabled={isLoading}
          >
            {!isLoading && <Delete />}
            {isLoading && <LoadingIcon />}
          </button>
        </ContainerIcon>
      </ContainerInfo>
    </Container>
  );
};

export default SmallCardTracks;

const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: space-evenly;
  height: 8rem;
  width: 10rem;
  margin: 1rem 1rem;
  padding: 1rem;
  border-radius: 25px;
  background-color: rgba(34, 40, 49, 0.8);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

const ContainerInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  gap: 0.5rem;
`;

const BeatName = styled.h3`
  color: ${Colors.yellow};
  letter-spacing: 0.13em;
  margin-bottom: 0.3rem;
`;

const ContainerInfoBeat = styled.div`
  display: flex;
  gap: 1rem;

  p {
    margin: 0rem 0.4rem;
  }
`;

const ContainerInfoLikeComment = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.8rem;
  font-style: italic;
  opacity: 0.6;
`;

const ContainerIcon = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  font-size: 1.2rem;
  width: 100%;
`;

const Edit = styled(FaEdit)`
  :hover {
    color: #5b87c8;
    cursor: pointer;
  }
`;
const Play = styled(FaPlay)`
  :hover {
    color: #0bdb62;
    cursor: pointer;
  }
`;
const Delete = styled(AiFillDelete)`
  :hover {
    color: rgba(206, 42, 36);
    cursor: pointer;
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
