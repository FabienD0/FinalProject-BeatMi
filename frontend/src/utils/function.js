export const convertPadNumberToNote = (number) => {
  switch (true) {
    case number === 11:
      return "C";
    case number === 10:
      return "C#";
    case number === 9:
      return "D";
    case number === 8:
      return "D#";
    case number === 7:
      return "E";
    case number === 6:
      return "F";
    case number === 5:
      return "F#";
    case number === 4:
      return "G";
    case number === 3:
      return "G#";
    case number === 2:
      return "A";
    case number === 1:
      return "A#";
    case number === 0:
      return "B";
  }
};

export const convertFlatNote = (note) => {
  switch (true) {
    case note === "Bb":
      return "A#";
    case note === "Eb":
      return "D#";
    case note === "Ab":
      return "G#";
    case note === "Db":
      return "C#";
    case note === "Gb":
      return "F#";
    case note === "Cb":
      return "B";
    case note === "Fb":
      return "E";
  }
};

export const addLike = (beat, user, url, setRefreshUser) => {
  fetch(`${url}/api/likeBeat`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ _id: beat, userId: user }),
  })
    .then((res) => res.json())
    .then((data) => {
      fetch(`${url}/api/likeBeatUser`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ _id: user, beatId: beat }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === 200) {
            setRefreshUser((prev) => !prev);
          }
        });
    })
    .catch((err) => console.log(err));
};

export const removeLike = (beat, user, url, setRefreshUser) => {
  fetch(`${url}/api/removeLikeBeat`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ _id: beat, userId: user }),
  })
    .then((res) => res.json())
    .then((data) => {
      fetch(`${url}/api/removeLikeBeatUser`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ _id: user, beatId: beat }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === 200) {
            setRefreshUser((prev) => !prev);
          }
        });
    })
    .catch((err) => console.log(err));
};
