import { format, toZonedTime } from 'date-fns-tz';

export function formatDateTime(isoString) {
  const vietnamTimezone = 'Asia/Ho_Chi_Minh';
  const zonedDate = toZonedTime(isoString, vietnamTimezone);

  const formatDateTime = format(zonedDate, 'HH:mm dd/MM/yyyy', { timeZone: vietnamTimezone });

  return formatDateTime;
}
