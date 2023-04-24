import styled from "styled-components";
import Colors from "../../utils/Colors";
import { GeneralContext, URL } from "../../components/context/GeneralContext";
import { useContext, useState, useEffect } from "react";
import { removeLike } from "../../utils/function";
import { AiFillDelete, AiOutlineLoading3Quarters } from "react-icons/ai";

const SmallCardLiked = ({ beatId, user }) => {
  const { allBeats, setRefreshUser } = useContext(GeneralContext);
  const [avatar, setAvatar] = useState("");
  const [getBeatById] = allBeats.filter((beat) => beat._id === beatId);
  const [isLoading, setIsLoading] = useState(false);

  /* Get USER avatar by beat ID */
  useEffect(() => {
    if (getBeatById) {
      fetch(`${URL}/api/getUserByBeatId/${beatId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ info: "avatar" }),
      })
        .then((res) => res.json())
        .then((data) => {
          setAvatar(data.avatar);
        })
        .catch((err) => console.log(err));
    }
  }, []);

  /*Function to remove like */
  const handleRemoveLike = () => {
    setIsLoading(true);
    removeLike(beatId, user._id, URL, setRefreshUser, () => {
      setIsLoading(false);
    });
  };

  if (!avatar) {
    return <LoadingIcon />;
  }

  return (
    <Container>
      <ArtistPicture src={avatar} />
      <ContainerInfo>
        <BeatTitle>{getBeatById.title}</BeatTitle>
        <ContainerLike>
          <p>{getBeatById.artist}</p>
        </ContainerLike>
      </ContainerInfo>
      {!isLoading && (
        <button style={{ all: "unset" }} onClick={handleRemoveLike}>
          <DeleteIcon />
        </button>
      )}
      {isLoading && <LoadingIcon />}
    </Container>
  );
};

export default SmallCardLiked;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0.5rem 0;
  width: 100%;
  height: 20%;
`;

const ArtistPicture = styled.img`
  border-radius: 11px;
  width: 60px;
  height: 60px;
  margin-right: 1rem;
`;

const ContainerInfo = styled.div`
  /* border: 1px solid red; */
  width: 70%;
`;

const BeatTitle = styled.h3`
  color: ${Colors.yellow};
  letter-spacing: 0.13em;
  margin-bottom: 0.3rem;
`;
const ContainerLike = styled.div`
  display: flex;
  align-items: center;
  gap: 0.2rem;
  font-size: 0.7rem;
  color: ${Colors.gray};
  letter-spacing: 0.13em;
  font-style: italic;
`;
const DeleteIcon = styled(AiFillDelete)`
  font-size: 1.5rem;
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
