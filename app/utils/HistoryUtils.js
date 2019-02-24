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
