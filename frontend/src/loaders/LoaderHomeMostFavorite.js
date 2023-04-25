import React from "react";
import styled from "styled-components";
import { ReactComponent as MostFavorite } from "./mostFavorite.svg";

const LoaderHomeMostFavorite = () => {
  return (
    <Wrapper>
      <MostFavorite />
    </Wrapper>
  );
};

export default LoaderHomeMostFavorite;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 48%;
  border-radius: 30px;
  height: 50%;

  @media (max-width: 1013px) {
    width: 40%;
    height: 40%;
  }
  @media (max-width: 683px) {
    width: 100%;
    height: calc(85% / 4);
  }
`;
