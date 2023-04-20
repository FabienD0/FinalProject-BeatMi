export const arrayNote = [
  "B",
  "A#",
  "A",
  "G#",
  "G",
  "F#",
  "F",
  "E",
  "D#",
  "D",
  "C#",
  "C",
];

export const arrayNoteNoNotation = ["C", "D", "E", "F", "G", "A", "B"];

export const chordTonalityData = ["maj", "min", "dim", "sus4", "sus2", "aug"];

//Piano Page
export const pianoKey = [
  { key: "C4", color: "#f399b0", keyboard: "Q" },
  { key: "D4", color: "#15c6fc", keyboard: "W" },
  { key: "E4", color: "#fdd001", keyboard: "E" },
  { key: "F4", color: "#becb01", keyboard: "R" },
  { key: "G4", color: "#0055d6", keyboard: "T" },
  { key: "A4", color: "#c30302", keyboard: "Y" },
  { key: "B4", color: "#f19800", keyboard: "U" },
  { key: "C5", color: "#f399b0", keyboard: "I" },
  { key: "D5", color: "#15c6fc", keyboard: "O" },
  { key: "E5", color: "#fdd001", keyboard: "P" },
  { key: "F5", color: "#becb01", keyboard: "Z" },
  { key: "G5", color: "#0055d6", keyboard: "X" },
  { key: "A5", color: "#c30302", keyboard: "C" },
  { key: "B5", color: "#f19800", keyboard: "V" },
];

export const KEY_TO_NOTE = [
  //First Octave
  { q: "C4" },
  { 2: "C#4", key: "black", id: "0" },
  { w: "D4" },
  { 3: "D#4", key: "black", id: "1" },
  { e: "E4" },
  { r: "F4" },
  { 5: "F#4", key: "black", id: "3" },
  { t: "G4" },
  { 6: "G#4", key: "black", id: "4" },
  { y: "A4" },
  { 7: "A#4", key: "black", id: "5" },
  { u: "B4" },
  //Second Octave
  { i: "C5" },
  { 9: "C#5", key: "black", id: "0" },
  { o: "D5" },
  { 0: "D#5", key: "black", id: "1" },
  { p: "E5" },
  { z: "F5" },
  { s: "F#5", key: "black", id: "3" },
  { x: "G5" },
  { d: "G#5", key: "black", id: "4" },
  { c: "A5" },
  { f: "A#5", key: "black", id: "5" },
  { v: "B5" },
];

export const NOTE_TO_KEY_SHARP = [
  { 0: "2" },
  { 1: "3" },
  { 3: "5" },
  { 4: "6" },
  { 5: "7" },
  { 7: "9" },
  { 8: "0" },
  { 10: "S" },
  { 11: "D" },
  { 12: "F" },
];

export const VALID_KEYS = [
  "q",
  "2",
  "w",
  "3",
  "e",
  "r",
  "5",
  "t",
  "6",
  "y",
  "7",
  "u",
  "i",
  "9",
  "o",
  "0",
  "p",
  "z",
  "s",
  "x",
  "d",
  "c",
  "f",
  "v",
];
export const BLACK_KEYS = ["2", "3", "5", "6", "7"];
