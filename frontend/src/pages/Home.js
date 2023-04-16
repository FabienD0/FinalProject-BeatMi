import styled from "styled-components";
import Colors from "../utils/Colors";
import MostFavoriteCards from "../components/homepage/MostFavoriteCards";
import TopArtistsCards from "../components/homepage/TopArtistsCards";
import AllCards from "../components/homepage/AllCards";
import { useContext } from "react";
import { GeneralContext } from "../components/context/GeneralContext";

const Home = () => {
  const { loadingState } = useContext(GeneralContext);

  return (
    <ContainerAll>
      <ContainerSectionTop>
        <ContainerMostFavorite>
          <Title>Most Favorite</Title>
          <MostFavoriteDiv>
            <MostFavoriteCards />
            <MostFavoriteCards />
            <MostFavoriteCards />
            <MostFavoriteCards />
          </MostFavoriteDiv>
        </ContainerMostFavorite>
        <ContainerTopArtist>
          <Title>Top Artists</Title>
          <TopArtistDiv>
            <TopArtistsCards />
            <TopArtistsCards />
            <TopArtistsCards />
            <TopArtistsCards />
          </TopArtistDiv>
        </ContainerTopArtist>
      </ContainerSectionTop>
      <ContainerAllBeats>
        <Title>Most Recent</Title>
        <AllBeatsDiv>
          {/* <AllCards/>
          <AllCards />
          <AllCards />
          <AllCards />
          <AllCards />
          <AllCards />
          <AllCards />
          <AllCards /> */}
        </AllBeatsDiv>
      </ContainerAllBeats>
    </ContainerAll>
  );
};

export default Home;

const ContainerAll = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: white;
  width: 95%;
  height: 95%;
`;

const ContainerSectionTop = styled.div`
  display: flex;
  justify-content: space-between;
  height: 45%;
`;

const Title = styled.h2`
  font-size: 2.2rem;
  margin-bottom: 1rem;
  color: ${Colors.gray};
`;

const ContainerMostFavorite = styled.section`
  width: 60%;
`;

const MostFavoriteDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
  background: ${Colors.primary200};
  border-radius: 30px;
  height: 85%;
  -webkit-box-shadow: 5px 5px 9px -1px rgba(238, 238, 238, 0.18);
  box-shadow: 5px 5px 9px -1px rgba(238, 238, 238, 0.18);
  padding: 1rem;
`;

const ContainerTopArtist = styled.section`
  width: 30%;
  height: 85%;
`;

const TopArtistDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1rem;
  background: ${Colors.primary200};
  border-radius: 30px;
  height: 100%;
  -webkit-box-shadow: 5px 5px 9px -1px rgba(238, 238, 238, 0.18);
  box-shadow: 5px 5px 9px -1px rgba(238, 238, 238, 0.18);
  padding: 1rem;
`;

const ContainerAllBeats = styled.section`
  width: 100%;
  height: 48%;
`;

const AllBeatsDiv = styled.div`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: ${Colors.primary200};
  border-radius: 30px;
  height: 80%;
  -webkit-box-shadow: 5px 5px 9px -1px rgba(238, 238, 238, 0.18);
  box-shadow: 5px 5px 9px -1px rgba(238, 238, 238, 0.18);
`;
