const audioContext = typeof window !== 'undefined' ? new (window.AudioContext || (window as any).webkitAudioContext)() : null;

let isPlaying = false;
let masterGain: GainNode | null = null;
let oscillators: OscillatorNode[] = [];
let melodyInterval: number | null = null;

const classicalProgression = [
  { name: 'Am', notes: [220.00, 261.63, 329.63] },
  { name: 'F', notes: [174.61, 220.00, 261.63] },
  { name: 'C', notes: [130.81, 164.81, 196.00] },
  { name: 'G', notes: [98.00, 123.47, 146.83] },
  { name: 'Am', notes: [220.00, 261.63, 329.63] },
  { name: 'Em', notes: [164.81, 196.00, 246.94] },
  { name: 'F', notes: [174.61, 220.00, 261.63] },
  { name: 'G', notes: [196.00, 246.94, 293.66] },
];

const melodyNotes = [
  440.00, 493.88, 523.25, 587.33, 523.25, 493.88, 440.00, 392.00,
  440.00, 523.25, 587.33, 523.25, 493.88, 440.00, 392.00, 349.23,
  329.63, 349.23, 392.00, 440.00, 493.88, 440.00, 392.00, 349.23,
  329.63, 392.00, 440.00, 392.00, 349.23, 329.63, 293.66, 261.63,
];

let currentChordIndex = 0;
let currentMelodyIndex = 0;

const createOscillator = (freq: number, type: OscillatorType, volume: number, fadeIn: number = 2) => {
  if (!audioContext || !masterGain) return null;

  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(masterGain);

  oscillator.type = type;
  oscillator.frequency.setValueAtTime(freq, audioContext.currentTime);

  gainNode.gain.setValueAtTime(0, audioContext.currentTime);
  gainNode.gain.linearRampToValueAtTime(volume, audioContext.currentTime + fadeIn);

  oscillator.start(audioContext.currentTime);
  
  return { oscillator, gainNode };
};

const playChord = (chord: { name: string; notes: number[] }, smooth: boolean = true) => {
  if (!audioContext || !masterGain) return;

  oscillators.forEach(({ oscillator, gainNode }) => {
    if (smooth) {
      gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.5);
      setTimeout(() => {
        try {
          oscillator.stop();
          oscillator.disconnect();
        } catch (e) {}
      }, 500);
    } else {
      try {
        oscillator.stop();
        oscillator.disconnect();
      } catch (e) {}
    }
  });
  oscillators = [];

  chord.notes.forEach((freq, index) => {
    const result = createOscillator(
      freq,
      'triangle',
      index === 0 ? 0.04 : 0.03,
      smooth ? 3 : 2
    );
    if (result) oscillators.push(result);
  });
};

const playMelodyNote = () => {
  if (!audioContext || !masterGain || !isPlaying) return;

  const freq = melodyNotes[currentMelodyIndex];
  const result = createOscillator(freq, 'sine', 0.015, 0.1);
  
  if (result) {
    const { oscillator, gainNode } = result;
    gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.8);
    setTimeout(() => {
      try {
        oscillator.stop();
        oscillator.disconnect();
      } catch (e) {}
    }, 800);
  }

  currentMelodyIndex = (currentMelodyIndex + 1) % melodyNotes.length;
};

export const startAmbientMusic = () => {
  if (!audioContext || isPlaying) return;

  isPlaying = true;

  masterGain = audioContext.createGain();
  masterGain.connect(audioContext.destination);
  masterGain.gain.setValueAtTime(0.25, audioContext.currentTime);

  playChord(classicalProgression[currentChordIndex], false);

  const chordChangeInterval = setInterval(() => {
    if (!isPlaying) {
      clearInterval(chordChangeInterval);
      return;
    }
    currentChordIndex = (currentChordIndex + 1) % classicalProgression.length;
    playChord(classicalProgression[currentChordIndex]);
  }, 6000);

  melodyInterval = window.setInterval(() => {
    if (!isPlaying) {
      if (melodyInterval) clearInterval(melodyInterval);
      return;
    }
    playMelodyNote();
  }, 600);
};

export const stopAmbientMusic = () => {
  if (!audioContext || !isPlaying) return;

  isPlaying = false;

  if (masterGain) {
    masterGain.gain.linearRampToValueAtTime(0, audioContext.currentTime + 2);
  }

  setTimeout(() => {
    oscillators.forEach(({ oscillator }) => {
      try {
        oscillator.stop();
        oscillator.disconnect();
      } catch (e) {}
    });
    oscillators = [];

    if (masterGain) {
      masterGain.disconnect();
      masterGain = null;
    }

    if (melodyInterval) {
      clearInterval(melodyInterval);
      melodyInterval = null;
    }

    currentChordIndex = 0;
    currentMelodyIndex = 0;
  }, 2000);
};

export const toggleAmbientMusic = () => {
  if (isPlaying) {
    stopAmbientMusic();
  } else {
    startAmbientMusic();
  }
  return isPlaying;
};

export const isAmbientMusicPlaying = () => isPlaying;