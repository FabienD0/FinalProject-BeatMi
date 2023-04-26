import { useContext, useState } from "react";
import { FaPlay } from "react-icons/fa";
import styled from "styled-components";
import Colors from "../../utils/Colors";
import { NavLink } from "react-router-dom";
import { GeneralContext } from "../context/GeneralContext";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const AllCards = ({ beat }) => {
  const [hoverBeat, setHoverBeat] = useState(false);

  const { allUsers } = useContext(GeneralContext);

  /* Get the avatar of the artist */
  const [avatarFilter] = allUsers.filter((user) =>
    user.beatCreated.includes(beat._id)
  );

  return (
    <NavLink style={{ all: "unset" }} to={`/beatmaker/${beat._id}`}>
      <Container
        onMouseEnter={() => setHoverBeat(true)}
        onMouseLeave={() => setHoverBeat(false)}
      >
        <ContainerHover hoverbeat={hoverBeat}>
          <PlayIcon />
        </ContainerHover>
        <ArtistPicture src={avatarFilter.avatar} />
        <ContainerInfo>
          <BeatName>{beat.title}</BeatName>
          <BeatArtist>{beat.artist}</BeatArtist>
          <ContainerInfoBeat>
            <Info>{beat.mood}</Info>
            <Info>{beat.drumKit[1]}</Info>
            <Info>{beat.melodyKit.instrument}</Info>
          </ContainerInfoBeat>
        </ContainerInfo>
      </Container>
    </NavLink>
  );
};

export default AllCards;

const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  cursor: pointer;
  justify-content: space-evenly;
  height: 30%;
  margin: 0rem 1rem;
  width: 18rem;
  padding: 1rem;
  border-radius: 25px;
  background-color: rgba(34, 40, 49, 0.8);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  overflow: hidden;

  @media (max-width: 1308px) {
    width: 10rem;
    flex-direction: column;
    gap: 0.5rem;
  }
  @media (max-width: 1058px) {
    height: 5rem;
  }

  @media (max-width: 900px) {
    width: 10rem;
    height: 4rem;
  }

  @media (max-width: 400px) {
    width: 8rem;
  }
`;

const ContainerHover = styled.div`
  content: "";
  cursor: pointer;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  color: #0bdb62;
  left: ${(props) => (props.hoverbeat ? "0%" : "-100%")};
  background-color: rgba(34, 40, 49, 0.8);
  width: 100%;
  height: 100%;
  border-radius: 25px;
  transition: all 0.5s;
`;

const PlayIcon = styled(FaPlay)`
  animation: bounce 0.5s alternate infinite;

  @keyframes bounce {
    from {
      transform: translateX(10px);
      opacity: 0.7;
    }
    to {
      transform: translateX(0px);
      opacity: 1;
    }
  }
`;

const ArtistPicture = styled.img`
  border-radius: 11px;
  width: 60px;
  height: 60px;
  margin-right: 1rem;

  @media (max-width: 1308px) {
    width: 30px;
    height: 30px;
  }

  @media (max-width: 1095px) {
    display: none;
  }
`;

const ContainerInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const BeatName = styled.h3`
  color: ${Colors.yellow};
  letter-spacing: 0.13em;
  margin-bottom: 0.3rem;

  @media (max-width: 1308px) {
    font-size: 0.8rem;
    text-align: center;
  }
  @media (max-width: 400px) {
    font-size: 0.6rem;
  }
`;

const BeatArtist = styled.p`
  /* text-align: center; */
  font-size: 0.7rem;
  color: ${Colors.gray};
  letter-spacing: 0.13em;

  @media (max-width: 1308px) {
    text-align: center;
  }
  @media (max-width: 400px) {
    font-size: 0.6rem;
  }
`;

const ContainerInfoBeat = styled.div`
  display: flex;
  gap: 1rem;
`;

const Info = styled.p`
  font-size: 0.6rem;
  color: black;
  color: ${Colors.gray};
  color: #92ded6;
  font-weight: bold;
  font-style: italic;
  border-radius: 20px;
  padding: 0.3rem;

  @media (max-width: 1308px) {
    display: none;
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
