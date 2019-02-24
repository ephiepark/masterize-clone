const allNotes = ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4'];

export function getNoteQuestionedAndOptions(level, history) {
  const randIdx = Math.floor(Math.random() * level);
  const noteQuestioned = allNotes[randIdx];
  const noteOptions = allNotes.slice(0, level);
  return {noteOptions, noteQuestioned};
};
