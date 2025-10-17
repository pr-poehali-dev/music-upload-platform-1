const audioContext = typeof window !== 'undefined' ? new (window.AudioContext || (window as any).webkitAudioContext)() : null;

let isPlaying = false;
let masterGain: GainNode | null = null;
let oscillators: OscillatorNode[] = [];

const chordProgressions = [
  // Am - F - C - G (спокойная прогрессия)
  [220, 174.61, 261.63],    // Am (A, C, E)
  [174.61, 220, 261.63],    // F (F, A, C)
  [261.63, 329.63, 392],    // C (C, E, G)
  [196, 246.94, 293.66],    // G (G, B, D)
];

let currentChordIndex = 0;
let chordChangeInterval: number | null = null;

const playChord = (frequencies: number[]) => {
  if (!audioContext || !masterGain) return;

  // Остановить предыдущие осцилляторы
  oscillators.forEach(osc => {
    osc.stop();
    osc.disconnect();
  });
  oscillators = [];

  // Создать новые осцилляторы для аккорда
  frequencies.forEach((freq, index) => {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(masterGain!);

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(freq, audioContext.currentTime);

    // Разная громкость для разных нот в аккорде
    const volume = index === 0 ? 0.03 : 0.02;
    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(volume, audioContext.currentTime + 2); // Плавное нарастание

    oscillator.start(audioContext.currentTime);
    oscillators.push(oscillator);
  });
};

export const startAmbientMusic = () => {
  if (!audioContext || isPlaying) return;

  isPlaying = true;

  // Создать мастер-регулятор громкости
  masterGain = audioContext.createGain();
  masterGain.connect(audioContext.destination);
  masterGain.gain.setValueAtTime(0.3, audioContext.currentTime);

  // Начать с первого аккорда
  playChord(chordProgressions[currentChordIndex]);

  // Менять аккорды каждые 4 секунды
  chordChangeInterval = window.setInterval(() => {
    currentChordIndex = (currentChordIndex + 1) % chordProgressions.length;
    playChord(chordProgressions[currentChordIndex]);
  }, 4000);
};

export const stopAmbientMusic = () => {
  if (!audioContext || !isPlaying) return;

  isPlaying = false;

  // Плавно затухание
  if (masterGain) {
    masterGain.gain.linearRampToValueAtTime(0, audioContext.currentTime + 1);
  }

  // Остановить осцилляторы через 1 секунду
  setTimeout(() => {
    oscillators.forEach(osc => {
      try {
        osc.stop();
        osc.disconnect();
      } catch (e) {
        // Игнорировать ошибки если осциллятор уже остановлен
      }
    });
    oscillators = [];

    if (masterGain) {
      masterGain.disconnect();
      masterGain = null;
    }

    if (chordChangeInterval) {
      clearInterval(chordChangeInterval);
      chordChangeInterval = null;
    }

    currentChordIndex = 0;
  }, 1000);
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
