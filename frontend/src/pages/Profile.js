import { useContext, useLayoutEffect, useState } from "react";
import styled from "styled-components";
import { GeneralContext, URL } from "../components/context/GeneralContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Colors from "../utils/Colors";
import Tracks from "./profile/Tracks";
import ChangeAvatar from "./profile/ChangeAvatar";
import SmallCardLiked from "./profile/SmallCardLiked";
import SmallCardTracks from "./profile/SmallCardTracks";

const Profile = () => {
  const [fade, setFade] = useState(false);
  const [section, setSection] = useState("personal");
  const [isModifyAvatar, setIsModifyAvatar] = useState(false);
  const [isCustomAvatar, setIsCustomAvatar] = useState(false);
  const [isConfirmDelete, setIsConfirmDelete] = useState(false);
  const {
    user,
    setUser,
    setRefreshUser,
    setRefreshBeats,
    cookieValue,
    allBeats,
  } = useContext(GeneralContext);
  const navigate = useNavigate();

  /* Select wich section we want*/
  const handleClickButtonSectionChoice = (input) => {
    if (input === section) {
      return;
    } else {
      setSection(input);
      setFade((prevState) => !prevState);
    }
  };

  /* Get the total of likes the user have */
  const getAllLikes = () => {
    let totalLikes = 0;
    for (let i = 0; i < user.beatCreated.length; i++) {
      for (let y = 0; y < allBeats.length; y++) {
        if (allBeats[y]._id === user.beatCreated[i]) {
          totalLikes += allBeats[y].likedBy.length;
        }
      }
    }
    return totalLikes;
  };

  /* Get the total of comments the user have */
  const getAllComments = () => {
    let totalComments = 0;
    for (let i = 0; i < user.beatCreated.length; i++) {
      for (let y = 0; y < allBeats.length; y++) {
        if (allBeats[y]._id === user.beatCreated[i]) {
          totalComments += allBeats[y].comments.length;
        }
      }
    }
    return totalComments;
  };

  /*Refresh user & beats */
  useLayoutEffect(() => {
    setRefreshUser((prev) => !prev);
  }, []);

  /* Remove account function */
  const handleRemoveAccount = () => {
    fetch(`${URL}/api/removeUser`, {
      method: "DELETE",
      headers: {
        Authorization: cookieValue,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ _id: user._id }),
    }).catch(() => navigate("/404"));
    //Remove beats from liked users
    fetch(`${URL}/api/removeLikeBeatAllUser`, {
      method: "PATCH",
      headers: {
        Authorization: cookieValue,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ beatId: user.beatCreated }),
    });
    //Remove beats from the beats database
    fetch(`${URL}/api/deleteAllBeatByUser`, {
      method: "DELETE",
      headers: {
        Authorization: cookieValue,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ beatId: user.beatCreated }),
    })
      .then((res) => res.json())
      .then(() => {
        setRefreshUser((prev) => !prev);
        setUser("");
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  /* Redirect if user isn't logged */
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);

  if (!user) {
    return <h1>No user found.</h1>;
  }

  return (
    <Container>
      <ContainerSectionLeft>
        <ProfileContainer>
          <LeftTop>
            <ButtonAvatar onClick={() => setIsModifyAvatar(true)}>
              <Avatar src={user.avatar} alt="avatar" />
            </ButtonAvatar>
            <div>
              <Username>{user.username}</Username>
              <Email>{user.email}</Email>
            </div>
          </LeftTop>
          <LeftBottom>
            <Status>
              <p>Likes</p>
              <p>Comments</p>
              <p>Tracks</p>
            </Status>
            <Data>
              <p>{getAllLikes()}</p>
              <p>{getAllComments()}</p>
              <p>{user.beatCreated.length}</p>
            </Data>
          </LeftBottom>
          {!isConfirmDelete && (
            <Button onClick={() => setIsConfirmDelete(true)}>
              Delete Account
            </Button>
          )}
          {isConfirmDelete && (
            <ContainerConfirmDelete>
              <p>Are you sure ?</p>
              <ContainerButtonConfirm>
                <Button onClick={handleRemoveAccount}>Yes</Button>
                <Button onClick={() => setIsConfirmDelete(false)}>
                  Cancel
                </Button>
              </ContainerButtonConfirm>
            </ContainerConfirmDelete>
          )}
        </ProfileContainer>
      </ContainerSectionLeft>
      <ContainerSectionRight>
        <InfoContainer>
          {isModifyAvatar && (
            <ChangeAvatar
              setIsModifyAvatar={setIsModifyAvatar}
              user={user}
              setRefreshUser={setRefreshUser}
              setIsCustomAvatar={setIsCustomAvatar}
            />
          )}
          {!isModifyAvatar && (
            <ContainerButton>
              <ButtonEffect
                section={section}
                className={fade ? "animationRight" : "animationLeft"}
              />
              <ButtonTracks
                section={section}
                onClick={() => handleClickButtonSectionChoice("personal")}
              >
                Tracks
              </ButtonTracks>
              <ButtonLiked
                section={section}
                onClick={() => handleClickButtonSectionChoice("liked")}
              >
                Liked
              </ButtonLiked>
            </ContainerButton>
          )}
          {!isModifyAvatar && (
            <ContainerTracks direction={section}>
              {section === "liked" && user.beatLiked.length === 0 && (
                <p
                  style={{
                    textAlign: "center",
                    width: "100%",
                  }}
                >
                  Empty
                </p>
              )}
              {section === "liked" &&
                user.beatLiked.map((beatId) => {
                  return <SmallCardLiked beatId={beatId} key={beatId} />;
                })}
              {section === "personal" && user.beatCreated.length === 0 && (
                <p
                  style={{
                    textAlign: "center",
                    width: "100%",
                  }}
                >
                  Empty
                </p>
              )}
              {section === "personal" &&
                user.beatCreated.map((beatId) => {
                  return (
                    <SmallCardTracks
                      beatId={beatId}
                      key={beatId}
                      user={user}
                      setRefreshUser={setRefreshUser}
                    />
                  );
                })}
            </ContainerTracks>
          )}
        </InfoContainer>
      </ContainerSectionRight>
    </Container>
  );
};

