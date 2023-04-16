import styled from "styled-components";
import Colors from "../../utils/Colors";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { useContext, useEffect, useState } from "react";
import { PlayerContext } from "../context/PlayerContext";
import { Scale } from "tonal";
import { arrayNote } from "../../utils/data";

const MusicalSettings = ({ isModalOpen, speed, setSpeed }) => {
  const { setScale, octave, setOctave } = useContext(PlayerContext);

  //Set the scale on select OPTION
  const handleChange = (value) => {
    if (value === "DEFAULT") {
      setScale(arrayNote);
    } else {
      setScale(() => Scale.get(value).notes);
    }
  };

  return (
    <Container isModalOpen={isModalOpen}>
      <H2>Musical</H2>
      <ContainerAll>
        <ContainerTitle>
          <Title>Scales</Title>
        </ContainerTitle>
        <ContainerDivision>
          <Select
            defaultValue="DEFAULT"
            name="scales"
            onChange={(e) => handleChange(e.target.value)}
          >
            <option value="DEFAULT">All</option>
            <optgroup label="Major">
              <option value="c major">C</option>
              <option value="d major">D</option>
              <option value="e major">E</option>
              <option value="f major">F</option>
              <option value="g major">G</option>
              <option value="a major">A</option>
              <option value="b major">B</option>
            </optgroup>
            <optgroup label="Minor">
              <option value="c minor">C</option>
              <option value="d minor">D</option>
              <option value="e minor">E</option>
              <option value="f minor">F</option>
              <option value="g minor">G</option>
              <option value="a minor">A</option>
              <option value="b minor">B</option>
            </optgroup>
          </Select>
        </ContainerDivision>
      </ContainerAll>
      <ContainerAll>
        <ContainerTitle>
          <Title>Octave</Title>
        </ContainerTitle>
        <ContainerDivision>
          <Button>
            <AiOutlinePlus
              onClick={() =>
                setOctave((prevOctave) =>
                  prevOctave < 7 ? prevOctave + 1 : prevOctave
                )
              }
            />
          </Button>
          <Title style={{ margin: "0 0.3rem" }}>{octave}</Title>
          <Button>
            <AiOutlineMinus
              onClick={() =>
                setOctave((prevOctave) =>
                  prevOctave > 1 ? prevOctave - 1 : prevOctave
                )
              }
            />
          </Button>
        </ContainerDivision>
      </ContainerAll>
      <ContainerAll>
        <ContainerTitle>
          <Title>Tempo</Title>
        </ContainerTitle>
        <ContainerDivision>
          <Slider
            type="range"
            min="60"
            max="180"
            step={10}
            value={speed}
            onChange={(e) => setSpeed(e.target.value)}
          />
        </ContainerDivision>
      </ContainerAll>
    </Container>
  );
};

export default MusicalSettings;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  padding: 1rem 0;
  border-bottom: ${(props) =>
    props.isModalOpen ? "1px solid" + Colors.gray : ""};
  border-top: ${(props) =>
    props.isModalOpen ? "1px solid" + Colors.gray : ""};
  height: 100%;
  opacity: ${(props) => (props.isModalOpen ? "1" : "0")};
  transition: all 100ms ease-in-out;
`;

const H2 = styled.h2`
  color: ${Colors.yellow};
  font-size: 2rem;
  text-align: center;
  text-shadow: 0px 4px 3px rgba(0, 0, 0, 0.4), 0px 8px 13px rgba(0, 0, 0, 0.1),
    0px 18px 23px rgba(0, 0, 0, 0.1);
`;

const ContainerTitle = styled.div`
  width: 25%;
`;

const ContainerAll = styled.div`
  display: flex;
  width: 100%;
`;

const Title = styled.p`
  color: ${Colors.gray};
  font-weight: bold;
  font-size: 1.5rem;
`;

const ContainerDivision = styled.div`
  display: flex;
  width: 75%;
  height: 30px;
`;

const Select = styled.select`
  width: 30%;
  margin: 2px 0px;
  border-radius: 20px;
  padding: 2px 5px;
  border: none;
  color: ${Colors.gray};
  background: #232528;
  box-shadow: inset 0 1px 0 0 #0d0e0f, inset 0 -1px 0 0 #3a3d42;
  -webkit-box-shadow: inset 0 1px 0 0 #0d0e0f, inset 0 -1px 0 0 #3a3d42;
`;

const Button = styled.button`
  all: unset;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50%;
  width: 25px;
  height: 25px;
  background-color: ${Colors.yellow};
  margin: 0px 5px;
  cursor: pointer;
  border-radius: 50%;

  :hover {
    opacity: 0.9;
    font-size: 1.2rem;
  }
`;

const Slider = styled.input``;
