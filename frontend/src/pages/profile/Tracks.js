import styled from "styled-components";
import SmallCardTracks from "./SmallCardTracks";

const Tracks = () => {
  return (
    <Container>
      <SmallCardTracks />
      <SmallCardTracks />
      <SmallCardTracks />
      <SmallCardTracks />
      <SmallCardTracks />
      <SmallCardTracks />
      <SmallCardTracks />
      <SmallCardTracks />
      <SmallCardTracks />
      <SmallCardTracks />
      <SmallCardTracks />
      <SmallCardTracks />
      <SmallCardTracks />
      <SmallCardTracks />
      <SmallCardTracks />
      <SmallCardTracks />
      <SmallCardTracks />
      <SmallCardTracks />
      <SmallCardTracks />
    </Container>
  );
};

export default Tracks;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
`;
