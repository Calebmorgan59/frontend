import React, { useState, useEffect } from 'react';
import { formatDistanceToNowStrict, parseISO } from 'date-fns';

interface EventCountdownProps {
  date: string;
  title: string;
}

const EventCountdown: React.FC<EventCountdownProps> = ({ date, title }) => {
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      const distance = formatDistanceToNowStrict(parseISO(date), { addSuffix: true });
      setTimeLeft(distance);
    }, 1000);

    return () => clearInterval(timer);
  }, [date]);

  return (
    <div className="bg-green-800 text-white p-4 rounded-lg">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-yellow-400 text-xl font-bold">{timeLeft}</p>
    </div>
  );
};

export default EventCountdown;