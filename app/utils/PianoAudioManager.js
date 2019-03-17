// @flow

import { Audio } from 'expo';

// $FlowFixMe
const C4 = require('../assets/audios/piano_notes/Piano.mf.C4.aiff');
// $FlowFixMe
const D4 = require('../assets/audios/piano_notes/Piano.mf.D4.aiff');
// $FlowFixMe
const E4 = require('../assets/audios/piano_notes/Piano.mf.E4.aiff');
// $FlowFixMe
const F4 = require('../assets/audios/piano_notes/Piano.mf.F4.aiff');
// $FlowFixMe
const G4 = require('../assets/audios/piano_notes/Piano.mf.G4.aiff');
// $FlowFixMe
const A4 = require('../assets/audios/piano_notes/Piano.mf.A4.aiff');
// $FlowFixMe
const B4 = require('../assets/audios/piano_notes/Piano.mf.B4.aiff');

type AudioObject = any;

class PianoAudioManager {
  pianoAudioMap = new Map<string, AudioObject>();

  async init() {
    const pianoAudioFileMap = new Map([
      ['C4', C4],
      ['D4', D4],
      ['E4', E4],
      ['F4', F4],
      ['G4', G4],
      ['A4', A4],
      ['B4', B4]
    ]);
    const promises = [];
    for (const [note, audioFile] of pianoAudioFileMap) {
      const soundObject = new Audio.Sound();
      this.pianoAudioMap.set(note, soundObject);
      promises.push(soundObject.loadAsync(audioFile));
    }
    // TODO try catch ?
    await Promise.all(promises);
  }

  async playSingleNote(requestedNote: string) {
    const promises = [];
    for (const [note, soundObject] of this.pianoAudioMap) {
      if (requestedNote === note) {
        promises.push(soundObject.replayAsync());
      } else {
        promises.push(soundObject.stopAsync());
      }
    }
    // TODO try catch ?
    await Promise.all(promises);
  }
}

// Singleton
const pianoAudioManager = new PianoAudioManager();

export default pianoAudioManager;
