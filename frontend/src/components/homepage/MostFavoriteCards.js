import styled from "styled-components";
import Colors from "../../utils/Colors";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import { BiCommentDetail } from "react-icons/bi";
import { NavLink } from "react-router-dom";

const MostFavoriteCards = ({ beat, background }) => {
  return (
    <ContainerAll to={`/beatmaker/${beat._id}`}>
      <ContainerCard background={background}>
        <ContainerInfoBeat>
          <BeatTitle>{beat.title}</BeatTitle>
          <BeatArtist>{beat.artist}</BeatArtist>
        </ContainerInfoBeat>
      </ContainerCard>
    </ContainerAll>
  );
};

export default MostFavoriteCards;

const ContainerAll = styled(NavLink)`
  all: unset;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 48%;
  border-radius: 30px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  height: 45%;

  :hover {
    cursor: pointer;
  }
`;

const ContainerCard = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  border-radius: 22px;
  height: 100%;

  ::after {
    position: absolute;
    content: "";
    background: ${(props) => `url(${props.background})`};
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;

    opacity: 0.4;
    width: 100%;
    height: 100%;
    border-radius: 22px;
    top: 0;
    right: 0;
    transition: all 1s;
    -webkit-transition: all 1s;
  }

  :hover {
    ::after {
      opacity: 0.8;
      cursor: pointer;
    }
  }
`;

const ContainerInfoBeat = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.7rem;
  z-index: 2;
  height: 100%;
  padding: 1rem;
`;

const BeatTitle = styled.h2`
  font-size: 2rem;
  color: ${Colors.gray};
  font-size: 2rem;
  text-align: center;
  letter-spacing: 0.2rem;
  text-shadow: 0px 4px 3px rgba(0, 0, 0, 0.4), 0px 8px 13px rgba(0, 0, 0, 0.1),
    0px 18px 23px rgba(0, 0, 0, 0.1);
`;

const BeatArtist = styled.h3`
  color: ${Colors.yellow};
  font-style: italic;
`;

const ContainerIconAll = styled.div`
  display: flex;
  gap: 1rem;
`;

const ContainerIconSolo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
