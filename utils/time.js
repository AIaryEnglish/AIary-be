const { utcToZonedTime, format } = require("date-fns-tz");

const ZONE = "Asia/Seoul";

// 주어진 Date(지금)를 KST(Asia/Seoul) 기준 "YYYY-MM-DD" 문자열로 변환
function kstDateKey(date = new Date()) {
  const zoned = utcToZonedTime(date, ZONE);
  return format(zoned, "yyyy-MM-dd", { timeZone: ZONE });
}

// 오늘로부터 n일 전의 날짜를 KST 기준 "YYYY-MM-DD" 문자열로 변환
function kstDateKeyMinusDays(days) {
  const ms = days * 24 * 60 * 60 * 1000;
  return kstDateKey(newDate(Date.now() - ms));
}

module.exports = { kstDateKey, kstDateKeyMinusDays, ZONE };
