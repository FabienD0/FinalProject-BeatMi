import { useState } from "react";
import { FaPlay } from "react-icons/fa";
import styled from "styled-components";
import Colors from "../../utils/Colors";
import { NavLink } from "react-router-dom";

const AllCards = ({ beat }) => {
  const [hoverBeat, setHoverBeat] = useState(false);

  // const drumKitName = beat.drumKit.replace("/sounds/");

  return (
    <NavLink style={{ all: "unset" }} to={`/beatmaker/${beat._id}`}>
      <Container
        onMouseEnter={() => setHoverBeat(true)}
        onMouseLeave={() => setHoverBeat(false)}
      >
        <ContainerHover hoverbeat={hoverBeat}>
          <PlayIcon />
        </ContainerHover>
        <ArtistPicture src="https://pbs.twimg.com/profile_images/1321060196844769280/C_qVM9QS_400x400.jpg" />
        <ContainerInfo>
          <BeatName>{beat.title}</BeatName>
          <BeatArtist>Dj Dream</BeatArtist>
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
`;

const ContainerInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const BeatName = styled.h3`
  /* text-align: center; */
  color: ${Colors.yellow};
  letter-spacing: 0.13em;
  margin-bottom: 0.3rem;
`;

const BeatArtist = styled.p`
  /* text-align: center; */
  font-size: 0.7rem;
  color: ${Colors.gray};
  letter-spacing: 0.13em;
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
`;
