import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Colors from "../utils/Colors";
import { AiFillEyeInvisible, AiFillEye, AiOutlineCheck } from "react-icons/ai";
import { GeneralContext, URL } from "../components/context/GeneralContext";
import { BiError } from "react-icons/bi";

const LogIn = () => {
  const [form, setForm] = useState("signIn");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fade, setFade] = useState(false);
  const [isPasswordShowed, setIsPasswordShowed] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();
  const { setUser, user } = useContext(GeneralContext);

  /* Select if we want to log in or register*/
  const handleClickButtonFormChoice = (formInput) => {
    if (formInput === form) {
      return;
    } else {
      setForm(formInput);
      setFade((prevState) => !prevState);
      setErrorMessage("");
      setSuccessMessage("");
    }
  };

  /* User log in function */
  const handleSignIn = (e) => {
    e.preventDefault();
    fetch(`${URL}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 401) {
          setErrorMessage(data.message);
          setSuccessMessage("");
        } else if (data.status === 200) {
          const jwt = data.token;
          const expirationDate = new Date();
          expirationDate.setDate(expirationDate.getDate() + 14);
          document.cookie = `jwt=${jwt};expires=${expirationDate.toUTCString()};path=/`;
          setUser(data.user);
          navigate("/profile");
        }
      })
      .catch(() => navigate("/404"));
  };

  /*User signup function */
  const handleSigup = (e) => {
    e.preventDefault();
    fetch(`${URL}/api/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        username: username,
        password: password,
        avatar: "/images/avatar/3.png",
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 409) {
          setErrorMessage(data.message);
        } else if (data.status === 201) {
          setErrorMessage("");
          setForm("signIn");
          setFade((prevState) => !prevState);
          setEmail("");
          setPassword("");
          setSuccessMessage(
            "Your user account has been created successfully. Please log in."
          );
        }
      })
      .catch(() => navigate("/404"));
  };

  /* Redirect if user is already logged */
  useEffect(() => {
    if (user) {
      navigate("/profile");
    }
  }, [user]);

  return (
    <ContainerAll>
      <Container>
        <LeftContainer></LeftContainer>
        <RightContainer>
          <div>
            <Title>Welcome Back</Title>
            <p>Please enter your details</p>
          </div>
          <ContainerFormChoice>
            <ButtonEffect
              form={form}
              className={fade ? "animationRight" : "animationLeft"}
            />
            <ButtonSignIn
              form={form}
              onClick={() => handleClickButtonFormChoice("signIn")}
            >
              Sign In
            </ButtonSignIn>
            <ButtonSignUp
              form={form}
              onClick={() => handleClickButtonFormChoice("signUp")}
            >
              Signup
            </ButtonSignUp>
          </ContainerFormChoice>
          <Form
            onSubmit={(e) => {
              if (form === "signIn") {
                handleSignIn(e);
              } else if (form === "signUp") {
                handleSigup(e);
              }
            }}
          >
            {form === "signUp" && <Label htmlFor="username">Username</Label>}
            {form === "signUp" && (
              <Input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                id="username"
                required
              ></Input>
            )}
            <Label htmlFor="email">E-Mail</Label>
            <Input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              required
            ></Input>
            <Label htmlFor="password">Password</Label>
            <ContainerPassWordField>
              <button
                type="button"
                style={{ all: "unset" }}
                onClick={(e) => {
                  e.preventDefault();
                  setIsPasswordShowed(!isPasswordShowed);
                }}
              >
                {!isPasswordShowed && <IconHide />}
                {isPasswordShowed && <IconShow />}
              </button>
              <Input
                type={isPasswordShowed ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              ></Input>
            </ContainerPassWordField>
            {form === "signIn" && <Button type="submit">Sign in</Button>}
            {form === "signUp" && <Button type="submit">Register</Button>}
          </Form>
          {errorMessage && (
            <ErrorContainer>
              <ErrorIcon />
              <p>{errorMessage}</p>
            </ErrorContainer>
          )}
          {successMessage && (
            <SuccessContainer>
              <SuccessIcon />
              <p>{successMessage}</p>
            </SuccessContainer>
          )}
        </RightContainer>
      </Container>
    </ContainerAll>
  );
};

export default LogIn;

const ContainerAll = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: white;
  width: 95%;
  height: 60vh;
`;

const Container = styled.section`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  background: ${Colors.primary200};
  border-radius: 30px;
  height: 100%;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

const LeftContainer = styled.div`
  position: relative;
  width: 50%;
  height: 100%;

  :after {
    position: absolute;
    content: "";
    background: url("/images/bannerLogIn.jpg");
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;

    opacity: 0.7;
    width: 100%;
    height: 100%;
    border-radius: 22px;
    border-radius: 22px 0px 0px 22px;
    transition: all 1s;
    -webkit-transition: all 1s;
  }
`;

const RightContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  width: 50%;
  height: 100%;
  padding: 1rem;
  text-align: center;

  p {
    opacity: 0.5;
    font-style: italic;
  }
