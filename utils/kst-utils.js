const KST_OFFSET = 9 * 60 * 60 * 1000; // 9시간(밀리초) (KST는 UTC+9)

// 날짜 객체 → KST 날짜 문자열("YYYY-MM-DD")
const toKstYmd = (date) => {
  const kst = new Date(date.getTime() + KST_OFFSET);
  const year = kst.getUTCFullYear();
  const month = String(kst.getUTCMonth() + 1).padStart(2, "0");
  const day = String(kst.getUTCDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

// KST 날짜 문자열 n일 이동
const addDaysFromKstYmd = (ymd, n) => {
  const [year, month, day] = ymd.split("-").map(Number);
  const utcAtKstMidnight = Date.UTC(year, month - 1, day) - KST_OFFSET;
  const shifted = new Date(utcAtKstMidnight + n * 86400000);
  return toKstYmd(shifted);
};

module.exports = { toKstYmd, addDaysFromKstYmd };
