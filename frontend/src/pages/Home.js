import styled from "styled-components";
import Colors from "../utils/Colors";
import MostFavoriteCards from "../components/homepage/MostFavoriteCards";
import TopArtistsCards from "../components/homepage/TopArtistsCards";
import AllCards from "../components/homepage/AllCards";
import { useContext, useEffect, useState } from "react";
import { GeneralContext } from "../components/context/GeneralContext";
import { externalImages } from "../utils/externalImages";
import Beats from "./Beats";

const Home = () => {
  const [randomBeats, setRandomBeats] = useState([]);
  const [mostFavoritesBeats, setMostFavoritesBeats] = useState([]);

  const { loadingState, allBeats } = useContext(GeneralContext);

  /* Generate a random number */
  const randomNumber = () => {
    return Math.floor(Math.random() * (allBeats.length - 0 + 1)) + 0;
  };

  /* Get 6 random beats */
  useEffect(() => {
    if (allBeats) {
      let allBeatsCopy = [...allBeats];
      while (allBeatsCopy.length > 8) {
        allBeatsCopy.splice(randomNumber(), 1);
      }
      setRandomBeats(allBeatsCopy);
    }
  }, [allBeats]);

  /* Get Most Favorite Beats */
  useEffect(() => {
    if (allBeats) {
      let allBeatsCopy = [...allBeats];
      allBeatsCopy.sort((a, b) => b.likedBy.length - a.likedBy.length);
      setMostFavoritesBeats(allBeatsCopy.slice(0, 4));
    }
  }, [allBeats]);

  return (
    <ContainerAll>
      <ContainerSectionTop>
        <ContainerMostFavorite>
          <Title>Most Favorites</Title>
          <MostFavoriteDiv>
            {mostFavoritesBeats.map((beat, index) => (
              <MostFavoriteCards
                key={beat._id}
                beat={beat}
                background={externalImages[index]}
              />
            ))}
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
        <Title>Random</Title>
        <AllBeatsDiv>
          {randomBeats.map((beat) => {
            return <AllCards key={beat._id} beat={beat} />;
          })}
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
  margin-bottom: 1rem;
  color: ${Colors.gray};
  font-size: 2.2rem;
  letter-spacing: 0.2rem;
  text-shadow: 0px 4px 3px rgba(0, 0, 0, 0.4), 0px 8px 13px rgba(0, 0, 0, 0.1),
    0px 18px 23px rgba(0, 0, 0, 0.1);
  transition: all 1s;

  :hover {
    color: ${Colors.yellow};
    cursor: default;
  }
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
