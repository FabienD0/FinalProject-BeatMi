import styled from "styled-components";
import Colors from "../../utils/Colors";
import { BsThreeDots } from "react-icons/bs";
import { GeneralContext, URL } from "../../components/context/GeneralContext";
import { useContext, useState } from "react";
import { useEffect } from "react";

const SmallCardLiked = ({ beatId }) => {
  const { allBeats } = useContext(GeneralContext);
  const [avatar, setAvatar] = useState("");
  const [getBeatById] = allBeats.filter((beat) => beat._id === beatId);

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

  if (!avatar) {
    return <h1>Loading</h1>;
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
      <MoreIcon />
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

const MoreIcon = styled(BsThreeDots)`
  font-size: 2rem;
  transition: all 300ms;

  :hover {
    cursor: pointer;
    opacity: 0.5;
  }
`;
