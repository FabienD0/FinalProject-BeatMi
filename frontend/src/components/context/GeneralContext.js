import { createContext, useEffect, useState } from "react";

export const GeneralContext = createContext(null);

export const URL = process.env.REACT_APP_SERVER_URL;
export const CLOUDINARY_URL = process.env.REACT_APP_CLOUDINARY_URL;
export const PRESET_NAME = process.env.REACT_APP_PRESET_NAME;

export const GeneralProvider = ({ children }) => {
  /*Cookie JWT*/
  const cookieValue = document.cookie
    .split(";")
    .find((row) => row.startsWith("jwt"))
    ?.split("=")[1];

  const [allBeats, setAllBeats] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [refreshBeats, setRefreshBeats] = useState(false);
  const [refreshUser, setRefreshUser] = useState(false);
  const [loadingState, setLoadingState] = useState("loading");
  const [user, setUser] = useState(() => {
    if (cookieValue) {
      setLoadingState("loading");
      fetch(`${URL}/api/getUser`, {
        headers: {
          Authorization: cookieValue,
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.status === 200) {
            setUser(data.user);
            setLoadingState("success");
          } else {
            setUser("");
            setLoadingState("success");
          }
        });
    }
  });

  /* Get all beats from the database */
  useEffect(() => {
    setLoadingState("loading");
    fetch(`${URL}/api/getAllBeats`)
      .then((res) => res.json())
      .then((data) => {
        setAllBeats(data.beats);
        console.log("Beats Loaded");
        setLoadingState("success");
      })
      .catch(() => setLoadingState("error"));
  }, [refreshBeats]);

  /* Get all users from the database */
  useEffect(() => {
    setLoadingState("loading");
    fetch(`${URL}/api/getAllUsers`)
      .then((res) => res.json())
      .then((data) => {
        setAllUsers(data.users);
        setLoadingState("success");
      })
      .catch(() => setLoadingState("error"));
  }, [refreshBeats]);

  /* Refresh the user in the frontend */
  useEffect(() => {
    if (user && cookieValue) {
      setLoadingState("loading");
      fetch(`${URL}/api/getUser`, {
        headers: {
          Authorization: cookieValue,
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.status === 200) {
            setUser(data.user);
            console.log("User Updated");
            setLoadingState("success");
          } else {
            setUser("");
          }
        });
    }
  }, [refreshUser]);

  return (
    <GeneralContext.Provider
      value={{
        allBeats,
        setRefreshBeats,
        refreshBeats,
        loadingState,
        user,
        setUser,
        refreshUser,
        setRefreshUser,
        cookieValue,
        allUsers,
      }}
    >
      {children}
    </GeneralContext.Provider>
  );
};
