import { useContext, useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import Colors from "../utils/Colors";
import { GeneralContext, URL } from "../components/context/GeneralContext";
import AllCards from "../components/homepage/AllCards";

const Beats = ({ allBeats }) => {
  const { refreshBeats, setRefreshBeats, loadingState } =
    useContext(GeneralContext);
  const [searchValue, setSearchValue] = useState("");
  const [resultSearchBeats, setResultSearchBeats] = useState([]);
  const [moodFilter, setMoodFilter] = useState("");
  const [isResultFound, setIsResultFound] = useState(false);

  useEffect(() => {
    setRefreshBeats(!refreshBeats);
  }, []);

  /* Search bar function */
  const handleSearch = (value) => {
    setSearchValue(value);
    if (!value) {
      setSearchValue("");
      setIsResultFound(false);
    } else if (value.length > 2) {
      const beatFilter = allBeats.filter((beat) =>
        beat.title
          .toLowerCase()
          .includes(
            value.toLowerCase() ||
              beat.artist.toLowerCase().includes(value.toLowerCase())
          )
      );

      const beatFilterArtist = allBeats.filter((beat) =>
        beat.artist.toLowerCase().includes(value.toLowerCase())
      );

      if (beatFilter.length !== 0) {
        setIsResultFound(true);
        setResultSearchBeats(beatFilter);
      } else if (beatFilterArtist.length !== 0) {
        setIsResultFound(true);
        setResultSearchBeats(beatFilterArtist);
      } else {
        setIsResultFound(true);
        setResultSearchBeats([]);
      }
    }
  };

  /* Mood Button function */
  const handleMood = (value) => {
    if (moodFilter === value) {
      setMoodFilter("");
      setResultSearchBeats([]);
      setIsResultFound(false);
    } else {
      setMoodFilter(value);
      const beatFilter = allBeats.filter((beat) => beat.mood === value);
      setIsResultFound(true);
      setResultSearchBeats(beatFilter);
    }
  };

  if (loadingState === "loading") {
    return <h1>Loading beats...</h1>;
  }

  return (
    <ContainerAll>
      <ContainerAllBeats>
        <ContainerBannerAndText>
          <Banner />
          <ContainerTextBanner>
            <Title>Beats</Title>
            <SmallTitle>Discover Your Groove</SmallTitle>
          </ContainerTextBanner>
        </ContainerBannerAndText>
        <ContainerSearch>
          <SearchBar
            placeholder="Search"
            value={searchValue}
            onChange={(e) => handleSearch(e.target.value)}
          ></SearchBar>
          <ContainerMood>
            <Mood
              onClick={() => handleMood("Happy")}
              active={moodFilter === "Happy"}
            >
              Happy
            </Mood>
            <Mood
              onClick={() => handleMood("Sad")}
              active={moodFilter === "Sad"}
            >
              Sad
            </Mood>
            <Mood
              onClick={() => handleMood("Cool")}
              active={moodFilter === "Cool"}
            >
              Cool
            </Mood>
            <Mood
              onClick={() => handleMood("Angry")}
              active={moodFilter === "Angry"}
            >
              Angry
            </Mood>
            <Mood
              onClick={() => handleMood("Scary")}
              active={moodFilter === "Scary"}
            >
              Scary
            </Mood>
            <Mood
              onClick={() => handleMood("Bouncy")}
              active={moodFilter === "Bouncy"}
            >
              Bouncy
            </Mood>
          </ContainerMood>
        </ContainerSearch>
        <ContainerBeats>
          {!isResultFound &&
            allBeats.map((beat) => {
              return <AllCards beat={beat} key={beat._id} />;
            })}
          {isResultFound &&
            resultSearchBeats.map((beat) => {
              return <AllCards beat={beat} key={beat._id} />;
            })}
        </ContainerBeats>
      </ContainerAllBeats>
    </ContainerAll>
  );
};

export default Beats;

const ContainerAll = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: white;
  width: 95%;
  height: 90vh;
`;

const ContainerAllBeats = styled.section`
  display: flex;
  gap: 1rem;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  width: 100%;
  height: 100%;
  background: ${Colors.primary200};
  border-radius: 30px;
  height: 100%;
  -webkit-box-shadow: 5px 5px 9px -1px rgba(238, 238, 238, 0.18);
  box-shadow: 5px 5px 9px -1px rgba(238, 238, 238, 0.18);
`;

const ContainerBannerAndText = styled.div`
  position: relative;
  height: 30%;
  width: 100%;
`;

const Banner = styled.div`
  position: relative;
  background: url("/images/sequencerBanner.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 30px;
  height: 100%;
  width: 100%;

  &:after {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 30px;
    background: rgba(0, 0, 0, 1);
    opacity: 0.4;
    transition: all 1s;
    -webkit-transition: all 1s;
  }
`;

const ContainerTextBanner = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${Colors.gray};
  font-size: 5rem;
  font-weight: 700;
  letter-spacing: 0.5rem;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Title = styled.p`
  text-shadow: 0px 4px 3px rgba(0, 0, 0, 0.4), 0px 8px 13px rgba(0, 0, 0, 0.1),
    0px 18px 23px rgba(0, 0, 0, 0.1);
  transition: all 1s;

  :hover {
    color: ${Colors.yellow};
    cursor: default;
  }
`;

const SmallTitle = styled.p`
  font-size: 1.5rem;
  font-style: italic;
  color: ${Colors.yellow};
  text-shadow: 0px 4px 3px rgba(0, 0, 0, 0.4), 0px 8px 13px rgba(0, 0, 0, 0.1),
    0px 18px 23px rgba(0, 0, 0, 0.1);
  font-weight: 400;
`;

const ContainerSearch = styled.div`
  width: 100%;
  text-align: center;
`;

const SearchBar = styled.input`
  all: unset;
  width: 35%;
  height: 2.5rem;
  background-color: ${Colors.primary100};
  color: ${Colors.gray};
  border-radius: 36px;
  background-image: url("/images/iconSearch.png");
  background-size: 20px;
  background-repeat: no-repeat;
  background-position: 10px center;
  padding: 0px 3rem;
`;

const ContainerMood = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 3rem;
  margin: 1rem;
`;

const Mood = styled.button`
  all: unset;
  border: 1px solid rgba(255, 211, 105, 0.3);
  background-color: ${(props) =>
    props.active ? "rgba(255, 211, 105, 0.3)" : ""};
  padding: 0.5rem 1rem;
  color: ${Colors.gray};
  border-radius: 10px;
  transition: all 300ms;

  :hover {
    cursor: pointer;
    background-color: ${Colors.yellow};
    background-color: rgba(255, 211, 105, 0.3);
  }
`;

const ContainerBeats = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;
  height: 100%;
  width: 100%;
  overflow: auto;

  &::-webkit-scrollbar {
    -webkit-appearance: none;
    -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
    padding: 1px 2px;
    border-radius: 14px;
    height: 1.2rem;
    width: 1.5rem;
    background: #232528;
    box-shadow: inset 0 1px 0 0 #0d0e0f, inset 0 -1px 0 0 #3a3d42;
    -webkit-box-shadow: inset 0 1px 0 0 #0d0e0f, inset 0 -1px 0 0 #3a3d42;
    -webkit-transition: 0.2s;
    transition: opacity 0.2s;
  }

  &::-webkit-scrollbar-thumb {
    -webkit-appearance: none;
    border: none;
    border-radius: 12px;
    background: -webkit-linear-gradient(top, #529de1 0, #245e8f 100%);
    background: linear-gradient(to bottom, #529de1 0, #245e8f 100%);
  }
`;
