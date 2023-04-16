const Colors = {
  gray: "#EEEEEE",
  yellow: "#FFD369",
  yellowDarker: "#D49600",
  primary100: "#222831",
  primary200: "#393E46",
  padKick:
    "radial-gradient(circle,hsla(59, 91%, 87%, 1) 10%,hsla(59, 94%, 65%, 1) 100%)",
  padKickTriggered:
    "radial-gradient(circle, hsla(59, 63%, 69%, 1) 10%, hsla(59, 94%, 65%, 1) 100%);",
  padSnare:
    "radial-gradient(circle, hsla(0, 28%, 78%, 1) 10%, hsla(360, 79%, 55%, 1) 100%);",
  padSnareTriggered:
    "radial-gradient(circle, hsla(0, 62%, 65%, 1) 10%, hsla(360, 79%, 55%, 1) 100%);",
  padHat:
    "radial-gradient(circle, hsla(205, 14%, 67%, 1) 10%, hsla(206, 63%, 49%, 1) 100%);",
  padHatTriggered:
    "radial-gradient(circle, hsla(206, 38%, 58%, 1) 10%, hsla(206, 63%, 49%, 1) 100%);",
  padCrash:
    "radial-gradient(circle, hsla(268, 20%, 59%, 1) 10%, hsla(268, 59%, 49%, 1) 100%);",
  padCrashTriggered:
    "radial-gradient(circle, hsla(268, 39%, 54%, 1) 10%, hsla(268, 59%, 49%, 1) 100%);",
  padNoteMelody:
    "radial-gradient(circle, hsla(300, 23%, 62%, 1) 10%, hsla(300, 63%, 47%, 1) 100%);",
  padNoteMelodyTriggered:
    "radial-gradient(circle, hsla(300, 43%, 46%, 1) 10%, hsla(300, 63%, 47%, 1) 100%);",
  padNoteMelodyEven:
    "radial-gradient(circle, hsla(353, 100%, 87%, 1) 10%, hsla(352, 97%, 61%, 1) 100%);",
  padNoteMelodyEvenTriggered:
    "radial-gradient(circle, hsla(353, 100%, 77%, 1) 10%, hsla(352, 97%, 61%, 1) 100%)",
};

/* Choose which color goes to which pad for the DRUM */
export const handleColor = (pad, triggered, melodyRow) => {
  switch (true) {
    case pad === 0 && !triggered:
      return Colors.padCrash;
    case pad === 0 && triggered:
      return Colors.padCrashTriggered;
    case pad === 1 && !triggered:
      return Colors.padHat;
    case pad === 1 && triggered:
      return Colors.padHatTriggered;
    case pad === 2 && !triggered:
      return Colors.padSnare;
    case pad === 2 && triggered:
      return Colors.padSnareTriggered;
    case pad === 3 && !triggered:
      return Colors.padKick;
    case pad === 3 && triggered:
      return Colors.padKickTriggered;
    // case pad === 4 && !triggered:
    //   return Colors.padNoteMelody;
    // case pad === 4 && triggered:
    //   return Colors.padNoteMelodyTriggered;
    case melodyRow % 2 === 0 && !triggered:
      return Colors.padNoteMelody;
    case melodyRow % 2 === 0 && triggered:
      return Colors.padNoteMelodyTriggered;
    case melodyRow % 2 !== 0 && !triggered:
      return Colors.padNoteMelodyEven;
    case melodyRow % 2 !== 0 && triggered:
      return Colors.padNoteMelodyEvenTriggered;
  }
};

export default Colors;
