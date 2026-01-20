import { format, toZonedTime } from "date-fns-tz";

export function formatDate(isoString) {
  if (!isoString) return isoString;
  const vietnamTimezone = 'Asia/Ho_Chi_Minh';
  const zonedDate = toZonedTime(isoString, vietnamTimezone);

  const formattedDate = format(zonedDate, ' HH:mm - dd/MM/yyyy', { timeZone: vietnamTimezone });

  return formattedDate;
}

export function getDate(isoString) {
  if (!isoString) return isoString;
  const vietnamTimezone = 'Asia/Ho_Chi_Minh';
  const zonedDate = toZonedTime(isoString, vietnamTimezone);

  const formattedDate = format(zonedDate, ' dd/MM/yyyy', { timeZone: vietnamTimezone });

  return formattedDate;
}

export function getTimeGMT7(isoString) {
  if (!isoString) return isoString;
  const vietnamTimezone = 'Asia/Ho_Chi_Minh';
  const zonedDate = toZonedTime(isoString, vietnamTimezone);

  const formatDateTime = format(zonedDate, 'HH:mm', { timeZone: vietnamTimezone });

  return formatDateTime;
}

export function checkTimeInRange(startDateTimeAt, endDateTimeAt) {
  const now = new Date();

  const startTime = new Date(startDateTimeAt);
  const endTime = new Date(endDateTimeAt);

  if (now >= startTime && now <= endTime) {
    return "Đang sale";
  } else if (now < startTime) {
    return "Chưa bắt đầu";
  } else {
    return "Đã kết thúc";
  }
}

export function calculateTimeLeft(endDateTimeAt) {
  const now = new Date();
  const end = new Date(endDateTimeAt);
  const total = end - now;


  let timeLeft = {};
  if (total > 0) {
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const seconds = Math.floor((total / 1000) % 60);
    timeLeft = {
      hours: String(hours).padStart(2, "0"),
      minutes: String(minutes).padStart(2, "0"),
      seconds: String(seconds).padStart(2, "0"),
    };
  } else {
    timeLeft = {
      hours: "00",
      minutes: "00",
      seconds: "00",
    };
  }

  return timeLeft;
}


export function checkInRangeTime(startDateTimeAt, endDateTimeAt) {
  const now = new Date();

  const startTime = new Date(startDateTimeAt);
  const endTime = new Date(endDateTimeAt);

  if (now >= startTime && now <= endTime) {
    return false;
  } else if (now < startTime) {
    return false;
  } else {
    return true;
  }
}


export function checkInTime(startDateTimeAt, endDateTimeAt) {
  const now = new Date();

  const startTime = new Date(startDateTimeAt);
  const endTime = new Date(endDateTimeAt);

  if (now >= startTime && now <= endTime) {
    return "in_time";
  } else if (now < startTime) {
    return 'future';
  } else {
    return 'out_time';
  }
}