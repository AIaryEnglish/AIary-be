function isValidDiaryDate(date) {
  const diaryDate = new Date(date);
  const today = new Date();
  today.setHours(0, 0, 0, 0); // 오늘 0시 기준

  const twoDaysAgo = new Date(today);
  twoDaysAgo.setDate(today.getDate() - 2);

  return diaryDate >= twoDaysAgo && diaryDate <= today;
}

module.exports = isValidDiaryDate;