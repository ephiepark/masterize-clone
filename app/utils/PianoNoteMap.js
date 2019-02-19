const C4 = require('../assets/audios/piano_notes/Piano.mf.C4.aiff');
const D4 = require('../assets/audios/piano_notes/Piano.mf.D4.aiff');
const E4 = require('../assets/audios/piano_notes/Piano.mf.E4.aiff');
const F4 = require('../assets/audios/piano_notes/Piano.mf.F4.aiff');
const G4 = require('../assets/audios/piano_notes/Piano.mf.G4.aiff');
const A4 = require('../assets/audios/piano_notes/Piano.mf.A4.aiff');
const B4 = require('../assets/audios/piano_notes/Piano.mf.B4.aiff');

const noteAudioMap = new Map([
  ['C4', C4],
  ['D4', D4],
  ['E4', E4],
  ['F4', F4],
  ['G4', G4],
  ['A4', A4],
  ['B4', B4]
]);

export default noteAudioMap;
