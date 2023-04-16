const organ = {
  harmonicity: 2,
  volume: -10,
  oscillator: {
    type: "amsine2",
    modulationType: "sine",
    harmonicity: 1.01,
  },
  envelope: {
    attack: 0.006,
    decay: 4,
    sustain: 0.04,
    release: 1.2,
  },
  modulation: {
    volume: 13,
    type: "amsine2",
    modulationType: "sine",
    harmonicity: 12,
  },
  modulationEnvelope: {
    attack: 0.006,
    decay: 0.2,
    sustain: 0.2,
    release: 0.4,
  },
  instrument: "Organ",
};

const guitar = {
  oscillator: {
    volume: -10,
    type: "fmsquare5",
    modulationType: "triangle",
    modulationIndex: 2,
    harmonicity: 0.501,
  },
  filter: {
    Q: 1,
    type: "lowpass",
    rolloff: -24,
  },
  envelope: {
    attack: 0.01,
    decay: 0.1,
    sustain: 0.4,
    release: 2,
  },
  filterEnvelope: {
    attack: 0.01,
    decay: 0.1,
    sustain: 0.8,
    release: 1.5,
    baseFrequency: 50,
    octaves: 4.4,
  },
  instrument: "Guitar",
};

const synth = {
  oscillator: {
    volume: -15,
    type: "pwm",
    modulationFrequency: 1,
  },
  filter: {
    Q: 6,
    rolloff: -24,
  },
  envelope: {
    attack: 0.025,
    decay: 0.3,
    sustain: 0.9,
    release: 2,
  },
  filterEnvelope: {
    attack: 0.245,
    decay: 0.131,
    sustain: 0.5,
    release: 2,
    baseFrequency: 20,
    octaves: 7.2,
    exponent: 2,
  },
  instrument: "Synth",
};

const smooth = {
  noise: {
    type: "pink",
    playbackRate: 0.1,
  },
  envelope: {
    attack: 0.5,
    decay: 2,
    sustain: 0.5,
    release: 3,
  },
  instrument: "Smooth",
};

const sleepPan = {
  oscillator: {
    type: "fatcustom",
    partials: [0.2, 1, 0, 0.5, 0.1],
    spread: 40,
    count: 3,
  },
  envelope: {
    attack: 0.001,
    decay: 1.6,
    sustain: 0,
    release: 1.6,
  },
  instrument: "Pan",
};

const eightys = {
  oscillator: {
    type: "fatsawtooth",
    count: 3,
    spread: 30,
  },
  envelope: {
    attack: 0.01,
    decay: 0.1,
    sustain: 0.5,
    release: 0.4,
    attackCurve: "exponential",
  },
  instrument: "80's",
};

export { organ, guitar, synth, smooth, sleepPan, eightys };
