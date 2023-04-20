import styled from "styled-components";
import Colors from "../../utils/Colors";
import { BiArrowBack } from "react-icons/bi";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { defaultAvatar } from "../../utils/defaultAvatarPath";
import {
  URL,
  CLOUDINARY_URL,
  PRESET_NAME,
} from "../../components/context/GeneralContext";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import { useState } from "react";

const ChangeAvatar = ({
  setIsModifyAvatar,
  user,
  setRefreshUser,
  setIsCustomAvatar,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  /* Change Avatar Function */
  const handleChangeAvatar = (avatar, isCustom, addToUser) => {
    fetch(`${URL}/api/changeAvatar`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: user.email,
        avatar: avatar,
        isCustom: isCustom,
        addToUser: addToUser,
      }),
    })
      .then((res) => res.json())
      .then(() => {
        setRefreshUser((prev) => !prev);
        setIsModifyAvatar(false);
        setIsCustomAvatar(isCustom);
      })
      .catch(() => navigate("/404"));
  };

  /* Choose the file to upload */
  const handleUpload = () => {
    fileInputRef.current.click();
  };

  /* API to upload an image */
  const handleFileUpload = (event) => {
    setIsLoading(true);
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", PRESET_NAME);

    fetch(CLOUDINARY_URL, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.secure_url !== "") {
          const uploadedFileUrl = data.secure_url;
          handleChangeAvatar(uploadedFileUrl, true, true);
          setIsLoading(false);
        }
      })
      .catch((err) => console.error(err));
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
            onClick={() => handleChangeAvatar(avatar, false, false)}
          >
            <Avatar src={avatar} />
          </button>
        ))}
        {user.customAvatar &&
          user.customAvatar.map((avatar) => (
            <button
              key={avatar}
              style={{ all: "unset" }}
              onClick={() => handleChangeAvatar(avatar, true, false)}
            >
              <AvatarCustom src={avatar} />
            </button>
          ))}
      </ContainerAvatarChoice>
      <ContainerBottom>
        <div>
          <FileInput
            type="file"
            onChange={handleFileUpload}
            ref={fileInputRef}
            accept="image/png, image/jpeg"
          />
          {!isLoading && <Button onClick={handleUpload}>Upload</Button>}
          {isLoading && (
            <Button>
              <LoadingIcon />
            </Button>
          )}
        </div>
        <button
          onClick={() => {
            fetch(
              `https://api.cloudinary.com/v1_1/dtvq13klo/image/destroy/j1na7wrvvkcnveo7hxxw.jpg`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  upload_preset: PRESET_NAME,
                }),
              }
            )
              .then((response) => response.json())
              .then((data) => {
                console.log(data);
              })
              .catch((err) => console.error(err));
          }}
        >
          {" "}
          DELETE image{" "}
        </button>
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
  overflow: auto;

  &::-webkit-scrollbar {
    -webkit-appearance: none;
    -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
    padding: 1px 2px;
    border-radius: 14px;
    height: 1.2rem;
    width: 1.5rem;
    background: #232528;
    box-shadow: inset 0 1px 0 0 #0d0e0f, inset 0 -1px 0 0 #3a3d42;
    -webkit-box-shadow: inset 0 1px 0 0 #0d0e0f, inset 0 -1px 0 0 #3a3d42;
    -webkit-transition: 0.2s;
    transition: opacity 0.2s;
  }

  &::-webkit-scrollbar-thumb {
    -webkit-appearance: none;
    border: none;
    border-radius: 12px;
    background: -webkit-linear-gradient(top, #529de1 0, #245e8f 100%);
    background: linear-gradient(to bottom, #529de1 0, #245e8f 100%);
  }
`;

const Avatar = styled.img`
  width: 5rem;
  height: 5rem;
  margin: 1rem;
  :hover {
    cursor: pointer;
    opacity: 0.8;
    transform: scale(1.1);
  }
`;

const AvatarCustom = styled.img`
  width: 5rem;
  height: 5rem;
  margin: 1rem;
  border-radius: 50%;
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

const FileInput = styled.input`
  display: none;
`;

const LoadingIcon = styled(AiOutlineLoading3Quarters)`
  color: ${Colors.gray};
  animation: rotation 1.5s infinite linear;

  @keyframes rotation {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;
