import styled from "styled-components";
import Colors from "../../utils/Colors";
import { MdFavoriteBorder } from "react-icons/md";
import { useContext } from "react";
import { GeneralContext } from "../context/GeneralContext";
import { AiOutlineArrowRight } from "react-icons/ai";
import { NavLink } from "react-router-dom";

const TopArtistsCards = ({ artist }) => {
  const { allUsers } = useContext(GeneralContext);

  /* Filter artist who made the beat */
  const [filterArtist] = allUsers.filter((user) => user.username === artist[0]);

  return (
    <Container>
      <ArtistPicture src={filterArtist.avatar} />
      <ContainerInfo>
        <ArtistName>{filterArtist.username}</ArtistName>
        <ContainerLike>
          <MdFavoriteBorder />
          <p>{artist[1]} likes</p>
        </ContainerLike>
      </ContainerInfo>
      <NavLink style={{ all: "unset" }} to={`/beats/${filterArtist.username}`}>
        <ArrowIcon />
      </NavLink>
    </Container>
  );
};

export default TopArtistsCards;

const Container = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 20%;
`;

const ArtistPicture = styled.img`
  border-radius: 11px;
  width: 60px;
  height: 60px;
  margin-right: 1rem;

  @media (max-width: 1308px) {
    width: 40px;
    height: 40px;
  }
`;

const ContainerInfo = styled.div`
  width: 70%;
`;

const ArtistName = styled.h3`
  color: ${Colors.yellow};
  letter-spacing: 0.13em;
  margin-bottom: 0.3rem;

  @media (max-width: 1308px) {
    font-size: 0.8rem;
  }
  @media (max-width: 973px) {
    font-size: 0.6rem;
  }

  @media (max-width: 853px) {
    display: none;
  }
  @media (max-width: 683px) {
    display: block;
    font-size: 0.8rem;
  }
  @media (max-width: 425px) {
    font-size: 0.5rem;
  }
`;
const ContainerLike = styled.div`
  display: flex;
  align-items: center;
  gap: 0.2rem;
  font-size: 0.7rem;
  color: ${Colors.gray};
  letter-spacing: 0.13em;
  font-style: italic;

  @media (max-width: 853px) {
    display: none;
  }

  @media (max-width: 683px) {
    display: flex;
    font-size: 0.7rem;
  }
`;

const ArrowIcon = styled(AiOutlineArrowRight)`
  color: ${Colors.gray};
  font-size: 1.2rem;
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
