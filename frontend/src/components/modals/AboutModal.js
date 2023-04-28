import styled from "styled-components";
import Colors from "../../utils/Colors";
import { AiFillLinkedin, AiFillGithub, AiOutlineMail } from "react-icons/ai";

const AboutModal = ({ isModalAbout }) => {
  return (
    <ContainerModal isModal={isModalAbout}>
      <H2>BeatMi</H2>
      <SectionContainer>
        <Title>About</Title>
        <Info>
          A dynamic music sequencer application that offers a{" "}
          <HighlightWord>unique</HighlightWord> and{" "}
          <HighlightWord>engaging</HighlightWord> platform to{" "}
          <HighlightWord>create</HighlightWord>,{" "}
          <HighlightWord>share</HighlightWord> and{" "}
          <HighlightWord>interact</HighlightWord> with beats.
        </Info>
        <Info style={{ marginTop: "1rem" }}>
          You can check out my code on{" "}
          <Link
            href="https://github.com/FabienD0/FinalProject-BeatMi"
            target="_blank"
          >
            GitHub
          </Link>
          , if you're interested.
        </Info>
      </SectionContainer>
      <SectionContainer>
        <Title>Contact</Title>
        <Info style={{ marginBottom: "1rem" }}>
          Discuss code? Bug report? Feature request?
        </Info>
        <a
          href="https://www.linkedin.com/in/fabien-developer/"
          style={{ all: "unset" }}
          target="_blank"
        >
          <LinkedIcon />
        </a>
        <a
          href="https://github.com/FabienD0"
          style={{ all: "unset" }}
          target="_blank"
        >
          <GitIcon />
        </a>
        <a
          href="mailto:fabien.denommee@gmail.com"
          style={{ all: "unset" }}
          target="_blank"
        >
          <EmailIcon />
        </a>
      </SectionContainer>
    </ContainerModal>
  );
};

export default AboutModal;

const ContainerModal = styled.div`
  position: absolute;
  display: flex;
  gap: 1rem;
  flex-direction: column;
  align-items: center;
  background-color: ${Colors.primary200};
  border: 1px solid ${Colors.gray};
  border-radius: 35px;
  width: 600px;
  height: 30rem;
  left: 50%;
  top: ${(props) => (props.isModal ? "50%" : "-200%")};
  transform: translate(-50%, -50%);
  padding: 1.5rem;
  box-shadow: 0px 4px 4px rgba(255, 255, 255, 0.25);
  z-index: 25;
  transition: all 0.4s ease-in-out;

  @media (max-width: 850px) {
    margin-left: 5rem;
    left: 40%;
    width: 80%;
  }
`;

const H2 = styled.h2`
  color: ${Colors.yellow};
  font-size: 2rem;
  text-align: center;
  text-shadow: 0px 4px 3px rgba(0, 0, 0, 0.4), 0px 8px 13px rgba(0, 0, 0, 0.1),
    0px 18px 23px rgba(0, 0, 0, 0.1);
`;

const SectionContainer = styled.div`
  height: 100%;
  width: 100%;
`;

const Title = styled.p`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${Colors.gray};
  margin-bottom: 15px;
  border-bottom: 1px solid ${Colors.gray};
  padding-bottom: 10px;
  width: 100%;
`;

const Info = styled.p`
  color: ${Colors.gray};
  font-weight: 100;
  letter-spacing: 0.05rem;
  line-height: 1.5rem;
`;

const HighlightWord = styled.span`
  color: ${Colors.yellow};
`;

const Link = styled.a`
  color: ${Colors.yellowDarker};

  :hover {
    color: ${Colors.yellow};
  }

  :visited {
    color: ${Colors.yellowDarker};
    :hover {
      color: ${Colors.yellow};
    }
  }
`;

const LinkedIcon = styled(AiFillLinkedin)`
  color: ${Colors.gray};
  font-size: 2.5rem;
  margin-right: 1rem;

  :hover {
    color: #0a66c2;
    cursor: pointer;
  }
`;

const GitIcon = styled(AiFillGithub)`
  color: ${Colors.gray};
  font-size: 2.5rem;
  margin-right: 1rem;

  :hover {
    color: #24292f;
    cursor: pointer;
  }
`;

const EmailIcon = styled(AiOutlineMail)`
  color: ${Colors.gray};
  font-size: 2.5rem;
  margin-right: 1rem;

  :hover {
    color: ${Colors.yellow};
    cursor: pointer;
  }
`;
