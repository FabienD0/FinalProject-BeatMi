export const initialCellStateDrum = {
  activated: false,
  triggered: false,
  velocity: 1,
  instrument: "drum",
};
export const initialCellStateMelody = {
  triggered: false,
  activated: false,
  velocity: 1,
  instrument: "melody",
};

export const initialStateMelody = [
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
];

export const initialStateDrum = [
  new Array(16).fill(initialCellStateDrum),
  new Array(16).fill(initialCellStateDrum),
  new Array(16).fill(initialCellStateDrum),
  new Array(16).fill(initialCellStateDrum),
];
