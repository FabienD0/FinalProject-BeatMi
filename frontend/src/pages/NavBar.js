import styled from "styled-components";
import Colors from "../utils/Colors";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { AiOutlineHome, AiOutlineUser } from "react-icons/ai";
import { FiMusic } from "react-icons/fi";
import { CgPiano } from "react-icons/cg";
import { SiBeatport } from "react-icons/si";
import { useContext } from "react";
import { GeneralContext } from "../components/context/GeneralContext";
import { AiFillCloseCircle } from "react-icons/ai";

const NavBar = () => {
  const [isModal, setIsModal] = useState(false);
  const { user, setUser } = useContext(GeneralContext);
  const navigate = useNavigate();

  const handleLogOut = () => {
    setUser("");
    setIsModal(false);
    document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    navigate("/");
  };

  return (
    <NavigationFull>
      <NavigationSmall>
        <NavLink to="/" style={{ all: "unset" }}>
          <Logo src="/images/logo.png" alt="logo" />
        </NavLink>
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
            <Avatar src="/images/avatar/1.png" />
            <button
              style={{ all: "unset" }}
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
`;

const NavigationSmall = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 2rem 1.5rem;
  min-height: 100vh;
  /* width: 60%; */
  background-color: ${Colors.primary200};
  animation: slideOut 0.5s ease-in-out;
  border-radius: 0px 45px 45px 0px;
  border-right: 1px solid rgba(255, 228, 165, 0.3);

  /* :hover {
    width: 100%;
    animation: slideIn 0.5s ease-in-out;
  } */

  @keyframes slideIn {
    0% {
      width: 60%;
    }
    100% {
      width: 100%;
    }
  }
  @keyframes slideOut {
    0% {
      width: 100%;
    }
    100% {
      width: 60%;
    }
  }
`;

const Logo = styled.img`
  width: 10rem;
  /* width: 70%; */
  opacity: 0.8;
  transition: all 0.5s;

  :hover {
    opacity: 1;
    cursor: pointer;
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
`;

const Avatar = styled.img`
  width: 3rem;
  border-radius: 30px;
`;

const AvatarText = styled.p`
  :hover {
    color: ${Colors.yellow};
    cursor: pointer;
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
