import styled from "styled-components";
import Colors from "../utils/Colors";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { AiOutlineHome, AiOutlineUser, AiOutlineLogin } from "react-icons/ai";
import { FiMusic } from "react-icons/fi";
import { CgPiano } from "react-icons/cg";
import { SiBeatport } from "react-icons/si";
import { useContext } from "react";
import { GeneralContext } from "../components/context/GeneralContext";
import { AiFillCloseCircle } from "react-icons/ai";

const NavBar = ({ setIsModalAbout }) => {
  const [isModal, setIsModal] = useState(false);
  const { user, setUser } = useContext(GeneralContext);
  const navigate = useNavigate();

  /* Logout function, delete JWT Cookie */
  const handleLogOut = () => {
    setUser("");
    setIsModal(false);
    document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    navigate("/");
  };

  return (
    <NavigationFull>
      <NavigationSmall>
        <button onClick={() => setIsModalAbout(true)} style={{ all: "unset" }}>
          <Logo src="/images/logo.png" alt="logo" />
        </button>
        <ContainerLinkAll>
          <ContainerLink to="/">
            <AiOutlineHome />
            <Title>Home</Title>
          </ContainerLink>
          <ContainerLink to="/beats">
            <SiBeatport />
            <Title>Beats</Title>
          </ContainerLink>
          <ContainerLink to="/beatmaker">
            <FiMusic />
            <Title>Create</Title>
          </ContainerLink>
          <ContainerLink to="/piano">
            <CgPiano />
            <Title>Piano</Title>
          </ContainerLink>
          <ContainerLink to="/profile">
            <AiOutlineUser />
            <Title>Profile</Title>
          </ContainerLink>
        </ContainerLinkAll>
        {!user && (
          <ContainerLinkLogIn to="/login">
            <Title>Log in</Title>
            <LoginIcon />
          </ContainerLinkLogIn>
        )}
        {user && (
          <ContainerAvatar>
            {isModal && (
              <Modal>
                <button style={{ all: "unset" }} onClick={handleLogOut}>
                  <p>Logout</p>
                </button>
                <button
                  style={{ all: "unset" }}
                  onClick={() => setIsModal(false)}
                >
                  <CloseIcon />
                </button>
              </Modal>
            )}
            <button
              style={{ all: "unset", width: "100%" }}
              onClick={() => setIsModal(!isModal)}
            >
              {" "}
              <Avatar src={user.avatar} />
            </button>

            <button
              style={{ all: "unset", width: "70%" }}
              onClick={() => setIsModal(!isModal)}
            >
              <AvatarText>{user.username}</AvatarText>
            </button>
          </ContainerAvatar>
        )}
      </NavigationSmall>
    </NavigationFull>
  );
};

export default NavBar;

const NavigationFull = styled.nav`
  min-height: 100vh;
  min-width: var(--navBarSize);

  @media (max-width: 1000px) {
    min-width: 8rem;
  }
  @media (max-width: 425px) {
    min-width: 6rem;
  }
  @media (min-height: 1250px) {
    min-height: 60vh;
    border: 2px solid blue;
  }
`;

const NavigationSmall = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 2rem 1.5rem;
  background-color: ${Colors.primary200};
  animation: slideOut 0.5s ease-in-out;
  border-radius: 0px 45px 45px 0px;
  border-right: 1px solid rgba(255, 228, 165, 0.3);
  height: 100%;
  @media (min-height: 1250px) {
    min-height: 60vh;
  }
`;

const Logo = styled.img`
  width: 10rem;
  opacity: 0.8;
  transition: all 0.5s;

  :hover {
    opacity: 1;
    cursor: pointer;
  }

  @media (max-width: 1000px) {
    width: 7rem;
  }
  @media (max-width: 425px) {
    display: none;
  }
`;

const ContainerLinkAll = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 100%;
`;

const ContainerLink = styled(NavLink)`
  all: unset;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  padding: 0.5rem 0;
  border-radius: 30px;
  cursor: pointer;
  width: 100%;
  color: ${Colors.gray};
  font-size: 2rem;
  transition: all 200ms;

  &.active {
    font-weight: bold;
    background-color: rgba(255, 211, 105, 0.5);
  }

  :hover {
    font-weight: bold;
  }
`;

const Title = styled.p`
  font-size: 1.3rem;
  letter-spacing: 0.2rem;

  @media (max-width: 1000px) {
    display: none;
  }
`;

const ContainerLinkLogIn = styled(NavLink)`
  all: unset;
  margin-top: auto;
  text-align: center;
  color: ${Colors.gray};
  background-color: ${Colors.primary100};
  width: 100%;
  padding: 0.5rem 0;
  border-radius: 30px;
  font-size: 1.3rem;
  cursor: pointer;
  transition: all 200ms;
  letter-spacing: 0.2rem;

  :hover {
    color: black;
    background-color: rgba(255, 211, 105, 0.8);
  }

  &.active {
    font-weight: bold;
  }
`;

const ContainerAvatar = styled.div`
  all: unset;
  position: relative;
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: auto;
  text-align: center;
  color: ${Colors.gray};
  width: 100%;
  font-size: 1.3rem;
  transition: all 200ms;
  letter-spacing: 0.2rem;

  @media (max-width: 1000px) {
    width: 100%;
  }
  @media (max-width: 425px) {
    width: fit-content;
  }
`;

const Avatar = styled.img`
  width: 3rem;
  border-radius: 30px;

  @media (max-width: 425px) {
    display: block;
    width: 2rem;
  }
`;

const AvatarText = styled.p`
  font-size: 1rem;

  @media (max-width: 1000px) {
    font-size: 0.8rem;
  }
  :hover {
    color: ${Colors.yellow};
    cursor: pointer;
  }

  @media (max-width: 1000px) {
    display: none;
  }

  @media (max-width: 425px) {
    display: none;
  }
`;

const Modal = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  padding: 0rem 0.5rem;
  justify-content: space-evenly;
  width: 100%;
  height: 3.5rem;
  border-radius: 20px;
  background-color: rgba(206, 42, 36, 0.4);
  top: -75px;

  @media (max-width: 1000px) {
    font-size: 0.7rem;
    height: 2rem;
    top: -50px;
  }

  @media (max-width: 425px) {
    font-size: 0.5rem;
    top: -25px;
  }

  p {
    :hover {
      cursor: pointer;
      opacity: 0.7;
    }
  }
`;

const CloseIcon = styled(AiFillCloseCircle)`
  color: ${Colors.gray};
  cursor: pointer;
  :hover {
    opacity: 0.7;
  }
`;

const LoginIcon = styled(AiOutlineLogin)`
  font-size: 2rem;
  display: none;

  @media (max-width: 1000px) {
    display: inline;
  }
`;
