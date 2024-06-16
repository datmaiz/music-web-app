export const isEmpty = (...values: string[]): boolean => {
  return values.every(value => value === '')
}

export const secondsToTime = (seconds: number) => {
  const date = new Date(0);
  date.setSeconds(seconds); // specify value for SECONDS here
  return date.toISOString().substring(14, 19);
}
// 2024-04-20T13:26:44.242Z
export const getCurrentTime = () => {
  const now = new Date()
  const nowString = now.toISOString()
  const date = nowString.substring(0, 10)
  const time = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`
  console.log(date.concat(' ', time))
}

export const timeSince = (date: Date) => {
  const seconds = Math.floor((new Date().valueOf() - date.valueOf()) / 1000);

  let interval = seconds / 31536000;

  if (interval > 1) {
    const year = Math.floor(interval)
    return `${year} ${year > 1 ? 'years' : 'year'}`
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    const month = Math.floor(interval)
    return `${month} ${month > 1 ? 'months' : 'month'}`
  }
  interval = seconds / 86400;
  if (interval > 1) {
    const day = Math.floor(interval)
    return `${day} ${day > 1 ? 'days' : 'day'}`
  }
  interval = seconds / 3600;
  if (interval > 1) {
    const hour = Math.floor(interval)
    return `${hour} ${hour > 1 ? 'hours' : 'hour'}`
  }
  interval = seconds / 60;
  if (interval > 1) {
    const minute = Math.floor(interval)
    return `${minute} ${minute > 1 ? 'minutes' : 'minute'}`
  }
  return seconds < 30 ? 'Just now' : Math.floor(seconds) + " seconds";
}

export const shuffleArray = <T> (array: T[]): T[] => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
