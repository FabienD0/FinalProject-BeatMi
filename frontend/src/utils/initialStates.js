export const initialCellStateDrum = {
  activated: false,
  triggered: false,
  instrument: "drum",
};
export const initialCellStateMelody = {
  triggered: false,
  activated: false,
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
