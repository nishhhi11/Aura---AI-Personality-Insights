let audioContext: AudioContext | null = null;

const getAudioContext = () => {
  if (!audioContext) {
    audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  return audioContext;
};

export const initAudio = () => {
  const ctx = getAudioContext();
  if (ctx && ctx.state === 'suspended') {
    ctx.resume();
  }
};

export const playWhoosh = () => {
  const ctx = getAudioContext();
  if (!ctx) return;
  
  const t = ctx.currentTime;
  const duration = 0.4;
  
  // White noise buffer for wind/whoosh sound
  const bufferSize = ctx.sampleRate * duration;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = Math.random() * 2 - 1;
  }

  const noise = ctx.createBufferSource();
  noise.buffer = buffer;

  // Filter to shape the noise
  const filter = ctx.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.setValueAtTime(200, t);
  filter.frequency.exponentialRampToValueAtTime(1500, t + duration); // Sweep up

  // Gain envelope
  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.3, t); // Increased from 0.04 to 0.3
  gain.gain.exponentialRampToValueAtTime(0.001, t + duration);

  noise.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);
  
  noise.start();
};

export const playSparkle = () => {
  const ctx = getAudioContext();
  if (!ctx) return;
  const t = ctx.currentTime;

  // Play a few overlapping high pitched sine waves
  const notes = [0, 0.1, 0.2, 0.35];
  notes.forEach((offset, i) => {
     const osc = ctx.createOscillator();
     const gain = ctx.createGain();
     
     osc.type = 'sine';
     // Pentatonic-ish random high notes (E6, G6, A6, C7 range approx)
     const baseFreq = 1000;
     const freq = baseFreq + (Math.random() * 1000); 
     osc.frequency.setValueAtTime(freq, t + offset);
     
     // Increased from 0.03 to 0.15
     gain.gain.setValueAtTime(0.15, t + offset);
     gain.gain.exponentialRampToValueAtTime(0.001, t + offset + 0.4);
     
     osc.connect(gain);
     gain.connect(ctx.destination);
     osc.start(t + offset);
     osc.stop(t + offset + 0.4);
  });
};

export const playConfirmation = () => {
  const ctx = getAudioContext();
  if (!ctx) return;
  const t = ctx.currentTime;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(523.25, t); // C5
  osc.frequency.exponentialRampToValueAtTime(880, t + 0.15); // Slide up to A5

  // Increased from 0.05 to 0.3
  gain.gain.setValueAtTime(0.3, t);
  gain.gain.exponentialRampToValueAtTime(0.001, t + 0.3);

  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(t);
  osc.stop(t + 0.3);
};

export const playHover = () => {
  const ctx = getAudioContext();
  if (!ctx) return;
  const t = ctx.currentTime;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sine';
  // Gentle ascending pitch (A4 to B4 approx)
  osc.frequency.setValueAtTime(440, t);
  osc.frequency.linearRampToValueAtTime(480, t + 0.1);

  // Quick soft blip volume
  gain.gain.setValueAtTime(0, t);
  gain.gain.linearRampToValueAtTime(0.15, t + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.001, t + 0.15);

  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(t);
  osc.stop(t + 0.15);
};