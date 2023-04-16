import styled from "styled-components";
import Colors from "../../utils/Colors";
import { BiArrowBack } from "react-icons/bi";
import { defaultAvatar } from "../../utils/defaultAvatarPath";
import { URL } from "../../components/context/GeneralContext";
import { useNavigate } from "react-router-dom";

const ChangeAvatar = ({ setIsModifyAvatar, user, setRefreshUser }) => {
  const navigate = useNavigate();

  /* Change Avatar Function */
  const handleChangeAvatar = (avatar) => {
    fetch(`${URL}/api/changeAvatar`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: user.email, avatar: avatar }),
    })
      .then((res) => res.json())
      .then(() => {
        setRefreshUser((prev) => !prev);
        setIsModifyAvatar(false);
      })
      .catch(() => navigate("/404"));
  };

  return (
    <Container>
      <ContainerTop>
        <button
          style={{ all: "unset" }}
          onClick={() => setIsModifyAvatar(false)}
        >
          <BackIcon />
        </button>
        <H2>Choose your avatar</H2>
      </ContainerTop>
      <ContainerAvatarChoice>
        {defaultAvatar.map((avatar) => (
          <button
            key={avatar}
            style={{ all: "unset" }}
            onClick={() => handleChangeAvatar(avatar)}
          >
            <Avatar src={avatar} />
          </button>
        ))}
      </ContainerAvatarChoice>
      <ContainerBottom>
        <Button>Upload</Button>
      </ContainerBottom>
    </Container>
  );
};

export default ChangeAvatar;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  width: 100%;
  height: 100%;
`;

const ContainerTop = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 2rem;
`;

const BackIcon = styled(BiArrowBack)`
  font-size: 2rem;

  :hover {
    color: ${Colors.yellow};
    cursor: pointer;
  }
`;

const H2 = styled.h2`
  flex: 1;
  color: ${Colors.yellow};
  font-size: 2rem;
  text-align: center;
  text-shadow: 0px 4px 3px rgba(0, 0, 0, 0.4), 0px 8px 13px rgba(0, 0, 0, 0.1),
    0px 18px 23px rgba(0, 0, 0, 0.1);
`;

const ContainerAvatarChoice = styled.div`
  display: flex;
  flex: 1;
  flex-wrap: wrap;
  align-items: center;
`;

const Avatar = styled.img`
  width: 5rem;
  margin: 1rem;
  :hover {
    cursor: pointer;
    opacity: 0.8;
    transform: scale(1.1);
  }
`;

const ContainerBottom = styled.div``;

const Button = styled.button`
  all: unset;
  width: 15rem;
  height: 3rem;
  border-radius: 10px;
  text-align: center;
  cursor: pointer;
  color: ${Colors.gray};
  font-size: 22px;
  border: 1px solid #0bdb62;
  letter-spacing: 0.2rem;
  transition: all 0.2s ease-in-out;
  opacity: 0.8;

  :hover {
    opacity: 0.8;
    border: 1px solid transparent;
    color: black;
    background-color: #0bdb62;
  }
`;
