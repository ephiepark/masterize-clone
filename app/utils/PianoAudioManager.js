import { Audio } from 'expo';

const C4 = require('../assets/audios/piano_notes/Piano.mf.C4.aiff');
const D4 = require('../assets/audios/piano_notes/Piano.mf.D4.aiff');
const E4 = require('../assets/audios/piano_notes/Piano.mf.E4.aiff');
const F4 = require('../assets/audios/piano_notes/Piano.mf.F4.aiff');
const G4 = require('../assets/audios/piano_notes/Piano.mf.G4.aiff');
const A4 = require('../assets/audios/piano_notes/Piano.mf.A4.aiff');
const B4 = require('../assets/audios/piano_notes/Piano.mf.B4.aiff');

class PianoAudioManager {
  pianoAudioMap = new Map();

  async init(pianoAudioFileMap) {
    const promises = [];
    for (const [note, audioFile] of pianoAudioFileMap) {
      const soundObject = new Audio.Sound();
      this.pianoAudioMap.set(note, soundObject);
      promises.push(soundObject.loadAsync(audioFile));
    }
    // TODO try catch ?
    await Promise.all(promises);
  }

  async play(note) {
    const soundObject = this.pianoAudioMap.get(note);
    if (soundObject) {
      // TODO try catch ?
      await soundObject.playAsync();
    } else {
      // TODO error
    }
  }

  async stopAll() {
    const promises = [];
    for (const [_note, soundObject] of this.pianoAudioMap) {
      promises.push(soundObject.stopAsync());
    }
    // TODO try catch ?
    await Promise.all(promises);
  }

  async playSingleNote(note) {
    await this.stopAll();
    await this.play(note);
  }
}

// Singleton
const pianoAudioManager = new PianoAudioManager();
pianoAudioManager.init(new Map([
  ["C4", C4],
  ["D4", D4],
  ["E4", E4],
  ["F4", F4],
  ["G4", G4],
  ["A4", A4],
  ["B4", B4]
]));

export default pianoAudioManager;
