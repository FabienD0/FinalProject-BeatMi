import styled from "styled-components";
import Colors from "../../utils/Colors";
import { MdFavoriteBorder } from "react-icons/md";
import { BsThreeDots } from "react-icons/bs";

const TopArtistsCards = () => {
  return (
    <Container>
      <ArtistPicture src="https://pbs.twimg.com/profile_images/1321060196844769280/C_qVM9QS_400x400.jpg" />
      <ContainerInfo>
        <ArtistName>DjDream</ArtistName>
        <ContainerLike>
          <MdFavoriteBorder />
          <p>340 likes</p>
        </ContainerLike>
      </ContainerInfo>
      <MoreIcon />
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
`;

const ContainerInfo = styled.div`
  /* border: 1px solid red; */
  width: 70%;
`;

const ArtistName = styled.h3`
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
