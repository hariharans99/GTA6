/**
 * GTA VI Stream-Safe Retro Synthwave Generator
 * Powered by Web Audio API - 100% Royalty Free, 0% YouTube Content ID Claim Risk
 */

class SynthwaveAudioEngine {
    constructor() {
        this.ctx = null;
        this.isPlaying = false;
        this.masterGain = null;
        this.timer = null;
        this.tempo = 96; // 96 BPM classic 80s synthwave vibe
        this.step = 0;
        this.volume = 0.4;
        
        // Nostalgic Vice City Chord Progression: Dm - Bb - F - C
        this.chords = [
            { root: 146.83, notes: [146.83, 174.61, 220.00, 261.63], name: 'Dm' },  // D3, F3, A3, C4
            { root: 116.54, notes: [116.54, 146.83, 174.61, 233.08], name: 'Bb' },  // Bb2, D3, F3, Bb3
            { root: 174.61, notes: [174.61, 220.00, 261.63, 349.23], name: 'F' },   // F3, A3, C4, F4
            { root: 130.81, notes: [130.81, 164.81, 196.00, 261.63], name: 'C' }    // C3, E3, G3, C4
        ];
        this.currentChordIdx = 0;
    }

    init() {
        if (!this.ctx) {
            const AudioCtx = window.AudioContext || window.webkitAudioContext;
            this.ctx = new AudioCtx();
            this.masterGain = this.ctx.createGain();
            this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);

            // Reverb / Delay simulation
            this.delayNode = this.ctx.createDelay();
            this.delayNode.delayTime.value = 0.3125; // 3/16 dotted delay at 96 BPM
            this.delayGain = this.ctx.createGain();
            this.delayGain.gain.value = 0.35;

            this.delayNode.connect(this.delayGain);
            this.delayGain.connect(this.delayNode);
            this.delayGain.connect(this.masterGain);

            // Audio Visualizer Analyser Node
            this.analyser = this.ctx.createAnalyser();
            this.analyser.fftSize = 64;
            this.analyser.smoothingTimeConstant = 0.8;
            this.masterGain.connect(this.analyser);
            this.analyser.connect(this.ctx.destination);
        }
        if (this.ctx && this.ctx.state === 'suspended') {
            this.ctx.resume().catch(() => {});
            const unlockAudio = () => {
                if (this.ctx && this.ctx.state === 'suspended') {
                    this.ctx.resume().catch(() => {});
                }
            };
            document.addEventListener('click', unlockAudio, { once: true });
            document.addEventListener('keydown', unlockAudio, { once: true });
        }
    }

    getFrequencyData() {
        if (!this.analyser) return new Uint8Array(0);
        const dataArray = new Uint8Array(this.analyser.frequencyBinCount);
        this.analyser.getByteFrequencyData(dataArray);
        return dataArray;
    }

    playChime(pitch = 880) {
        try {
            if (!this.ctx) this.init();
            if (this.ctx && this.ctx.state === 'suspended') this.ctx.resume();
            if (!this.ctx) return;
            const now = this.ctx.currentTime;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(pitch, now);
            osc.frequency.exponentialRampToValueAtTime(pitch * 1.4, now + 0.07);

            gain.gain.setValueAtTime(0.08, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);

            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start(now);
            osc.stop(now + 0.1);
        } catch (e) {}
    }

    start() {
        this.init();
        if (this.isPlaying) return;
        this.isPlaying = true;
        this.step = 0;
        const intervalMs = (60 / this.tempo / 4) * 1000; // 16th notes
        this.timer = setInterval(() => this.tick(), intervalMs);
    }

    stop() {
        if (!this.isPlaying) return;
        this.isPlaying = false;
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
    }

    setVolume(val) {
        this.volume = Math.max(0, Math.min(1, val));
        if (this.masterGain && this.ctx) {
            this.masterGain.gain.setTargetAtTime(this.volume, this.ctx.currentTime, 0.05);
        }
    }

    playKick(time) {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.connect(gain);
        gain.connect(this.masterGain);

        osc.frequency.setValueAtTime(140, time);
        osc.frequency.exponentialRampToValueAtTime(35, time + 0.12);

        gain.gain.setValueAtTime(0.7, time);
        gain.gain.exponentialRampToValueAtTime(0.001, time + 0.25);

        osc.start(time);
        osc.stop(time + 0.25);
    }

    playSnare(time) {
        // Noise buffer for 80s gated snare
        const bufferSize = this.ctx.sampleRate * 0.15;
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            data[i] = Math.random() * 2 - 1;
        }

        const noise = this.ctx.createBufferSource();
        noise.buffer = buffer;

        const filter = this.ctx.createBiquadFilter();
        filter.type = 'highpass';
        filter.frequency.value = 800;

        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(0.4, time);
        gain.gain.exponentialRampToValueAtTime(0.01, time + 0.18);

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(this.masterGain);
        gain.connect(this.delayNode);

        noise.start(time);
        noise.stop(time + 0.2);
    }

    playHiHat(time, open = false) {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'square';
        osc.frequency.setValueAtTime(8000, time);

        const dur = open ? 0.08 : 0.03;
        gain.gain.setValueAtTime(open ? 0.15 : 0.08, time);
        gain.gain.exponentialRampToValueAtTime(0.001, time + dur);

        osc.connect(gain);
        gain.connect(this.masterGain);

        osc.start(time);
        osc.stop(time + dur);
    }

    playBassNote(freq, time, duration = 0.15) {
        const osc = this.ctx.createOscillator();
        const filter = this.ctx.createBiquadFilter();
        const gain = this.ctx.createGain();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(freq / 2, time); // Sub-octave

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(600, time);
        filter.frequency.exponentialRampToValueAtTime(150, time + duration);

        gain.gain.setValueAtTime(0.35, time);
        gain.gain.exponentialRampToValueAtTime(0.001, time + duration);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.masterGain);

        osc.start(time);
        osc.stop(time + duration);
    }

    playArpNote(freq, time, duration = 0.2) {
        const osc = this.ctx.createOscillator();
        const filter = this.ctx.createBiquadFilter();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq * 2, time);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(2200, time);
        filter.frequency.exponentialRampToValueAtTime(800, time + duration);

        gain.gain.setValueAtTime(0.18, time);
        gain.gain.exponentialRampToValueAtTime(0.001, time + duration);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.masterGain);
        gain.connect(this.delayNode);

        osc.start(time);
        osc.stop(time + duration);
    }

    tick() {
        if (!this.ctx || this.ctx.state !== 'running') return;
        const now = this.ctx.currentTime + 0.05;
        const stepInBar = this.step % 16;
        const barIdx = Math.floor(this.step / 16) % this.chords.length;
        const currentChord = this.chords[barIdx];

        // Drum groove
        if (stepInBar === 0 || stepInBar === 8 || stepInBar === 10) {
            this.playKick(now);
        }
        if (stepInBar === 4 || stepInBar === 12) {
            this.playSnare(now);
        }
        if (stepInBar % 2 === 0) {
            this.playHiHat(now, stepInBar === 6 || stepInBar === 14);
        }

        // Rolling 80s bassline (8th notes)
        if (stepInBar % 2 === 0) {
            this.playBassNote(currentChord.root, now, 0.12);
        }

        // Sparkling synth arpeggio (16th notes pattern)
        const arpPattern = [0, 1, 2, 3, 2, 1, 3, 1, 0, 2, 3, 1, 2, 3, 1, 0];
        const noteIdx = arpPattern[stepInBar];
        const noteFreq = currentChord.notes[noteIdx];
        this.playArpNote(noteFreq, now, 0.18);

        this.step++;
    }
}

window.SynthwaveAudioEngine = SynthwaveAudioEngine;

