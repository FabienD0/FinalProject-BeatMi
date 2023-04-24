import styled from "styled-components";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { PlayerContext } from "./components/context/PlayerContext";
import GlobalStyle from "./styles/globalStyles";
import NavBar from "./pages/NavBar";
import Home from "./pages/Home";
import BeatMaker from "./pages/BeatMaker";
import ErrorPage from "./pages/ErrorPage";
import Overlay from "./components/Overlay";
import Beats from "./pages/Beats";
import Profile from "./pages/Profile";
import LogIn from "./pages/LogIn";
import Piano from "./pages/Piano";
import { GeneralContext } from "./components/context/GeneralContext";

const App = () => {
  const { isModalChords, setIsModalChords } = useContext(PlayerContext);
  const { allBeats, loadingState, user } = useContext(GeneralContext);
  const [updateBeat, setUpdateBeat] = useState(false);

  return (
    <BrowserRouter>
      <GlobalStyle />
      <ContainerAll>
        {isModalChords && <Overlay setIsModalChords={setIsModalChords} />}
        <NavBar />
        <Main>
          <Routes>
            <Route path="/" element={<Home allBeats={allBeats} />} />
            <Route
              path="/beatmaker/:id?"
              element={<BeatMaker allBeats={allBeats} />}
            />
            <Route
              path="/beats/:id?"
              element={
                <Beats
                  allBeats={allBeats}
                  setUpdateBeat={setUpdateBeat}
                  updateBeat={updateBeat}
                />
              }
            />
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/piano" element={<Piano />} />
            <Route path="/404" element={<ErrorPage />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </Main>
      </ContainerAll>
    </BrowserRouter>
  );
};

export default App;

const ContainerAll = styled.div`
  display: flex;
`;
const Main = styled.main`
  display: flex;
  align-items: center;
  justify-content: center;
  width: calc(100vw - var(--navBarSize));
  padding: 2rem;
`;
