export function getConsequtiveSuccessCount(history) {
  let count = 0;
  for (let i = history.length - 1; i >= 0; i -= 1) {
    const historyRecord = history[i];
    if (historyRecord.noteQuestioned === historyRecord.noteUserAnswer) {
      count += 1;
    } else {
      break;
    }
  }
  return count;
}

export function getNoteResultCountMap(history) {
  const noteResultCountMap = new Map();
  for (const record of history) {
    if (!noteResultCountMap.has(record.noteQuestioned)) {
      noteResultCountMap.set(record.noteQuestioned, [0, 0]);
    }
    const noteResultCount = noteResultCountMap.get(record.noteQuestioned);
    const countCorrect = noteResultCount[0];
    const countWrong = noteResultCount[1];
    if (record.noteQuestioned === record.noteUserAnswer) {
      noteResultCountMap.set(record.noteQuestioned, [
        countCorrect + 1,
        countWrong
      ]);
    } else {
      noteResultCountMap.set(record.noteQuestioned, [
        countCorrect,
        countWrong + 1
      ]);
    }
  }
  return noteResultCountMap;
}
