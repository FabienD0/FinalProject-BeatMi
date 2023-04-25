import React from "react";
import styled from "styled-components";
import { ReactComponent as CartSong } from "./cartSong.svg";

const LoaderHomeRandom = () => {
  return (
    <Wrapper>
      <CartSong />
    </Wrapper>
  );
};

export default LoaderHomeRandom;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  cursor: pointer;
  justify-content: space-evenly;
  margin: 0rem 1rem;
  width: 18rem;
  overflow: hidden;

  @media (max-width: 1308px) {
    width: 10rem;
    flex-direction: column;
    gap: 0.5rem;
  }
  @media (max-width: 1058px) {
    height: 5rem;
  }

  @media (max-width: 900px) {
    width: 10rem;
    height: 4rem;
  }

  @media (max-width: 400px) {
    width: 8rem;
  }
`;
