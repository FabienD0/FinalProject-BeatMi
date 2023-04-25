import React from "react";
import styled from "styled-components";
import { ReactComponent as TopArtist } from "./topArtist.svg";

const LoaderHomeTopArtist = () => {
  return (
    <Wrapper>
      <TopArtist />
    </Wrapper>
  );
};
export default LoaderHomeTopArtist;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  height: 22%;

  :hover {
    cursor: pointer;
  }

  @media (max-width: 1013px) {
    width: 100%;
    height: 22%;
  }
  @media (max-width: 683px) {
    width: 100%;
    height: calc(85% / 4);
  }
`;
