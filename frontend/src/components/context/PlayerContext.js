import { createContext, useEffect, useState } from "react";
import * as Tone from "tone";
import { arrayNote } from "../../utils/data";
import { pop } from "../../utils/drumKit";
import {
  initialCellStateDrum,
  initialCellStateMelody,
  initialStateMelody,
  initialStateDrum,
} from "../../utils/initialStates";
import { synth } from "../../utils/synthKit";

export const PlayerContext = createContext(null);

export const PlayerProvider = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [playerDrum, setPlayerDrum] = useState(null);
  const [playerMelody, setPlayerMelody] = useState(null);
  const [playerChords, setPlayerChords] = useState(null);
  const [drumKit, setDrumKit] = useState(pop);
  const [melodyKit, setMelodyKit] = useState(synth);
  const [drumAndMelody, setDrumAndMelody] = useState({
    drum: initialStateDrum,
    melody: initialStateMelody,
  });
  const [chordToPiano, setChordToPiano] = useState({
    one: "",
    two: "",
    three: "",
    four: "",
  });
  const [chordName, setChordName] = useState({
    one: "",
    two: "",
    three: "",
    four: "",
  });
  const [isModalChords, setIsModalChords] = useState(false);
  const [scale, setScale] = useState(arrayNote);
  const [octave, setOctave] = useState(4);
  const [steps, setSteps] = useState(16);
  const [clearInstrument, setClearInstrument] = useState({
    instrument: "",
    refresh: false,
  });

  //Note for the Melody
  const melodyNotes = [
    `C${octave}`,
    `C#${octave}`,
    `D${octave}`,
    `D#${octave}`,
    `E${octave}`,
    `F${octave}`,
    `F#${octave}`,
    `G${octave}`,
    `G#${octave}`,
    `A${octave}`,
    `A#${octave}`,
    `B${octave}`,
  ].reverse();

  //Note For Drum
  const drumNotes = ["A4", "A3", "A2", "A1"];

  useEffect(() => {
    /* Drum Player */
    const playerDrum = new Tone.Sampler({
      urls: drumKit[0],
      onload: () => {
        setPlayerDrum(playerDrum);
        console.log("Drum Loaded");
      },
    }).toDestination();

    /* Synth Player */
    const playerMelody = new Tone.PolySynth().toDestination();
    playerMelody.set(melodyKit);
    setPlayerMelody(playerMelody);
    console.log("Synth Loaded");

    /* Chords Player */
    const playerChords = new Tone.Sampler({
      urls: {
        C4: "C4.mp3",
        "D#4": "Ds4.mp3",
        "F#4": "Fs4.mp3",
        A4: "A4.mp3",
      },
      release: 1,
      baseUrl: "https://tonejs.github.io/audio/salamander/",
    }).toDestination();
    Tone.loaded().then(() => {
      setPlayerChords(playerChords);
      console.log("Chords Loaded");
    });
  }, [drumKit, melodyKit]);

  /*================== 
    Reset Function
  ===================*/
  const resetInstrument = (instrument) => {
    if (instrument === "chords") {
      setChordToPiano({
        one: "",
        two: "",
        three: "",
        four: "",
      });
      setChordName({
        one: "",
        two: "",
        three: "",
        four: "",
      });
      setClearInstrument({
        instrument: "chords",
        refresh: true,
      });
    } else if (instrument === "drums") {
      setDrumAndMelody((prev) => ({
        ...prev,
        drum: [
          new Array(16).fill(initialCellStateDrum),
          new Array(16).fill(initialCellStateDrum),
          new Array(16).fill(initialCellStateDrum),
          new Array(16).fill(initialCellStateDrum),
        ],
      }));
      setClearInstrument({
        instrument: "drums",
        refresh: true,
      });
    } else if (instrument === "melody") {
      setDrumAndMelody((prev) => ({
        ...prev,
        melody: [
          new Array(16).fill(initialCellStateMelody),
          new Array(16).fill(initialCellStateMelody),
          new Array(16).fill(initialCellStateMelody),
          new Array(16).fill(initialCellStateMelody),
          new Array(16).fill(initialCellStateMelody),
          new Array(16).fill(initialCellStateMelody),
          new Array(16).fill(initialCellStateMelody),
          new Array(16).fill(initialCellStateMelody),
          new Array(16).fill(initialCellStateMelody),
          new Array(16).fill(initialCellStateMelody),
          new Array(16).fill(initialCellStateMelody),
          new Array(16).fill(initialCellStateMelody),
        ],
      }));
      setClearInstrument({
        instrument: "melody",
        refresh: true,
      });
    }
    setSteps(16);
  };

  return (
    <PlayerContext.Provider
      value={{
        playerDrum,
        setPlayerDrum,
        playerMelody,
        setPlayerMelody,
        playerChords,
        setPlayerChords,
        melodyNotes,
        drumNotes,
        drumAndMelody,
        setDrumAndMelody,
        chordToPiano,
        setChordToPiano,
        setIsModalChords,
        isModalChords,
        scale,
        setScale,
        octave,
        setOctave,
        resetInstrument,
        clearInstrument,
        setClearInstrument,
        isPlaying,
        setIsPlaying,
        setDrumKit,
        drumKit,
        setMelodyKit,
        melodyKit,
        chordName,
        setChordName,
        steps,
        setSteps,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};
