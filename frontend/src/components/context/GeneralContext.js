import { createContext, useEffect, useState } from "react";

export const GeneralContext = createContext(null);
export const URL = process.env.REACT_APP_SERVER_URL;

export const GeneralProvider = ({ children }) => {
  //Cookie JWT
  const cookieValue = document.cookie
    .split(";")
    .find((row) => row.startsWith("jwt"))
    ?.split("=")[1];

  const [allBeats, setAllBeats] = useState([]);
  const [refreshBeats, setRefreshBeats] = useState(false);
  const [refreshUser, setRefreshUser] = useState(false);
  const [loadingState, setLoadingState] = useState("");
  const [user, setUser] = useState(() => {
    if (cookieValue) {
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
          } else {
            setUser("");
          }
        });
    }
  });

  /* Get all beats from the database */
  useEffect(() => {
    fetch(`${URL}/api/getAllBeats`)
      .then((res) => res.json())
      .then((data) => {
        setAllBeats(data.beats);
        console.log("Beats Loaded");
        setLoadingState("success");
      })
      .catch(() => setLoadingState("error"));
  }, [refreshBeats]);

  /* Refresh the user in the frontend */
  useEffect(() => {
    if (user && cookieValue) {
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
      }}
    >
      {children}
    </GeneralContext.Provider>
  );
};
