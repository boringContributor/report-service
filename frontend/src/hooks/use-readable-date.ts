import { useCallback, useEffect, useState } from 'react';

const checkIsToday = (date: Date) => {
  const todayDate = new Date();

  return (
    date.getDate() === todayDate.getDate() &&
    date.getMonth() === todayDate.getMonth() &&
    date.getFullYear() === todayDate.getFullYear()
  );
};

const useReadableDate = (): ((date: Date) => string) => {
  const [now, setNow] = useState(new Date());

  const updateNow = useCallback(() => setNow(new Date()), []);
  useEffect(() => {
    const interval = setInterval(updateNow, 5000);

    return () => clearInterval(interval);
  }, [updateNow]);

  const toReadableDate = useCallback(
    (date: Date) => {
      const nowTimestamp = now.getTime();
      const dateTimestamp = date.getTime();

      const isToday = checkIsToday(date);

      if (!isToday) {
        return `${date.toLocaleDateString()} 
          'at'
         ${date.toLocaleTimeString()}`;
      }

      const lessThanOneMinute = nowTimestamp - dateTimestamp < 60 * 1000;
      if (lessThanOneMinute) return 'a few seconds ago';

      const minutesAgo = nowTimestamp - dateTimestamp < 60 * 1000 * 60;
      if (minutesAgo) {
        const minutes = Math.floor((nowTimestamp - dateTimestamp) / 1000 / 60);
        return `${minutes} minute${minutes > 1 ? 's' : ''} ago`.trim();
      }

      return `today at ${date.toLocaleTimeString()}`;
    },
    [now]
  );

  return toReadableDate;
};

export default useReadableDate;
