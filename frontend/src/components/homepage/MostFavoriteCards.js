import styled from "styled-components";
import Colors from "../../utils/Colors";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import { BiCommentDetail } from "react-icons/bi";

const MostFavoriteCards = () => {
  return (
    <ContainerAll>
      <ContainerCard>
        <ContainerInfoBeat>
          <BeatTitle>Sick Beat</BeatTitle>
          <BeatArtist>Dj Dream</BeatArtist>
          <ContainerIconAll>
            <ContainerIconSolo>
              <FavoriteIcon />
              <LikeNumber>123</LikeNumber>
            </ContainerIconSolo>
            <ContainerIconSolo>
              <CommentIcon />
              <CommentNumber>55</CommentNumber>
            </ContainerIconSolo>
          </ContainerIconAll>
        </ContainerInfoBeat>
      </ContainerCard>
    </ContainerAll>
  );
};

export default MostFavoriteCards;

const ContainerAll = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 48%;
  border-radius: 30px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  height: 45%;
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
    background: url(https://cdn.epidemicsound.com/player/20230331.31-0a3257f820334ea4ea4a90f7dc5f90ee6244219b/bec6b356629fa9e616f90128719cbdb1-384.jpg);
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
`;

const ContainerInfoBeat = styled.div`
  position: absolute;
  display: flex;
  align-items: space-between;
  align-items: center;
  gap: 0.7rem;
  flex-direction: column;
  z-index: 2;
  height: 100%;
  padding: 1rem;
`;

const BeatTitle = styled.h2`
  font-size: 2rem;
  color: #e7e7e7;
`;

const BeatArtist = styled.h3`
  color: ${Colors.yellow};
  color: #ecd397;
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

const FavoriteIcon = styled(MdFavoriteBorder)`
  font-size: 1.7rem;
  color: #c85b5b;
  transition: all 300ms;

  :hover {
    cursor: pointer;
    color: #e03838;
  }
`;

const LikeNumber = styled.p`
  font-size: 0.8rem;
  color: ${Colors.gray};
`;

const CommentIcon = styled(BiCommentDetail)`
  position: relative;
  font-size: 1.7rem;
  color: #5b87c8;
  transition: all 300ms;

  :hover {
    cursor: pointer;
    color: #326bc4;
  }
`;

const CommentNumber = styled.p`
  font-size: 0.8rem;
  color: ${Colors.gray};
`;
