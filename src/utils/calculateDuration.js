import { differenceInSeconds } from 'date-fns';

export function calculateTimeDifference(startDateTime, endDateTime) {
  const start = new Date(startDateTime);
  const end = new Date(endDateTime);

  const totalSeconds = differenceInSeconds(end, start);

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const formattedDuration = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  return formattedDuration;
}