`;

const Title = styled.h2`
  font-size: 2.2rem;
  margin-bottom: 1rem;
  letter-spacing: 0.1rem;
  color: ${Colors.gray};
  text-shadow: 0px 4px 3px rgba(0, 0, 0, 0.4), 0px 8px 13px rgba(0, 0, 0, 0.1),
    0px 18px 23px rgba(0, 0, 0, 0.1);
`;

const ContainerFormChoice = styled.div`
  position: relative;
  background-color: ${Colors.primary100};
  width: 20rem;
  height: 3rem;
  border-radius: 10px;
  padding: 0.3rem;
`;

const ButtonEffect = styled.div`
  position: absolute;
  width: 50%;
  height: 85%;
  top: 2.5px;
  border-radius: 10px;
  background-color: ${Colors.primary200};
  z-index: 1;
  right: ${(props) => (props.form === "signIn" ? "" : "5px")};

  &.animationRight {
    animation: ${(props) =>
      props.form === "signIn" ? "" : "slideRight 0.5s alternate ease-in-out"};
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
      props.form === "signUp" ? "" : "slideLeft 0.5s alternate ease-in-out"};
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

const ButtonSignIn = styled.button`
  all: unset;
  position: relative;
  width: 50%;
  height: 100%;
  z-index: 2;
  opacity: ${(props) => (props.form === "signIn" ? "1" : "0.3")};
  transition: all 300ms;
  :hover {
    cursor: ${(props) => (props.form === "signIn" ? "default" : "pointer")};
    opacity: ${(props) => (props.form === "signIn" ? "1" : "0.5")};
  }
`;
const ButtonSignUp = styled.button`
  all: unset;
  position: relative;
  z-index: 2;
  width: 50%;
  height: 100%;
  opacity: ${(props) => (props.form === "signUp" ? "1" : "0.3")};
  transition: all 300ms;

  :hover {
    cursor: ${(props) => (props.form === "signUp" ? "default" : "pointer")};
    opacity: ${(props) => (props.form === "signUp" ? "1" : "0.5")};
  }
`;

const Form = styled.form`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
`;

const Label = styled.label``;

const Input = styled.input`
  all: unset;
  position: relative;
  margin: 0.5rem 0;
  text-align: start;
  border-radius: 10px;
  height: 2rem;
  width: 15rem;
  padding: 0.2rem 1rem;
  background: #232528;
  color: ${Colors.gray};
  border: 1px solid transparent;
  box-shadow: inset 0 1px 0 0 #0d0e0f, inset 0 -1px 0 0 #3a3d42;
  -webkit-box-shadow: inset 0 1px 0 0 #0d0e0f, inset 0 -1px 0 0 #3a3d42;
  -webkit-transition: 0.2s;
  transition: opacity 0.2s;

  :-webkit-autofill {
    -webkit-box-shadow: 0 0 0 1000px #232528 inset !important;
    -webkit-text-fill-color: ${Colors.gray} !important;
    border: 1px solid #232528;
    background-clip: content-box !important;
  }

  &:focus {
    outline: none;
    border: 1px solid ${Colors.yellow};
  }
`;

const ContainerPassWordField = styled.div`
  position: relative;
`;

const IconStyles = `
  position: absolute;
  right: 10px;
  bottom: 17px;
  font-size: 1.3rem;
  color: ${Colors.gray};
  opacity: 0.7;
  z-index: 10;

  :hover {
    cursor: pointer;
    opacity: 0.9;
  }
`;

const IconHide = styled(AiFillEyeInvisible)`
  ${IconStyles}
`;

const IconShow = styled(AiFillEye)`
  ${IconStyles}
`;

const Button = styled.button`
  all: unset;
  width: 100%;
  margin: 0.5rem 0rem;
  border-radius: 10px;
  text-align: center;
  height: 3rem;
  cursor: pointer;
  color: ${Colors.gray};
  font-size: 22px;
  border: 1px solid #0bdb62;
  letter-spacing: 0.2rem;
  transition: all 0.2s ease-in-out;

  :hover {
    opacity: 0.8;
    border: 1px solid transparent;
    background-color: #0bdb62;
    color: black;
    letter-spacing: 0.3rem;
  }

  :disabled {
    opacity: 0.3;
    cursor: default;

    :hover {
      background-color: inherit;
      border: 1px solid #0bdb62;
      color: ${Colors.gray};
      letter-spacing: 0.2rem;
    }
  }
`;

const ErrorContainer = styled.div`
  display: flex;
  align-items: center;
  height: 3.5rem;
  padding: 1rem;
  background-color: rgba(255, 193, 46, 0.2);
  border-radius: 10px;
  color: ${Colors.gray};

  p {
    opacity: 1;
  }
`;

const SuccessContainer = styled.div`
  display: flex;
  align-items: center;
  height: 3.5rem;
  padding: 1rem;
  background-color: rgba(11, 219, 98, 0.2);
  border-radius: 10px;
  color: ${Colors.gray};

  p {
    opacity: 1;
  }
`;

const ErrorIcon = styled(BiError)`
  color: #ed1b0c;
  color: ${Colors.yellowDarker};
  font-size: 2rem;
  margin-right: 0.5rem;
`;

const SuccessIcon = styled(AiOutlineCheck)`
  color: #0bdb62;
  font-size: 2rem;
  margin-right: 0.5rem;
`;