export default Profile;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: white;
  width: 95%;
  height: 95%;
`;

const ContainerSectionLeft = styled.div`
  display: flex;
  justify-content: space-between;
  height: 50%;
  width: 30%;
`;

const ContainerSectionRight = styled.div`
  width: 55%;
  height: 50%;
`;

const ProfileContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  flex-direction: column;
  background: ${Colors.primary200};
  border-radius: 30px;
  height: 28rem;
  width: 100%;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  padding: 1rem;
`;

const InfoContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 2rem;
  background: ${Colors.primary200};
  border-radius: 30px;
  height: 28rem;
  width: 100%;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  padding: 1rem;
`;
const ContainerTracks = styled.div`
  display: flex;
  flex-direction: ${(props) => (props.direction === "liked" ? "column" : "")};
  overflow: auto;
  width: 100%;
  height: 100%;

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

const LeftTop = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 100%;
  height: 50%;
`;

const LeftBottom = styled.div`
  display: flex;
  width: 100%;
  height: 50%;
`;

const Avatar = styled.img`
  width: 10rem;
  height: 10rem;
  border-radius: 50%;
  :hover {
    opacity: 0.4;
  }
`;

const ButtonAvatar = styled.button`
  all: unset;
  position: relative;
  border-radius: 50%;

  :hover {
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0.3);
  }

  :hover::after {
    position: absolute;
    content: "Modify";
    font-weight: bold;
    font-size: 1.5rem;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    pointer-events: none;
  }
`;

const Username = styled.p`
  font-weight: bold;
  color: ${Colors.yellow};
  font-size: 2rem;
  margin: 0.5rem 0;
`;

const Email = styled.p`
  font-style: italic;
  opacity: 0.7;
  color: ${Colors.gray};
`;

const Status = styled.div`
  width: 90%;

  p {
    margin: 1rem 0;
    opacity: 0.7;
  }
`;

const Data = styled.div`
  p {
    margin: 1rem 0;
    color: ${Colors.gray};
    font-style: italic;
  }
`;

const ContainerButton = styled.div`
  position: relative;
  background-color: ${Colors.primary100};
  width: 20rem;
  min-height: 3rem;
  border-radius: 10px;
  padding: 0.3rem;
`;

const Button = styled.button`
  all: unset;
  width: 60%;
  border-radius: 10px;
  text-align: center;
  height: 5rem;
  cursor: pointer;
  color: ${Colors.gray};
  font-size: 22px;
  border: 1px solid rgb(206, 42, 36);
  letter-spacing: 0.2rem;
  transition: all 0.2s ease-in-out;
  opacity: 0.8;

  :hover {
    opacity: 0.8;
    border: 1px solid transparent;
    background-color: rgba(206, 42, 36);
  }
`;

const ButtonEffect = styled.div`
  position: absolute;
  width: 50%;
  height: 85%;
  top: 2.5px;
  border-radius: 10px;
  background-color: ${Colors.primary200};
  z-index: 1;
  right: ${(props) => (props.section === "personal" ? "" : "5px")};

  &.animationRight {
    animation: ${(props) =>
      props.section === "personal"
        ? ""
        : "slideRight 0.5s alternate ease-in-out"};
    @keyframes slideRight {
      0% {
        right: 100px;
      }
      50% {
        right: 2px;
      }
      100% {
        right: 5px;
      }
    }
  }

  &.animationLeft {
    animation: bounce 0.5s alternate ease-in-out;
    animation: ${(props) =>
      props.section === "liked" ? "" : "slideLeft 0.5s alternate ease-in-out"};
    @keyframes slideLeft {
      0% {
        left: 100px;
      }
      50% {
        left: 2px;
      }
      100% {
        left: 5px;
      }
    }
  }
`;

const ButtonTracks = styled.button`
  all: unset;
  position: relative;
  width: 50%;
  text-align: center;
  height: 100%;
  z-index: 2;
  opacity: ${(props) => (props.section === "personal" ? "1" : "0.3")};
  transition: all 300ms;
  :hover {
    cursor: ${(props) =>
      props.section === "personal" ? "default" : "pointer"};
    opacity: ${(props) => (props.section === "personal" ? "1" : "0.5")};
  }
`;
const ButtonLiked = styled.button`
  all: unset;
  position: relative;
  text-align: center;
  z-index: 2;
  width: 50%;
  height: 100%;
  opacity: ${(props) => (props.section === "liked" ? "1" : "0.3")};
  transition: all 300ms;

  :hover {
    cursor: ${(props) => (props.section === "liked" ? "default" : "pointer")};
    opacity: ${(props) => (props.section === "liked" ? "1" : "0.5")};
  }
`;

const ContainerConfirmDelete = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  width: 100%;
`;

const ContainerButtonConfirm = styled.div`
  display: flex;
  gap: 1rem;

  button {
    width: 6rem;
    height: 3rem;
    letter-spacing: 0rem;

    :last-child {
      border: 1px solid #0bdb62;
      :hover {
        background-color: #0bdb62;
        color: black;
      }
    }
  }
`;
